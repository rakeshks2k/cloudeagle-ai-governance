# Part 1: Prototype Screen & UX Specification
## CloudEagle.ai — AI Governance & Spend Limit Dashboard
**Document Type:** UX Specification, Information Architecture & Interactive Prototype Design  
**Author:** Product Management (Enterprise AI Governance & FinOps)  
**Target Audience:** Frontend Engineers, UI/UX Designers, Hiring Committee  
**Status:** Approved for Implementation  

---

## 1. Product Vision & UX Design Principles

### Product Vision
To provide the C-suite (CFO, CISO, CIO) with an **executive command center** that transforms chaotic, decentralized enterprise AI usage into a predictable, financially controlled, and risk-managed business asset.

### The 4 Non-Negotiable UX Principles
1. **The 10-Second Executive Verdict (F-Pattern Scanning):**
   A non-technical executive must never be forced to manipulate filters or calculate ratios to understand organizational health. The top row delivers an unambiguous verdict on budget utilization, runaway shadow tools, and risk posture.
2. **Actionable Governance Over Passive Observation:**
   Every risk metric or budget alert must be accompanied by an actionable lever. If a department breaches budget, the UI must offer: *"Request Justification"*, *"Reallocate Budget"*, or *"Throttle API Keys"*. If a shadow tool spikes, the UI offers: *"Sanction & Procure"* or *"Deploy Browser Hard-Block"*.
3. **Transparency in Data Freshness & Attribution Confidence:**
   Enterprise leaders do not trust "black box" dashboards. The UI must explicitly indicate when data was refreshed (e.g., *"OpenAI: 45m ago • M365: 36h ago"*) and what percentage of spend is attributed to verified employees (*Attribution Coverage: 94.2%*).
4. **Resilience Through Multi-State Design:**
   The dashboard must gracefully handle partial data, integration onboarding states, budget breach emergencies, and empty first-time states without breaking or presenting deceptive zeroes.

---

## 2. Information Architecture & Layout Wireframe

