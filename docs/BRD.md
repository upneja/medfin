# MedFin — Business Requirements Document
## Financial & Life Planning Portal for Medical Residents

---

## 1. Executive Summary

MedFin is a personalized financial and life planning portal for medical residents transitioning from medical school to residency. The platform addresses a critical gap: **no single tool exists** that combines personalized financial guidance, loan strategy, life transition planning, and career trajectory visualization for the ~45,000 new residents entering training each year.

**Primary User:** Alif Manon — Rutgers Medical School graduate, matched to NYU Langone Brooklyn for Anesthesiology residency, splitting time between Manhattan and Brooklyn campuses.

**Core Value Proposition:** "Tell me exactly what to do based on MY debt, MY program, MY specialty — not generic advice."

---

## 2. Market Context

- **140,000+** residents/fellows in training at any time in the US
- **75%** report financial stress from student loans
- **79-95%** want financial education but no standardized curriculum exists
- **Average debt:** $200,000-$250,000
- **Average resident salary:** $65,000-$78,000
- **No competitor** offers a unified, personalized, mobile-first planning experience
- Major legislative changes (Grad PLUS elimination July 2026, SAVE plan dead, new RAP plan) make expert guidance more critical than ever

---

## 3. User Personas

### Primary Persona: "The New Resident" (Alif)
- Just matched to a residency program
- $200,000+ in student loans
- Moving to a new city (NYC)
- Overwhelmed by financial decisions (loans, housing, insurance, taxes)
- Works 60-80 hours/week — needs bite-sized, actionable guidance
- Wants someone to "just tell me what to do"

### Secondary Persona: "The Mid-Resident"
- PGY-2 or PGY-3, already in training
- Wants to optimize existing financial setup
- Considering fellowship vs. attending job
- Thinking about long-term career trajectory

### Tertiary Persona: "The Graduating Resident"
- Final year of training
- Navigating attending job search and contract review
- Making the PSLF vs. refinance decision
- Planning for the "live like a resident" transition

---

## 4. Critical User Journeys

### CUJ-1: Onboarding & Personalized Dashboard (PRIMARY — Alif's Journey)

**Scenario:** Alif just matched to NYU Brooklyn for Anesthesiology. He opens MedFin for the first time.

**Flow:**
1. Welcome screen → "Congratulations on your match! Let's build your plan."
2. **Screen 1 — Identity (2 min):** Name, birth year, marital status, dependents, med school (Rutgers), residency program (NYU Brooklyn, Anesthesiology), PGY level (1), fellowship interest
3. **Screen 2 — Loans (3 min):** Total debt (~$315K from Rutgers), loan type breakdown, interest rates, servicer, current status (grace period), filing status
4. **Screen 3 — Financial Snapshot (2 min):** Savings, other debts, credit score, retirement accounts
5. **Screen 4 — Living Situation (2 min):** Housing plans (Brooklyn), rent budget, car (no), multi-site rotations (yes — Manhattan + Brooklyn)
6. **Screen 5 — Insurance (1 min):** Disability, life, health insurance status
7. **Screen 6 — Goals (2 min):** Post-residency vision, top concerns, financial style

**Auto-populated for Alif:**
- PGY-1 salary: $75,000
- PSLF eligible: Yes (NYU is 501(c)(3))
- NY State tax: ~5.5%, NYC tax: ~3.1%
- Monthly take-home: ~$4,500
- Median 1BR rent (Sunset Park): ~$1,800
- Transit: $140/month (OMNY)
- Attending salary projection: ~$525,000 (anesthesiology)
- Training duration: 4 years

**Output:** Personalized dashboard with:
- Monthly budget breakdown
- Loan repayment strategy recommendation (IDR + PSLF)
- Estimated IDR monthly payment (~$400-600)
- Insurance action items (buy disability insurance ASAP)
- Housing recommendation (Sunset Park/Bay Ridge)
- Financial health score
- Timeline of key milestones (Step 3, BASIC exam, etc.)

**Acceptance Criteria:**
- [ ] Onboarding completes in <15 minutes
- [ ] Dashboard renders with personalized data immediately after onboarding
- [ ] All auto-populated fields are accurate for NYU Brooklyn Anesthesiology
- [ ] User can save progress and return to complete onboarding later
- [ ] Mobile-responsive design works on iPhone/Android

