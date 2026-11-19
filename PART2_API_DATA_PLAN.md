# Part 2: API & Data Source Plan
## CloudEagle.ai — AI Governance & Spend Limit Dashboard
**Document Type:** Technical Feasibility & Data Architecture Specification  
**Author:** Product Management (Enterprise AI Governance & FinOps)  
**Target Audience:** VP Engineering, Lead Architect, CFO, CISO  
**Status:** Approved for Implementation  

---

## 1. Executive Summary & Architectural Objective

The primary technical failure mode in enterprise SaaS governance is treating data collection as a flat list of integrations. In practice, enterprise AI usage spans three fundamentally distinct consumption models:
1. **Consumption-based developer APIs** (OpenAI platform, Anthropic API, Google Vertex AI, Cursor) where spend is variable, metered in tokens, and billed directly in USD.
2. **Seat-based enterprise productivity subscriptions** (GitHub Copilot, Microsoft 365 Copilot, Claude.ai Team/Enterprise) where cost is contractual ($/seat/month), but usage is metered by active days, suggestions, or chat events.
3. **Unsanctioned / "Shadow AI" web and personal apps** (unapproved ChatGPT Plus, Midjourney, Perplexity, Poe, browser extensions) where no vendor API exists or is shared with the enterprise.

To power a real-time, board-defensible AI Governance Dashboard that accurately tracks spend against department limits, CloudEagle must orchestrate a **four-tier data ingestion and identity resolution pipeline**. 

```
                                      DATA INGESTION PIPELINE
 ┌────────────────────────────────────────────────────────────────────────────────────────────────────┐
 │  TIER 1: Direct AI Provider APIs (OpenAI Admin, Anthropic Analytics, Cursor, GitHub Copilot)      │
 │  TIER 2: Cloud & Enterprise AI Platforms (Google Cloud Vertex AI BigQuery, M365 Copilot Graph)    │
 │  TIER 3: Identity & Directory Systems (Okta, Microsoft Entra ID, HRIS: Workday/BambooHR)           │
 │  TIER 4: Shadow AI Discovery (CloudEagle Browser Ext, CASB: Netskope/Zscaler/MDE, Ramp AI Spend)  │
 └──────────────────────────────────┬─────────────────────────────────────────────────────────────────┘
                                    │ Raw Telemetry & Invoices
                                    ▼
 ┌────────────────────────────────────────────────────────────────────────────────────────────────────┐
 │                                IDENTITY RESOLUTION ENGINE (EagleIQ)                               │
 │   Mapping: tool_user_id / API Key / Cardholder Email ──► Corporate Email ──► Okta / Entra ID ID   │
 │   Attribution: Assigns Department, Business Unit, Cost Center, Manager, and Employment Status     │
 └──────────────────────────────────┬─────────────────────────────────────────────────────────────────┘
                                    │ Attributed Usage & Spend Events
                                    ▼
 ┌────────────────────────────────────────────────────────────────────────────────────────────────────┐
 │                                NORMALIZATION & GOVERNANCE LAYER                                   │
 │   • Cost Normalization (Invoiced USD vs. Contracted Seat Rate vs. Copilot Credit Translation)      │
 │   • Spend Limit & Budget Engine (50% / 75% / 90% / 100% threshold checks per department)          │
 │   • Risk & Sanction Classifier (Approved / Under Review / Unapproved Shadow AI)                    │
 │   • Attribution Coverage Calculator (% of spend tied to verified employees)                        │
 └──────────────────────────────────┬─────────────────────────────────────────────────────────────────┘
                                    │ Structured Metrics & Alerts
                                    ▼
 ┌────────────────────────────────────────────────────────────────────────────────────────────────────┐
 │                      EXECUTIVE AI GOVERNANCE DASHBOARD (CFO / CISO / IT View)                     │
 └────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Ingestion Tier Breakdown & Technical Feasibility

### Tier 1: Direct AI Provider APIs (Usage & Direct USD Spend)

These APIs represent sanctioned, high-volume AI usage where direct programmatic telemetry is available.

#### 1. OpenAI Platform (Admin API)
* **API Documentation:** `https://platform.openai.com/docs/api-reference/usage`
* **Authentication:** Organization Admin API Key (`sk-admin-...`) with Header `Authorization: Bearer <KEY>`.
* **Endpoints:**
  * `GET /v1/organization/usage/completions`: Retrieves token counts (input, output, reasoning) and request volume.
    * *Query Parameters:* `start_time`, `end_time`, `bucket_width=1d` (or `1h`, `1m`), `group_by=user_id`, `group_by=model`, `group_by=project_id`.
  * `GET /v1/organization/costs`: Retrieves actual USD invoiced cost.
    * *Query Parameters:* `start_time`, `end_time`, `bucket_width=1d`, `group_by=project_id`, `group_by=line_item`.
