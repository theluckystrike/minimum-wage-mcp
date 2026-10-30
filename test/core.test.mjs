// Fixtures: expected values copied from the source pages named in each test, or hand-checked arithmetic.
import { test } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { getMinimumWage, listUpcomingIncreases, compareStates, annualIncome, InputError } from "../dist/core.js";
import { STATES } from "../dist/data.js";

const NOW = new Date("2026-10-30T12:00:00Z");
const close = (a, b) => Math.abs(a - b) < 0.005;

test("1. Texas uses $7.25 and federal tipped $2.13 / $5.12 (US DOL tipped table)", () => {
  const r = getMinimumWage("TX", "2026-10-30", NOW);
  assert.equal(r.standard_rate, 7.25);
  assert.equal(r.tipped_cash_wage, 2.13);
  assert.equal(r.tip_credit, 5.12);
});

test("2. Alabama has no state law, federal floor applies (US DOL)", () => {
  const r = getMinimumWage("Alabama", undefined, NOW);
  assert.equal(r.has_state_minimum_wage_law, false);
  assert.equal(r.federal_floor_applies, true);
  assert.equal(r.standard_rate, 7.25);
  assert.match(r.summary, /no state minimum wage law/);
});

test("3. Georgia state rate $5.15 is overridden by the federal $7.25 (US DOL)", () => {
  const r = getMinimumWage("georgia", "2027-03-01", NOW);
  assert.equal(r.state_rate, 5.15);
  assert.equal(r.standard_rate, 7.25);
  assert.equal(r.federal_floor_applies, true);
  assert.equal(r.tipped_cash_wage, 2.13);
});

test("4. Florida $14.00 / $10.98 until 2026-09-29, $15.00 / $11.98 from 2026-09-30 (FloridaCommerce)", () => {
  const before = getMinimumWage("FL", "2026-09-29", NOW);
  const after = getMinimumWage("FL", "2026-09-30", NOW);
  assert.equal(before.standard_rate, 14);
  assert.equal(before.tipped_cash_wage, 10.98);
  assert.equal(after.standard_rate, 15);
  assert.equal(after.tipped_cash_wage, 11.98);
  assert.equal(getMinimumWage("FL", "2027-12-31", NOW).standard_rate, 15);
});

test("5. Michigan 2027-01-01 is $15.00, tipped $6.30, credit $8.70 (LEO poster)", () => {
  const r = getMinimumWage("Michigan", "2027-01-01", NOW);
  assert.equal(r.standard_rate, 15);
  assert.equal(r.tipped_cash_wage, 6.3);
  assert.equal(r.tip_credit, 8.7);
  assert.equal(getMinimumWage("MI", "2026-12-31", NOW).standard_rate, 13.73);
});

test("6. DC $17.95 through 2026-06-30, $18.40 / tipped $10.30 from 2026-07-01 (DOES notice)", () => {
  assert.equal(getMinimumWage("DC", "2026-06-30", NOW).standard_rate, 17.95);
  const r = getMinimumWage("District of Columbia", "2026-07-01", NOW);
  assert.equal(r.standard_rate, 18.4);
  assert.equal(r.tipped_cash_wage, 10.3);
});

test("7. Oregon regional rates from 2026-07-01: $15.55 / $16.80 Portland / $14.55 nonurban (BOLI)", () => {
  const r = getMinimumWage("OR", "2026-10-30", NOW);
  assert.equal(r.standard_rate, 15.55);
  assert.equal(r.regional_rates["Portland metro"], 16.8);
  assert.equal(r.regional_rates["Nonurban counties"], 14.55);
  assert.equal(r.tip_credit, 0);
});

test("8. Vermont 2027 is inflation-indexed and not announced: no number is invented", () => {
  const r = getMinimumWage("Vermont", "2027-03-01", NOW);
  assert.equal(r.status, "not_announced");
  assert.equal(r.standard_rate, null);
  assert.equal(r.last_announced_rate, 14.42);
});

test("9. Texas full time: 7.25 x 40 x 52 = 15,080.00 a year, 1,256.67 a month", () => {
  const r = annualIncome("Texas", { date: "2026-10-30" }, NOW);
  assert.equal(r.gross_annual, 15080);
  assert.equal(r.gross_monthly, 1256.67);
  assert.equal(r.gross_weekly, 290);
});

test("10. Washington 2026: 17.13 x 40 x 52 = 35,630.40; 2027: 17.73 x 40 x 52 = 36,878.40 (L&I)", () => {
  assert.equal(annualIncome("WA", { date: "2026-10-30" }, NOW).gross_annual, 35630.4);
  const r27 = annualIncome("WA", { date: "2027-01-01" }, NOW);
  assert.equal(r27.gross_annual, 36878.4);
  assert.equal(r27.gross_monthly, 3073.2);
});

test("11. California 2027 part time: 17.40 x 20 x 50 = 17,400.00 (Dept of Finance)", () => {
  const r = annualIncome("CA", { date: "2027-06-01", hours_per_week: 20, weeks_per_year: 50 }, NOW);
  assert.equal(r.hourly_rate, 17.4);
  assert.equal(r.gross_annual, 17400);
});

