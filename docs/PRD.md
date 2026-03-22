# MedFin — Product Requirements Document
## Technical Specification & Architecture

---

## 1. Technology Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Framework** | Next.js 14 (App Router) | SSR for SEO, API routes for backend, Vercel deployment |
| **Language** | TypeScript | Type safety across full stack |
| **Styling** | Tailwind CSS + shadcn/ui | Rapid, polished UI with accessible components |
| **Database** | SQLite via Prisma (V1) | Zero-config, file-based, perfect for prototype. Migrate to PostgreSQL for production. |
| **Auth** | NextAuth.js | Simple email/OAuth, session management |
| **Charts** | Recharts | React-native charting for financial visualizations |
| **Deployment** | Vercel | Zero-config Next.js deployment, instant preview URLs |
| **State** | React Context + URL state | Simple, no Redux overhead for V1 |
| **Forms** | React Hook Form + Zod | Validation for onboarding flow |

---

## 2. Project Structure

```
medfin/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with providers
│   │   ├── page.tsx                # Landing page
│   │   ├── onboarding/
│   │   │   └── page.tsx            # 6-step onboarding wizard
│   │   ├── dashboard/
│   │   │   └── page.tsx            # Personalized dashboard
│   │   ├── loans/
│   │   │   └── page.tsx            # Loan strategy engine
│   │   ├── budget/
│   │   │   └── page.tsx            # Budget builder
│   │   ├── housing/
│   │   │   └── page.tsx            # Housing analyzer
│   │   ├── timeline/
│   │   │   └── page.tsx            # Milestone timeline
│   │   ├── insurance/
│   │   │   └── page.tsx            # Insurance advisor
│   │   ├── career/
│   │   │   └── page.tsx            # Career & salary projections
│   │   └── api/
│   │       ├── user/
│   │       │   └── route.ts        # User profile CRUD
│   │       └── calculations/
│   │           └── route.ts        # Financial calculation endpoints
│   ├── components/
│   │   ├── ui/                     # shadcn/ui components
│   │   ├── onboarding/             # Step-by-step form components
│   │   ├── dashboard/              # Dashboard widgets
│   │   ├── charts/                 # Financial visualization components
│   │   └── layout/                 # Header, sidebar, navigation
│   ├── lib/
│   │   ├── calculations/
│   │   │   ├── idr.ts              # IDR payment calculator
│   │   │   ├── pslf.ts             # PSLF scenario modeler
│   │   │   ├── budget.ts           # Budget calculations
│   │   │   ├── taxes.ts            # Tax estimation engine
│   │   │   ├── insurance.ts        # Insurance gap analysis
│   │   │   ├── networth.ts         # Net worth projections
│   │   │   └── housing.ts          # Housing affordability
│   │   ├── data/
│   │   │   ├── programs.ts         # Residency program data (salary, benefits, PSLF)
│   │   │   ├── specialties.ts      # Specialty salary projections
│   │   │   ├── housing.ts          # Neighborhood rent data
│   │   │   ├── milestones.ts       # Specialty-specific milestones
│   │   │   └── insurance.ts        # Insurance carrier data
│   │   ├── schemas.ts              # Zod validation schemas
│   │   └── utils.ts                # Shared utilities
│   ├── hooks/
│   │   └── useUserProfile.ts       # User profile state management
│   └── types/
│       └── index.ts                # TypeScript type definitions
├── prisma/
│   └── schema.prisma               # Database schema
├── public/
├── tests/
│   ├── calculations/               # Unit tests for financial engines
│   ├── cuj/                        # Critical user journey tests
│   └── components/                 # Component tests
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

---

## 3. Data Model (Prisma Schema)

```prisma
model User {
  id              String   @id @default(cuid())
  email           String   @unique
  name            String?
  birthYear       Int?
  maritalStatus   String?  // single, partnered, married, divorced
  dependents      Int      @default(0)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  training        Training?
  finances        Finances?
  housing         Housing?
  insurance       Insurance?
  goals           Goals?
  onboardingStep  Int      @default(0)
}