* **Granularity:** User-level (conditional), Model-level (GPT-4o, o1, o3-mini), Project-level, Organization-level.
* **Update Frequency:** Usage telemetry is near-real-time (1-minute to 1-hour lag); Cost endpoint is updated daily at UTC midnight.
* **Critical PM Limitations & Gotchas:**
  1. **The `user_id` Attribution Gap:** OpenAI only surfaces `user_id` if the client application explicitly sets the `user` parameter in the API payload during inference. If internal developer apps do not instrument this field, requests appear under a generic API key or project ID, requiring fallback attribution to project owners.
  2. **Cost Calculation Discrepancy:** Multiplying token counts by public pricing lists produces an error margin of 10%–20% due to prompt caching discounts, batch API discounts, and volume tiers. CloudEagle must **always ingest the `/v1/organization/costs` endpoint for financial reporting** rather than estimating cost from tokens.
  3. **No Credit Balance Endpoint:** Deprecated balance query endpoints fail with modern Admin keys. Remaining commitment must be tracked within CloudEagle's procurement contract module.

#### 2. Anthropic Claude (Admin Analytics API)
* **API Documentation:** `https://docs.anthropic.com/` (Beta Header: `anthropic-beta: analytics-usage-cost-2026-08-24`)
* **Authentication:** Organization Admin Key (`sk-ant-admin...`).
* **Endpoints:**
  * `GET /v1/organizations/analytics/usage`: Retrieves input tokens, output tokens, prompt cache creation tokens, and prompt cache read tokens.
    * *Query Parameters:* `start_time`, `end_time`, `group_by=workspace_id`, `group_by=model`, `group_by=api_key_id`.
  * `GET /v1/organizations/analytics/cost`: Retrieves exact USD spend by workspace and model.
* **Granularity:** Workspace-level, Model-level (Claude 3.5 Sonnet, Claude 3 Opus, Claude 3.5 Haiku), API Key-level.
* **Update Frequency:** Near-real-time (hourly rollups).
* **Critical PM Limitations & Gotchas:**
  1. **The Chat vs. API Bifurcation (Crucial!):** Anthropic operates two disjoint commercial platforms:
     * *Claude Console (`platform.claude.com`):* API consumption billed on tokens. Programmatically accessible via the Analytics API.
     * *Claude.ai Chat (`claude.ai/team` or Enterprise):* Flat monthly seat subscriptions ($25–$30/seat). **Zero programmatic usage or prompt telemetry is exposed via API.**
     * *Mitigation:* CloudEagle tracks Claude.ai seats via Okta/Entra SSO assignments and Ramp expense receipts, while tracking developer token usage via the Admin Analytics API.
  2. **Hard Limit Behavior:** Anthropic enforces strict account-level spend caps that return immediate `HTTP 429 Rate Limit Exceeded` errors without native warning buffers. CloudEagle must trigger proactive threshold notifications at 75% and 90% before the vendor hard cap halts production engineering workloads.

