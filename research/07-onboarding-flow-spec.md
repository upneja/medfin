# Onboarding Flow Specification: MedFin Resident Financial Planning Portal

## Design Philosophy
Progressive disclosure: start with easy identity questions, move to harder financial territory, end with aspirational goals. 6 screens, 2-4 min each. Save-and-return enabled. Mobile-first.

## Screen 1: "Let's get to know you" (Personal & Training Basics)
1. **First Name** — personalization
2. **Birth Year** — retirement projections, insurance pricing
3. **Marital Status** — Single / Partnered / Married / Divorced (affects tax filing, IDR, insurance)
4. **Dependents** — 0-3+ (affects IDR, life insurance, tax credits, emergency fund)
5. **Medical School** — searchable dropdown (estimates debt composition)
6. **Residency Program** — institution + specialty (THE most important input — unlocks salary, benefits, PSLF eligibility, location, training length)
7. **PGY Level** — salary tier, years remaining
8. **Categorical vs Preliminary** — planning horizon certainty
9. **Fellowship Interest** — adds 1-2 years trainee salary, affects PSLF math dramatically

## Screen 2: "Your Student Loans" (The Big Number)
1. **Total Student Loan Debt** — foundation of all modeling
2. **Loan Type Breakdown** — Federal Direct / Grad PLUS / Private / Undergrad / Perkins
3. **Interest Rates** — determines growth rate, refinancing analysis
4. **Loan Servicer** — MOHELA/Aidvantage/Nelnet (action items)
5. **Current Loan Status** — grace / deferment / IDR / forbearance
6. **Consolidated?** — affects PSLF eligibility, resets IDR count
7. **Tax Filing Status** (if married) — MFJ vs MFS is MASSIVE for IDR payments
8. **Spouse Income** (if married) — MFJ/MFS optimization, household budget

## Screen 3: "Your Financial Snapshot" (Beyond Loans)
1. **Current Savings** — emergency fund gap assessment
2. **Other Debts** — car, credit card, personal loans
3. **Credit Score Range** — refinancing eligibility, NYC apartment applications
4. **Retirement Accounts** — existing balances, rollover needs

## Screen 4: "Life in Your New City" (Living Situation)
1. **Housing Plans** — solo / roommate / partner / family
2. **Rent Budget** — slider $1,000-$3,500
3. **Car Situation** — owned / payment / no car
4. **Multi-Site Rotations** — affects transport planning, housing location

## Screen 5: "Protecting Yourself" (Insurance)
1. **Disability Insurance** — program-provided / personal / none
2. **Life Insurance** (if dependents) — program / personal / none
3. **Health Insurance** — program plan / spouse plan / other

## Screen 6: "Your Goals and Priorities" (Aspirational)
1. **Post-Residency Vision** — academic / private / hospital / locums
2. **Geographic Preferences** — affects long-term COL modeling
3. **Top 3 Financial Concerns** — personalizes recommendation ordering
4. **Financial Planning Style** — aggressive / balanced / minimal / tell me what to do
5. **Investment Risk Tolerance** — aggressive / moderate / conservative

## Auto-Populated Fields (for NYU Brooklyn Anesthesiology)
| Field | Value |
|-------|-------|
| PGY-1 Salary | ~$69,000-$73,000 |
| PSLF Eligible | Yes (501(c)(3)) |
| NY State Tax | ~5.5-6% effective |
| NYC Tax | ~3.1-3.5% |
| Total Tax Rate | ~28-32% of gross |
| Take-Home (monthly) | ~$4,100-$4,400 |
| Training Duration | 4 years |
| Attending Salary | ~$420,000-$450,000 median |
| COL Index | ~187 (vs national 100) |
| Median 1BR Rent | $2,500-$3,200 |
| Transit Cost | $132/month MetroCard |

## Tier System
- **Tier 1 (8 inputs)**: IDR estimate, PSLF viability, take-home pay, basic budget, top 3 actions
- **Tier 2 (+8 inputs)**: Complete budget, emergency fund gap, debt priority, housing analysis
- **Tier 3 (+12 inputs)**: Insurance gaps, career-adjusted strategy, retirement projections, full roadmap

## Key Calculations
1. **IDR Payment** = ((AGI - 150% poverty line for family size) * 10%) / 12
2. **PSLF Break-Even** = 120 IDR payments vs refinanced payoff
3. **Monthly Budget** = take-home - (rent + transport + food + insurance + loans + other debt)
4. **Emergency Fund Target** = 3 months essentials * (1 + 0.5 * dependents)
5. **Net Worth Projection** = assets - debts, projected with income growth