### CUJ-2: Loan Repayment Strategy Engine

**Scenario:** Alif wants to know "Should I pursue PSLF or refinance?"

**Flow:**
1. System takes his inputs (debt: ~$315K, employer: NYU 501(c)(3), specialty: anesthesiology, training: 4 years)
2. Models 3 scenarios side-by-side:
   - **Scenario A — PSLF:** 4 years residency + 1 year fellowship + 5 years academic attending = 120 payments. Show monthly IDR payments, total paid, amount forgiven.
   - **Scenario B — Aggressive Payoff:** Refinance after residency, pay off in 5 years on attending salary. Show monthly payments, total interest paid.
   - **Scenario C — Standard IDR + No Forgiveness:** 20/25-year IDR without PSLF. Show taxable forgiveness amount.
3. Clear recommendation with dollar amounts: "PSLF saves you $X vs. aggressive payoff"
4. Action items: "Submit PSLF ECF form → [link]"

**Acceptance Criteria:**
- [ ] Accurately models IDR payments using current formulas (AGI - 150% poverty line × 10% / 12)
- [ ] Shows total cost comparison across all 3 scenarios
- [ ] Accounts for interest accrual during residency
- [ ] Provides actionable next steps with links
- [ ] Updates dynamically when user changes inputs (fellowship plans, career goals)

### CUJ-3: Monthly Budget Builder

**Scenario:** Alif needs to create a realistic monthly budget for living in Brooklyn on a PGY-1 salary.

**Flow:**
1. System pre-fills budget template with:
   - Income: $4,500/month take-home (auto-calculated from $75K salary - taxes)
   - Rent: $1,800 (Sunset Park median)
   - Transit: $140 (OMNY)
   - Student loan: $500 (IDR estimate)
   - Groceries: $350 (NYC estimate)
2. User adjusts categories to match actual spending
3. System shows: remaining disposable income, savings rate, financial health indicators
4. Recommends allocation of surplus: emergency fund → Roth IRA → disability insurance

**Acceptance Criteria:**
- [ ] Pre-fills with location-specific cost estimates
- [ ] Shows income vs. expenses with visual chart
- [ ] Calculates and displays savings rate
- [ ] Provides WCI financial waterfall recommendations
- [ ] Updates in real-time as user adjusts values

### CUJ-4: Housing Affordability Analyzer

**Scenario:** Alif needs to decide where to live — Sunset Park vs. Bay Ridge vs. Manhattan.

**Flow:**
1. Shows rent comparison by neighborhood near his hospital campuses
2. Calculates rent-to-income ratio for each option
3. Shows commute times between each neighborhood and both campuses
4. Factors in: transit costs, car costs (if applicable), NYC city tax impact
5. Clear recommendation: "Living in Sunset Park saves you $30,000/year vs Kips Bay"

**Acceptance Criteria:**
- [ ] Shows at least 3 neighborhood options with rent ranges
- [ ] Calculates rent-to-income ratio (flags >30% as warning)
- [ ] Displays commute times to all rotation sites
- [ ] Shows total annual cost comparison (rent + transport + taxes)

### CUJ-5: Residency Timeline & Milestone Tracker

**Scenario:** Alif wants to see what his next 4 years look like.

**Flow:**
1. Generates personalized timeline based on specialty (anesthesiology) and program (NYU)
2. Key milestones:
   - PGY-1: Orientation, set up IDR/PSLF, buy disability insurance, take Step 3
   - CA-1: Simulation boot camp, subspecialty rotations, BASIC exam (June — must pass)
   - CA-2: Senior call, fellowship exploration, ITE exam
   - CA-3: Bellevue team captain, fellowship interviews/job search, graduation
3. Financial milestones interleaved: annual PSLF certification, Roth IRA contribution deadlines, insurance renewal
4. Countdown to key dates

**Acceptance Criteria:**
- [ ] Shows specialty-specific training milestones
- [ ] Integrates financial action items into timeline
- [ ] Shows board certification pathway (BASIC → ADVANCED → APPLIED)
- [ ] Displays countdown to next upcoming milestone

### CUJ-6: Insurance Decision Engine