#### 3. Cursor (Team & Enterprise Admin API)
* **API Documentation:** `https://api.cursor.com`
* **Authentication:** HTTP Basic Auth (API Key as username, empty password).
* **Endpoints:**
  * `POST /teams/filtered-usage-events`: Event-level stream containing `user_id`, `model`, `tokenUsage` (input, output, cache reads/writes), and **`chargedCents` per inference**.
  * `POST /teams/spend`: Current member billing cycle spend, total org spend (`spendCents`), and configured member spend limits.
  * `POST /teams/daily-usage-data`: Daily per-developer activity: requests by mode (`chat`, `composer`, `inline_completion`), lines suggested, lines accepted, and Tab completions.
* **Granularity:** Developer-level (email/member ID), Event-level, Model-level, Feature-level.
* **Update Frequency:** Hourly aggregation.
* **Critical PM Limitations & Gotchas:**
  1. Available strictly on **Team and Enterprise tiers**. Individual developer Pro subscriptions charged to corporate expense cards will bypass this API and must be caught via Tier 4 (Ramp/CASB).
  2. Requires identity mapping: Cursor returns member email, which must be cross-referenced with Okta/Entra ID to attribute spend to engineering squads or cost centers.

#### 4. GitHub Copilot for Business & Enterprise (REST API)
* **API Documentation:** `https://docs.github.com/en/rest/copilot`
* **Authentication:** GitHub App or Personal Access Token (PAT) with `manage_billing:copilot` scope.
* **Endpoints:**
  * `GET /orgs/{org}/copilot/usage`: High-level daily aggregate metrics (DAU, active editors, total suggestions, total acceptances, breakdown by language).
  * `GET /orgs/{org}/copilot/metrics/reports/users-1-day`: Returns signed temporary download URLs for NDJSON reports containing per-user metrics (lines accepted, chat prompts submitted, active IDE).
  * `GET /orgs/{org}/copilot/metrics/reports/user-teams-1-day`: Maps GitHub logins to internal GitHub team structures.
  * `GET /orgs/{org}/copilot/billing/seats`: Seat allocation list (`created_at`, `last_activity_at`, `last_activity_editor`).
* **Granularity:** Individual user (GitHub handle), Team (GitHub team), Programming Language, IDE.
* **Update Frequency:** Daily batch generation (typically 24-hour telemetry delay).
* **Critical PM Limitations & Gotchas:**
  1. **Zero Native Cost Data:** GitHub Copilot API does **not** return dollar amounts because pricing is seat-based ($19/user/month for Business, $39/user/month for Enterprise). CloudEagle must calculate:
     $$\text{Copilot Spend} = \text{Allocated Seats} \times \text{Contracted Unit Rate}$$
  2. **Strict 90-Day Retention Cliff:** GitHub permanently purges per-user telemetry older than 90 days. CloudEagle’s data ingestion engine must warehouse these daily NDJSON files into internal storage (S3/BigQuery) to support multi-quarter trend analysis and year-over-year FinOps reporting.
  3. **Activity ≠ Value (The Deletion Gap):** Telemetry records code suggestions accepted, but cannot verify if the developer deleted the code 30 seconds later.

---

### Tier 2: Cloud & Enterprise AI Platforms (Complex Ingestion)

#### 5. Google Cloud Vertex AI / Gemini API
* **Ingestion Strategy:** Google Cloud does not provide a single, plug-and-play "Gemini Usage API" for SaaS buyers. Instead, consumption spans GCP billing accounts.
* **Data Sources:**
  1. **BigQuery Cloud Billing Export:** Enterprise GCP accounts export detailed daily billing records to a BigQuery dataset. CloudEagle executes scheduled queries filtering for:
     ```sql
     SELECT 
       project.id AS gcp_project,
       sku.description AS model_sku,
       labels.value AS cost_center,
       SUM(cost) AS spend_usd,
       SUM(usage.amount) AS token_units
     FROM `gcp_billing_project.billing_export.gcp_billing_export_v1`
     WHERE service.description LIKE '%Vertex AI%'
     GROUP BY 1, 2, 3;
     ```
  2. **Cloud Monitoring API (`monitoring.googleapis.com`):** Ingests real-time token counts (`aiplatform.googleapis.com/prediction/online/token_count`) for intra-day anomaly detection.
