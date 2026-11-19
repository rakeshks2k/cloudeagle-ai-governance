# CloudEagle AI Governance Dashboard: Feature Strategy & Technical Plan
**Author:** Rakesh  
**Role:** Product Management  
**Product:** CloudEagle.ai AI Governance Platform  

---

## 1. The Core Problem: How I Think About This

Every modern organization is dealing with the exact same headache right now. 

Employees love AI tools. Software engineers are using GitHub Copilot and Cursor to ship code faster. Marketers are generating assets with Midjourney and ChatGPT. Sales reps are summarizing calls with Claude. 

That sounds great on paper, until two executives hit a wall:
- **The CFO** looks at corporate credit card statements and sees hundreds of recurring $20 to $200 monthly charges to "OpenAI", "Anthropic", and "Midjourney". Costs are exploding with zero centralized budget controls.
- **The CISO (Head of Security)** is worried about data leaks: Did an employee just paste confidential customer records, API keys, or unreleased product roadmap notes into a consumer chatbot that retains data to train its models?

This is the **Shadow AI problem**—it's simultaneously a runaway financial risk and an enterprise compliance crisis.

When scoping this feature, I deliberately avoided building a 50-tab analytics graveyard that only a data scientist could decipher. My philosophy is to build a **10-second command center** that lets an executive (like a CFO or Head of IT) open the screen and immediately answer three core questions:
1. **Are we over or under our AI budget, and which department is driving the overage?**
2. **What rogue tools are employees using behind IT's back, and how much is it costing us?**
3. **Are employees actually using the expensive enterprise licenses we procured, or are we paying for shelfware?**

Here is my technical plan for sourcing the data (Part 2) and the three charts I chose to communicate these insights (Part 3).

---

## 2. Part 2 : API & Data Source Plan
### Where the Data Actually Lives & How I'd Source It

If you ask someone who hasn't built SaaS governance before, they'll usually say: *"Just call the OpenAI API, call the Claude API, and put the numbers in a database."*

In the real world, that only captures about 25% of an organization's AI footprint. 

AI spend is scattered across four completely different places: official developer contracts, enterprise cloud suites, personal corporate cards, and daily browser clicks. To build a reliable dashboard, I structured our ingestion into four distinct data buckets:

---

### The 4 Data Ingestion Buckets

#### Bucket 1: Direct AI Provider APIs (Official Developer & Team Accounts)
These are the official, company-managed vendor accounts:
* **OpenAI Admin API (`/v1/organization/costs` & `/usage`):**
  * *What I pull:* Exact invoiced dollar costs, prompt/completion token volumes, and project-level breakdowns.
  * *The technical nuance:* OpenAI returns project IDs, not human employee names. If developers don't tag API calls with user IDs, I map the Project Owner back to their department through our Okta integration.
* **Anthropic Claude Analytics API (`/v1/organizations/analytics/cost`):**
  * *What I pull:* Hourly cost and token rollups by workspace and model family (Sonnet, Opus, Haiku).
  * *The technical nuance:* Anthropic enforces strict rate limits that return `HTTP 429` when hit. I set up automated alerts at 80% and 95% capacity so developer pipelines don't abruptly stop.
* **Cursor Enterprise API (`/teams/spend` & `/filtered-usage-events`):**
  * *What I pull:* Dollar spend per developer, lines of code accepted, and active composer usage.
* **GitHub Copilot REST API (`/orgs/{org}/copilot/billing/seats`):**
  * *What I pull:* A roster of every assigned license and their last-active timestamp.
  * *The technical nuance:* GitHub permanently deletes user-level activity older than 90 days. I built our daily ingestion worker to snapshot these records into CloudEagle's warehouse so we maintain multi-year historical trend data.

#### Bucket 2: Cloud Platforms & Enterprise Suites
A large chunk of enterprise AI spend is bundled into existing cloud agreements:
* **Google Cloud Vertex AI (BigQuery Billing Export):**
  * Google doesn't offer a simple single-endpoint "Gemini API bill". Instead, GCP exports raw billing rows to BigQuery daily. I query this dataset for `service.description LIKE '%Vertex AI%'` to capture model consumption costs by project.
* **Microsoft 365 Copilot (Microsoft Graph API):**
  * I query `getMicrosoft365CopilotUsageUserDetail` to verify which employees are actively using Copilot across Word, Excel, Teams, and PowerPoint.
  * *The technical nuance:* Microsoft's API **does not return dollar amounts**. It only provides activity timestamps. I calculate real cost by multiplying verified active seats by the company's contracted rate card ($30/user/month).

