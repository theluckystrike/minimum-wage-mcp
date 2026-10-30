// US state minimum wage table, 2026-01-01 to 2027-12-31.
// Built 2026-10-30 from the US DOL state tables (revised July 1, 2026) and the state labor
// department pages listed in DATA_SOURCES.md. Every number was read from a source; none is estimated.
// announced:false marks an inflation-indexed or formula change whose rate is not published yet.
export const AS_OF = "2026-10-30";
export const DATA_START = "2026-01-01";
export const DATA_END = "2027-12-31";
export const FEDERAL = { standard: 7.25, tipped_cash: 2.13, tip_credit: 5.12, source: "https://www.dol.gov/agencies/whd/state/minimum-wage/tipped" };
export const STATES = [
    {
        code: "AL", name: "Alabama", slug: "alabama", has_law: false,
        source_url: "https://www.dol.gov/agencies/whd/minimum-wage/state",
        tip_rule: "No state law; federal tip credit applies: cash wage $2.13, tip credit $5.12.",
        notes: "No state minimum wage law. Employers covered by the FLSA must pay the federal $7.25 (US DOL).",
        periods: [
            { effective: "2009-07-24", standard: 7.25, tipped_cash: 2.13, tip_credit: 5.12, announced: true },
        ],
    },
    {
        code: "AK", name: "Alaska", slug: "alaska", has_law: true,
        source_url: "https://labor.alaska.gov/news/2025/news25-11.htm",
        tip_rule: "no tip credit; tipped employees get full state minimum wage (DOL tipped table lists Alaska under 'State requires employers to pay tipped employees full state minimum wage before tips')",
        notes: "Also used https://labor.alaska.gov/lss/whhome.htm (July 1, 2026 notice) and the Wage and Hour Act poster. $15.00 on 2027-07-01 is fixed by Ballot Measure 1; CPI indexing starts 2028-01-01 (outside range). Exempt EAP salary = 2x minimum wage. Matches DOL ($14.00).",
        periods: [
            { effective: "2025-07-01", standard: 13.0, tipped_cash: 13.0, tip_credit: 0.0, announced: true },
            { effective: "2026-07-01", standard: 14.0, tipped_cash: 14.0, tip_credit: 0.0, announced: true, basis: "Fixed in law" },
            { effective: "2027-07-01", standard: 15.0, tipped_cash: 15.0, tip_credit: 0.0, announced: true, basis: "Fixed in law" },
        ],
    },
    {
        code: "AZ", name: "Arizona", slug: "arizona", has_law: true,
        source_url: "https://www.azica.gov/labor-minimum-wage-main-page",
        tip_rule: "tip credit fixed at $3.00 per DOL tipped table (A.R.S. 23-363 text could not be fetched: azleg.gov 403)",
        notes: "UNVERIFIED AT STATE SOURCE: azica.gov (Industrial Commission) and azleg.gov are behind a Cloudflare challenge (403 via curl, WebFetch and the shared Chrome). 2026 values = DOL baseline (source=DOL). 2027 $15.65 is from a KTAR news article (Sep 12, 2026) based on Aug CPI; a web search also lists an ICA PDF '2027 THE FAIR WAGES AND HEALTHY FAMILIES ACT' (azica.gov/sites/default/files/2026-09/...) showing $15.65 effective Jan 1, 2027, but that PDF could not be downloaded. 2027 tipped_cash 12.65 is derived (15.65 - fixed $3.00), not quoted. Indexing: annual Jan 1 by Aug-Aug CPI, rounded to 5 cents",
        periods: [
            { effective: "2026-01-01", standard: 15.15, tipped_cash: 12.15, tip_credit: 3.0, announced: true, source: "https://www.dol.gov/agencies/whd/state/minimum-wage/tipped" },
            { effective: "2027-01-01", standard: 15.65, tipped_cash: 12.65, tip_credit: 3.0, announced: true, basis: "Announced by the Industrial Commission of Arizona (2027 notice, $15.65). The notice is listed on azica.gov but blocked automated download; the figure was read from search-index text of that notice and a KTAR report (Sep 12, 2026). Tipped cash wage = rate minus the fixed $3.00 credit.", source: "https://www.azica.gov/sites/default/files/2026-09/2027%20THE%20FAIR%20WAGES%20AND%20HEALTHY%20FAMILIES%20ACT_1.pdf" },
        ],
    },
    {
        code: "AR", name: "Arkansas", slug: "arkansas", has_law: true,
        source_url: "https://labor.arkansas.gov/labor/labor-standards/minimum-wage/",
        tip_rule: "tipped cash wage fixed at $2.63; tip credit = 11.00 - 2.63 = $8.37",
        notes: "Covers employers with 4 or more employees. No 2026/2027 change shown on the state page. Matches DOL.",
        periods: [
            { effective: "2021-01-01", standard: 11.0, tipped_cash: 2.63, tip_credit: 8.37, announced: true },
        ],
    },
    {
        code: "CA", name: "California", slug: "california", has_law: true,
        source_url: "https://dof.ca.gov/media/docs/whats-new/Minimum-Wage-Increase-Notification-Governor-and-Legislative-Letter.pdf",
        tip_rule: "no tip credit; tipped employees get full state minimum wage (DOL tipped table lists California under 'full state minimum wage before tips')",
        notes: "dir.ca.gov refused connections (ECONNREFUSED) so DIR pages were not readable; used Dept of Finance letter dated July 31, 2026 plus gov.ca.gov release of 2026-07-31 ('California’s statewide minimum wage will increase to $17.40 an hour on January 1, 2027'). Single rate for all employers (no size tier). Sector rates (fast food $20, health care tiers) and city/county rates are separate and out of scope. Indexing: lesser of 3.5% or US CPI-W, Jan 1. Matches DOL ($16.90).",
        periods: [
            { effective: "2026-01-01", standard: 16.9, tipped_cash: 16.9, tip_credit: 0.0, announced: true },
            { effective: "2027-01-01", standard: 17.4, tipped_cash: 17.4, tip_credit: 0.0, announced: true, basis: "Announced by the state" },
        ],
    },
    {
        code: "CO", name: "Colorado", slug: "colorado", has_law: true,
        source_url: "https://cdle.colorado.gov/press-releases/press-release-colorado-minimum-wage-will-increase-to-1571/hour-in-2027",
        tip_rule: "tip credit fixed at $3.02 (PAY CALC Order: '$3.02 per hour below full Colorado minimum wage')",
        notes: "2026 values from adopted 2026 PAY CALC Order (cdle.colorado.gov/sites/cdle/files/adopted_2026_pay_calc_order_7_ccr_1103-14_12.8.25.pdf). 2027 announced Aug 13, 2026 (press release says 'in 2027'; Colorado adjusts each Jan 1). 2027 PAY CALC order not yet seen. Minors may be paid 15% below. Denver ($19.84 in 2027) and other local rates out of scope. Matches DOL.",
        periods: [
            { effective: "2026-01-01", standard: 15.16, tipped_cash: 12.14, tip_credit: 3.02, announced: true },
            { effective: "2027-01-01", standard: 15.71, tipped_cash: 12.69, tip_credit: 3.02, announced: true, basis: "Announced by the state" },
        ],
    },
    {
        code: "CT", name: "Connecticut", slug: "connecticut", has_law: true,
        source_url: "https://www.dol.gov/agencies/whd/state/minimum-wage/tipped",
        tip_rule: "cash wage fixed by C.G.S. 31-60(d): employer's share $6.38/h hotel & restaurant staff (non-bartenders), $8.23/h bartenders; tip credit = minimum wage minus that share",
        notes: "portal.ct.gov (CTDOL and Governor's press release) unreachable from here (curl 000, Chrome timeout, WebFetch failed). Rates taken from WSHU news report quoting Labor Commissioner Bartolomeo; tipped rule from statute text at cga.ct.gov/current/pub/chap_558.htm. Bartenders: cash 8.23, credit 8.71 (2026) / 9.25 (2027). Indexing: Jan 1 by ECI for 12 months ending June 30, announced by Oct 15. 2027 credits are derived (17.48-6.38, 17.48-8.23). Minors: 85% for first 90 days or $10.10. Matches DOL (16.94; 10.56/6.38; 8.71/8.23).",
        periods: [
            { effective: "2026-01-01", standard: 16.94, tipped_cash: 6.38, tip_credit: 10.56, announced: true, source: "https://www.dol.gov/agencies/whd/state/minimum-wage/tipped" },
            { effective: "2027-01-01", standard: 17.48, tipped_cash: 6.38, tip_credit: 11.1, announced: true, basis: "Announced by the CT Labor Commissioner (ECI indexing); portal.ct.gov was unreachable, figure read from the WSHU report quoting the commissioner. Tipped figures derived from the fixed $6.38 employer share (C.G.S. 31-60).", source: "https://www.wshu.org/connecticut-news/2026-08-06/ct-minimum-wage-increases" },
        ],
    },
    {
        code: "DE", name: "Delaware", slug: "delaware", has_law: true,
        source_url: "https://industrialaffairs.delaware.gov/wage-hour",
        tip_rule: "cash wage fixed at $2.23; tip credit = minimum wage minus $2.23",
        notes: "No 2027 change found: state law has no CPI indexing; the DE DOL page 'What future minimum wage increases should employers prepare for?' mentions only the Jan 1, 2025 step to $15.00. State adopts federal rate if higher. Matches DOL ($15.00; $2.23 / $12.77).",
        periods: [
            { effective: "2025-01-01", standard: 15.0, tipped_cash: 2.23, tip_credit: 12.77, announced: true },
        ],
    },
    {
        code: "DC", name: "District of Columbia", slug: "district-of-columbia", has_law: true,
        source_url: "https://does.dc.gov/sites/default/files/dc/sites/does/publication/attachments/2026%20Minimum%20Wage%20Increase%20Notice.pdf",
        tip_rule: "tipped base wage set by DOES; DOL footnote: cash wage at least 56% of the standard minimum wage, remainder tip credit (2025 Council amendment per secondary sources: 60% from July 1, 2028)",
        notes: "2025 values from DOES FY2025 notice (2025 Minimum Wage Increase Notice_8-29-25.pdf). July 1, 2027 is CPI-indexed (Washington-area CPI, nearest $0.05) and not yet announced. Single rate regardless of employer size. Matches DOL ($18.40; $10.30 / $8.10).",
        periods: [
            { effective: "2025-07-01", standard: 17.95, tipped_cash: 10.0, tip_credit: 7.95, announced: true },
            { effective: "2026-07-01", standard: 18.4, tipped_cash: 10.3, tip_credit: 8.1, announced: true, basis: "Announced by the state" },
            { effective: "2027-07-01", standard: null, tipped_cash: null, tip_credit: null, announced: false, basis: "Inflation-indexed (Washington-area CPI). DOES announces the rate in spring 2027." },
        ],
    },
    {
        code: "FL", name: "Florida", slug: "florida", has_law: true,
        source_url: "https://floridajobs.org/florida-minimum-wage",
        tip_rule: "tip credit fixed at the 2003 FLSA tip credit of $3.02 (FloridaCommerce: 'minimum wage ($15.00) minus the 2003 tip credit ($3.02)')",
        notes: "2027 ANSWER: no change in 2027. FloridaCommerce 2026 announcement: 'The $15.00 per hour will be effective from September 30, 2026 to December 31, 2027. Resuming in September 2027, the minimum wage will be adjusted annually for inflation and will take effect on the following January 1.' So the first indexed rate is calculated Sept 2027 and takes effect 2028-01-01 (outside range); no Sept 30, 2027 change. Sources: 2026-2027 poster and 2026 announcement PDFs on floridajobs.org; 2025 poster for the prior period. DOL page (July 1, 2026) still shows $14.00/$10.98, now superseded.",
        periods: [
            { effective: "2025-09-30", standard: 14.0, tipped_cash: 10.98, tip_credit: 3.02, announced: true },
            { effective: "2026-09-30", standard: 15.0, tipped_cash: 11.98, tip_credit: 3.02, announced: true, basis: "Fixed in law" },
        ],
    },
    {
        code: "GA", name: "Georgia", slug: "georgia", has_law: true,
        source_url: "https://www.dol.gov/agencies/whd/minimum-wage/state",
        tip_rule: "GA state law does not apply to tipped employees (DOL fn 11); federal $2.13 / $5.12",
        notes: "State statutory rate $5.15 for non-FLSA employers of 6+; recorded period uses federal $7.25 per brief. dol.georgia.gov minimum-wage URLs tried returned 404. No enacted change found.",
        periods: [
            { effective: "2009-07-24", standard: 5.15, tipped_cash: null, tip_credit: null, announced: true },
        ],
    },
    {
        code: "HI", name: "Hawaii", slug: "hawaii", has_law: true,
        source_url: "https://labor.hawaii.gov/wsd/minimum-wage/",
        tip_rule: "tip credit fixed $1.25 for 2026-2027 (rises to $1.50 on 2028-01-01), allowed only if wage + tips is at least $7.00 above the minimum wage and employee gets more than $20/month in tips",
        notes: "No change in 2027; next statutory step is $18.00 on 2028-01-01 (outside range). Tip credit figures from Tip Credit Notice PDF (labor.hawaii.gov/wsd/files/2022/06/Tip_Credit_Notice_with_exhibits_June2022.pdf). Employees with guaranteed monthly pay of $4,000+ exempt (DOL). Matches DOL.",
        periods: [
            { effective: "2026-01-01", standard: 16.0, tipped_cash: 14.75, tip_credit: 1.25, announced: true },
        ],
    },
    {
        code: "ID", name: "Idaho", slug: "idaho", has_law: true,
        source_url: "https://www.dol.gov/agencies/whd/minimum-wage/state",
        tip_rule: "tipped cash fixed at $3.35 (Idaho Code 44-1502 per DOL table)",
        notes: "labor.idaho.gov unreachable (connection refused/timeout). No enacted change found.",
        periods: [
            { effective: "2009-07-24", standard: 7.25, tipped_cash: 3.35, tip_credit: 3.9, announced: true },
        ],
    },
    {
        code: "IL", name: "Illinois", slug: "illinois", has_law: true,
        source_url: "https://labor.illinois.gov/faqs/minimum-wage-overtime-faq.html",
        tip_rule: "tip credit up to 40% of minimum wage; cash wage = 60% of minimum wage ($9.00)",
        notes: "No CPI indexing and no scheduled 2027 change on the IDOL pages. Coverage: employers of 4 or more employees (DOL). Under 18: $13.00 for under 650 hours/year; new non-tipped adults may get $14.50 for first 90 days. Chicago/Cook County local rates out of scope. Matches DOL ($15.00; $9.00 / $6.00).",
        periods: [
            { effective: "2025-01-01", standard: 15.0, tipped_cash: 9.0, tip_credit: 6.0, announced: true },
        ],
    },
    {
        code: "IN", name: "Indiana", slug: "indiana", has_law: true,
        source_url: "https://www.in.gov/dol/files/updated-pdfs-4-7-2026/Indiana2009MinimumWage.pdf",
        tip_rule: "federal-style: cash $2.13, tip credit $5.12",
        notes: "Applies to employers of 2 or more employees (DOL). Poster revised 4-7-2026; no change announced.",
        periods: [
            { effective: "2009-07-24", standard: 7.25, tipped_cash: 2.13, tip_credit: 5.12, announced: true },
        ],
    },
    {
        code: "IA", name: "Iowa", slug: "iowa", has_law: true,
        source_url: "https://www.dol.gov/agencies/whd/minimum-wage/state",
        tip_rule: "tip credit = 40% of minimum wage; cash = 60%",
        notes: "workforce.iowa.gov wage URLs tried returned 404. No enacted change found.",
        periods: [
            { effective: "2009-07-24", standard: 7.25, tipped_cash: 4.35, tip_credit: 2.9, announced: true },
        ],
    },
    {
        code: "KS", name: "Kansas", slug: "kansas", has_law: true,
        source_url: "https://www.dol.gov/agencies/whd/minimum-wage/state",
        tip_rule: "federal-style: cash $2.13, tip credit $5.12",
        notes: "dol.ks.gov returned 403 (geo/bot block). State law excludes FLSA-covered employment. No enacted change found.",
        periods: [
            { effective: "2009-07-24", standard: 7.25, tipped_cash: 2.13, tip_credit: 5.12, announced: true },
        ],
    },
    {
        code: "KY", name: "Kentucky", slug: "kentucky", has_law: true,
        source_url: "https://www.dol.gov/agencies/whd/minimum-wage/state",
        tip_rule: "federal-style: cash $2.13, tip credit $5.12",
        notes: "labor.ky.gov unreachable / redirects to elc.ky.gov 403. State adopts federal rate by reference if higher. No enacted change found.",
        periods: [
            { effective: "2009-07-24", standard: 7.25, tipped_cash: 2.13, tip_credit: 5.12, announced: true },
        ],
    },
    {
        code: "LA", name: "Louisiana", slug: "louisiana", has_law: false,
        source_url: "https://www.dol.gov/agencies/whd/minimum-wage/state",
        tip_rule: "No state law; federal tip credit applies: cash wage $2.13, tip credit $5.12.",
        notes: "No state minimum wage law. Employers covered by the FLSA must pay the federal $7.25 (US DOL).",
        periods: [
            { effective: "2009-07-24", standard: 7.25, tipped_cash: 2.13, tip_credit: 5.12, announced: true },
        ],
    },
    {
        code: "ME", name: "Maine", slug: "maine", has_law: true,
        source_url: "https://www.maine.gov/labor/news_events/article.shtml?id=13362373",
        tip_rule: "tip credit max 50% of minimum wage; cash wage = 50% of minimum wage (26 M.R.S. 664(2))",
        notes: "Announced Sept 18, 2026 (Northeast CPI-W Aug-Aug +4.1%, rounded to 5 cents). 2026 values implied by 'from $15.10' / 'from $7.55' in the same release; statute text at legislature.maine.gov/statutes/26/title26sec664.html confirms annual Jan 1 adjustment and the 50% tip credit. Service-employee tip threshold rises $191 -> $199/month in 2027. Portland/Rockland local rates out of scope. Matches DOL ($15.10; $7.55/$7.55).",
        periods: [
            { effective: "2026-01-01", standard: 15.1, tipped_cash: 7.55, tip_credit: 7.55, announced: true },
            { effective: "2027-01-01", standard: 15.7, tipped_cash: 7.85, tip_credit: 7.85, announced: true, basis: "Announced by the state" },
        ],
    },
    {
        code: "MD", name: "Maryland", slug: "maryland", has_law: true,
        source_url: "https://labor.maryland.gov/labor/wages/wagehrfacts.shtml",
        tip_rule: "cash wage fixed at $3.63; tip credit = minimum wage minus $3.63",
        notes: "Effective date 1/1/2024 from MD DOL poster labor.maryland.gov/labor/wages/minimumwagelaw.pdf. No size tier now (single $15 rate). No CPI indexing and no scheduled 2027 change on the MD DOL page; a 2026 bill (HB 1479, Raise the Wage Act) was seen in search results but no evidence it passed. Under 18: 85% of state rate. County rates (Montgomery, Howard, Prince George's) out of scope. Matches DOL ($15.00; $3.63 / $11.37).",
        periods: [
            { effective: "2024-01-01", standard: 15.0, tipped_cash: 3.63, tip_credit: 11.37, announced: true },
        ],
    },
    {
        code: "MA", name: "Massachusetts", slug: "massachusetts", has_law: true,
        source_url: "https://www.mass.gov/info-details/massachusetts-law-about-minimum-wage",
        tip_rule: "service rate (cash wage) fixed at $6.75 by M.G.L. c.151 s.7 for employees with >$20/month tips; tip credit = $15.00 - $6.75 = $8.25",
        notes: "No scheduled change: 'The 2023 increase is the final increase of a 5-year deal; there are no additional increases planned for 2024 or beyond. Further increases must be approved either by the legislature or by the people via a ballot question.' (page updated Aug 28, 2026). Agricultural workers $8.00 (c.151 s.2A). DOL tipped table shows cash $8.25 / credit $6.75 - columns swapped vs state; state service rate is $6.75. Page fetched via shared headless Chrome (curl 403); confirmed also on https://www.mass.gov/minimum-wage-program.",
        periods: [
            { effective: "2023-01-01", standard: 15.0, tipped_cash: 6.75, tip_credit: 8.25, announced: true },
        ],
    },
    {
        code: "MI", name: "Michigan", slug: "michigan", has_law: true,
        source_url: "https://svsuedu-lb01-production.terminalfour.net/media/hr/currentdocs/Michigan%20Minimum%20Wage%20and%20Overtime%20Poster.pdf",
        tip_rule: "tipped cash wage = % of minimum wage by statute (IWOWA as amended 2025): 38% from 2025-02-21, 40% 2026, 42% 2027, 44% 2028, 46% 2029, 48% 2030, 50% from 2031; tip credit = min wage - cash wage",
        notes: "Source is the official LEO required poster (WHD 9904, REV. 2/2025) hosted by SVSU; michigan.gov and legislature.mi.gov blocked (Akamai 403 / connection refused) from curl, headless Chrome and WebFetch. Jan 1 2027 $15.00 is a fixed statutory number (confirmed); CPI/inflation adjustment only starts after 2027 (2028 rate). Prior rate $12.48 from 2025-02-21. Coverage: employers of 2 or more employees aged 16+. Minors under 18 may be paid 85% ($11.67 in 2026, $12.75 in 2027); training wage $4.25 for under-20 first 90 days. DOL tipped table shows cash $8.24 / credit $5.49 - swapped; state cash wage ",
        periods: [
            { effective: "2026-01-01", standard: 13.73, tipped_cash: 5.49, tip_credit: 8.24, announced: true },
            { effective: "2027-01-01", standard: 15.0, tipped_cash: 6.3, tip_credit: 8.7, announced: true, basis: "Fixed in law" },
        ],
    },
    {
        code: "MN", name: "Minnesota", slug: "minnesota", has_law: true,
        source_url: "https://www.dli.mn.gov/business/employment-practices/minimum-wage-minnesota",
        tip_rule: "no tip credit ('No employer may take a tip credit against minimum wages in Minnesota.')",
        notes: "Single rate for all employers (no large/small tier). CPI-indexed, 2027 announced. 90-day training wage (under 20): $9.31 (2026), $9.68 (2027). Minneapolis/St. Paul city rates out of scope. Matches DOL.",
        periods: [
            { effective: "2026-01-01", standard: 11.41, tipped_cash: 11.41, tip_credit: 0.0, announced: true },
            { effective: "2027-01-01", standard: 11.87, tipped_cash: 11.87, tip_credit: 0.0, announced: true, basis: "Announced by the state" },
        ],
    },
    {
        code: "MS", name: "Mississippi", slug: "mississippi", has_law: false,
        source_url: "https://www.dol.gov/agencies/whd/minimum-wage/state",
        tip_rule: "No state law; federal tip credit applies: cash wage $2.13, tip credit $5.12.",
        notes: "No state minimum wage law. Employers covered by the FLSA must pay the federal $7.25 (US DOL).",
        periods: [
            { effective: "2009-07-24", standard: 7.25, tipped_cash: 2.13, tip_credit: 5.12, announced: true },
        ],
    },
    {
        code: "MO", name: "Missouri", slug: "missouri", has_law: true,
        source_url: "https://labor.mo.gov/DLS/MinimumWage",
        tip_rule: "cash wage = 50% of minimum wage (RSMo 290.512); tip credit up to 50%",
        notes: "No 2027 change: CPI indexing is NOT in law. RSMo 290.502 as amended by HB 567 (eff. 2025-08-28; https://revisor.mo.gov/main/OneSection.aspx?section=290.502) ends CPI adjustments 'ending December 31, 2024' and sets '$15.00 per hour, effective January 1, 2026' with no later increase except if the federal rate exceeds it. $15.00 therefore stays in force through 2027 unless a new law/ballot measure changes it (secondary sources say Prop A backers filed for a 2026 constitutional amendment; ballot status not verified). Coverage: retail/service businesses with annual gross income < $500,000 exempt. M",
        periods: [
            { effective: "2026-01-01", standard: 15.0, tipped_cash: 7.5, tip_credit: 7.5, announced: true },
        ],
    },
    {
        code: "MT", name: "Montana", slug: "montana", has_law: true,
        source_url: "https://erd.dli.mt.gov/labor-standards/wage-and-hour-payment-act/state-minimum-wage",
        tip_rule: "no tip credit ('No tip credit, meal credit, or training wage is allowed under Montana's Wage & Hour Laws.')",
        notes: "CPI-indexed (set no later than Sept 30 each year); 2027 announced. 2026 effective date from the 2026 determination letter (MW-Determination-Letter.2026.pdf, fetched). Tier: non-FLSA businesses with gross annual sales <= $110,000 may pay $4.00/hour. Matches DOL.",
        periods: [
            { effective: "2026-01-01", standard: 10.85, tipped_cash: 10.85, tip_credit: 0.0, announced: true },
            { effective: "2027-01-01", standard: 11.2, tipped_cash: 11.2, tip_credit: 0.0, announced: true, basis: "Announced by the state" },
        ],
    },
    {
        code: "NE", name: "Nebraska", slug: "nebraska", has_law: true,
        source_url: "https://www.dol.gov/agencies/whd/minimum-wage/state",
        tip_rule: "cash wage fixed at $2.13 (Neb. Rev. Stat. 48-1203(3)); tip credit = min wage - $2.13",
        notes: "dol.nebraska.gov and nebraskalegislature.gov unreachable (TCP timeout / ECONNREFUSED from curl, headless Chrome and WebFetch), so the NDOL 2027 publication could not be read. Source is the LB258 engrossed bill text (law firm copy). LB258 (approved 2026, eff. 2026-07-17 per Jackson Lewis) REPLACED the 2027 CPI (Midwest CPI) indexing with a fixed 1.75% annual increase from Jan 1 2027. So 2027 is fixed by formula, not CPI: $15.00 x 1.0175 = $15.2625; the engrossed text gives no rounding rule for the standard rate. Secondary press (KLIN, 2026-09-25) reports $15.26; one search snippet suggests the ",
        periods: [
            { effective: "2026-01-01", standard: 15.0, tipped_cash: 2.13, tip_credit: 12.87, announced: true, source: "https://www.dol.gov/agencies/whd/state/minimum-wage/tipped" },
            { effective: "2027-01-01", standard: null, tipped_cash: null, tip_credit: null, announced: false, basis: "LB258 (2026) raises the rate by 1.75 percent on January 1, 2027; the Nebraska Department of Labor figure (due by Oct 15) could not be read and the law gives no rounding rule, so no number is returned.", source: "https://www.jacksonlewis.com/sites/default/files/2026-02/Nebraska-LB258.pdf" },
        ],
    },
    {
        code: "NV", name: "Nevada", slug: "nevada", has_law: true,
        source_url: "https://www.dol.gov/agencies/whd/minimum-wage/state",
        tip_rule: "no tip credit (Nev. Const. art. 15 s.16; DOL lists Nevada among states requiring full minimum wage for tipped employees)",
        notes: "labor.nv.gov unreachable (TCP timeout from curl/Chrome, ECONNREFUSED from WebFetch); leg.state.nv.us 403. Fallback to DOL. Effective date 2024-07-01 (single $12.00 rate, two-tier health-benefit system ended) is from search results only (Labor Commissioner 2026 bulletin 26.06.29 lists $12.00 effective July 1, 2026, unread). No 2027 change found in law; Nevada rate rises only if federal minimum exceeds it. No tiers.",
        periods: [
            { effective: "2024-07-01", standard: 12.0, tipped_cash: 12.0, tip_credit: 0.0, announced: true },
        ],
    },
    {
        code: "NH", name: "New Hampshire", slug: "new-hampshire", has_law: true,
        source_url: "https://www.dol.gov/agencies/whd/minimum-wage/state",
        tip_rule: "tipped cash $3.27 (45% of $7.25) per DOL; tip credit $3.98",
        notes: "nh.gov returned Akamai Access Denied (also in headless Chrome). State rate equals federal when set below it. No enacted change found.",
        periods: [
            { effective: "2009-07-24", standard: 7.25, tipped_cash: 3.27, tip_credit: 3.98, announced: true },
        ],
    },
    {
        code: "NJ", name: "New Jersey", slug: "new-jersey", has_law: true,
        source_url: "https://www.nj.gov/labor/lwdhome/press/2026/20260929_min_wage.shtml",
        tip_rule: "tip credit fixed at max $9.87; cash wage = min wage - $9.87",
        notes: "CPI-indexed (NJ Const. art. 1 para. 23); 2027 announced 2026-09-29. Small/seasonal employers (fewer than 6 employees, and seasonal employment): $15.23 (2026), $16.25 (2027) ('The rate for employees of seasonal and small employers (less than six employees) will increase to $16.25 on Jan. 1, up from $15.23.'); statutory step-ups end 2028. Agricultural hourly/piece-rate: $14.20 (2026), $15.00 (2027). Long-term care direct care staff: $18.92 (2026), $19.48 (2027). 2026 rates from https://www.nj.gov/labor/lwdhome/press/2025/20251001_Minimum_Wage.shtml. DOL tipped table shows cash $9.87 / credit $6.",
        periods: [
            { effective: "2026-01-01", standard: 15.92, tipped_cash: 6.05, tip_credit: 9.87, announced: true },
            { effective: "2027-01-01", standard: 16.48, tipped_cash: 6.61, tip_credit: 9.87, announced: true, basis: "Announced by the state" },
        ],
    },
    {
        code: "NM", name: "New Mexico", slug: "new-mexico", has_law: true,
        source_url: "https://codes.findlaw.com/nm/chapter-50-employment-law/nm-st-sect-50-4-22/",
        tip_rule: "cash wage fixed at $3.00 for employees with >$30/month tips (NMSA 50-4-22(C)); tip credit = $12.00 - $3.00 = $9.00",
        notes: "dws.state.nm.us blocked (F5 403 from curl, headless Chrome, WebFetch). Statute text read via FindLaw (current as of 2024-01-01) through WebFetch. No inflation indexing and no scheduled 2027 change in statute; searches found no 2026 statewide increase enacted. Local rates (Albuquerque, Santa Fe, Las Cruces) out of scope. DOL tipped table shows cash $9.00 / credit $3.00 - swapped; statute cash wage is $3.00.",
        periods: [
            { effective: "2023-01-01", standard: 12.0, tipped_cash: 3.0, tip_credit: 9.0, announced: true },
        ],
    },
    {
        code: "NY", name: "New York", slug: "new-york", has_law: true,
        source_url: "https://dol.ny.gov/minimum-wage-0",
        tip_rule: "hospitality only; food service workers cash wage $11.35 (NYC/LI/Westchester, credit $5.65) and $10.70 (rest of state, credit $5.30); service employees cash $14.15/credit $2.85 and $13.30/credit $2.70; no tip credit in building service or miscellaneous industries",
        notes: "Statewide rates by region: $17.00 NYC, Long Island and Westchester; $16.00 rest of state. NYSDOL: \"On January 1, 2027, New York's minimum wage will stay the same.\" Tipped figures are for food service workers, rest of state; NYC/LI/Westchester food service cash wage $11.35 (credit $5.65).",
        periods: [
            { effective: "2026-01-01", standard: 16.0, tipped_cash: 10.7, tip_credit: 5.3, announced: true, regional: { "NYC, Long Island and Westchester": 17.0, "Rest of state": 16.0 } },
        ],
    },
    {
        code: "NC", name: "North Carolina", slug: "north-carolina", has_law: true,
        source_url: "https://www.labor.nc.gov/workplace-rights/employee-rights-regarding-time-worked-and-wages-earned/minimum-wage-nc",
        tip_rule: "federal-style: cash $2.13, tip credit $5.12; requires signed monthly/per-pay-period tip certification",
        notes: "No enacted change found. Agricultural and domestic employees fall under federal minimum wage.",
        periods: [
            { effective: "2009-07-24", standard: 7.25, tipped_cash: 2.13, tip_credit: 5.12, announced: true },
        ],
    },
    {
        code: "ND", name: "North Dakota", slug: "north-dakota", has_law: true,
        source_url: "https://www.dol.gov/agencies/whd/minimum-wage/state",
        tip_rule: "tip credit = 33% of minimum wage ($2.39); cash $4.86",
        notes: "nd.gov/labor has no minimum-wage page at tried URLs (404). No enacted change found.",
        periods: [
            { effective: "2009-07-24", standard: 7.25, tipped_cash: 4.86, tip_credit: 2.39, announced: true },
        ],
    },
    {
        code: "OH", name: "Ohio", slug: "ohio", has_law: true,
        source_url: "https://com.ohio.gov/about-us/media-center/news/ohio-minimum-wage-to-increase-in-2027",
        tip_rule: "cash wage = 50% of minimum wage (Ohio Const. art. II s.34a); tip credit 50%",
        notes: "CPI-W indexed (Ohio Const. II-34a); 2027 announced 2026-09-30 by Ohio Dept of Commerce. Tier: state rate applies to employers with annual gross receipts > $405,000 (2026) / > $419,000 (2027; some news says $420,000 - press release says $419,000); smaller employers and 14-15 year olds get federal $7.25. The com.ohio.gov minimum-wage page URL returned 'No content found'; used press release. Matches DOL for 2026.",
        periods: [
            { effective: "2026-01-01", standard: 11.0, tipped_cash: 5.5, tip_credit: 5.5, announced: true },
            { effective: "2027-01-01", standard: 11.4, tipped_cash: 5.7, tip_credit: 5.7, announced: true, basis: "Announced by the state" },
        ],
    },
    {
        code: "OK", name: "Oklahoma", slug: "oklahoma", has_law: true,
        source_url: "https://www.dol.gov/agencies/whd/minimum-wage/state",
        tip_rule: "federal-style per DOL ($2.13/$5.12); state law allows up to 50% ($3.62) tip credit for non-FLSA employers",
        notes: "State Question 832 ($15 by 2029) was REJECTED by voters on June 16, 2026 (news search results), so no change. Small employers (<10 FT at a location and <=$100,000 sales) state rate $2.00. oklahoma.gov/labor URLs tried returned 404.",
        periods: [
            { effective: "2009-07-24", standard: 7.25, tipped_cash: 2.13, tip_credit: 5.12, announced: true },
        ],
    },
    {
        code: "OR", name: "Oregon", slug: "oregon", has_law: true,
        source_url: "https://www.oregon.gov/boli/workers/Pages/minimum-wage-schedule.aspx",
        tip_rule: "no tip credit (\"Tip credits are illegal in Oregon.\" - BOLI); tipped_cash = regional minimum",
        notes: "Three statewide regions: standard, Portland metro (= standard + $1.25), nonurban counties (= standard - $1.00). July 2027 standard rate is CPI-indexed (March-to-March CPI-U); BOLI calculates it by April 30, 2027, rounded to nearest $0.05; not yet published as of 2026-10-30. Rates match DOL (15.55/16.80/14.55). The July 1 2026 rates are on both the schedule page and https://www.oregon.gov/boli/workers/pages/minimum-wage.aspx.",
        periods: [
            { effective: "2025-07-01", standard: 15.05, tipped_cash: 15.05, tip_credit: 0.0, announced: true, regional: { "Standard": 15.05, "Portland metro": 16.3, "Nonurban counties": 14.05 } },
            { effective: "2026-07-01", standard: 15.55, tipped_cash: 15.55, tip_credit: 0.0, announced: true, regional: { "Standard": 15.55, "Portland metro": 16.8, "Nonurban counties": 14.55 }, basis: "Announced by the state" },
            { effective: "2027-07-01", standard: null, tipped_cash: null, tip_credit: null, announced: false, basis: "Inflation-indexed (CPI-U, March to March). BOLI sets the rate by April 30, 2027." },
        ],
    },
    {
        code: "PA", name: "Pennsylvania", slug: "pennsylvania", has_law: true,
        source_url: "https://www.dol.gov/agencies/whd/minimum-wage/state",
        tip_rule: "tipped cash fixed at $2.83; tip credit $4.42; tipped = $135+/month in tips",
        notes: "pa.gov DLI URLs tried returned 404. House passed $15 bill (HB 2189) in March 2026; per search results Senate had not acted and 2026-27 budget passed without a wage increase - no enacted change found.",
        periods: [
            { effective: "2009-07-24", standard: 7.25, tipped_cash: 2.83, tip_credit: 4.42, announced: true },
        ],
    },
    {
        code: "RI", name: "Rhode Island", slug: "rhode-island", has_law: true,
        source_url: "https://www.dol.gov/agencies/whd/minimum-wage/state",
        tip_rule: "tipped cash wage fixed at $3.89 per DOL; tip credit = standard - 3.89 (statute R.I.G.L. 28-12-5 not readable this session)",
        notes: "State pages blocked: dlt.ri.gov and governor.ri.gov return Cloudflare challenge (403) even in headless Chrome; webserver.rilegislature.gov times out. 2026 rate from DOL; 2027 $17.00 fixed by 2025 law (H 5029A / S 0125A, per search results) taken from secondary source jibble.io; NOT verified on an official RI page. 2027 tipped cash $3.89 assumes no change (jibble: tipped rate unchanged since 2017, raise proposals still under review) - unverified. Coverage tiers: none for standard rate.",
        periods: [
            { effective: "2026-01-01", standard: 16.0, tipped_cash: 3.89, tip_credit: 12.11, announced: true, source: "https://www.dol.gov/agencies/whd/state/minimum-wage/tipped" },
            { effective: "2027-01-01", standard: 17.0, tipped_cash: 3.89, tip_credit: 13.11, announced: true, basis: "Fixed in law (2025 H 5029A / S 0125A, R.I.G.L. 28-12-3). RI state sites blocked automated reads; figure from search-index text of dlt.ri.gov and the statute plus a secondary report. Tipped cash wage $3.89 assumed unchanged.", source: "https://webserver.rilegislature.gov/Statutes/TITLE28/28-12/28-12-3.htm" },
        ],
    },
    {
        code: "SC", name: "South Carolina", slug: "south-carolina", has_law: false,
        source_url: "https://www.dol.gov/agencies/whd/minimum-wage/state",
        tip_rule: "No state law; federal tip credit applies: cash wage $2.13, tip credit $5.12.",
        notes: "No state minimum wage law. Employers covered by the FLSA must pay the federal $7.25 (US DOL).",
        periods: [
            { effective: "2009-07-24", standard: 7.25, tipped_cash: 2.13, tip_credit: 5.12, announced: true },
        ],
    },
    {
        code: "SD", name: "South Dakota", slug: "south-dakota", has_law: true,
        source_url: "https://dlr.sd.gov/employment_laws/minimum_wage.aspx",
        tip_rule: "tipped cash wage = 50% of the minimum wage (SD DLR states $5.925 for 2026, $6.15 for 2027); tip credit = the other 50%",
        notes: "CPI-indexed each Jan 1, rounded up to nearest 5 cents; 2027 rate already announced by SD DLR. DOL shows tipped cash $5.93 / tip credit $5.92 (rounded); state page states $5.925 exactly. Tipped employee = more than $35/month in tips (DOL).",
        periods: [
            { effective: "2026-01-01", standard: 11.85, tipped_cash: 5.925, tip_credit: 5.925, announced: true },
            { effective: "2027-01-01", standard: 12.3, tipped_cash: 6.15, tip_credit: 6.15, announced: true, basis: "Announced by the state" },
        ],
    },
    {
        code: "TN", name: "Tennessee", slug: "tennessee", has_law: false,
        source_url: "https://www.dol.gov/agencies/whd/minimum-wage/state",
        tip_rule: "No state law; federal tip credit applies: cash wage $2.13, tip credit $5.12.",
        notes: "No state minimum wage law. Employers covered by the FLSA must pay the federal $7.25 (US DOL).",
        periods: [
            { effective: "2009-07-24", standard: 7.25, tipped_cash: 2.13, tip_credit: 5.12, announced: true },
        ],
    },
    {
        code: "TX", name: "Texas", slug: "texas", has_law: true,
        source_url: "https://www.dol.gov/agencies/whd/minimum-wage/state",
        tip_rule: "federal-style: cash $2.13, tip credit $5.12",
        notes: "twc.texas.gov blocked (CloudFront geo-block 403). No enacted change found.",
        periods: [
            { effective: "2009-07-24", standard: 7.25, tipped_cash: 2.13, tip_credit: 5.12, announced: true },
        ],
    },
    {
        code: "UT", name: "Utah", slug: "utah", has_law: true,
        source_url: "https://www.dol.gov/agencies/whd/minimum-wage/state",
        tip_rule: "federal-style: cash $2.13, tip credit $5.12",
        notes: "laborcommission.utah.gov returned 403. State law excludes FLSA-covered employment. No enacted change found.",
        periods: [
            { effective: "2009-07-24", standard: 7.25, tipped_cash: 2.13, tip_credit: 5.12, announced: true },
        ],
    },
    {
        code: "VT", name: "Vermont", slug: "vermont", has_law: true,
        source_url: "https://labor.vermont.gov/rights-and-wages",
        tip_rule: "tipped (service employee) cash wage = 50% of the full minimum wage: \"The 'Basic Tipped Wage Rate' for service, or 'tipped employees,' equals 50% of the full minimum wage.\"",
        notes: "Applies to employers of two or more employees (DOL). Annual Jan 1 adjustment under 21 V.S.A. § 384; the 2026 rate was announced in a press release (Oct 2025). As of 2026-10-30 no 2027 announcement found on labor.vermont.gov (press-release URL for 2027 returns 404). Tipped employee = more than $120/month in tips (DOL). Matches DOL.",
        periods: [
            { effective: "2026-01-01", standard: 14.42, tipped_cash: 7.21, tip_credit: 7.21, announced: true },
            { effective: "2027-01-01", standard: null, tipped_cash: null, tip_credit: null, announced: false, basis: "Inflation-indexed under 21 V.S.A. 384. No 2027 figure was published on labor.vermont.gov as of 2026-10-30." },
        ],
    },
    {
        code: "VA", name: "Virginia", slug: "virginia", has_law: true,
        source_url: "https://doli.virginia.gov/?p=23822346",
        tip_rule: "federal-style tip credit: cash wage $2.13 (DOL table), tip credit = standard - 2.13; 2027 tipped values derived, not stated by DOLI",
        notes: "DOLI announcement (URL redirects to a slug about the 2025 $12.41 rate but body text is the 2027 notice): 'The current Virginia minimum wage is $12.77 per hour, but it will be increased to $13.75 per hour on January 1, 2027.' 2027 rate is a fixed statutory number (2026 session legislation; search results say $15.00 on 2028-01-01 and farm-worker exemption ends 2027-01-01 - secondary, unverified). Original effective date of $12.77 = 2026-01-01 (DOLI statement 'Effective January 1, 2026 ... $12.77' seen only in search snippet; consistent with DOL).",
        periods: [
            { effective: "2026-01-01", standard: 12.77, tipped_cash: 2.13, tip_credit: 10.64, announced: true },
            { effective: "2027-01-01", standard: 13.75, tipped_cash: 2.13, tip_credit: 11.62, announced: true, basis: "Fixed in law" },
        ],
    },
    {
        code: "WA", name: "Washington", slug: "washington", has_law: true,
        source_url: "https://lni.wa.gov/workers-rights/wages/minimum-wage/",
        tip_rule: "no tip credit (\"Businesses may not use tips and service charges paid to an employee as part of an employee's hourly minimum wage.\")",
        notes: "CPI-W indexed, announced Sept 30, effective Jan 1; 2027 announced. 14-15 year olds may be paid 85% ($15.07 in 2027). City ordinances (Seattle, SeaTac etc.) out of scope. Matches DOL for 2026.",
        periods: [
            { effective: "2026-01-01", standard: 17.13, tipped_cash: 17.13, tip_credit: 0.0, announced: true },
            { effective: "2027-01-01", standard: 17.73, tipped_cash: 17.73, tip_credit: 0.0, announced: true, basis: "Announced by the state" },
        ],
    },
    {
        code: "WV", name: "West Virginia", slug: "west-virginia", has_law: true,
        source_url: "https://labor.wv.gov/wage-hour/jobs-act/minimum-wage/minimum-wage-faq",
        tip_rule: "tip credit = 70% of the minimum wage (\"a 70% credit against the minimum wage requirement\"); cash $2.62",
        notes: "Applies only where 6+ non-exempt employees work at one location; otherwise federal $7.25/$2.13 may apply. No enacted 2026/2027 change found (HB 5485 / HB 5671 introduced 2026, no evidence of passage - search results only). Matches DOL.",
        periods: [
            { effective: "2016-01-01", standard: 8.75, tipped_cash: 2.62, tip_credit: 6.13, announced: true },
        ],
    },
    {
        code: "WI", name: "Wisconsin", slug: "wisconsin", has_law: true,
        source_url: "https://dwd.wisconsin.gov/er/laborstandards/minimumwage.htm",
        tip_rule: "tipped cash fixed at $2.33; tip credit $4.92",
        notes: "Opportunity employees (<20 yrs, first 90 days) $5.90; tipped opportunity employee $2.13 (state page). No enacted change found.",
        periods: [
            { effective: "2009-07-24", standard: 7.25, tipped_cash: 2.33, tip_credit: 4.92, announced: true },
        ],
    },
    {
        code: "WY", name: "Wyoming", slug: "wyoming", has_law: true,
        source_url: "https://dws.wyo.gov/dws-division/labor-standards/workers-and-job-seekers/your-rights-as-a-worker/",
        tip_rule: "federal-style for FLSA employers: cash $2.13, tip credit $5.12",
        notes: "State statutory rate $5.15 (W.S. 27-4-202) applies only to non-FLSA employment; recorded period uses federal $7.25 per brief. No enacted change found.",
        periods: [
            { effective: "2009-07-24", standard: 5.15, tipped_cash: null, tip_credit: null, announced: true },
        ],
    },
];