* **Granularity:** Project-level, SKU-level (e.g., "Gemini 1.5 Pro Online Prediction"), Resource Label-level. **No native per-employee user ID.**
* **Update Frequency:** BigQuery export has a 2- to 6-hour delay; Monitoring metrics lag by ~5 minutes.
* **Mitigation for Missing User Data:** CloudEagle requires enterprise customers to enforce GCP resource labeling or provision dedicated projects per business unit (e.g., `ai-sandbox-marketing`, `ai-prod-search`).

#### 6. Microsoft 365 Copilot (Microsoft Graph API)
* **API Documentation:** `https://learn.microsoft.com/en-us/graph/api/resources/copilot-overview`
* **Authentication:** OAuth 2.0 Client Credentials with Microsoft Graph permission `Reports.Read.All` and `User.Read.All`.
* **Endpoints:**
  * `GET /v1.0/reports/getMicrosoft365CopilotUsageUserDetail(period='D30')`: Returns CSV/JSON of user activity across Word, Excel, PowerPoint, Teams, and Copilot Chat.
  * `GET /beta/reports/getMicrosoft365CopilotUserCountTrend(period='D90')`: Rolling adoption curves.
  * `GET /beta/copilot/costManagement`: Reports consumption of *Copilot Credits* (for custom agents and Copilot Studio extensions).
* **Granularity:** User-level (UserPrincipalName / Email), App-level (Teams vs. Word vs. Excel).
* **Update Frequency:** 24- to 48-hour processing lag.
* **Critical PM Limitations & Gotchas:**
  1. **Strict Exclusion of Dollar Costs:** Microsoft Graph APIs deliberately exclude invoice pricing, seat license cost ($30/user/month), or regional currency conversions.
  2. **Binary Activity Metrics:** Telemetry indicates whether a user performed an action within a rolling window (`lastActivityDate`), but does not expose prompt counts, token volume, or semantic engagement.
  3. **Credit Translation Layer:** Custom Copilot Studio agents consume "Copilot Credits", which must be normalized to USD using Microsoft's published SKU conversion tables.

---

### Tier 3: Core Identity, Hierarchy & Attribution Systems

Without identity infrastructure, AI telemetry is an unusable stream of raw IP addresses and obfuscated tokens. Tier 3 provides the canonical organizational backbone.

#### 7. Okta & Microsoft Entra ID (Identity Providers)
* **Endpoints:**
  * Okta: `GET /api/v1/users`, `GET /api/v1/groups`, `GET /api/v1/apps/{id}/users`
  * Microsoft Entra ID: `GET /v1.0/users`, `GET /v1.0/subscribedSkus`, `GET /v1.0/users/{id}/memberOf`
* **Data Extracted:**
  * Primary Corporate Email (`userPrincipalName` or `profile.email`)
  * Department (`profile.department`)
  * Cost Center (`profile.costCenter`)
  * Manager Hierarchy & Division
  * Sanctioned SSO Application Assignments (e.g., who is authorized for GitHub Copilot or ChatGPT Enterprise)
* **Refresh Frequency:** Webhook event listeners (real-time for Joiner/Mover/Leaver events) + 6-hour full directory delta sync.

#### 8. HRIS Systems (Workday, BambooHR, ADP)
* **Function:** Source of truth for team structures, approved departmental headcount, and cost-center budget owners.
* **Key Role:** Headcount normalization. Enables calculating **AI Spend per Employee** and **Adoption Rate %** ($\frac{\text{Active AI Users}}{\text{Total Department Headcount}}$).

---

### Tier 4: Shadow AI Discovery & Real-Time Telemetry

Sanctioned APIs only illuminate approved corporate accounts. Shadow AI (unapproved personal accounts, expensed subscriptions, browser-based LLMs) requires multi-vector endpoint and network detection.