model Training {
  id              String   @id @default(cuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id])
  medicalSchool   String?
  program         String?  // Institution name
  specialty       String?
  pgyLevel        Int      @default(1)
  categorical     Boolean  @default(true)
  fellowshipInterest String? // none, maybe, specific fellowship name
  salary          Int?     // Auto-populated from program data
  pslfEligible    Boolean? // Auto-populated from 501(c)(3) lookup
  trainingYears   Int?     // Auto-populated from specialty
}

model Finances {
  id              String   @id @default(cuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id])
  totalDebt       Float?
  federalDirect   Float?
  gradPlus        Float?
  privateLoan     Float?
  undergradDebt   Float?
  avgInterestRate Float?
  loanServicer    String?
  loanStatus      String?  // grace, deferment, idr, forbearance
  consolidated    Boolean  @default(false)
  filingStatus    String?  // single, mfj, mfs
  spouseIncome    Float?
  savings         Float?
  creditScore     String?
  retirementBalance Float?
  otherDebts      Float?
}

model Housing {
  id              String   @id @default(cuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id])
  situation       String?  // solo, roommate, partner, family
  rentBudget      Float?
  hasCar          Boolean  @default(false)
  carPayment      Float?
  multiSite       Boolean  @default(false)
}

model Insurance {
  id              String   @id @default(cuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id])
  hasDisability   String?  // program, personal, none, unsure
  hasLife         String?  // program, personal, none
  healthPlan      String?  // program, spouse, other
}

model Goals {
  id              String   @id @default(cuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id])
  careerVision    String?  // academic, private, hospital, locums
  geoPreference   String?
  topConcerns     String?  // JSON array of top 3
  financialStyle  String?  // aggressive, balanced, minimal, guided
  riskTolerance   String?  // aggressive, moderate, conservative
}
```

---

## 4. Key Calculation Engines

### 4.1 IDR Payment Calculator
```
Input: AGI, familySize, plan (IBR/PAYE/RAP)
Formula (PAYE/IBR): ((AGI - 150% × povertyLine[familySize]) × 0.10) / 12
Formula (RAP): percentage(1-10%) × AGI - ($50 × dependents)
Output: monthlyPayment, annualPayment
```

### 4.2 PSLF Scenario Engine
```
Input: totalDebt, interestRate, trainingYears, fellowshipYears, postTrainingYears,
       employerType (nonprofit/forprofit), attendingSalary
Output: {
  pslf: { totalPaid, amountForgiven, yearsToForgiveness },
  refinance: { totalPaid, monthlyPayment, yearsToPayoff },
  standardIDR: { totalPaid, taxableForgiveness, yearsToForgiveness }
}
```

### 4.3 Tax Estimation Engine
```
Input: grossIncome, state, city, filingStatus, dependents, retirementContributions
Output: { federal, state, city, fica, totalTax, effectiveRate, takeHome }
```

### 4.4 Net Worth Projector
```
Input: currentAssets, currentDebts, annualIncome (array over years),
       savingsRate, investmentReturn, loanPayments
