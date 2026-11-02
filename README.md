# minimum-wage-mcp

An MCP server that gives AI assistants current US state minimum wages for 2026 and 2027, including tipped wages and scheduled increases, for all 50 states and DC.

Hosted URL (no token, no sign-up):

```
https://minimum-wage-mcp.lipmichal.workers.dev/mcp
```

## Tools

| Tool | What it returns |
| --- | --- |
| `get_minimum_wage` | Standard hourly rate, tipped cash wage, tip credit and effective date for one state (or DC) on a date in 2026-2027. Applies the $7.25 federal floor where a state has no law or a lower rate, and says so. |
| `list_upcoming_increases` | Every scheduled state change from today (or a given date) through 2027-12-31, sorted by date, with old rate, new rate and change. Inflation-indexed 2027 rates not yet published are listed as `announced: false`. |
| `compare_states` | 2 to 10 states side by side on one date, highest first, with full-time annual pay and the gap between highest and lowest. |
| `annual_income_at_minimum_wage` | Gross weekly, monthly and annual pay at a state's minimum wage for your hours per week and weeks per year. |

Every result has structured JSON, a one-paragraph plain-English summary, an `as_of` date, a `source` URL (the state labor department or US DOL page) and a `more` link to the StateWage calculator for that state.

## What it knows that your model does not

- Rates that changed after most training cutoffs: July 1, 2026 changes (Alaska, DC, Oregon), Florida's September 30, 2026 step to $15.00, and the January 1, 2027 increases already enacted or announced (for example Michigan to $15.00).
- Which 2027 rates are fixed in law, which inflation-indexed rates have been published, and which are still unannounced. It never invents an unannounced number.
- Tipped cash wages and tip credits by state, which differ widely and change with the base rate.
- When the federal $7.25 floor overrides a lower or missing state rate (Alabama, Georgia, Wyoming and others).

## Install

### Claude Desktop

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "minimum-wage": {
      "command": "npx",
      "args": ["-y", "minimum-wage-mcp"]
    }
  }
}
```

### Claude Code

```
claude mcp add minimum-wage -- npx -y minimum-wage-mcp
```

Or use the hosted server:

```
claude mcp add --transport http minimum-wage https://minimum-wage-mcp.lipmichal.workers.dev/mcp
```

### Cursor

Add to `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "minimum-wage": { "url": "https://minimum-wage-mcp.lipmichal.workers.dev/mcp" }
  }
}
```

### VS Code

Add to `.vscode/mcp.json`:

```json
{
  "servers": {
    "minimum-wage": { "type": "http", "url": "https://minimum-wage-mcp.lipmichal.workers.dev/mcp" }
  }
}
```

### Claude.ai custom connectors and ChatGPT developer mode

Paste `https://minimum-wage-mcp.lipmichal.workers.dev/mcp` as the server URL. No token or OAuth is needed.

## Example prompts

- "What is the minimum wage in Michigan on January 1, 2027, and what do tipped workers get?"
- "Which states raise their minimum wage between now and the end of 2027?"
- "Compare the minimum wage in Texas, Florida, California and New York."
- "How much does a full-time minimum wage job pay per year in Washington state?"

## Data sources

Rates come from the US Department of Labor state tables (standard and tipped, revised July 1, 2026), cross-checked against each state's labor department page for every 2026 and 2027 change. Each state's source URL and fetch date is in [DATA_SOURCES.md](DATA_SOURCES.md).

## Limitations

- State-level rates only. City and county minimum wages (for example Seattle, Denver, Chicago, San Francisco) are out of scope and can be higher.
- Covers dates from 2026-01-01 to 2027-12-31.
- Lower rates for small employers, minors, trainees or students are noted in the output but not computed.
- Where a 2027 rate is inflation-indexed and not yet published, the server says so and returns no number.
- Not legal advice. Check the state labor office before paying wages.

## Take-home pay

For take-home pay after federal and state tax at any wage, use the StateWage paycheck calculator at https://statewage.com.

Part of the Zovo MCP collection: https://mcp.zovo.one

## License

MIT

<!-- data-servers:start -->
## More data servers from the same author

Each one is free, needs no API key and has a hosted URL you can paste into Claude or ChatGPT.