test("12. compare CA vs TX on 2026-10-30: gap 9.65/h, 20,072.00/yr full time", () => {
  const r = compareStates(["Texas", "California"], "2026-10-30", NOW);
  assert.equal(r.states[0].code, "CA");
  assert.equal(r.states[1].code, "TX");
  assert.equal(r.states[0].full_time_annual, 35152);
  assert.match(r.summary, /\$9\.65 an hour or \$20,072\.00 a year/);
});

test("13. upcoming increases from 2026-10-30 are sorted and include enacted 2027 changes", () => {
  const r = listUpcomingIncreases({}, NOW);
  const dates = r.increases.map((i) => i.effective_date);
  assert.deepEqual(dates, [...dates].sort());
  assert.ok(dates.every((d) => d > "2026-10-30" && d <= "2027-12-31"));
  const ak = r.increases.find((i) => i.code === "AK");
  assert.equal(ak.effective_date, "2027-07-01");
  assert.equal(ak.new_rate, 15);
  assert.equal(ak.change, 1);
  const nj = r.increases.find((i) => i.code === "NJ");
  assert.equal(nj.new_rate, 16.48);
  assert.equal(nj.change, 0.56);
  assert.ok(!r.increases.some((i) => i.code === "FL"), "Florida holds $15.00 through 2027-12-31");
  const ne = r.increases.find((i) => i.code === "NE");
  assert.equal(ne.announced, false);
  assert.equal(ne.new_rate, null);
});

test("14. upcoming increases filtered to one state from an earlier date", () => {
  const r = listUpcomingIncreases({ from: "2026-01-01", states: ["florida"] }, NOW);
  assert.equal(r.count, 1);
  assert.equal(r.increases[0].effective_date, "2026-09-30");
  assert.equal(r.increases[0].change, 1);
});

test("15. input errors are clear", () => {
  assert.throws(() => getMinimumWage("Ontario", undefined, NOW), InputError);
  assert.throws(() => getMinimumWage("CA", "2025-12-31", NOW), /outside the covered range/);
  assert.throws(() => getMinimumWage("CA", "2026-02-30", NOW), InputError);
  assert.throws(() => compareStates(["CA"], undefined, NOW), /2 to 10/);
  assert.throws(() => compareStates(["CA", "california"], undefined, NOW), /only once/);
  assert.throws(() => annualIncome("VT", { date: "2027-02-01" }, NOW), /not announced/);
});

test("16. data integrity: 51 jurisdictions, cash wage + tip credit = rate, sorted periods", () => {
  assert.equal(STATES.length, 51);
  assert.equal(new Set(STATES.map((s) => s.code)).size, 51);
  for (const s of STATES) {
    assert.ok(s.source_url.startsWith("https://"), s.code);
    const eff = s.periods.map((p) => p.effective);
    assert.deepEqual(eff, [...eff].sort(), s.code);
    for (const p of s.periods) {
      if (!p.announced) assert.equal(p.standard, null, s.code);
      if (p.standard !== null && p.tipped_cash !== null && p.tip_credit !== null) {
        assert.ok(close(p.tipped_cash + p.tip_credit, p.standard), `${s.code} ${p.effective}`);
      }
    }
  }
});

test("17. every result carries as_of, source and a UTM link to statewage.com", () => {
  const r = getMinimumWage("New York", "2026-10-30", NOW);
  assert.equal(r.standard_rate, 16);
  assert.equal(r.regional_rates["NYC, Long Island and Westchester"], 17);
  assert.equal(r.as_of, "2026-10-30");
  assert.ok(r.source.startsWith("https://"));
  assert.equal(r.more, "https://statewage.com/states/new-york/?utm_source=mcp&utm_medium=minimum-wage-mcp");
  assert.match(r.locality_note, /out of scope/);
});

test("18. stdio server lists 4 read-only tools", async () => {
  const entry = fileURLToPath(new URL("../dist/stdio.js", import.meta.url));
  const p = spawn(process.execPath, [entry], { stdio: ["pipe", "pipe", "inherit"] });
  const lines = [];
  let buf = "";
  const got = new Promise((resolve) => {
    p.stdout.on("data", (d) => {
      buf += d;
      let i;
      while ((i = buf.indexOf("\n")) >= 0) {
        lines.push(JSON.parse(buf.slice(0, i)));
        buf = buf.slice(i + 1);
        if (lines.length === 2) resolve();
      }
    });
  });
  const send = (m) => p.stdin.write(JSON.stringify(m) + "\n");
  send({ jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "t", version: "1" } } });
  send({ jsonrpc: "2.0", method: "notifications/initialized" });
  send({ jsonrpc: "2.0", id: 2, method: "tools/list", params: {} });
  await got;
  p.kill();
  const tools = lines[1].result.tools;
  assert.equal(tools.length, 4);
  assert.ok(tools.every((t) => t.annotations.readOnlyHint === true));
});
