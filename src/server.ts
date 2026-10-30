// Tool registry shared by the stdio and Worker entries.
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { InputError, annualIncome, compareStates, getMinimumWage, listUpcomingIncreases } from "./core.js";

export const SERVER_NAME = "minimum-wage-mcp";
export const SERVER_VERSION = "1.0.0";

const stateField = z
  .string()
  .min(2)
  .max(40)
  .describe('US state name or 2-letter code, or DC. Examples: "California", "TX", "District of Columbia".');
const dateField = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD")
  .optional()
  .describe("Date as YYYY-MM-DD between 2026-01-01 and 2027-12-31. Defaults to today.");

type Out = { summary: string } & Record<string, unknown>;

function wrap(fn: () => Out) {
  try {
    const result = fn();
    return {
      content: [{ type: "text" as const, text: `${result.summary}\n\n${JSON.stringify(result, null, 2)}` }],
      structuredContent: result,
    };
  } catch (err) {
    const msg = err instanceof InputError ? err.message : `Internal error: ${(err as Error).message}`;
    return { isError: true, content: [{ type: "text" as const, text: msg }] };
  }
}

const RO = { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false };

export function createServer(): McpServer {
  const server = new McpServer(
    { name: SERVER_NAME, version: SERVER_VERSION },
    {
      instructions:
        "US state minimum wages for all 50 states and DC, 2026-01-01 to 2027-12-31: standard rate, tipped cash wage, tip credit, and scheduled 2026/2027 increases, from the US DOL tables (July 1, 2026) cross-checked against state labor department pages. State-level rates only; city and county rates are out of scope.",
    },
  );

  server.registerTool(
    "get_minimum_wage",
    {
      title: "Get state minimum wage",
      description:
        "Minimum wage for one US state or DC on a date in 2026-2027: standard hourly rate, tipped cash wage, tip credit and the date the rate took effect. Uses the US DOL July 2026 tables and state labor department pages checked October 2026, including increases on July 1, September 30 and January 1, 2027 that postdate most model training data. Applies the $7.25 federal floor when a state has no law or a lower rate, and says so. Inflation-indexed 2027 rates not yet published are reported as not announced, never estimated. State-level only: city and county rates are not included.",
      inputSchema: { state: stateField, date: dateField },
      annotations: { title: "Get state minimum wage", ...RO },
    },
    async ({ state, date }) => wrap(() => getMinimumWage(state, date) as unknown as Out),
  );

  server.registerTool(
    "list_upcoming_increases",
    {
      title: "List upcoming minimum wage increases",
      description:
        "Every scheduled state minimum wage change from a date (default today) through 2027-12-31, sorted by date, with the new rate, the previous rate, the change and the tipped cash wage. Includes 2027-01-01 increases already enacted in law or announced under inflation indexing, and lists indexed changes whose number is not published yet as announced:false. Optional filter by states.",
      inputSchema: {
        from: dateField.describe("Start date as YYYY-MM-DD (exclusive). Defaults to today."),
        states: z.array(stateField).max(51).optional().describe("Optional list of states to include."),
      },
      annotations: { title: "List upcoming minimum wage increases", ...RO },
    },
    async ({ from, states }) => wrap(() => listUpcomingIncreases({ from, states }) as unknown as Out),
  );

  server.registerTool(
    "compare_states",
    {
      title: "Compare state minimum wages",
      description:
        "Side-by-side minimum wages for 2 to 10 US states (or DC) on one date in 2026-2027: standard rate, tipped cash wage, tip credit, effective date and full-time annual pay (40 h x 52 weeks), sorted highest first, with the gap between highest and lowest. State-level only.",
      inputSchema: {
        states: z.array(stateField).min(2).max(10).describe("2 to 10 states, names or codes."),
        date: dateField,
      },
      annotations: { title: "Compare state minimum wages", ...RO },
    },
    async ({ states, date }) => wrap(() => compareStates(states, date) as unknown as Out),
  );

  server.registerTool(
    "annual_income_at_minimum_wage",
    {
      title: "Annual income at minimum wage",
      description:
        "Gross weekly, monthly and annual pay at a state's minimum wage on a date in 2026-2027, for given hours per week (default 40) and weeks per year (default 52). Uses the state rate in force on that date (with the federal floor where it applies). Pre-tax; ignores overtime and tips.",
      inputSchema: {
        state: stateField,
        date: dateField,
        hours_per_week: z.number().positive().max(168).optional().describe("Hours worked per week. Default 40."),
        weeks_per_year: z.number().positive().max(53).optional().describe("Weeks worked per year. Default 52."),
      },
      annotations: { title: "Annual income at minimum wage", ...RO },
    },
    async ({ state, date, hours_per_week, weeks_per_year }) =>
      wrap(() => annualIncome(state, { date, hours_per_week, weeks_per_year }) as unknown as Out),
  );

  return server;
}