#### Bucket 3: Core Identity & HR Systems (The Ground Truth)
Raw AI logs without employee context are just meaningless IP addresses and random tokens:
* **Okta / Microsoft Entra ID:** Provides the canonical employee directory, department mappings (Engineering, Legal, Sales), cost centers (`CC-4010`), and manager hierarchies.
* **HRIS (Workday / BambooHR):** Provides department headcount. This is how I calculate the true **Adoption Rate %** (e.g., 388 active users out of 420 engineers = 92% adoption).

#### Bucket 4: The Shadow AI Detectors (Corporate Expense Cards & Browser Extension)
This is how we catch tools that nobody told IT about:
* **Corporate Expense Feeds (Ramp / Brex APIs):**
  * When an employee puts a $20/month ChatGPT Plus or $10/month Midjourney subscription on their corporate card, Ramp's webhook alerts CloudEagle within 15 minutes of the swipe.
* **CloudEagle Browser Extension (Chrome / Edge):**
  * Deployed across company laptops via Google Workspace or Microsoft Intune.
  * It detects visits to 500+ known generative AI domains (even if an employee uses a personal Google login).
  * It performs client-side scanning to catch sensitive data (API keys, customer emails) before the prompt is submitted, blocking leaks before they happen.

---

### Real-World Gotchas: Assumptions That Break in Production

A good PM doesn't just list APIs; they anticipate the edge cases. Here are the five biggest gotchas I accounted for:

