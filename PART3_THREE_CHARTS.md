# Part 3: Pick Your Three Charts
## CloudEagle.ai — AI Governance & Spend Limit Dashboard
**Document Type:** Product Strategy, UX Architecture & Decision Framework  
**Author:** Product Management (Enterprise AI Governance & FinOps)  
**Target Audience:** Executive Leadership (CFO, CIO, CISO), Hiring Committee  
**Status:** Approved for Implementation  

---

## 1. Executive Framing: The "Three-Chart Constraint" as a Product Strategy

In enterprise dashboard design, an unconstrained UI is a failure of product prioritization. When product managers provide 10 or 15 charts, executives experience cognitive overload, analysis paralysis, and abandon the tool in favor of static spreadsheet summaries prepared by their finance analysts.

The three-chart constraint forces us to answer the single most important product question:
> **What are the minimum sufficient visual models required for a non-technical executive (CFO or IT/Security leader) to understand their entire organization’s AI posture, identify budget and security risks, and take immediate, decisive action within 10 seconds?**

To solve this, we map our visualization choices directly against the **Five Core Governance Decisions**:
1. **Decision 1: Intervene on Budget Breaches** (Stop or reallocate runaway departmental spend before quarter-end).
2. **Decision 2: Sanction vs. Block Shadow AI** (Identify high-velocity unapproved tools and eliminate data-leakage risk).
3. **Decision 3: License Harvesting & Waste Elimination** (Identify dormant licenses and reclaim shelfware).
4. **Decision 4: Capital Expansion for High-ROI Teams** (Approve additional AI compute for productive departments).
5. **Decision 5: Departmental Chargeback & Budget Planning** (Establish defensible quarterly baselines per cost center).

---

## 2. The Three Selected Visualizations: Deep Dive

