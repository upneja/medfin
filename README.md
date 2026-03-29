# MedFin

A personal finance platform built for medical residents — covering student loan strategy, budgeting, housing analysis, insurance gaps, career projections, and milestone planning. No affiliate links, no sales pitches, no generic spreadsheets.

**Live demo:** [medfin.vercel.app](https://medfin.vercel.app)

---

## What it is

Medical residents face a uniquely brutal financial situation: $200K+ in student debt, a salary of ~$75K, and zero time to figure any of it out. MedFin gives residents a personalized financial roadmap based on their specific program, specialty, loan profile, and career goals.

A 6-step onboarding wizard captures the user's situation, then generates:

- A **loan repayment analysis** — PSLF vs. aggressive payoff vs. standard 10-year, with exact total cost comparisons
- A **budget breakdown** — take-home pay, taxes, rent, loan payments, and monthly surplus
- A **net worth projection** — 30-year trajectory from PGY-1 through attending
- A **housing guide** — NYC neighborhood data with transit times and rent-to-income ratios
- An **insurance gap report** — disability, life, and umbrella coverage analysis
- A **career & fellowship ROI tool** — salary comparisons across academic vs. private practice vs. hospital-employed, with fellowship impact
- A **milestone timeline** — specialty-specific financial and exam deadlines across residency
- **Resident guides** — long-form content covering the 2026 student loan landscape, RAP, and PSLF strategy

---

## Features

| Feature | Description |
|---|---|
| Onboarding wizard | 6-step form capturing loans, housing, insurance, goals |
| Loan scenario engine | PSLF, aggressive payoff, and standard repayment compared side-by-side |
| IDR calculator | SAVE/RAP/PAYE payment estimates based on actual AGI |
| Budget builder | City-aware budget with tax breakdown and monthly surplus |
| Net worth projection | 30-year chart from residency through attending years |
| Housing analyzer | NYC neighborhood guide with transit and rent data |
| Insurance advisor | Gap analysis with severity ratings and carrier recommendations |
| Career projections | Specialty salary ranges + fellowship ROI by setting |
| Milestone timeline | PGY-by-PGY financial, exam, and career checkpoints |
| Resident guides | Long-form updated content on loans, budgeting, and planning |
| Profile persistence | State saved in localStorage — no auth required |

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Charts | Recharts |
| Forms | React Hook Form + Zod |
| Testing | Vitest + Testing Library |
| Deployment | Vercel |
| State | React Context + localStorage |

No database, no auth, no API keys required. The entire calculation layer runs client-side.

---

## Project structure

```
src/
  app/
    page.tsx              # Landing page
    onboarding/           # 6-step onboarding wizard
    dashboard/            # Personalized financial overview
    loans/                # Loan strategy engine
    budget/               # Budget builder
    housing/              # NYC neighborhood housing guide
    insurance/            # Insurance gap advisor
    career/               # Salary & fellowship projections
    timeline/             # Milestone timeline
    guides/               # Long-form resident guides
  components/
    layout/               # DashboardLayout, Navigation
  lib/
    calculations/         # idr.ts, pslf.ts, taxes.ts, budget.ts, networth.ts
    data/                 # programs, specialties, housing, milestones, guides
    types.ts              # Full TypeScript type definitions
    utils.ts
  hooks/
    useUserProfile.tsx    # Context provider for user state
docs/
  PRD.md                  # Product requirements
  BRD.md                  # Business requirements
  WRITING_STYLE_GUIDE.md  # Content style guide
research/                 # Domain research notes on loans, housing, competitive landscape
tests/                    # Vitest unit tests for calculation modules
```

---

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). No environment variables needed.

```bash
npm run build     # production build
npm test          # run Vitest tests
npm run lint      # ESLint
```

---

## Calculation modules

The finance logic lives in `src/lib/calculations/` and is fully unit-tested:

- **`idr.ts`** — IDR payment calculation (SAVE/RAP/PAYE/IBR) based on AGI and family size
- **`pslf.ts`** — PSLF scenario modeling with 120-payment tracking
- **`taxes.ts`** — Federal + state + FICA estimation for NYC-based residents
- **`budget.ts`** — Monthly budget breakdown with category analysis
- **`networth.ts`** — 30-year net worth projection across career scenarios
- **`housing.ts`** — Rent-to-income ratio and neighborhood affordability scoring

---

## Data

`src/lib/data/` contains curated structured data:

- **`programs.ts`** — Residency program salaries, benefits, PSLF eligibility
- **`specialties.ts`** — Specialty salary ranges and fellowship information
- **`housing.ts`** — NYC neighborhood rent data and transit times
- **`milestones.ts`** — Specialty-specific financial/exam/career milestones
- **`guides.ts`** — Long-form resident guide content

---

## Disclaimer

MedFin is for educational and informational purposes only. Nothing here constitutes financial, tax, or legal advice. Consult a licensed financial advisor and a tax professional for your specific situation.