| Common Assumption | Real-World Reality | My Product Solution |
| :--- | :--- | :--- |
| **"Just connect to Midjourney's API"** | **Midjourney has no public API.** They operate strictly through Discord bots and web browsers. | Don't waste engineering time looking for an API. I track Midjourney strictly through **Ramp card charges** and **Browser Extension domain visits**. |
| **"Multiply raw tokens by public prices to get cost"** | **This is wrong by 15% to 25%.** Prompt caching discounts (up to 75% on Claude/OpenAI) and custom enterprise tiers mean token multiplication doesn't match the final invoice. | I use token counts strictly to show *activity volume*; I pull actual dollars from official `/costs` billing endpoints and accounting invoices for budget limits. |
| **"Claude.ai chat has an admin API"** | Anthropic's API only covers developer tokens (`api.anthropic.com`). **Claude Team chat subscriptions (`claude.ai`) have no usage API.** | I treat Claude.ai chat as a standard seat-based SaaS app via Okta SSO logins and card receipts. |
| **"Stream everything in real time"** | Streaming every token event in real time costs a fortune in cloud infrastructure for zero business benefit. | **CFO numbers only need daily updates** (bills don't change every second). I reserve real-time streaming exclusively for **Security DLP alerts** (blocking prompt leaks). |
| **"Every employee will be perfectly matched"** | In practice, 5% to 10% of cloud spend belongs to orphaned developer keys or shared accounts. | Never hide unattributed spend. I display an **"Attribution Coverage" score (e.g., 94.2%)** and give admins a clean UI to assign unmatched projects to a department. |

---

## 3. Part 3 : Pick Your Three Charts
### If I Could Only Show Three Charts, Which Three and Why?

One of the most common pitfalls in product design is creating a "dashboard junkyard"—cramming 15 different pie charts, heatmaps, and vanity metrics onto one screen. When an executive sees that much visual noise, they get overwhelmed, close the tab, and go back to requesting manual spreadsheets.

To pick the **only three charts**, I applied a strict constraint:  
**Every chart must directly drive a concrete, high-value business decision.**

Here are the three charts I selected:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        THE THREE EXECUTIVE DECISION SURFACES                           │
├────────────────────────────────┬───────────────────────────────────────────────────────┤
│ Chart 1: Department Spend vs.  │ FINANCIAL CONTROL: Tells the CFO exactly which team   │
│ Budget Limit (Horizontal Bar)  │ is over budget and who has spare cash to reallocate.  │
├────────────────────────────────┼───────────────────────────────────────────────────────┤
│ Chart 2: AI Spend by Tool &    │ VENDOR & RISK: Ranks where the money goes, catches    │
│ Sanction Status (Ranked Bar)   │ expensive rogue apps, and finds unused shelfware.     │
├────────────────────────────────┼───────────────────────────────────────────────────────┤
│ Chart 3: 12-Week Adoption Trend│ STRATEGIC TRAJECTORY: Shows whether company adoption   │
│ (Approved vs. Unapproved Area) │ is growing and proves if security policies work.      │
└────────────────────────────────┴───────────────────────────────────────────────────────┘
```

---

### Chart 1: Department Spend vs. Budget Limit
* **Format:** Horizontal comparison bar chart with spending caps and month-end run-rate projections.
* **Primary Persona:** Chief Financial Officer (CFO), VP Finance, Department Heads.

```
Engineering & R&D           ████████████████████████░░░░  $68,200 / $72,000   95%
Legal, Privacy & Compliance ████████████████████████████  $13,400 / $12,000  112% [BREACH]
Sales & Customer Success    ████████████████████░░░░░░░░  $24,600 / $30,000   82%
Marketing & Growth          ████████████████░░░░░░░░░░░░  $19,200 / $30,000   64%
Product & Design            ██████████░░░░░░░░░░░░░░░░░░   $9,800 / $25,000   39%
Finance & FP&A              ██████░░░░░░░░░░░░░░░░░░░░░░   $4,600 / $20,000   23%
```

#### 1. The Core Question It Answers
> *"Are we on track to stay within our quarterly AI budget, which department is burning through cash too fast, and by how much?"*

#### 2. Why I Chose This Over Alternatives
* **Why NOT a Pie Chart or Donut Chart?**  
  A pie chart shows proportional share (e.g., *"Engineering is 48% of total AI spend"*). That sounds interesting, but it is **completely useless for budget control**. If Engineering is 48% of spend but had a large budget and is only at 50% utilization, they are completely safe. Meanwhile, Legal might only be 5% of company spend, but they are at 112% of their limit and bleeding unbudgeted costs. A pie chart hides the crisis; a horizontal comparison bar makes the breach obvious in 200 milliseconds.
* **Why NOT a Raw Table?**  
  Tables force executives to calculate mental ratios. A bar chart communicates threshold proximity instantly.

#### 3. Real Decisions This Chart Drives
* **Call Out Breaches Immediately:** Legal is at 112% ($1,400 over budget). Clicking the bar opens a drawer showing that 14 team members are expensing personal ChatGPT Plus accounts.
* **Frictionless Budget Reallocation:** Instead of the CFO going to the Board to ask for more money, they see Finance is only using 23% ($4,600 of $20,000). They can shift $8,000 from Finance to Engineering without increasing overall company burn.

---

### Chart 2: AI Spend by Tool & Sanction Status
* **Format:** Ranked horizontal list with spend amounts, cost per user, unused license counts, and `Shadow AI` tags.
* **Primary Persona:** Head of IT Procurement, FinOps Analyst, CFO.

```
GitHub Copilot Enterprise   ████████████████████████████  $48,200  ($154/mo)  • 106 unused
Cursor Enterprise           █████████████████████░░░░░░░  $38,400  ($265/mo)  • 15 unused
Claude Platform (API)       ████████████████░░░░░░░░░░░░  $29,100  ($327/mo)
ChatGPT Plus (Personal)     ████████░░░░░░░░░░░░░░░░░░░░  $14,200  ($212/mo)  [Shadow AI]
Midjourney (Discord)        ████░░░░░░░░░░░░░░░░░░░░░░░░   $8,100  ($261/mo)  [Shadow AI]
Google Vertex AI (Gemini)   ██░░░░░░░░░░░░░░░░░░░░░░░░░░   $4,800  ($114/mo)
```

#### 1. The Core Question It Answers
> *"Which specific AI software costs us the most money, are we paying for licenses nobody is using, and are unapproved apps secretly eating our budget?"*

#### 2. Why I Chose This Over Alternatives
* **Why NOT a Treemap (Boxes inside boxes)?**  
  Treemaps look fancy, but human brains are bad at comparing the areas of rectangles. Is that GitHub Copilot box 20% bigger or 35% bigger than Cursor? A ranked bar chart arranges values along a single, shared baseline, making cost comparisons effortless.
* **Why NOT a Department-by-Tool Stacked Matrix?**  
  Stacking 7 departments inside 18 tools creates a visual kaleidoscope of 120 colored slivers. It looks like visual confetti and answers zero questions cleanly.

#### 3. Real Decisions This Chart Drives
* **Harvesting Shelfware (Instant ROI):** It immediately highlights that GitHub Copilot has **106 unused licenses** (seats paid for with zero activity in 60 days). Reclaiming those licenses saves **$4,134/month ($49,600/year)** with one click.
* **Consolidating Shadow AI into Enterprise Discounts:** ChatGPT Plus ranks at #4 ($14,200/month across 67 separate employee expense cards). That tells procurement: *"Our employees clearly love ChatGPT. Let's stop reimbursing 67 individual $20 credit card bills, negotiate an enterprise contract with OpenAI for a 25% volume discount, and enforce enterprise data protection."*

---

### Chart 3: 12-Week Adoption Trend (Approved vs. Unapproved Tools)
* **Format:** Time-series stacked area curve showing weekly active users over 3 months, with milestone flags for company policies.
* **Primary Persona:** Chief Information Security Officer (CISO), CIO, Head of AI Strategy.

```
Users
 900 ┤                                                ░░░░░░░░░░░░░  (127 Unapproved Users)
 750 ┤                                 ████████████████████████████  (720 Approved Users)
 600 ┤                   ███████████████
 450 ┤      ██████████████
 300 ┤███████
     └──────┬──────────────┬──────────────┬──────────────┬──────────────► Weeks
           W1             W4             W8            W12
                         ⚑ Oct 1: Copilot Rollout      ⚑ Nov 1: Browser Protection Active
```

#### 1. The Core Question It Answers
> *"Are employees actually adopting our official AI tools over time, and are our security policies successfully shrinking rogue unapproved tool usage?"*

#### 2. Why I Chose This Over Alternatives
* **Why NOT a Static Donut Snapshot (e.g. 85% Approved vs. 15% Shadow)?**  
  A single snapshot tells you where you are today, but gives zero clue whether you are winning or losing. If you see 127 employees on unapproved tools today:
  - If that number was 10 three weeks ago, you have a rapid security outbreak.
  - If that number was 500 two months ago and dropped to 127 after rolling out browser protection, **your strategy is working**. Velocity and trajectory dictate executive action.
* **Why NOT Count Total Tools Instead of Total Users?**  
  Counting tools is misleading. If 2 employees test a niche image tool, risk is minimal. If 400 employees paste company spreadsheets into personal ChatGPT, it's a massive compliance breach. Measuring **active human users** tracks real organizational blast radius.

#### 3. Real Decisions This Chart Drives
* **Proves Governance ROI to the Board:** Demonstrates that rolling out browser security policies in November successfully dropped rogue AI usage from 44% down to 14% without hurting employee productivity.
* **Identifies Adoption Plateaus:** If approved tool adoption flattens out, IT knows which teams need enablement workshops to extract value from the software.

---

## 4. The Decision Coverage Matrix: How 3 Charts Answer 100% of Questions

To prove that this isn't an arbitrary selection, here is how these exact three charts cover every key business decision an executive has to make:

| Executive Decision to Make | Chart 1: Dept vs. Budget | Chart 2: Tool Spend & Status | Chart 3: 12-Week Trend |
| :--- | :---: | :---: | :---: |
| **1. Stop a Budget Overrun** | 🟢 **Primary Driver** *(Flags Legal at 112%)* | 🟡 Secondary *(Identifies the tool)* | ⚪ Not needed |
| **2. Catch Rogue Unapproved AI** | ⚪ Not needed | 🟢 **Primary Driver** *(Spots $14.2k on ChatGPT)* | 🟢 **Primary Driver** *(Tracks 127 rogue users)* |
| **3. Cut Software Waste (Shelfware)** | ⚪ Not needed | 🟢 **Primary Driver** *(Spots 106 unused seats)* | 🟡 Secondary |
| **4. Reallocate Budget Between Teams** | 🟢 **Primary Driver** *(Shifts $8k from Finance)* | ⚪ Not needed | ⚪ Not needed |
| **5. Validate Security Policy Success**| ⚪ Not needed | 🟡 Secondary | 🟢 **Primary Driver** *(Shows 44% → 14% drop)* |

**Zero Fluff:** Every single chart owns at least two critical business decisions. If you remove any one of these three charts, you create an executive blind spot. If you add a fourth chart, you add noise.

---

## 5. Summary: How I Explain This in 60 Seconds

> *"Here’s the game plan: We don’t just pull from OpenAI’s API and call it a day. We connect the company’s direct vendor bills, corporate card expense feeds (Ramp), employee rosters (Okta), and a lightweight browser extension to catch what people are doing behind IT's back.*
>
> *Then, we give the executive exactly three views:*
> 1. *A horizontal budget bar to show **which department is overspending** and who has spare money.*
> 2. *A ranked tool leaderboard to show **which apps cost the most**, catch rogue $20/month card charges, and reclaim unused accounts.*
> 3. *A 12-week trendline to prove to the board that **safe enterprise adoption is growing** while risky shadow AI is shrinking.*
>
> *No dense jargon, no 15-tab reports. Just three clean surfaces that let an executive spot a problem in 10 seconds and fix it in one click."*
