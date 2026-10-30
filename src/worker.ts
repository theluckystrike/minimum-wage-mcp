// Cloudflare Worker entry: stateless Streamable HTTP at /mcp, no auth, no storage.
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { createServer, SERVER_VERSION } from "./server.js";
import { AS_OF } from "./data.js";
import { moreUrl } from "./core.js";

const CORS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, Mcp-Session-Id, Mcp-Protocol-Version, Last-Event-ID",
  "Access-Control-Expose-Headers": "Mcp-Session-Id, Mcp-Protocol-Version",
};

function withCors(res: Response): Response {
  const headers = new Headers(res.headers);
  for (const [k, v] of Object.entries(CORS)) headers.set(k, v);
  return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
}

function homePage(origin: string): string {
  const url = `${origin}/mcp`;
  const tools: [string, string][] = [
    ["get_minimum_wage", "Rate, tipped cash wage, tip credit and effective date for one state on a date"],
    ["list_upcoming_increases", "Scheduled increases from today through 2027-12-31, sorted by date"],
    ["compare_states", "2 to 10 states side by side"],
    ["annual_income_at_minimum_wage", "Gross weekly, monthly and annual pay at the minimum wage"],
  ];
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Minimum Wage MCP</title>
<style>body{font:16px/1.5 system-ui,sans-serif;max-width:720px;margin:2rem auto;padding:0 16px;color:#1a1a1a;background:#fff}code,pre{background:#f3f3f3;padding:2px 4px;border-radius:4px}pre{padding:10px;overflow-x:auto}td{padding:4px 8px;vertical-align:top}</style></head><body>
<h1>Minimum Wage MCP</h1>
<p>An MCP server for US state minimum wages in 2026 and 2027. It covers all 50 states and DC: standard rate, tipped cash wage, tip credit, and scheduled increases, including January 1, 2027 changes. Data as of ${AS_OF}, from the US Department of Labor and state labor department pages. City and county rates are not included.</p>
<h2>Tools</h2><table>${tools.map(([n, d]) => `<tr><td><code>${n}</code></td><td>${d}</td></tr>`).join("")}</table>
<h2>Connect</h2>
<p>Paste this URL into Claude.ai custom connectors or ChatGPT developer mode. No token is needed.</p>
<pre>${url}</pre>
<p>Claude Code:</p><pre>claude mcp add --transport http minimum-wage ${url}</pre>
<p>Local stdio:</p><pre>npx -y github:theluckystrike/minimum-wage-mcp</pre>
<p>Source: <a href="https://github.com/theluckystrike/minimum-wage-mcp">github.com/theluckystrike/minimum-wage-mcp</a>. Version ${SERVER_VERSION}.</p>
<p>For a take-home pay estimate in any state, use the <a href="${moreUrl()}">StateWage paycheck calculator</a>.</p>
</body></html>`;
}

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
    if (url.pathname === "/" && request.method === "GET") {
      return new Response(homePage(url.origin), { headers: { "content-type": "text/html; charset=utf-8" } });
    }
    if (url.pathname === "/mcp" || url.pathname === "/mcp/") {
      if (request.method !== "POST") {
        return withCors(
          Response.json(
            { jsonrpc: "2.0", error: { code: -32000, message: "Method not allowed. This stateless server accepts POST only." }, id: null },
            { status: 405, headers: { Allow: "POST, OPTIONS" } },
          ),
        );
      }
      const server = createServer();
      const transport = new WebStandardStreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true });
      await server.connect(transport);
      const res = await transport.handleRequest(request);
      return withCors(res);
    }
    return new Response("Not found", { status: 404 });
  },
};