**Scenario:** Alif needs to understand what insurance to buy and why.

**Flow:**
1. Shows what NYU provides: group LTD (60% of salary, not own-occ), basic life (1.5x salary), health/dental/vision
2. Identifies gaps: "You need individual own-occupation disability insurance"
3. Explains why in plain language: "As an anesthesiologist, your hands are your career. 25% of physicians experience a 90+ day disability."
4. Estimates cost: ~$100-$175/month for $5,000/month benefit
5. Recommends carriers: Guardian, MassMutual, The Standard, Principal
6. If dependents: recommends term life insurance ($30-$60/month for $1-2M)

**Acceptance Criteria:**
- [ ] Shows program-provided coverage vs. recommended coverage
- [ ] Explains own-occupation vs. any-occupation in plain language
- [ ] Provides specialty-specific risk context
- [ ] Estimates monthly costs
- [ ] Lists recommended carriers

### CUJ-7: Career & Salary Projection

**Scenario:** Alif wants to see what his financial life looks like as an attending.

**Flow:**
1. Shows anesthesiology salary range: $400K (academic) to $700K+ (private practice)
2. Fellowship impact: cardiac adds ~$60K, pain adds ~$15K
3. Models "live like a resident" scenario: if he keeps $75K lifestyle on $525K salary, he can pay off $315K in loans in <3 years and max retirement
4. Shows net worth projection over 10, 20, 30 years
5. Visualizes the "light at the end of the tunnel"

**Acceptance Criteria:**
- [ ] Shows salary projections by practice setting (academic/private/hospital)
- [ ] Models fellowship vs. no-fellowship financial impact
- [ ] Calculates loan payoff timeline under different scenarios
- [ ] Projects net worth over time with visual chart

---

## 5. Functional Requirements

### F1: User Authentication
- Email/password or Google OAuth signup
- Secure data storage (encrypted at rest)
- Save and resume onboarding

### F2: Onboarding Engine
- 6-screen progressive disclosure flow
- Smart defaults based on program/school selection
- "I don't know" option for every financial question
- Auto-population of salary, PSLF eligibility, tax rates, COL data

### F3: Personalized Dashboard
- Financial health overview (income, expenses, net worth)
- Loan strategy summary
- Upcoming milestones and action items
- Budget vs. actual tracking (future phase)

### F4: Loan Calculator
- IDR payment calculator (IBR, PAYE, RAP formulas)
- PSLF qualification checker
- Scenario comparison engine (PSLF vs. refinance vs. standard)
- Interest accrual projector

### F5: Budget Builder
- Pre-filled with location-specific estimates
- Adjustable categories
- Visual income vs. expense breakdown
- Surplus allocation recommendations

### F6: Housing Analyzer
- Neighborhood comparison with rent data
- Commute time calculator
- Rent-to-income ratio assessment
- Tax impact analysis (NJ vs NYC for applicable users)

### F7: Timeline Engine
- Specialty-specific milestones
- Financial action item integration
- Board certification pathway
- Countdown timers

### F8: Insurance Advisor
- Gap analysis (program coverage vs. needs)
- Cost estimator
- Carrier recommendations
- Specialty-specific risk context

### F9: Career Projector
- Salary data by specialty and practice setting
- Fellowship ROI analysis
- Net worth projection with interactive charts
- "Live like a resident" scenario modeler

---

## 6. Non-Functional Requirements

- **Performance:** Dashboard loads in <2 seconds
- **Mobile:** Fully responsive, mobile-first design
- **Security:** All financial data encrypted, no direct bank/loan account connections in V1
- **Accessibility:** WCAG 2.1 AA compliant
- **Availability:** 99.9% uptime

---

## 7. Success Metrics

- **Onboarding completion rate:** >70%
- **Time to first insight:** <5 minutes from signup
- **User retention:** >50% return within 7 days
- **Primary CUJ completion:** Alif can complete onboarding and see his personalized dashboard with actionable recommendations in one session

---

## 8. Out of Scope (V1)

- Direct bank/loan account integration (Plaid)
- Community features (forums, peer comparison)
- Contract review tools
- Real-time budget tracking (manual input only)
- Push notifications / reminder system
- Financial advisor matching