#### 9. CloudEagle Proprietary Browser Extension (Chrome & Firefox)
* **Mechanism:** Lightweight client-side agent deployed via Google Workspace Admin or Microsoft Intune MDM.
* **Capabilities:**
  * **Domain Detection:** Identifies navigation to 500+ GenAI domains (e.g., `midjourney.com`, `claude.ai`, `poe.com`, `perplexity.ai`, `deepseek.com`).
  * **Pre-Execution Prompt DLP:** Scans prompt text client-side before form submission. Triggers soft redirects ("*Our sanctioned tool is ChatGPT Enterprise — click here to redirect*") or hard blocks if PII/credit cards/source code are detected.
  * **Zero-SSO Identity Capture:** Captures corporate email tied to the active browser profile, tying shadow usage directly to a verified employee even when they use personal logins.

#### 10. Corporate Expense & Card Management (Ramp, Brex)
* **API Documentation:** `https://docs.ramp.com/developer-api`
* **Endpoints (Ramp):**
  * `GET /developer/v1/ai-spend/team`: Dedicated AI vendor transaction feed.
  * `GET /developer/v1/transactions`: Scans merchant names using regex patterns (`*OPENAI*`, `*ANTHROPIC*`, `*CURSOR*`, `*MIDJOURNEY*`, `*GITHUB*`).
* **Value:** Financial detection is the fastest indicator of Shadow AI. If an employee swipes a corporate card for $20/month on Midjourney or ChatGPT Plus, CloudEagle detects the unsanctioned tool within 15 minutes of card swipe.

#### 11. Enterprise CASB & Secure Web Gateways (Netskope, Zscaler, Defender for Cloud Apps)
* **Endpoints:**
  * Netskope: `GET /api/v2/events/data/application` (GenAI category filter)
  * Zscaler: Analytics GraphQL API (`https://api.zsapi.net/zins/graphql`)
  * Defender for Cloud Apps: Discovered Apps API (Generative AI risk category)
* **Value:** Discovers traffic volume (bytes uploaded/downloaded) and device-level installations across all network-connected corporate laptops.

---

## 3. Verified Dead Ends, Traps & Red Herrings

In enterprise product management, knowing what **cannot** be obtained via API is just as critical as knowing what can. The following sources represent common traps:

| Data Source | Proposed Assumption | Technical Reality & Verified Dead End | Engineering Recommendation |
|---|---|---|---|
| **Midjourney** | "Connect to Midjourney's usage API to track image generation spend" | **Zero Public API Exists.** Midjourney operates exclusively via Discord bot and web interface. Commercial wrappers (PiAPI, UseAPI) violate Midjourney's Terms of Service, pose credential theft risks, and do not expose billing logs. | Track Midjourney strictly via **Ramp card transactions ($/month)** and **CloudEagle Browser Extension domain hits**. |
| **Stripe Billing API** | "Query Stripe to track SaaS vendor invoices and seat counts" | **Stripe does not expose downstream buyer data.** Stripe is an accounts-receivable processor for the seller. A buyer cannot query an external vendor's Stripe instance. | Ingest invoices via Accounts Payable (NetSuite, QuickBooks) or direct vendor contract PDFs in CloudEagle Procurement. |
| **Claude.ai Web Chat** | "Pull prompt counts and chat history from Claude Team accounts via API" | **Anthropic's Admin Analytics API covers platform API tokens only.** Chat subscription usage (`claude.ai`) has no programmatic reporting endpoint. | Treat Claude.ai Chat as a fixed-seat SaaS application ($30/seat) via Okta SSO and Browser Extension telemetry. |
| **Microsoft 365 Copilot Dollar Cost** | "Pull Copilot spend and invoice line items from Microsoft Graph API" | **Microsoft Graph explicitly blocks financial cost and invoice amounts.** The `/reports/` endpoints output activity timestamps, while `/copilot/costManagement` outputs abstract *Copilot Credits*. | Ingest contracted seat quantity from Entra ID `subscribedSkus` and multiply by negotiated enterprise agreement price per seat. |
| **Real-time Cost Estimation from Tokens** | "Calculate real-time cost by multiplying token counts by public pricing" | **Errors by 10% to 25%.** Does not account for prompt cache hits (up to 75% discount on Claude/OpenAI), batch processing discounts (50%), or enterprise negotiated rate cards. | Use token metrics strictly for operational volume and velocity; use `/costs` APIs and ERP invoices for financial budget tracking. |