| server | tools | hosted URL |
|---|---|---|
| [cups-to-grams-mcp](https://github.com/theluckystrike/cups-to-grams-mcp) | convert_ingredient, search_ingredients, scale_recipe, convert_oven_temperature | `https://cups-to-grams-mcp.lipmichal.workers.dev/mcp` |
| [dscr-loan-calculator-mcp](https://github.com/theluckystrike/dscr-loan-calculator-mcp) | calculate_dscr, max_loan_for_target_dscr, rent_needed_for_target_dscr, compare_scenarios, amortization_summary | `https://dscr-loan-calculator-mcp.lipmichal.workers.dev/mcp` |
| [gold-price-per-gram-mcp](https://github.com/theluckystrike/gold-price-per-gram-mcp) | get_gold_price_per_gram, get_metal_prices, calculate_jewelry_value, convert_gold_units | `https://gold-price-per-gram-mcp.lipmichal.workers.dev/mcp` |
| [lake-level-mcp](https://github.com/theluckystrike/lake-level-mcp) | search_lakes, get_lake_level, get_lake_history, compare_lakes | `https://lake-level-mcp.lipmichal.workers.dev/mcp` |
| [no-tax-on-overtime-mcp](https://github.com/theluckystrike/no-tax-on-overtime-mcp) | calculate_overtime_deduction, calculate_tips_deduction, calculate_senior_deduction, estimate_tax_savings, explain_eligibility | `https://no-tax-on-overtime-mcp.lipmichal.workers.dev/mcp` |
| [paycheck-calculator-mcp](https://github.com/theluckystrike/paycheck-calculator-mcp) | calculate_take_home_pay, compare_states_take_home, salary_to_hourly, hourly_to_salary, get_federal_tax_brackets | `https://paycheck-calculator-mcp.lipmichal.workers.dev/mcp` |
| [uk-income-tax-salary-mcp](https://github.com/theluckystrike/uk-income-tax-salary-mcp) | calculate_uk_take_home, get_uk_tax_bands, compare_salaries, marginal_rate_at_income | `https://uk-income-tax-salary-mcp.lipmichal.workers.dev/mcp` |
| [us-federal-holidays-business-days-mcp](https://github.com/theluckystrike/us-federal-holidays-business-days-mcp) | list_federal_holidays, is_business_day, add_business_days, count_business_days, invoice_due_date | `https://us-federal-holidays-business-days-mcp.lipmichal.workers.dev/mcp` |
| [ab-test-sample-size-calculator-mcp](https://github.com/theluckystrike/ab-test-sample-size-calculator-mcp) | calculate_sample_size, estimate_test_duration, test_ab_significance, fisher_exact_test, check_peeking_risk | `https://ab-test-sample-size-calculator-mcp.lipmichal.workers.dev/mcp` |
| [ap-score-distributions-mcp](https://github.com/theluckystrike/ap-score-distributions-mcp) | get_ap_score_distribution, estimate_ap_percentile, compare_ap_exams, list_ap_exams, estimate_ap_score_from_composite | `https://ap-score-distributions-mcp.lipmichal.workers.dev/mcp` |
| [car-loan-interest-deduction-calculator-mcp](https://github.com/theluckystrike/car-loan-interest-deduction-calculator-mcp) | calculate_car_loan_interest_deduction, calculate_salt_deduction, get_tax_brackets_and_standard_deduction, calculate_child_tax_credit | `https://car-loan-interest-deduction-calculator-mcp.lipmichal.workers.dev/mcp` |
| [recipe-nutrition-calculator-mcp](https://github.com/theluckystrike/recipe-nutrition-calculator-mcp) | lookup_ingredient_nutrition, calculate_recipe_nutrition, round_nutrition_label, scale_recipe_nutrition | `https://recipe-nutrition-calculator-mcp.lipmichal.workers.dev/mcp` |
| [section-179-deduction-calculator-mcp](https://github.com/theluckystrike/section-179-deduction-calculator-mcp) | calculate_section_179, calculate_bonus_depreciation, get_vehicle_depreciation_limits, calculate_asset_loan_payment | `https://section-179-deduction-calculator-mcp.lipmichal.workers.dev/mcp` |
| [subdomain-finder-mcp](https://github.com/theluckystrike/subdomain-finder-mcp) | find_subdomains, resolve_subdomains, get_certificate_history, summarize_attack_surface | `https://subdomain-finder-mcp.lipmichal.workers.dev/mcp` |

The paid back-office collection (invoices, VAT, PDFs, spreadsheets) is at https://mcp.zovo.one
<!-- data-servers:end -->
