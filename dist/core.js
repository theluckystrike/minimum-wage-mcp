// Pure core: lookups and arithmetic over the typed table in data.ts. No I/O.
import { AS_OF, DATA_END, DATA_START, FEDERAL, STATES } from "./data.js";
export const REPO = "minimum-wage-mcp";
export const MONEY_SITE = "https://statewage.com";
export const LOCALITY_NOTE = "State-level rates only. City and county minimum wages (for example Seattle, Denver, Chicago, San Francisco) are out of scope and can be higher.";
export class InputError extends Error {
}
const UTM = `utm_source=mcp&utm_medium=${REPO}`;
export function moreUrl(state) {
    return state ? `${MONEY_SITE}/states/${state.slug}/?${UTM}` : `${MONEY_SITE}/?${UTM}`;
}
const ALIASES = {
    "washington dc": "DC", "washington d.c.": "DC", "d.c.": "DC", "dc": "DC", "district of columbia": "DC",
};
export function resolveState(input) {
    const raw = input.trim();
    const key = raw.toLowerCase().replace(/\s+/g, " ");
    const code = ALIASES[key] ?? (key.length === 2 ? key.toUpperCase() : undefined);
    const found = code
        ? STATES.find((s) => s.code === code)
        : STATES.find((s) => s.name.toLowerCase() === key || s.slug === key.replace(/ /g, "-"));
    if (!found) {
        throw new InputError(`Unknown state "${raw}". Use a US state name or 2-letter code, or DC. Territories are not covered.`);
    }
    return found;
}
export function todayIso(now = new Date()) {
    return now.toISOString().slice(0, 10);
}
export function checkDate(date, now) {
    const d = date ?? todayIso(now);
    const parsed = Date.parse(d + "T00:00:00Z");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(d) || Number.isNaN(parsed) || new Date(parsed).toISOString().slice(0, 10) !== d) {
        throw new InputError(`Date "${d}" is not a valid YYYY-MM-DD date.`);
    }
    if (d < DATA_START || d > DATA_END) {
        throw new InputError(`Date ${d} is outside the covered range ${DATA_START} to ${DATA_END}.`);
    }
    return d;
}
function periodAt(state, date) {
    let idx = -1;
    state.periods.forEach((p, i) => {
        if (p.effective <= date)
            idx = i;
    });
    if (idx < 0)
        throw new InputError(`No ${state.name} rate on file for ${date}.`);
    return { period: state.periods[idx], previous: idx > 0 ? state.periods[idx - 1] : undefined };
}
function lastAnnounced(state, date) {
    return [...state.periods].reverse().find((p) => p.effective <= date && p.announced && p.standard !== null);
}
const usd = (n) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 3 });
export function getMinimumWage(stateInput, date, now) {
    const state = resolveState(stateInput);
    const d = checkDate(date, now);
    const { period } = periodAt(state, d);
    const base = {
        state: state.name,
        code: state.code,
        date: d,
        effective_date: period.effective,
        tip_rule: state.tip_rule,
        regional_rates: period.regional ?? null,
        has_state_minimum_wage_law: state.has_law,
        coverage_note: state.notes,
        locality_note: LOCALITY_NOTE,
        as_of: AS_OF,
        source: period.source ?? state.source_url,
        more: moreUrl(state),
    };
    if (!period.announced || period.standard === null) {
        const prior = lastAnnounced(state, d);
        const summary = `${state.name}'s minimum wage for ${d} changes on ${period.effective} under an inflation index or formula, and that rate has not been announced yet. ` +
            `The last announced rate is ${prior ? usd(prior.standard) + " from " + prior.effective : "not on file"}. ` +
            `This server does not estimate unannounced rates. ${LOCALITY_NOTE}`;
        return {
            ...base,
            status: "not_announced",
            standard_rate: null,
            state_rate: null,
            federal_floor_applies: false,
            tipped_cash_wage: null,
            tip_credit: null,
            last_announced_rate: prior?.standard ?? null,
            last_announced_effective: prior?.effective ?? null,
            summary,
        };
    }
    const stateRate = period.standard;
    const floor = !state.has_law || stateRate < FEDERAL.standard;
    const standard = floor ? FEDERAL.standard : stateRate;
    const tippedCash = floor ? FEDERAL.tipped_cash : period.tipped_cash;
    const tipCredit = floor ? FEDERAL.tip_credit : period.tip_credit;
    const lawText = !state.has_law
        ? `${state.name} has no state minimum wage law, so the federal minimum of ${usd(FEDERAL.standard)} applies to employers covered by the FLSA.`
        : floor
            ? `${state.name}'s own rate is ${usd(stateRate)}, below the federal minimum, so the federal ${usd(FEDERAL.standard)} applies to employers covered by the FLSA.`
            : `${state.name}'s minimum wage on ${d} is ${usd(standard)} an hour, in force since ${period.effective}.`;
    const tipText = tippedCash === null
        ? ""
        : tipCredit === 0
            ? ` No tip credit is allowed: tipped workers get the full ${usd(standard)} in cash.`
            : ` Tipped workers can be paid a cash wage of ${usd(tippedCash)} with a tip credit of ${usd(tipCredit)}.`;
    const regText = period.regional
        ? " Regional rates: " + Object.entries(period.regional).map(([k, v]) => `${k} ${usd(v)}`).join("; ") + "."
        : "";
    return {
        ...base,
        status: "in_force",
        standard_rate: standard,
        state_rate: state.has_law ? stateRate : null,
        federal_floor_applies: floor,
        tipped_cash_wage: tippedCash,
        tip_credit: tipCredit,
        last_announced_rate: standard,
        last_announced_effective: period.effective,
        summary: `${lawText}${tipText}${regText} ${LOCALITY_NOTE}`,
    };
}
export function listUpcomingIncreases(opts = {}, now) {
    const from = opts.from ? checkDate(opts.from, now) : todayIso(now);
    const filter = opts.states?.map((s) => resolveState(s).code);
    const rows = [];
    for (const s of STATES) {
        if (filter && !filter.includes(s.code))
            continue;
        s.periods.forEach((p, i) => {
            if (p.effective <= from || p.effective > DATA_END)
                return;
            const prev = s.periods.slice(0, i).reverse().find((q) => q.standard !== null);
            const prevRate = prev?.standard ?? null;
            rows.push({
                state: s.name,
                code: s.code,
                effective_date: p.effective,
                new_rate: p.standard,
                previous_rate: prevRate,
                change: p.standard !== null && prevRate !== null ? Math.round((p.standard - prevRate) * 100) / 100 : null,
                tipped_cash_wage: p.tipped_cash,
                regional_rates: p.regional ?? null,
                announced: p.announced,
                basis: p.basis ?? "",
                source: p.source ?? s.source_url,
            });
        });
    }
    rows.sort((a, b) => a.effective_date.localeCompare(b.effective_date) || a.state.localeCompare(b.state));
    const known = rows.filter((r) => r.announced);
    const pending = rows.filter((r) => !r.announced);
    const summary = `${rows.length} scheduled changes between ${from} and ${DATA_END}` +
        (filter ? ` for ${filter.join(", ")}` : "") +
        `: ${known.length} with a published rate and ${pending.length} set by an inflation index or formula whose number is not announced yet` +
        (pending.length ? ` (${[...new Set(pending.map((r) => r.code))].join(", ")})` : "") +
        `. ` +
        (known[0] ? `The next published change is ${known[0].state} to ${usd(known[0].new_rate)} on ${known[0].effective_date}. ` : "") +
        LOCALITY_NOTE;
    return {
        from,
        through: DATA_END,
        count: rows.length,
        increases: rows,
        locality_note: LOCALITY_NOTE,
        as_of: AS_OF,
        source: "https://www.dol.gov/agencies/whd/minimum-wage/state",
        more: moreUrl(),
        summary,
    };
}
export function compareStates(states, date, now) {
    if (states.length < 2 || states.length > 10)
        throw new InputError("Give 2 to 10 states.");
    const resolved = states.map(resolveState);
    const codes = new Set(resolved.map((s) => s.code));
    if (codes.size !== resolved.length)
        throw new InputError("Each state may appear only once.");
    const d = checkDate(date, now);
    const rows = resolved.map((s) => {
        const r = getMinimumWage(s.code, d, now);
        return {
            state: r.state, code: r.code, status: r.status, standard_rate: r.standard_rate,
            tipped_cash_wage: r.tipped_cash_wage, tip_credit: r.tip_credit, effective_date: r.effective_date,
            federal_floor_applies: r.federal_floor_applies, regional_rates: r.regional_rates,
            full_time_annual: r.standard_rate === null ? null : Math.round(r.standard_rate * 40 * 52 * 100) / 100,
            source: r.source, more: r.more,
        };
    });
    rows.sort((a, b) => (b.standard_rate ?? -1) - (a.standard_rate ?? -1));
    const priced = rows.filter((r) => r.standard_rate !== null);
    const hi = priced[0];
    const lo = priced[priced.length - 1];
    const summary = (hi && lo && hi !== lo
        ? `On ${d}, ${hi.state} has the highest minimum wage of these at ${usd(hi.standard_rate)} and ${lo.state} the lowest at ${usd(lo.standard_rate)}, a gap of ${usd(hi.standard_rate - lo.standard_rate)} an hour or ${usd((hi.standard_rate - lo.standard_rate) * 2080)} a year full time. `
        : `On ${d}: ` + rows.map((r) => `${r.code} ${r.standard_rate === null ? "not announced" : usd(r.standard_rate)}`).join(", ") + ". ") +
        LOCALITY_NOTE;
    return { date: d, states: rows, locality_note: LOCALITY_NOTE, as_of: AS_OF, source: "https://www.dol.gov/agencies/whd/minimum-wage/state", more: moreUrl(), summary };
}
export function annualIncome(stateInput, opts = {}, now) {
    const hours = opts.hours_per_week ?? 40;
    const weeks = opts.weeks_per_year ?? 52;
    if (!(hours > 0 && hours <= 168))
        throw new InputError("hours_per_week must be above 0 and at most 168.");
    if (!(weeks > 0 && weeks <= 53))
        throw new InputError("weeks_per_year must be above 0 and at most 53.");
    const w = getMinimumWage(stateInput, opts.date, now);
    if (w.standard_rate === null) {
        throw new InputError(`${w.state}'s rate for ${w.date} is not announced yet. Last announced rate: ${w.last_announced_rate === null ? "none" : usd(w.last_announced_rate)} from ${w.last_announced_effective}.`);
    }
    const round = (n) => Math.round(n * 100) / 100;
    const annual = round(w.standard_rate * hours * weeks);
    const regional = w.regional_rates
        ? Object.fromEntries(Object.entries(w.regional_rates).map(([k, v]) => [k, round(v * hours * weeks)]))
        : null;
    const summary = `At ${usd(w.standard_rate)} an hour (the ${w.state} minimum on ${w.date}), ${hours} hours a week for ${weeks} weeks is ${usd(annual)} a year before tax, about ${usd(round(annual / 12))} a month and ${usd(round(w.standard_rate * hours))} a week. ` +
        `This uses one rate for the whole period and ignores overtime, tips and scheduled mid-year changes. ${LOCALITY_NOTE}`;
    return {
        state: w.state, code: w.code, date: w.date, hourly_rate: w.standard_rate, effective_date: w.effective_date,
        hours_per_week: hours, weeks_per_year: weeks,
        gross_weekly: round(w.standard_rate * hours), gross_monthly: round(annual / 12), gross_annual: annual,
        regional_gross_annual: regional, federal_floor_applies: w.federal_floor_applies,
        locality_note: LOCALITY_NOTE, as_of: AS_OF, source: w.source, more: w.more, summary,
    };
}