---

## 4. Identity Resolution & Attribution Pipeline

The central technical challenge of AI governance is that developer tools identify users differently:
* OpenAI: `user_id` string (e.g., `user-xyz123` or null)
* Cursor: `member.email`
* GitHub Copilot: GitHub username (`octocat_dev`)
* M365 Copilot: `userPrincipalName` (e.g., `r.sharma@cloudeagle.ai`)
* Ramp: Cardholder Name + Work Email

CloudEagle’s **EagleIQ Resolution Algorithm** resolves these disjoint identifiers into a unified employee entity:

```
  ┌────────────────────────────────────────────────────────────────────────┐
  │                        EAGLEIQ RESOLUTION GRAPH                         │
  │                                                                        │
  │   [GitHub: octocat] ──┐                                                │
  │   [Cursor: r.sharma] ──┼──► Canonical: r.sharma@cloudeagle.ai          │
  │   [Ramp: R. Sharma] ──┘         │                                      │
  │                                 ▼                                      │
  │                     ┌────────────────────────┐                         │
  │                     │      Okta Master       │                         │
  │                     │  Department: Eng-AI    │                         │
  │                     │  Cost Center: CC-4021  │                         │
  │                     │  Manager: VP Eng       │                         │
  │                     └────────────────────────┘                         │
  └────────────────────────────────────────────────────────────────────────┘
```

### Attribution Coverage Metric
Because identity resolution can never be 100% guaranteed on day one, CloudEagle surfaces an explicit **Attribution Coverage Score**:

$$\text{Attribution Coverage \%} = \frac{\sum \text{Spend Successfully Mapped to an Okta Cost Center}}{\sum \text{Total Verified AI Spend}} \times 100$$

* If Attribution Coverage drops below **85%**, the dashboard renders an actionable alert: *"15% of OpenAI spend is unattributed. Click here to configure project-to-cost-center mapping rules."*

---

## 5. Ingestion Scheduling & Data Freshness SLA

| Ingestion Pipeline | Target Systems | Poll Frequency | Freshness SLA | Fallback Behavior |
|---|---|---|---|---|
| **Pipeline A: Real-Time Stream** | Browser Extension, CASB Webhooks, Ramp Transactions | Push / Webhook | < 5 minutes | Queue in Kafka / EventBridge; retry with exponential backoff |
| **Pipeline B: Hourly Rollup** | Cursor API, OpenAI Usage, Monitoring APIs | Polling (Cron) | < 65 minutes | Carry forward prior hour run-rate with visual "Sync in progress" tag |
| **Pipeline C: Daily Financials** | OpenAI Costs API, Anthropic Costs, GCP BigQuery, GitHub NDJSON | Daily (02:00 UTC) | 24 hours | Display "Data as of yesterday UTC" timestamp |
| **Pipeline D: Weekly Batch** | M365 Copilot Graph Reports, HRIS Hierarchy Sync | Every 7 days | 48 hours | Utilize last confirmed seat allocation |

---

## 6. Summary of Architectural Decisions for APM Submission

1. **Dual Ledger Architecture:** We decouple **Usage Metrics** (tokens, requests, suggestions) from **Financial Metrics** (invoiced USD, seat contract value). Usage drives operational alerting; financial ledgers drive CFO budget limits.
2. **Graceful Degradation:** When an API connection fails or exhibits latency (e.g., Microsoft Graph 48h lag), the dashboard continues to display historical baseline data with clear confidence intervals and timestamp indicators.
3. **Enterprise Defense-in-Depth:** Shadow AI cannot be solved by API integrations alone. The CloudEagle Browser Extension combined with Corporate Card transaction ingestion is the only reliable method for catching unapproved tools before they cause data leakage or budget surprises.