Output: yearByYear { netWorth, totalAssets, totalDebts }
```

---

## 5. Static Data Requirements

### Program Data (V1 — hardcoded for NYU, extensible)
```typescript
{
  "nyu-langone-brooklyn-anesthesiology": {
    name: "NYU Langone Brooklyn — Anesthesiology",
    salary: { pgy1: 75000, pgy2: 77000, pgy3: 79000, pgy4: 82000 },
    pslfEligible: true,
    taxState: "NY",
    taxCity: "NYC",
    benefits: {
      healthInsurance: "UnitedHealthcare, subsidized",
      dentalVision: "Included",
      lifeInsurance: "1.5x salary, max $125K",
      groupLTD: "60% of salary, not own-occ",
      retirement: "403(b) via TIAA, no match",
      vacation: "4 weeks + 7 holidays + 2 wellness days",
      meals: "Free breakfast/lunch Mon-Fri",
      bookAllowance: 750,
      boardExamReimbursement: 1500
    },
    rotationSites: ["NYU Langone Brooklyn", "Tisch/Kimmel", "Bellevue", "VA Manhattan"],
    trainingYears: 4,
    milestones: [...] // specialty-specific
  }
}
```

### Specialty Salary Data
```typescript
{
  "anesthesiology": {
    residencyYears: 4,
    attendingSalary: { academic: 450000, private: 600000, hospital: 525000 },
    fellowships: {
      "cardiac": { years: 1, salaryImpact: 60000 },
      "pain": { years: 1, salaryImpact: 15000 },
      "critical-care": { years: 1, salaryImpact: 25000 },
      "regional": { years: 1, salaryImpact: 30000 },
      "pediatric": { years: 1, salaryImpact: 10000 }
    }
  },
  // ... other specialties
}
```

### Housing Data
```typescript
{
  "nyc": {
    neighborhoods: {
      "sunset-park": { median1BR: 1800, medianStudio: 1400, transitToNYUBrooklyn: "5 min walk", transitToManhattan: "50 min N/R" },
      "bay-ridge": { median1BR: 2100, medianStudio: 1600, transitToNYUBrooklyn: "15 min bus", transitToManhattan: "55 min R" },
      "kips-bay": { median1BR: 4300, medianStudio: 3200, transitToNYUBrooklyn: "50 min N/R", transitToManhattan: "5 min walk" }
    }
  }
}
```

---

## 6. Page Specifications

### Landing Page
- Hero: "Your financial co-pilot for residency"
- Value props: personalized plan, loan strategy, budget builder, career projections
- CTA: "Get Started — It's Free"
- Social proof: stats (140K residents, $200K avg debt, 75% financially stressed)

### Onboarding (6-step wizard)
- Progress bar at top
- One screen per step, mobile-optimized
- Smart defaults with "I don't know" fallbacks
- Auto-save after each step
- "Show me what this unlocks" preview at each step

### Dashboard
- Grid layout with cards:
  - Monthly snapshot (income vs expenses pie chart)
  - Loan strategy summary (PSLF/refinance recommendation)
  - Next 3 action items (with deadlines)
  - Net worth trend (line chart)
  - Upcoming milestones (timeline)
  - Quick links to all tools

### Loan Strategy Page
- 3-column comparison: PSLF vs Refinance vs Standard IDR
- Key numbers highlighted: total paid, amount forgiven, monthly payment
- Interactive: adjust fellowship plans, career type → numbers update
- Action items with direct links (PSLF ECF form, servicer portal)

### Budget Builder
- Pre-filled categories with location-specific estimates
- Editable sliders for each category
- Real-time income vs expenses bar chart
- Surplus allocation recommendation (WCI waterfall)
- Color-coded: green (healthy), yellow (tight), red (over-budget)

### Housing Analyzer
- Map view with neighborhoods highlighted
- Side-by-side comparison cards
- Rent-to-income gauge
- Commute time display
- Annual cost comparison table

### Timeline
- Vertical timeline with specialty-specific milestones
- Financial action items interleaved
- Current position highlighted
- Expandable details for each milestone

### Insurance Advisor
- Gap analysis table (have vs. need)
- Cost estimates
- "Why this matters" plain-language explanations
- Specialty-specific risk stats

### Career Projector
- Salary range chart by practice setting
- Fellowship ROI comparison
- Net worth projection chart (10/20/30 year)
- "Live like a resident" scenario visualization

---

## 7. Architecture Decisions Log

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Database | SQLite (V1) | Zero-config for prototype, Prisma makes migration to PG trivial |
| Auth | NextAuth.js | Free, well-documented, supports Google OAuth |
| No external APIs (V1) | Hardcoded data | Faster to prototype, no API costs, data is relatively static |
| Client-side calculations | All financial math runs in browser | No server round-trips, instant feedback, works offline |
| No Plaid integration (V1) | Manual input | Reduces security scope, faster to ship |
| shadcn/ui | Copy-paste components | No package lock-in, fully customizable, accessible by default |
| Vercel deployment | Next.js native | Zero-config, free tier sufficient for prototype |

---

## 8. Implementation Phases

### Phase 1: Prototype (Current Sprint)
- Landing page
- Full onboarding flow (6 screens)
- Dashboard with all widgets
- Loan strategy comparison engine
- Budget builder
- Housing analyzer
- Timeline/milestones
- Insurance advisor
- Career projections
- All calculations hardcoded for Alif's scenario with extensible architecture

### Phase 2: Polish & Scale (Future)
- User authentication (NextAuth)
- Database persistence (SQLite → PostgreSQL)
- Additional program/specialty data
- Community features
- Push notifications for milestones
- Plaid integration for real-time budget tracking
