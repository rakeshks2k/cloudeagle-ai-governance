# CloudEagle.ai - AI Governance Platform and Spend Limits Dashboard
## Enterprise AI Cost Allocation, Risk Governance, and Spend Limits Engine

- Live Interactive Application: https://cloudeagle-ai-governance-theta.vercel.app
- GitHub Repository: https://github.com/rakeshks2k/cloudeagle-ai-governance

This repository contains the complete product strategy, technical API architecture, and interactive prototype for CloudEagle.ai Enterprise AI Governance.

---

## Documentation Deliverables Overview

| Document / Asset | File Path | Description |
|---|---|---|
| Master Product Strategy Spec | [PRODUCT_SPECIFICATION.md](./PRODUCT_SPECIFICATION.md) | Complete specification document covering Executive Framing, UI Scoping, API Feasibility, and Decision Rationale. |
| Part 1: Prototype UX Spec | [PART1_PROTOTYPE_SPEC.md](./PART1_PROTOTYPE_SPEC.md) | Detailed UX architecture, wireframe, micro-interactions, accessibility standards, and drawer state designs. |
| Part 2: API & Data Source Plan | [PART2_API_DATA_PLAN.md](./PART2_API_DATA_PLAN.md) | Technical feasibility report across 15+ data sources, exact API endpoints, query params, update frequencies, identity resolution engine, and 5 verified dead ends. |
| Part 3: Pick Your Three Charts | [PART3_THREE_CHARTS.md](./PART3_THREE_CHARTS.md) | Strategy justification for the Three Charts: Grouped Bullet Bar, 12-Week Stacked Area, and Ranked Horizontal Bar with Badges, evaluating rejected alternatives and decisions enabled. |
| Interactive Prototype Source | `src/` | Production-grade React 19 + Tailwind CSS interactive dashboard with scenario switcher, PM annotation mode, and slide-over drawers. |

---

## Running the Interactive Prototype Locally

The prototype runs locally on Node.js v18+ using Vite:

```bash
# 1. Install dependencies
npm install

# 2. Start the local Vite development server
npm run dev
```

Open your browser to:
`http://localhost:5173`

### Key Interactive Features to Explore in the Prototype:
1. PM Annotations Mode:
   - Click the "PM Annotations: ON/OFF" toggle in the header.
   - Click any purple "PM Rationale" badge on the screen to view the product strategy, metric calculation, and rejected alternatives for that exact component.
2. Scenario Switcher (Top Right):
   - Switch between "Standard Q4 Baseline", "Critical Budget Breach", and "Partial Integration / Lag" to test graceful UI degradation and emergency alert states.
3. Drill-Down Slide-Over Drawers:
   - Click any department bar in Chart 1 (e.g., Engineering or Legal) to open the Squad Breakdown, employee token spend, and Slack justification levers.
   - Click any tool bar in Chart 3 (e.g., ChatGPT Plus or GitHub Copilot) to inspect the NIST AI RMF security score, consumer training retention status, and one-click sanctioning/harvesting levers.
4. Interactive 12-Week Adoption Trend (Chart 2):
   - Hover across the weekly timeline to view the changing ratio of Sanctioned vs. Shadow active users and inspect policy intervention milestones (e.g., Oct 1 Copilot Rollout, Nov 1 Browser DLP Policy).
5. Telemetry Health and Attribution Modal:
   - Click the green "Telemetry: Synced 28m ago | Coverage: 94.2%" pill in the filter bar to view the API pipeline status across OpenAI, Anthropic, Cursor, GitHub Copilot, M365, and Ramp.

---

## Executive Summary of Product Thinking

### 1. Primary Persona: The CFO / VP Finance
- Why not equal personas: Designing for two equal personas produces a compromised, cluttered screen. The spend-limits challenge is fundamentally a financial accountability and capital allocation problem.
- The CFO has budget authority to reallocate funds or demand cost-center justification; IT/Security leaders lack budget authority. The CISO is served as a secondary persona through the Shadow AI and DLP alert vectors.

### 2. The Three Selected Charts (100% Decision Coverage)

- Chart 1: Financial Control - Department AI Spend vs. Budget Limit (Grouped Bullet Bar + Forecast) - "Who is burning budget?"
- Chart 2: Adoption Velocity & Risk Trajectory - 12-Week AI Adoption Trend: Sanctioned vs. Shadow AI Unique Active Users (Stacked Area Curve + Policy Milestones) - "Are we winning or losing the governance race over time?"
- Chart 3: Vendor & Risk Governance - AI Spend by Tool & Sanction Status (Ranked Horizontal Bar with Badges) - "Where is the money going?"

### 3. Critical Technical Realities and Verified Dead Ends
- Midjourney: Has zero public REST API. Tracked strictly via Ramp corporate card spend and browser extension hits.
- Anthropic Chat Plans: Admin Analytics API covers platform API tokens only; Claude.ai chat seats have zero programmatic API.
- Microsoft 365 Copilot: Graph API deliberately excludes invoice dollar amounts (reports binary activity and abstract Copilot Credits).
- Cost Discrepancy: Multiplying public token rates by token volume errors by 10% to 20% due to prompt caching and batch discounts. Ingest official costs endpoints for financial ledgers.
- Identity Resolution: Email is the canonical master key mapping tool_user_id -> email -> Okta/Entra ID -> department & cost center.

---

Authored for CloudEagle.ai by an Enterprise AI Governance & FinOps Product Specialist.