```
 ┌───────────────────────────────────────────────────────────────────────────────────────────────────────┐
 │                                   THE THREE-CHART GOVERNANCE TRIAD                                    │
 │                                                                                                       │
 │  ┌─────────────────────────────────┐  ┌──────────────────────────────────┐                            │
 │  │ CHART 1: Financial Control      │  │ CHART 3: Vendor & Risk Governance│                            │
 │  │ Department Spend vs. Budget     │  │ Spend by Tool (Approved vs Shadow│                            │
 │  │ (Grouped Bullet/Bar + Forecast) │  │ (Ranked Horizontal Bar + Badges) │                            │
 │  │                                 │  │                                  │                            │
 │  │ "Who is burning budget?"        │  │ "Where is the money going?"      │                            │
 │  └─────────────────────────────────┘  └──────────────────────────────────┘                            │
 │                                                                                                       │
 │  ┌───────────────────────────────────────────────────────────────────────┐                            │
 │  │ CHART 2: Adoption Velocity & Risk Trajectory                          │                            │
 │  │ 12-Week AI Adoption Trend: Sanctioned vs. Shadow AI Unique Users      │                            │
 │  │ (Stacked Area Curve + Policy Milestones)                              │                            │
 │  │                                                                       │                            │
 │  │ "Are we winning or losing the governance race over time?"             │                            │
 │  └───────────────────────────────────────────────────────────────────────┘                            │
 └───────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### Chart 1: Departmental AI Spend vs. Budget Limit
* **Visualization Archetype:** Grouped Horizontal Bullet / Threshold Bar Chart with End-of-Period Run-Rate Projections.
* **Primary Executive Persona:** Chief Financial Officer (CFO), VP Finance, FinOps Lead.

#### 1. Business Question Answered
> *"Which specific departments are staying within their allocated AI budget limits, which are at risk of exceeding them before the quarter ends, and by what exact dollar amount?"*

#### 2. Metric Definition & Exact Calculation Formula
* **Actual Period Spend ($):** Sum of all verified AI expenditures attributed to users in Department $D$ during billing period $T$:
  $$\text{Spend}(D) = \sum_{u \in D} \left( \text{TokenSpend}_{u} + \text{SeatLicenses}_{u} + \text{ExpensedCards}_{u} \right)$$
* **Configured Budget Limit ($):** Hard dollar allocation established in CloudEagle Procurement for Department $D$.
* **Budget Consumption Rate (%):**
  $$\text{Utilization \%}(D) = \left( \frac{\text{Spend}(D)}{\text{Budget Limit}(D)} \right) \times 100$$
* **End-of-Period Projected Overspend ($):**
  $$\text{Forecast}(D) = \left( \frac{\text{Spend}(D)}{d_{\text{elapsed}}} \times d_{\text{total}} \right) - \text{Budget Limit}(D)$$
  *(where $d_{\text{elapsed}}$ is business days passed and $d_{\text{total}}$ is total days in the fiscal period).*
* **Visual Encoding:**
  * **Solid Bar:** Actual cumulative spend to date.
  * **Marker Line / Ghost Bar:** Configured spending limit.
  * **Dashed Extension:** Projected end-of-period run-rate based on trailing 14-day velocity.
  * **Color Semantics:**
    * 🟢 **Normal (Green):** $< 75\%$ budget consumed.
    * 🟡 **Watchlist (Amber):** $75\% - 90\%$ budget consumed.
    * 🔴 **Critical Breach (Red):** $> 90\%$ consumed or projected overspend $> \$0$.

#### 3. Why This Chart Beats Alternative Visualizations
* **Why NOT a Pie / Donut Chart of Spend by Department?**  
  A donut chart displays proportional share (e.g., "Engineering is 48% of total spend"), but is **completely blind to limits**. If Engineering represents 48% of total spend but had a massive budget and is only at 50% utilization, they are healthy. Meanwhile, Legal might represent only 5% of company spend, but is at 115% of their approved budget. A pie chart obscures the problem; a bullet chart highlights the breach immediately.
* **Why NOT a Raw Data Table?**  
  A data table forces the CFO to read dozens of numbers and mentally calculate $\frac{\text{Spend}}{\text{Limit}}$ ratios. A bullet chart conveys proximity to failure in milliseconds via color-coded threshold bars.
* **Why NOT a Heatmap?**  
  Heatmaps are effective for multi-dimensional matrix density (e.g., department $\times$ day of week), but fail to show linear dollar magnitudes and clear target boundaries.

#### 4. Decisions & Actions Enabled
* **Automated Remediation:** When a department breaches 90% (e.g., *Legal at 101%*), the CFO can click a single button on the chart bar to **"Request Budget Justification"** via Slack or **"Enable Hard Spend Cap"** to throttle non-essential API keys.
* **Capital Reallocation:** Identifies chronically underspent departments (e.g., *Finance at 23%* with 2 weeks left) and allows the CFO to reallocate unused budget to high-velocity squads (Engineering) without increasing total company SaaS burn.

#### 5. Data Feasibility & Technical Constraints
* **Feasibility:** **High (Verified).**
* **Inputs Required:** Direct API costs (OpenAI Costs API, Anthropic Analytics, Cursor) + Fixed Seat rates from Entra ID / Okta + Budget targets from CloudEagle SMP module.
* **Risk / Nuance:** Accuracy depends on Okta/Entra ID department attribution. If 10% of users lack a department tag, their spend routes to an "Unallocated / General" bar.

---

### Chart 2: AI Adoption & Risk Trajectory (Approved vs. Shadow AI Users)
* **Visualization Archetype:** 12-Week Rolling Stacked Area Curve with Policy Milestone Annotations.
* **Primary Executive Persona:** Chief Information Security Officer (CISO), Chief Information Officer (CIO), Head of AI Governance.

#### 1. Business Question Answered
> *"Is our organization’s total AI adoption growing or stagnating, and are we winning or losing the governance battle against Shadow AI over time?"*

#### 2. Metric Definition & Exact Calculation Formula
* **Sanctioned Active Users (Green Area):** Distinct corporate identity count with $\ge 1$ authenticated usage event on approved enterprise platforms (ChatGPT Enterprise, GitHub Copilot, Cursor Team) during rolling week $W$:
  $$\text{Sanctioned Users}(W) = \text{CountDistinct}(\text{User}_{\text{SSO}} \in \text{Approved Tools})$$
* **Shadow AI Active Users (Amber Area):** Distinct employee count detected accessing unapproved AI tools via browser telemetry, CASB proxy logs, or expense charges:
  $$\text{Shadow Users}(W) = \text{CountDistinct}(\text{User}_{\text{Browser/CASB}} \in \text{Unapproved Tools})$$
* **Shadow Exposure Ratio (%):**
  $$\text{Shadow Exposure \%} = \left( \frac{\text{Shadow Users}}{\text{Sanctioned Users} + \text{Shadow Users}} \right) \times 100$$
* **Event Annotations:** Vertical milestone markers indicating company-wide governance interventions (e.g., *"Nov 1: GitHub Copilot Rolled Out"*, *"Nov 15: Browser DLP Active"*).

#### 3. Why This Chart Beats Alternative Visualizations
* **Why NOT a Current-Day Snapshot (Donut: Approved vs. Shadow)?**  
  A single snapshot shows that 127 users are on shadow tools today, but cannot answer: *Is that number doubling every week (a crisis) or did it collapse from 500 down to 127 following our enterprise rollout (a success)?* Velocity and trajectory dictate executive priority.
* **Why NOT a Bar Chart of Tool Counts (e.g., 20 Approved vs. 14 Shadow)?**  
  Tool counts are profoundly misleading. An unapproved tool used by a single intern experimenting with an image generator is low risk. An unapproved tool (e.g., personal ChatGPT) used by 300 engineers pasting source code is an existential security threat. Measuring **unique active human users** measures real organizational blast radius.
* **Why NOT a Multi-Line Chart?**  
  Line charts with intersecting lines create visual clutter. A stacked area chart visually communicates the **Total AI Footprint** (the outer boundary) while clearly displaying the internal composition and ratio change over time.

#### 4. Decisions & Actions Enabled
* **Security & Procurement Collaboration:** When the CISO sees Shadow AI users spiking in Week 8, clicking the shadow layer filters the exact tools causing the surge. If 150 users are using Claude.ai personally, Procurement knows there is overwhelming organic demand and can negotiate an enterprise volume contract.
* **Governance Efficacy Validation:** Proves to the Board of Directors and auditors that CloudEagle's browser extension and security guardrails actually reduced data leakage (the amber area shrinking post-policy deployment).

#### 5. Data Feasibility & Technical Constraints
* **Feasibility:** **High (Verified via CloudEagle Core Architecture).**
* **Inputs Required:** Sanctioned user IDs from Okta/Entra + Tier 1 APIs; Shadow user IDs from CloudEagle Browser Extension + Netskope/Zscaler CASB proxy logs.
* **Risk / Nuance:** External contractors on unmanaged personal devices who do not install the browser extension represent a partial visibility gap. The chart clearly displays an "Endpoint Telemetry Coverage: 92%" status badge.

---

### Chart 3: AI Spend by Tool (Ranked by Total Cost with Sanction & Risk Badging)
* **Visualization Archetype:** Ranked Horizontal Bar Chart with Embedded Status Badges, Active User Metrics, and Cost-Per-User Callouts.
* **Primary Executive Persona:** Head of IT Procurement, FinOps Analyst, CFO.

#### 1. Business Question Answered
> *"Which specific AI applications account for our largest software expenditures, what is our cost-per-active-user, and are any unapproved or high-risk shadow tools secretly consuming significant corporate capital?"*

#### 2. Metric Definition & Exact Calculation Formula
* **Tool Total Spend ($):** Sum of direct API invoices, contracted seat fees, and corporate card transactions for Tool $T$ during the current period:
  $$\text{Spend}(T) = \text{Direct Invoices}(T) + \text{Ramp Card Transactions}(T)$$
* **Active Tool Users:** Count of distinct employees logging $\ge 1$ interaction in the current billing cycle.
* **Unit Cost Efficiency ($/User):**
  $$\text{Unit Cost}(T) = \frac{\text{Spend}(T)}{\text{Active Tool Users}(T)}$$
* **Sanction Status Classification:**
  * 🟢 **Approved:** Formally procured, enterprise contract signed, SOC 2/privacy terms verified.
  * 🟡 **Under Review:** Procurement intake submitted, currently undergoing infosec/legal evaluation.
  * 🔴 **Unapproved / Shadow:** Discovered through telemetry or expense cards with no enterprise agreement.

#### 3. Why This Chart Beats Alternative Visualizations
* **Why NOT a Treemap?**  
  While treemaps look visually modern, rectangular area comparisons make it difficult to determine whether Tool A ($48K) is significantly larger than Tool B ($38K). A sorted horizontal bar chart allows instant, precise comparative visual scanning along a shared axis.
* **Why NOT a Stacked Bar of Tools by Department?**  
  Stacking 10 departments inside 10 tool bars results in a visual kaleidoscope of 100 colored micro-segments that no human executive can parse. Departmental attribution is already solved in Chart 1; Chart 3 focuses purely on vendor consolidation and contract leverage.

#### 4. Decisions & Actions Enabled
* **Kill or Sanction Shadow Spend:** When an unapproved tool (e.g., *ChatGPT Plus at $14,200/mo across 67 individual expensed cards*) appears in the top 5 spenders, the CFO can immediately halt card reimbursements and migrate those 67 users to the existing sanctioned enterprise tenant, saving money and closing a compliance breach.
* **Vendor Contract Renegotiation:** When CloudEagle surfaces that *GitHub Copilot ($48K/mo)* has an effective cost of $153/active user due to 34% inactive seats (the Domo case study pattern), Procurement enters renewal talks armed with utilization data to downsize seat commitments.

#### 5. Data Feasibility & Technical Constraints
* **Feasibility:** **High (Verified).**
* **Inputs Required:** Tier 1 provider APIs (OpenAI, Anthropic, Cursor) + GitHub Copilot seat allocations + Ramp `/ai-spend/` transactions.
* **Risk / Nuance:** For shadow tools with zero financial trail (free personal tier usage), dollar spend is $0. To prevent false comfort, Chart 3 displays these free shadow tools with an explicit badge: `👤 84 Users | Cost: $0 (Free Tier / High Data Risk)`.

---

## 3. The Decision Matrix: How the Three Charts Form a Complete System

No single chart can solve the AI governance problem. The true test of product strategy is how the three charts interact synergistically:

| Executive Decision to Make | Chart 1: Dept vs. Budget | Chart 2: Adoption Trend | Chart 3: Spend by Tool |
|---|:---:|:---:|:---:|
| **1. Identify & Stop Budget Overrun** | 🟢 **Primary Driver** (Flags Legal at 101%, Eng at 94%) | ⚪ Contextual (Shows if team is growing) | 🟡 Secondary (Identifies which tool caused the overrun) |
| **2. Sanction or Block Shadow AI** | ⚪ Not covered | 🟢 **Primary Driver** (Shows rapid surge in shadow users) | 🟢 **Primary Driver** (Identifies exact tool name & cost) |
| **3. License Harvesting & Waste** | 🟡 Secondary (Shows low spend in Finance) | 🟡 Secondary (Shows plateauing adoption) | 🟢 **Primary Driver** (Highlights low users vs. high spend) |
| **4. Approve AI Budget Expansion** | 🟢 **Primary Driver** (Shows Dept near 100% capacity) | 🟢 **Primary Driver** (Proves steady user adoption growth) | 🟡 Secondary (Justifies specific tool ROI) |
| **5. Quarterly Chargeback Modeling** | 🟢 **Primary Driver** (Provides historical baseline by dept) | ⚪ Not covered | 🟢 **Primary Driver** (Attributes vendor costs to cost centers) |

**Conclusion:** The three charts achieve **100% decision coverage** with zero redundancy. 

---

## 4. The 10-Second Executive Scanning Strategy

A non-technical CFO or CISO scanning this dashboard experiences an intuitive, top-down cognitive flow:

```
 Step 1 (0–3 seconds): THE VERDICT (Top KPI Cards)
 ┌─────────────────────────────────────────────────────────────────────────────┐
 │ TOTAL SPEND: $142.8K (71% of Q4 Budget)  •  SHADOW AI: 14 Tools (3 New)     │
 └─────────────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
 Step 2 (3–7 seconds): THE PROBLEM LOCATION (Charts 1 & 3)
 ┌──────────────────────────────────────┐  ┌───────────────────────────────────┐
 │ CHART 1: Legal is over budget!       │  │ CHART 3: We have $14K on         │
 │ Engineering is burning fast (94%).   │  │ unapproved ChatGPT Plus cards!    │
 └──────────────────────────────────────┘  └───────────────────────────────────┘
                                  │
                                  ▼
 Step 3 (7–10 seconds): THE STRATEGIC TRAJECTORY (Chart 2)
 ┌─────────────────────────────────────────────────────────────────────────────┐
 │ CHART 2: Shadow AI was declining after Nov 1 policy, but started creeping   │
 │ up again this week. Need to enforce browser extension redirect.             │
 └─────────────────────────────────────────────────────────────────────────────┘
```

Within 10 seconds, the executive knows their financial health, their security exposure, the offending teams and tools, and can initiate remediation directly from the UI.
