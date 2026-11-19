# CloudEagle.ai — AI Governance & Spend Limit Dashboard
## Associate Product Manager (APM) Take-Home Assignment Submission

This repository contains the complete feature scoping package and interactive prototype for the **CloudEagle.ai APM Take-Home Assignment**.

---

## 📁 Submission Deliverables Overview

| Document / Asset | File Path | Description |
|---|---|---|
| **Master APM Submission** | [APM_ASSIGNMENT_SUBMISSION.md](file:///c:/Users/rakes/Code/cloudeagle-assignment/APM_ASSIGNMENT_SUBMISSION.md) | Complete, publication-grade submission document covering Executive Framing, Part 1, Part 2, and Part 3. |
| **Part 1: Prototype UX Spec** | [PART1_PROTOTYPE_SPEC.md](file:///c:/Users/rakes/Code/cloudeagle-assignment/PART1_PROTOTYPE_SPEC.md) | Detailed UX architecture, wireframe, micro-interactions, accessibility standards, and drawer state designs. |
| **Part 2: API & Data Source Plan** | [PART2_API_DATA_PLAN.md](file:///c:/Users/rakes/Code/cloudeagle-assignment/PART2_API_DATA_PLAN.md) | Technical feasibility report across 15+ data sources, exact API endpoints, query params, update frequencies, identity resolution engine, and 5 verified dead ends. |
| **Part 3: Pick Your Three Charts** | [PART3_THREE_CHARTS.md](file:///c:/Users/rakes/Code/cloudeagle-assignment/PART3_THREE_CHARTS.md) | Strategy justification for the Three Charts: Grouped Bullet Bar, 12-Week Stacked Area, and Ranked Horizontal Bar with Badges, evaluating rejected alternatives and decisions enabled. |
| **Interactive Prototype Source** | `src/` | Production-grade React 19 + Tailwind CSS interactive dashboard with scenario switcher, PM annotation mode, and slide-over drawers. |

---

## 🚀 Running the Interactive Prototype

The prototype runs locally on Node.js v18+ using Vite:

```bash
# 1. Install dependencies (if not already installed)
npm install

# 2. Start the local Vite development server
npm run dev
```

Open your browser to:
👉 **`http://localhost:5173`**

### Key Interactive Features to Explore in the Prototype:
1. **💡 PM Annotations Mode (Purple Badges):**
   - Click the **"PM Annotations: ON/OFF"** toggle in the header.
   - Click any purple **"PM Rationale"** badge on the screen to view the product strategy, metric calculation, and rejected alternatives for that exact component.
2. **🎛️ Scenario Switcher (Top Right):**
   - Switch between **"Standard Q4 Baseline"**, **"Critical Budget Breach"**, and **"Partial Integration / Lag"** to test graceful UI degradation and emergency alert states.
3. **🔍 Drill-Down Slide-Over Drawers:**
   - **Click any department bar in Chart 1** (e.g., *Engineering* or *Legal*) to open the Squad Breakdown, employee token spend, and Slack justification levers.
   - **Click any tool bar in Chart 3** (e.g., *ChatGPT Plus* or *GitHub Copilot*) to inspect the NIST AI RMF security score, consumer training retention status, and one-click sanctioning/harvesting levers.
4. **📊 Interactive 12-Week Adoption Trend (Chart 2):**
   - Hover across the weekly timeline to view the changing ratio of Sanctioned vs. Shadow active users and inspect policy intervention milestones (e.g. *Oct 1 Copilot Rollout*, *Nov 1 Browser DLP Policy*).
5. **📡 Telemetry Health & Attribution Modal:**
   - Click the green **"Telemetry: Synced 28m ago | Coverage: 94.2%"** pill in the filter bar to view the API pipeline status across OpenAI, Anthropic, Cursor, GitHub Copilot, M365, and Ramp.

---

## 🏛️ Executive Summary of Product Thinking

### 1. Primary Persona: The CFO / VP Finance
* **Why not equal personas?** Designing for two equal personas produces a compromised, cluttered screen. The spend-limits challenge is fundamentally a **financial accountability and capital allocation problem**. 
* The CFO has budget authority to reallocate funds or demand cost-center justification; IT/Security leaders lack budget authority. The CISO is seamlessly served as a secondary persona through the Shadow AI and DLP alert vectors.

### 2. The Three Selected Charts (100% Decision Coverage)

```
┌───────────────────────────────────────┐  ┌──────────────────────────────────────┐
│ CHART 1: Financial Control            │  │ CHART 3: Vendor & Risk Governance    │
│ Department AI Spend vs. Budget Limit  │  │ AI Spend by Tool & Sanction Status   │
│ (Grouped Bullet Bar + Forecast)       │  │ (Ranked Horizontal Bar with Badges)  │
│                                       │  │                                      │
│ "Who is burning budget?"              │  │ "Where is the money going?"          │
└───────────────────────────────────────┘  └──────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────────────────────┐
│ CHART 2: Adoption Velocity & Risk Trajectory                                    │
│ 12-Week AI Adoption Trend: Sanctioned vs. Shadow AI Unique Active Users         │
│ (Stacked Area Curve + Policy Milestones)                                        │
│                                                                                 │
│ "Are we winning or losing the governance race over time?"                       │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 3. Critical Technical Realities & Verified Dead Ends
* **Midjourney:** Has **zero public REST API**. Tracked strictly via Ramp corporate card spend and browser extension hits.
* **Anthropic Chat Plans:** Admin Analytics API covers platform API tokens only; Claude.ai chat seats have zero programmatic API.
* **Microsoft 365 Copilot:** Graph API deliberately excludes invoice dollar amounts (reports binary activity and abstract Copilot Credits).
* **Cost Discrepancy:** Multiplying public token rates by token volume errors by 10%–20% due to prompt caching and batch discounts. Always ingest official `/costs` endpoints for financial ledgers.
* **Identity Resolution:** Email is the canonical master key mapping `tool_user_id -> email -> Okta/Entra ID -> department & cost center`.

---

*Authored for the CloudEagle.ai APM evaluation by an Enterprise AI Governance & FinOps Product Specialist.*