The prototype is engineered for standard enterprise desktop monitors (**1440px $\times$ 900px base grid**) with responsive scaling.

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ [CloudEagle Logo]  SaaS & AI Governance  │  Overview  •  App Inventory  •  Access Reviews  •  Settings   │ 👤 CFO │
├──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ HEADER & GLOBAL CONTROLS:                                                                                        │
│ Period: [ Q4 2026 (Nov 1 – Nov 30) ▼ ]   Dept: [ All Departments (7) ▼ ]   Tool: [ All Tools (18) ▼ ]            │
│ Status: [ Active View: Standard ▼ ]      Data Freshness: 🟢 Synced 28m ago (94.2% Coverage)       [ Export PDF ] │
├──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ ROW 1: HEADLINE EXECUTIVE KPI CARDS (THE VERDICT)                                                                │
│ ┌─────────────────┐ ┌──────────────────┐ ┌─────────────────┐ ┌──────────────────┐ ┌───────────────────────────┐  │
│ │ TOTAL AI SPEND  │ │ BUDGET REMAINING │ │ SHADOW AI TOOLS │ │ ACTIVE ADOPTION  │ │ POLICY VIOLATIONS         │  │
│ │   $142,800      │ │  $57,200 (28.6%) │ │     14 Tools    │ │    847 Users     │ │      23 Incidents         │  │
│ │ ↑ 18.4% vs Q3   │ │ ████████░░ 71.4% │ │  ↑ 3 this week  │ │ 61.2% Org Reach  │ │  🔴 4 Critical Data Leaks│  │
│ │ [View Invoice →]│ │ [⚠️ On Track]    │ │ [Review Shadow →│ │ [34% Inactive →] │ │ [Audit Log →]           │  │
│ └─────────────────┘ └──────────────────┘ └─────────────────┘ └──────────────────┘ └───────────────────────────┘  │
├──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ ROW 2: PRIMARY DECISION CHARTS (FINANCIAL CONTROL vs. VENDOR RISK)                                               │
│ ┌─────────────────────────────────────────────────────────┐ ┌────────────────────────────────────────────────────┐ │
│ │ CHART 1: Department AI Spend vs. Budget Limit           │ │ CHART 3: Spend by Tool & Sanction Status         │ │
│ │ (Grouped Bullet Bar + End-of-Period Run-Rate Forecast)  │ │ (Ranked Horizontal Bar with Status Badges)       │ │
│ │                                                         │ │                                                  │ │
│ │ Engineering    ████████████████░░░  $68.2K / $72K  (94%)│ │ 1. GitHub Copilot   ████████████ $48.2K [🟢 Appr]│ │
│ │ Legal          ██████████████████▌  $13.4K / $12K (101%)│ │ 2. Cursor           ██████████   $38.4K [🟢 Appr]│ │
│ │ Sales & GTM    ██████████████░░░░░  $24.6K / $30K  (82%)│ │ 3. Anthropic Claude ███████     $29.1K [🟢 Appr]│ │
│ │ Marketing      ██████████░░░░░░░░░  $19.2K / $30K  (64%)│ │ 4. ChatGPT Plus     ████         $14.2K [🔴 Shad]│ │
│ │ Product Design ██████░░░░░░░░░░░░░   $9.8K / $25K  (38%)│ │ 5. Midjourney       ██            $8.1K [🔴 Shad]│ │
│ │ Finance        ████░░░░░░░░░░░░░░░   $4.6K / $20K  (23%)│ │ 6. Google Vertex AI █             $4.8K [🟢 Appr]│ │
│ │ HR & Ops       ██░░░░░░░░░░░░░░░░░   $3.0K / $11K  (27%)│ │                                                  │ │
│ │ ─────────────────────────────────────────────────────── │ │ ──────────────────────────────────────────────── │ │
│ │ 🔮 Projected Q4 Overspend: +$12,400 (Eng & Legal Risk)  │ │ ⚠️ $22,300 expensed on unsanctioned tools        │ │
│ └─────────────────────────────────────────────────────────┘ └────────────────────────────────────────────────────┘ │
├──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ ROW 3: TRAJECTORY & OPERATIONAL INTERVENTION                                                                     │
│ ┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐ │
│ │ CHART 2: 12-Week AI Adoption Trend: Sanctioned vs. Shadow AI Unique Active Users                               │ │
│ │ (Stacked Area Curve with Policy Intervention Milestones)                                                       │ │
│ │                                                                                                                │ │
│ │  Users                                                                                                         │ │
│ │   900 ┤                                                  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  (127 Shadow Users)  │ │
│ │   750 ┤                                   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  (720 Sanctioned)    │ │
│ │   600 ┤                     ░░░░░░░░░░░░░░                                                                     │ │
│ │   450 ┤        ░░░░░░░░░░░░░                                                                                   │ │
│ │   300 ┤  ░░░░░░                                                                                                │ │
│ │       └─────┬──────────────┬──────────────┬──────────────┬──────────────┬──────────────┬──────► Time               │ │
│ │            W1             W3             W5             W7             W9             W12                      │ │
│ │                           ⚑ Oct 1: Copilot Rollout      ⚑ Nov 1: Browser DLP Policy                            │ │
│ └────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘ │
├──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ ROW 4: ACTIONABLE ESCALATIONS & AUTOMATED INTERVENTIONS (THE "WHAT NOW?" PANEL)                                  │
│ ┌────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐ │
│ │ 🚨 CRITICAL: Legal Dept exceeded Q4 AI budget by $1,400. [Review Invoices] [Request Justification]            │ │
│ │ ⚠️ SHADOW SPEND: 67 employees expensing ChatGPT Plus ($14.2K). [Migrate to Sanctioned Enterprise SSO]          │ │
│ │ 💡 HARVESTING OPPORTUNITY: 34% of GitHub Copilot licenses (106 seats) inactive for 60+ days. [Reclaim $24K/yr] │ │
│ └────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Interactive Components & Micro-Interactions

### A. Dynamic Interactive Filters
* **Date Range Selector:** Presets (`This Month`, `Q4 2026 MTD`, `Trailing 90 Days`, `Custom Calendar`). Instant recalculation of all KPIs and chart domains without full-page reload.
* **Department Filter:** Multiselect dropdown. Filtering by "Engineering" re-indexes Chart 1 to sub-teams (Backend, Frontend, Platform, AI/ML), recalculates KPI cards to departmental spend, and filters Chart 3 to tools used exclusively by Engineering.
* **Tool Filter:** Isolates individual applications to inspect departmental adoption curves.

### B. Deep-Dive Slide-Over Drawer (Drawer UX)
Clicking on any bar in **Chart 1 (Department)** or **Chart 3 (Tool)** triggers an animated contextual slide-over drawer:
1. **Department Drawer:**
   * Shows sub-teams and individual employees ranked by token volume and dollar spend.
   * Lists active licenses assigned vs. actual active days.
   * Direct integration button: *"Export to CSV for Cost Center Reallocation"*.
2. **Tool Detail Drawer:**
   * Displays security risk score (1–100) based on NIST AI RMF criteria (Data retention for training? PII encryption? SOC 2 certified?).
   * Discloses payment source (Direct Invoice vs. Individual Ramp Corporate Cards).
   * One-click action buttons:
     * `[Sanction Tool]` $\rightarrow$ Initiates CloudEagle automated procurement intake workflow.
     * `[Hard Block in Extension]` $\rightarrow$ Pushes instant policy block to Chrome/Firefox extensions.
     * `[Notify Users]` $\rightarrow$ Sends automated Slack direct message to all 67 active users with redirection link to sanctioned tool.

### C. The Prototype State Switcher (Built-in Demo Controls)
To demonstrate product rigor during hiring evaluation, the prototype includes an interactive **State Switcher Toolbar**:
1. **Standard Enterprise View (Default):** Normal operations, moderate shadow AI, Legal slightly over budget.
2. **Critical Breach Alert State:** Highlights visual alarms when Engineering reaches 108% of budget mid-month and data leakage DLP alerts fire.
3. **Onboarding / Partial Sync State:** Demonstrates graceful degradation with skeleton states, "Sync in progress" indicators, and attribution warnings (*"14% unattributed spend"*).
4. **Interactive PM Annotations Toggle:** Overlays sticky callout badges explaining the PM rationale, design tradeoffs, and API mechanics directly on the screen.

---

## 4. Visual Design System & Accessibility Standards

* **Color Palette (WCAG 2.1 AA Compliant):**
  * Primary Corporate Navy: `#0B132B` (Sidebar & Header)
  * Background Surface: `#F8FAFC` (Slate 50)
  * Card Surfaces: `#FFFFFF` (Border: `#E2E8F0`)
  * Data Colors:
    * Sanctioned / Safe (Green): `#10B981` (Emerald 500)
    * Watchlist / Approaching Limit (Amber): `#F59E0B` (Amber 500)
    * Critical Breach / Shadow AI (Red): `#EF4444` (Rose 500)
    * Brand Primary (Blue): `#2563EB` (Blue 600)
    * AI Accent (Indigo/Violet): `#6366F1` (Indigo 500)
* **Typography:** Clean sans-serif (`Inter`, system-ui) with explicit tabular figures (`font-variant-numeric: tabular-nums`) for currency and percentages to avoid layout jitter during live telemetry polling.
