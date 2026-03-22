export interface Guide {
  slug: string;
  title: string;
  description: string;
  category: 'financial' | 'clinical' | 'lifestyle' | 'career';
  readTime: string;
  iconName: string;
  content: string;
}

export const guides: Guide[] = [
  {
    slug: 'student-loan-repayment-2026',
    title: "The 2026 Resident's Guide to Student Loan Repayment",
    description:
      'SAVE plan killed, RAP launching, Grad PLUS gone. Everything changed — here\'s what to do.',
    category: 'financial',
    readTime: '15 min',
    iconName: 'Landmark',
    content: `# The 2026 Resident's Guide to Student Loan Repayment

The student loan landscape has been completely overhauled. If you matched in 2026, every piece of advice from even two years ago is outdated. Here is what actually matters right now.

---

## The SAVE Plan Is Dead

In March 2026, the Supreme Court ruled that the SAVE (Saving on a Valuable Education) plan exceeded executive authority. The plan — which had offered the most generous income-driven repayment terms ever — was struck down. Borrowers previously enrolled in SAVE were placed into administrative forbearance, then transitioned to other IDR plans.

**If you were on SAVE:** You were likely moved to IBR or placed in forbearance. Check your servicer portal immediately. Forbearance months do not count toward PSLF or IDR forgiveness, and interest continues to accrue — costing roughly **$14,000 per year** on a $250K balance at 6% interest.

---

## Grad PLUS Loans Eliminated (July 2026)

Starting July 1, 2026, the federal government will no longer issue Grad PLUS loans. Students entering medical school in fall 2026 will face a new borrowing structure with lower aggregate limits and will need to fill gaps with institutional aid or private loans.

**If you already have Grad PLUS loans:** They are grandfathered in. Your existing Grad PLUS loans remain eligible for IDR plans and PSLF. This change only affects new borrowing.

---

## The New RAP Plan

The **Repayment Assistance Plan (RAP)** is the legislatively authorized replacement for SAVE. Key features:

- **Payment calculation:** 1-10% of AGI on a sliding scale (1% at $30K income, scaling to 10% at $100K+)
- **Interest cancellation:** If your calculated payment does not cover accruing interest, the remaining interest is cancelled — your balance does not grow
- **Principal reduction credit:** $50/month credited toward principal on top of your calculated payment
- **Forgiveness timeline:** 20 years for undergraduate loans, 25 years for graduate/professional loans
- **PSLF compatible:** Yes — RAP payments count as qualifying payments

**For most residents,** RAP will produce payments slightly higher than the old SAVE plan but significantly lower than IBR. On a $70K salary, expect payments of roughly **$350-$450/month**.

---

## IBR Remains Available

**Income-Based Repayment** is still available in two versions:

- **Old IBR (pre-July 2014 loans):** 15% of discretionary income, 25-year forgiveness
- **New IBR (post-July 2014 loans):** 10% of discretionary income, 20-year forgiveness

Most residents with loans from 2014 onward qualify for new IBR. Payments are calculated at 10% of the difference between your AGI and 150% of the federal poverty line.

**On $70K salary (single):** IBR payment is approximately **$400-$450/month**.

---

## PAYE Sunsetting in 2028

The Pay As You Earn plan will stop accepting new enrollments in 2028. If you are currently on PAYE, you can remain. If you are choosing a plan today, RAP or IBR are your options. PAYE offered 10% of discretionary income with a 20-year forgiveness window — functionally similar to new IBR.

---

## Marriage and Filing Status

This is one of the most consequential financial decisions for married residents.

- **Married Filing Jointly (MFJ):** Combined income determines IDR payments. If your spouse earns $80K and you earn $70K, payments are based on $150K AGI.
- **Married Filing Separately (MFS):** Only your income counts for IDR. Payments are dramatically lower. But you lose tax benefits worth $2,000-$5,000/year (no education credits, lower SALT deductions, no Roth IRA contributions).

**The math usually favors MFS** when student loan balances exceed $150K and you are pursuing PSLF. The IDR savings outweigh the tax penalty. Run the numbers with both scenarios.

---

## The Cost of Forbearance

Many residents default to forbearance because it is the path of least resistance — zero payments, no paperwork. This is extremely expensive.

On $300K in loans at 6.5% interest:
- **Interest accrued per year:** ~$19,500
- **Interest accrued during 4-year residency:** ~$78,000
- **Lost PSLF qualifying payments:** 48 months you can never get back

Forbearance should only be used for brief transitions (switching servicers, between programs). Never as a long-term strategy.

---

## Step-by-Step Action Plan for New PGY-1s

1. **Week 1 of residency:** Log in to StudentAid.gov. Confirm your loan servicer and loan types.
2. **Week 2:** Apply for RAP (or IBR if RAP enrollment is not yet open). You need your most recent tax return or will self-certify income.
3. **Week 3:** Submit your first **Employment Certification Form (ECF)** to MOHELA for PSLF. Your hospital must be a 501(c)(3).
4. **Month 2:** Confirm your first qualifying payment was processed. Set a calendar reminder to recertify income annually and submit ECF every 12 months.
5. **If married:** Run the MFJ vs. MFS analysis before your first tax filing.
6. **If in forbearance:** Get out immediately. Every month costs you ~$1,600 in accrued interest and one lost PSLF payment.

---

## The Bottom Line

The 2026 repayment landscape is more complicated than ever, but the core strategy for residents has not changed: **enroll in the lowest-payment IDR plan, pursue PSLF if you are at a qualifying employer, and never sit in forbearance.** The specific plan names have changed. The math has not.`,
  },
  {
    slug: 'pslf-complete-guide',
    title: 'PSLF for Medical Residents: The Complete Guide',
    description:
      'Step-by-step guide to Public Service Loan Forgiveness. 120 payments, $200K+ forgiven tax-free.',
    category: 'financial',
    readTime: '18 min',
    iconName: 'FileCheck',
    content: `# PSLF for Medical Residents: The Complete Guide

Public Service Loan Forgiveness is the single most valuable financial program available to physicians training at nonprofit hospitals. After 120 qualifying payments — roughly 10 years — your remaining federal student loan balance is forgiven **tax-free**. For a resident with $300K in loans, that can mean $200,000 or more wiped clean.

But PSLF is unforgiving of mistakes. Wrong loan type, wrong repayment plan, wrong employer, missed certification — any of these can cost you years.

---

## The Three Requirements

PSLF has exactly three requirements. All three must be met simultaneously for a payment to count.

### 1. Qualifying Employer
Your employer must be a **501(c)(3) nonprofit organization** or a government entity. Most academic medical centers and large hospital systems qualify. Private physician groups, even if they operate within a hospital, typically do not.

**How to verify:** Check your hospital's IRS determination letter, or search the PSLF Help Tool at StudentAid.gov. Submit an ECF and MOHELA will confirm eligibility.

### 2. Qualifying Loans
Only **Direct Loans** qualify. This includes Direct Subsidized, Direct Unsubsidized, and Direct Consolidation Loans.

**FFEL and Perkins loans do NOT qualify** unless consolidated into a Direct Consolidation Loan. Check your loan types on StudentAid.gov under "My Aid."

**Warning:** Consolidation resets your PSLF payment counter to zero. If you have already made qualifying payments on Direct Loans, do not consolidate those — only consolidate non-Direct loans separately if possible.

### 3. Qualifying Repayment Plan
You must be on an **income-driven repayment plan**: RAP, IBR, PAYE, or ICR. Standard 10-year repayment technically qualifies but makes PSLF pointless (you would pay off the loans before reaching 120 payments).

---

## The Employment Certification Form (ECF)

The ECF (now called the PSLF Form) is how you prove your employer qualifies. **Submit it annually** and whenever you change employers.

**Process:**
1. Download the PSLF Form from StudentAid.gov
2. Fill out Section 1 (borrower info) and Section 3 (authorization)
3. Have your GME office or HR complete Section 2 (employer certification)
4. Submit to MOHELA (the exclusive PSLF servicer) by mail, fax, or upload

**Critical:** Your loans must be serviced by MOHELA for PSLF tracking. If they are with another servicer, submitting an ECF will trigger a transfer.

---

## Which IDR Plan for PSLF Optimization

The goal with PSLF is to **minimize total payments over 120 months** because the remaining balance is forgiven regardless of size.

- **RAP** typically produces the lowest payments for most residents due to the sliding scale (1-10% of AGI)
- **IBR** (new, 10% of discretionary income) is the next best option
- **PAYE** (10% of discretionary income) is functionally similar to new IBR but sunsetting for new enrollees in 2028

**Key insight:** Every dollar you pay above the minimum on an IDR plan while pursuing PSLF is a dollar wasted. Do not make extra payments. Put that money in a Roth IRA instead.

---

## Worked Example

**Dr. Chen — Anesthesiology Resident, $300K in Direct Loans at 6.5%**

| Phase | Years | Salary | Monthly IDR | Annual Payments |
|-------|-------|--------|-------------|-----------------|
| PGY-1 to PGY-4 | 4 | $70-82K | $380-$480 | ~$20,400 total |
| Fellowship (PGY-5) | 1 | $88K | $520 | ~$6,240 |
| Academic Attending | 5 | $350K | $2,800 | ~$168,000 |
| **Totals** | **10** | — | — | **~$194,640 paid** |

After 120 payments, remaining balance (which has grown to ~$380K with interest) is **forgiven tax-free**.

**Without PSLF:** Dr. Chen would repay approximately $450,000-$500,000 over 20-25 years on standard/IDR repayment.

**PSLF savings: $200,000-$300,000.**

---

## Common Mistakes

### 1. Wrong Loan Type
FFEL loans from before 2010 do not qualify. Many borrowers discovered this after years of payments. Check StudentAid.gov now.

### 2. Forbearance During Residency
Forbearance months do not count toward the 120. Four years of forbearance = 48 lost payments = 4 extra years as an attending before forgiveness.

### 3. Not Certifying Annually
If you do not submit ECFs, MOHELA cannot track your payments. Submit annually even if nothing has changed. This also catches errors early.

### 4. Switching to Private Practice Before 120
If you leave a qualifying employer at payment 108, you lose PSLF eligibility. Those 108 payments still count toward 20/25-year IDR forgiveness, but that forgiveness is **taxable** (ordinary income). Plan your career transitions carefully.

### 5. Paying Extra
Extra payments on IDR while pursuing PSLF are throwing money away. The balance is forgiven regardless of size. Minimum payments only.

---

## PSLF vs. Refinancing: The Breakeven

Refinancing makes sense when you will NOT pursue PSLF — typically private practice physicians.

**Refinancing wins when:**
- You will leave academic/nonprofit medicine before 120 payments
- Your loan balance is under $150K
- You can refinance to a rate below 4% and aggressively pay down

**PSLF wins when:**
- You will stay at a 501(c)(3) employer for 10+ years
- Your loan balance exceeds $200K
- You are in a lower-paying specialty or plan academic careers

**General rule:** If your loan balance exceeds 1.5x your expected attending salary, PSLF almost always wins.

---

## The Bottom Line

PSLF is not complicated — it is just unforgiving. Enroll in an IDR plan today, submit your ECF this month, and set an annual reminder to recertify. After 10 years of on-time minimum payments at a qualifying employer, the remaining balance disappears. For most residents with $250K+ in debt planning academic or hospital-employed careers, this is the single best financial decision you will make.`,
  },
  {
    slug: 'roth-ira-retirement',
    title: 'Why Residency Is the Best Time to Start a Roth IRA',
    description:
      "You'll never be in a lower tax bracket again. Here's how to turn $30K into $300K tax-free.",
    category: 'financial',
    readTime: '14 min',
    iconName: 'TrendingUp',
    content: `# Why Residency Is the Best Time to Start a Roth IRA (And How to Do It)

You survived Step exams. You matched. You are finally earning a real paycheck. And right now, during the years when your salary feels the tightest, you have a financial superpower that will never come back: **a low tax bracket.**

Most physicians do not start investing seriously until they become attendings. That is a six- or seven-figure mistake. This guide explains why residency is the single best window to fund a Roth IRA, how to do it step by step, and how it fits alongside student loans, employer plans, and the rest of your financial life.

---

## Why Residency Is Uniquely Powerful for Roth Contributions

Here is the core insight: **you will never be in a lower federal tax bracket again.**

A PGY-1 earning $70,000 in 2026 has a taxable income of roughly $53,900 after the $16,100 standard deduction. That places almost all of their income in the **12% bracket** and only a sliver in the **22% bracket**.

Their effective federal tax rate is approximately **13-14%**.

Compare that to a newly minted attending earning $300,000. That physician's marginal rate is **35%**, and their effective rate is north of **24%**. A subspecialist earning $450,000 or more hits the **37% bracket**.

Every dollar you put into a Roth IRA during residency is taxed at that low resident rate — and then **never taxed again**. Not on the growth. Not on the withdrawals. Not ever.

---

## Roth IRA Basics for 2026

A Roth IRA is a retirement account funded with after-tax dollars. You pay tax now; you pay nothing later.

| Detail | 2026 Rules |
|--------|-----------|
| **Contribution limit** | $7,500 (under 50) / $8,600 (50+) |
| **Income limit (single)** | Full contribution under $153K MAGI |
| **Income limit (MFJ)** | Full contribution under $242K MAGI |
| **Contribution withdrawals** | Anytime, tax-free, penalty-free |
| **Earnings withdrawals** | Tax-free after 59 1/2 (5-year rule) |
| **RMDs** | None during your lifetime |

As a resident earning $65,000-$75,000, you are well under the income limits. No tricks needed.

---

## The Math: Start Now vs. Start as an Attending

**Scenario A: Start during residency** — $7,500/year for 4 years at 7% average annual return:
- Total contributed: $30,000
- Value after 4 years: ~$33,600
- Value at age 65 (untouched, no more contributions): **~$298,000**

**Scenario B: Wait until attending at age 32** — same contributions, 4 fewer years of compounding:
- Cost of the 4-year delay: **$100,000-$130,000 in lost tax-free growth**

$30,000 invested during residency → nearly $300,000 tax-free. That is compound interest over 35+ years.

---

## The Backdoor Roth IRA

Once your income exceeds $168,000 (single) in 2026, you cannot contribute directly to a Roth IRA. Every attending hits this.

The **backdoor Roth IRA** workaround:
1. Contribute $7,500 to a **non-deductible traditional IRA**
2. Immediately **convert** to Roth IRA
3. No tax owed (already paid, no earnings yet)

**Pro-rata rule warning:** If you have pre-tax money in any traditional/SEP/SIMPLE IRA, the conversion becomes partially taxable. Fix: roll pre-tax IRA balances into your employer 401(k)/403(b).

**For residents:** You don't need the backdoor yet. But don't open a traditional IRA with deductible contributions now — it creates a pro-rata headache later. Go Roth directly.

---

## Roth 403(b) vs. Roth IRA

| Feature | Roth IRA | Roth 403(b) |
|---------|----------|-------------|
| 2026 limit | $7,500 | $24,500 |
| Income limits | Yes | None |
| Investment choices | Unlimited | Limited to plan options |
| Employer match | No | Yes (match goes pre-tax) |
| RMDs | None | Yes (unless rolled to Roth IRA) |
| Contribution withdrawals | Anytime | Generally not until separation |

**Can you do both?** Yes. Limits are separate. $7,500 + $24,500 = $32,000 total Roth space.

**Priority:** Employer match first → Roth IRA → additional 403(b).

---

## The PSLF Interaction

If pursuing **Public Service Loan Forgiveness**, the calculus changes.

Pre-tax 403(b) contributions reduce your AGI, which reduces your IDR payments. Roth contributions don't.

**Example on $70K salary with $250K loans:**
- No 403(b): AGI $70K → IDR ~$400/month
- $5K pre-tax 403(b): AGI $65K → IDR ~$360/month
- Annual savings: ~$480 in lower loan payments (money you never repay because PSLF forgives the balance)

**Decision framework:**
- **Pursuing PSLF with $200K+ loans?** Pre-tax 403(b) first (lower AGI), then Roth IRA
- **Not pursuing PSLF?** Roth everything — lock in the low tax bracket
- **Uncertain?** Default to Roth IRA — if you leave public service, you'll be glad

---

## How to Open a Roth IRA

Best brokerages: **Fidelity**, **Vanguard**, or **Schwab**. Zero-fee Roth IRAs, no minimums, excellent index funds.

1. Go to fidelity.com / vanguard.com / schwab.com → "Open an Account"
2. Select "Roth IRA"
3. Provide personal info (SSN, DOB, employment)
4. Link checking account, set up transfer
5. **Choose your investments** (don't skip this — see below)
6. Set up automatic monthly contributions ($625/month to max out)

---

## What to Invest In

### Option 1: Target-Date Fund (Simplest)
- Vanguard Target Retirement 2065 (VLXVX) — 0.08% expense ratio
- Fidelity Freedom Index 2060 (FDKLX) — 0.12%
- One fund, automatically adjusts over time. Set it and forget it.

### Option 2: Total Market Index Fund
- Vanguard Total Stock Market (VTSAX/VTI) — 0.03%
- Fidelity Total Market (FSKAX) — 0.015%
- Maximum simplicity, maximum growth potential.

### Option 3: Three-Fund Portfolio
- 60-70% U.S. Total Stock Market
- 20-30% International Total Stock Market
- 0-10% U.S. Total Bond Market

**What matters most:** Low expense ratios (<0.10%), broad diversification, consistency. Don't pick individual stocks.

---

## The HSA: Your "Stealth Roth"

If your program offers a **High-Deductible Health Plan**, you unlock the HSA — the only account with a **triple tax advantage:**
1. Contributions are tax-deductible
2. Growth is tax-free
3. Withdrawals for medical expenses are tax-free

**2026 limits:** $4,400 individual / $8,750 family.

**The strategy:** Pay medical expenses out of pocket, invest HSA money in index funds, save receipts. Reimburse yourself tax-free years later. No time limit on reimbursement.

---

## The Priority Waterfall

On ~$4,500/month take-home:

1. **Emergency fund** — $5,000-$10,000 in HYSA first
2. **Employer 403(b) match** — capture the free money (~$175/month)
3. **HSA** (if eligible) — $367/month
4. **Roth IRA** — $625/month
5. **Additional 403(b)** — pre-tax if PSLF, Roth if not
6. **Extra debt payments** (high-interest non-student-loan debt only)

**Realistic target:** Employer match + Roth IRA = ~$800-$900/month. Aggressive but achievable.

---

## Common Mistakes

1. **Depositing but not investing** — Money sitting in cash earns 4% instead of 7-10%. Over 30 years, this costs hundreds of thousands. After depositing, buy investments.

2. **Choosing expensive funds** — 1.0% vs 0.03% expense ratio = ~$150,000 difference over 35 years. Stick with index funds.

3. **Panic selling in downturns** — Markets will drop 20-30% at some point. You have 35+ years. Stay the course.

4. **Waiting until you "have more money"** — Build the habit now. $300/month is better than $0/month.

5. **Making extra loan payments instead** — If pursuing PSLF, extra payments are literally throwing money away. Those dollars belong in a Roth IRA earning tax-free returns for 35 years.

6. **Overcomplicating your portfolio** — One target-date fund is all you need. Simplicity reduces the temptation to tinker and underperform.

---

## The Bottom Line

Residency is financially uncomfortable. But you have one advantage that vanishes the moment you sign your first attending contract: **a low tax bracket.**

Every dollar in a Roth IRA during these years is taxed at 12-22% and grows tax-free forever. The same dollar as an attending is taxed at 32-37%.

Open the account today. Set up automatic contributions. Buy a target-date fund. Then go back to the ICU and forget about it for 30 years.

Future you — the attending with the paid-off house and the seven-figure retirement account — will be glad you did.`,
  },
  {
    slug: 'disability-insurance',
    title: 'Disability Insurance: The Most Important Purchase in Training',
    description:
      '25% of physicians face a 90+ day disability. Own-occupation coverage explained.',
    category: 'financial',
    readTime: '16 min',
    iconName: 'ShieldCheck',
    content: `# Disability Insurance: The Most Important Purchase in Training

You are about to spend 3-7 years learning a skill set worth $10-15 million in lifetime earnings. Disability insurance protects that investment. One in four physicians will experience a disability lasting 90 days or more during their career. For surgeons and proceduralists, the risk is even higher — a hand tremor, a back injury, or a neurological condition can end a career overnight.

This is the most important insurance purchase you will make during training. Not the most exciting. The most important.

---

## Own-Occupation vs. Any-Occupation

This is the single most critical distinction in disability insurance.

**Own-occupation ("own-occ"):** You are considered disabled if you cannot perform the duties of your specific medical specialty. A surgeon who develops a hand tremor collects full benefits even if they could work as a hospitalist or consultant.

**Any-occupation ("any-occ"):** You are only disabled if you cannot work in any job you are reasonably qualified for by education, training, or experience. That surgeon with a tremor? The insurer says they can still practice internal medicine. Claim denied.

**You need own-occupation coverage.** This is non-negotiable for physicians. Group LTD plans from your employer almost always use an any-occ or modified own-occ definition. They are not sufficient.

---

## Why Group LTD Is Not Enough

Your residency program likely provides group long-term disability insurance. Here is why it falls short:

- **Definition:** Usually any-occ or "own-occ for 2 years, then any-occ"
- **Benefit amount:** Typically 60% of base salary, capped at $5,000-$7,500/month
- **Taxability:** If premiums are employer-paid, benefits are taxable income — reducing your actual benefit to ~40% of salary
- **Portability:** Coverage ends when you leave the employer
- **No specialty protection:** Does not recognize your specific training

Group LTD is a floor, not a ceiling. You need individual own-occ coverage on top of it.

---

## The Big 5 Carriers

Five insurance companies consistently offer the strongest own-occupation policies for physicians:

1. **Guardian (Berkshire)** — Considered the gold standard. True own-occ, strong contract language, excellent claims history.
2. **MassMutual** — Comparable to Guardian. True own-occ with strong riders.
3. **The Standard** — Solid own-occ definition. Often slightly less expensive.
4. **Principal** — Good policies with competitive pricing. Read the fine print on mental health limitations.
5. **Ameritas** — True own-occ with some unique rider options.

**Get quotes from at least 2-3 carriers.** Work with an independent insurance broker who specializes in physician disability — they can access all carriers and compare contract language. A good broker costs you nothing (they are paid by the insurer).

---

## Critical Riders

Riders are add-ons to your base policy. These three are essential:

### Future Purchase Option (FPO) / Benefit Increase Rider
Allows you to increase coverage as your income grows **without a new medical exam**. This is crucial — buy a base policy during residency when you are young and healthy, then increase coverage as an attending.

### Cost of Living Adjustment (COLA)
Increases your benefit by 3-6% annually while you are on claim, keeping pace with inflation. A 30-year claim without COLA would be devastating.

### Residual / Partial Disability
Pays a proportional benefit if you can work but at reduced capacity or reduced income. Without this rider, you must be fully unable to work to collect anything.

**Other riders worth considering:** Mental health coverage without time limits (some policies cap mental health claims at 2 years), catastrophic disability rider, student loan rider.

---

## How Much Coverage

- **During residency:** $5,000/month base benefit (the maximum most carriers will issue on a resident salary)
- **As an attending:** Use FPO rider to increase to $10,000-$15,000/month
- **Target:** 60% of your gross income, tax-free

Why only 60%? Individual disability benefits are tax-free if you pay premiums with after-tax dollars. $10,000/month tax-free replaces approximately $15,000/month gross salary.

---

## What It Costs

During residency, expect to pay **$100-$175/month** for a high-quality own-occ policy with FPO and COLA riders. This varies by:

- **Age:** Younger = cheaper. Every year you wait costs more.
- **Gender:** Women pay more (higher claim rates statistically)
- **Specialty:** Procedural specialties pay more than cognitive specialties
- **Health:** Buy while you are healthy. A new diagnosis can make you uninsurable or trigger exclusions.
- **Elimination period:** 90 days is standard (cheaper than 60, much cheaper than 30)

**The cost increases approximately 3-5% per year of age.** A policy purchased at 28 costs significantly less over a career than the same policy purchased at 35.

---

## When to Buy

**The best time: during residency, ideally PGY-1.**

Three reasons:
1. **You are young** — lowest premiums, locked in for life
2. **You are healthy** — no pre-existing condition exclusions
3. **GSI (Guaranteed Standard Issue) windows** — many residency programs negotiate GSI with carriers, which means no medical underwriting. You cannot be denied or rated up for health conditions. These windows typically open during orientation in June/July.

**Ask your GME office** if they have a GSI arrangement. If they do, this is the most valuable insurance opportunity of your career. Even if you have a health condition that would normally trigger exclusions, GSI means you get full coverage.

---

## The Application Process

1. **Find an independent broker** who works with physicians (not a captive agent for one company)
2. **Get quotes from 2-3 carriers** — compare contract language, not just price
3. **Complete the application** — medical history, specialty, income
4. **Medical exam** — basic paramedical exam (blood draw, vitals, height/weight). Some GSI programs waive this.
5. **Underwriting** — 4-8 weeks typically
6. **Policy issued** — review the contract carefully before paying

---

## Common Mistakes

1. **Relying on group LTD alone** — It will not protect your specialty or follow you to your next job.
2. **Waiting until attending** — You are older, potentially less healthy, and premiums are higher. The FPO rider lets you start small and grow.
3. **Choosing the cheapest policy** — Contract language matters more than price. A $50/month savings means nothing if the claim definition excludes your situation.
4. **Not understanding "own-occ" variations** — Some policies say "own-occ" but define it as "own-occ for your first 5 years, then any-occ." Read the contract.
5. **Missing your GSI window** — This is a one-time opportunity. If your program offers it, take it immediately.

---

## The Bottom Line

Your ability to practice medicine is your most valuable asset — worth $10-15 million over a career. Disability insurance protects that asset for $100-$175/month during residency. Buy an own-occupation policy from a Big 5 carrier with FPO and COLA riders during your first year of training. Your future self — whether healthy or facing an unexpected disability — will thank you.`,
  },
  {
    slug: 'step3-board-exams',
    title: 'Step 3, ITE & Board Certification: The Exam Roadmap',
    description:
      'When to take Step 3, how to prep, BASIC/ADVANCED/APPLIED timeline, and study resources.',
    category: 'clinical',
    readTime: '15 min',
    iconName: 'BookOpen',
    content: `# Step 3, ITE & Board Certification: The Exam Roadmap

Between Step 3, annual in-training exams, and specialty board certification, residency is littered with high-stakes tests. This guide maps out every exam you will face, when to take each one, how to prepare, and what they cost.

---

## USMLE Step 3

### Format
Step 3 is a two-day computer-based exam:

- **Day 1:** ~230 multiple-choice questions (MCQs) in blocks of 38-42 questions, 7 hours of testing time
- **Day 2:** ~180 MCQs plus **13 Computer-based Case Simulations (CCS)**, 9 hours of testing time

CCS cases are interactive patient management scenarios — you admit a patient, order labs, write prescriptions, and manage them over simulated time. They are unique to Step 3 and require specific practice.

### When to Take It

**Early PGY-1 is optimal**, ideally within the first 3-6 months of intern year. Reasons:

- Step 1 and Step 2 CK material is still relatively fresh
- Some states require Step 3 for a full medical license (needed before moonlighting)
- You get it out of the way before clinical responsibilities intensify
- Many residency programs expect or encourage early completion

Some residents wait until PGY-2, which is fine but not ideal. The longer you wait, the more you forget from Step prep, and the harder it becomes to carve out study time.

### Registration

1. Register through the **FSMB (Federation of State Medical Boards)** at fsmb.org
2. Select the state medical board where you want to be licensed
3. Pay the examination fee: **$955** (2026)
4. Receive your USMLE ID and scheduling permit
5. Schedule at a Prometric testing center — book early, seats fill quickly

### Study Plan (4-8 Weeks)

- **Primary resource:** UWorld Step 3 question bank (~1,300 questions). Do 1-2 blocks per day.
- **CCS practice:** UWorld CCS cases (included with QBank) + free CCS software from NBME. Practice at least 20-30 cases.
- **Supplementary:** First Aid for Step 3 for high-yield review. IM residents often use Step Up to Medicine.
- **Time commitment:** 1-2 hours per day for 4-8 weeks alongside clinical duties
- **Practice exams:** NBME self-assessments ($60 each) — take one 2 weeks before your test date

**Target score:** Passing is 198. Most residents score 220-240. The pass rate for first-time takers is approximately **97%** — this is not Step 1. Focus on passing efficiently, not maximizing your score.

---

## In-Training Examination (ITE)

The ITE is an annual exam administered by your specialty board during residency. It is **not** a licensing exam — it is a formative assessment that measures your knowledge against national peers.

### Key Details
- **Administered annually**, typically in February-March
- **Format varies by specialty** — most are 200-300 MCQs over a full day
- **Scored as a percentile** relative to other residents at your training level
- **Used by programs** for remediation decisions, board prep tracking, and sometimes fellowship competitiveness

### Why It Matters

- **Low scores trigger remediation** — typically defined as below the 30th percentile
- **Fellowship applications** may include ITE scores, particularly competitive fellowships
- **Predictive of board pass rates** — residents who consistently score below the 35th percentile are at significantly higher risk of failing boards

### How to Prepare

Most residents do not formally study for the ITE. The best preparation is consistent clinical learning throughout the year. However, if your scores are concerning:

- Review missed questions carefully
- Identify weak knowledge areas and target them
- Use specialty-specific question banks year-round (not just before the ITE)

---

## Anesthesiology Board Certification Pathway

Anesthesiology has a unique three-stage board certification process through the ABA (American Board of Anesthesiology):

### BASIC Exam
- **When:** End of CA-1 year (typically July)
- **Format:** 200 MCQs, single day
- **Content:** Pharmacology, physiology, physics, equipment, basic anesthetic management
- **Pass rate:** ~85% first attempt
- **Must pass** before taking ADVANCED

### ADVANCED Exam
- **When:** During CA-3 year (typically March)
- **Format:** 200 MCQs, single day
- **Content:** Clinical anesthesia, subspecialty topics, advanced management
- **Pass rate:** ~80% first attempt
- **Must pass** before taking APPLIED

### APPLIED Exam (formerly Oral Boards)
- **When:** Within 3 years of completing residency
- **Format:** OSCE-style exam with standardized examiners — 8 clinical scenarios
- **Content:** Patient management, crisis scenarios, professional judgment
- **Cost:** Approximately $2,100
- **Pass rate:** ~75% first attempt — this is the hardest stage

**Total timeline:** 4-5 years from start of CA-1 year to full board certification.

---

## COMLEX Level 3 for DOs

Osteopathic physicians take COMLEX Level 3 in addition to (or instead of) USMLE Step 3.

- **Format:** Two days, MCQs plus case simulations
- **When:** During PGY-1 or PGY-2
- **Cost:** Approximately $875
- **Key difference:** Includes osteopathic principles and practice (OPP) content — approximately 15-20% of questions

Many DO residents take both USMLE Step 3 and COMLEX Level 3 to keep all licensing options open. If you matched into an ACGME program, USMLE Step 3 is typically sufficient for state licensure.

---

## Maintenance of Certification (MOC)

Board certification is no longer a one-time achievement. Most specialty boards now require **ongoing MOC activities** throughout your career.

### Typical MOC Requirements
- **Annual knowledge assessment:** Online modules or mini-exams, 20-40 questions
- **Continuing medical education (CME):** 200-250 credits per 10-year cycle
- **Practice improvement activities:** Quality improvement projects, simulation courses
- **Recertification exam:** Every 10 years (some boards are moving to longitudinal assessment)

### Costs

MOC is expensive over a career:

- **Annual MOC fees:** $210-$400/year depending on specialty
- **CME courses:** $500-$2,000/year
- **Recertification exam:** $2,000-$3,500 per attempt
- **Simulation courses:** $1,000-$3,000 (required by some boards)
- **Total per decade: $23,000-$40,000**

Many physician employers cover MOC costs as part of a CME allowance (typically $2,000-$5,000/year). Negotiate this into your attending contract.

---

## The Bottom Line

The exam timeline during residency is relentless, but each exam serves a purpose. Take Step 3 early in PGY-1 while board-style knowledge is fresh. Use ITE scores as a diagnostic tool, not a source of anxiety. Understand your specialty's board pathway and plan accordingly. And budget for MOC costs — they are a permanent line item in your career.`,
  },
  {
    slug: 'budgeting-taxes-nyc',
    title: 'How to Budget on a Resident Salary in NYC',
    description:
      'Real take-home math, line-by-line budget, moonlighting taxes, and the WCI waterfall.',
    category: 'financial',
    readTime: '16 min',
    iconName: 'Wallet',
    content: `# How to Budget on a Resident Salary in NYC

New York City is one of the most expensive places in America to train. You will earn a salary that feels comfortable in rural Ohio and barely survivable in Manhattan. The key is understanding exactly where your money goes — and making intentional choices about what you can and cannot afford.

---

## The Real Take-Home Math

**Starting salary: $75,000 gross (typical PGY-1 in NYC, 2026)**

Here is what actually hits your bank account:

| Deduction | Annual | Monthly |
|-----------|--------|---------|
| Federal income tax | $7,850 | $654 |
| NY State income tax | $3,600 | $300 |
| NYC city income tax | $2,250 | $188 |
| Social Security (6.2%) | $4,650 | $388 |
| Medicare (1.45%) | $1,088 | $91 |
| Pre-tax 403(b) (if contributing) | $0-$3,000 | $0-$250 |
| Health/dental insurance | $1,200 | $100 |
| **Total deductions** | **~$20,638** | **~$1,720** |
| **Take-home pay** | **~$54,362** | **~$4,530** |

**Your effective tax rate is approximately 27%.** You lose more than one in four dollars before you see them.

New York is one of the few cities with **three layers of income tax** — federal, state, and city. That NYC city tax alone costs you ~$190/month that a resident in Texas or Florida would keep.

---

## Line-by-Line Sample Budget

On $4,500/month take-home, here is a realistic NYC budget:

| Category | Solo | With Roommate |
|----------|------|---------------|
| **Rent** | $2,200 | $1,500 |
| **Utilities (electric, internet)** | $120 | $80 |
| **Phone** | $50 | $50 |
| **Groceries** | $400 | $350 |
| **Transportation (MetroCard)** | $132 | $132 |
| **Dining out / coffee** | $200 | $200 |
| **Laundry** | $60 | $60 |
| **Subscriptions (streaming, etc.)** | $30 | $30 |
| **Personal care / clothing** | $75 | $75 |
| **Roth IRA** | $625 | $625 |
| **Emergency fund** | $200 | $200 |
| **Miscellaneous** | $150 | $150 |
| **Total** | **$4,242** | **$3,452** |
| **Remaining** | **$258** | **$1,048** |

**The roommate difference is enormous.** Living with a roommate saves $600-$800/month — roughly $8,000/year. That is the difference between barely scraping by and comfortably funding a Roth IRA.

---

## The Roommate Math

A studio in most Manhattan-adjacent neighborhoods runs $2,200-$2,800/month. A two-bedroom in the same area is $2,800-$3,500, split between two people.

**Your share with a roommate: $1,400-$1,750/month**

Finding the right roommate:
- **Co-residents:** Best option. Same schedule, mutual understanding of 80-hour weeks.
- **Program GroupMe/WhatsApp:** Most programs create a group chat after Match Day. Post early.
- **Listings app:** SpareRoom, Roomi, or Facebook groups for NYC medical residents
- **Avoid strangers on Craigslist** if possible — you need reliability when your schedule is unpredictable

---

## Moonlighting

Starting PGY-2 (and sometimes late PGY-1), many programs allow moonlighting. This is one of the most effective ways to improve your financial position.

### What It Pays
- **Internal moonlighting (your hospital):** $75-$125/hour — convenient, W-2 income
- **External moonlighting (urgent care, telemedicine):** $100-$200/hour — 1099 income
- **Typical moonlighting income:** $10,000-$25,000/year

### Tax Implications

**Internal moonlighting (W-2):** Taxes are withheld normally. You may owe more at tax time because the additional income pushes you into a higher bracket.

**External moonlighting (1099):** You are an independent contractor. In addition to income tax, you owe **15.3% self-employment tax** (Social Security + Medicare, both halves). On $20K of 1099 income, that is an additional ~$3,060 in taxes you would not pay on W-2 income.

Set aside **30-35% of 1099 moonlighting income** for taxes. Consider making quarterly estimated tax payments to avoid an IRS penalty.

**PSLF impact:** Moonlighting income increases your AGI, which increases IDR payments. If pursuing PSLF, calculate whether the extra income outweighs the higher loan payments.

---

## The White Coat Investor Financial Waterfall

The WCI waterfall is the standard priority framework for physician finances. Adapted for residents:

1. **Live like a resident** — even when moonlighting income arrives
2. **Small emergency fund** — $5,000-$10,000 in a high-yield savings account
3. **Employer retirement match** — capture any 403(b) match (free money)
4. **Pay off high-interest debt** — credit cards, personal loans (NOT student loans if pursuing PSLF)
5. **HSA** — if available through your benefits
6. **Roth IRA** — $7,500/year maximum
7. **Additional retirement contributions** — pre-tax 403(b) if pursuing PSLF
8. **Taxable investing or extra debt payments** — only after all above are funded

**For most residents, reaching step 6 (Roth IRA) is ambitious and sufficient.** Steps 7-8 are aspirational during training.

---

## Budgeting Tools

### YNAB (You Need A Budget) — $99/year
The gold standard for zero-based budgeting. Every dollar gets assigned a job. Learning curve is steep but it fundamentally changes how you think about money. Best for people who want control.

### Monarch Money — $99/year
Clean interface, automatic transaction categorization, joint budgeting for couples. Less hands-on than YNAB. Best for people who want visibility without micromanagement.

### Empower (formerly Personal Capital) — Free
Best for investment tracking and net worth monitoring. Budgeting features are basic. Good complement to YNAB or Monarch.

### A Simple Spreadsheet — Free
Google Sheets or Excel. Track income, fixed expenses, variable expenses. Update monthly. No bells and whistles, but surprisingly effective if you actually do it.

**The best budgeting tool is the one you actually use.** If YNAB feels overwhelming, start with a spreadsheet. The goal is awareness, not perfection.

---

## NYC-Specific Tax Strategies

- **Pre-tax 403(b) contributions** reduce your state and city tax burden in addition to federal. A $5,000 contribution saves ~$250 in NY state tax and ~$165 in NYC city tax on top of federal savings.
- **Student loan interest deduction** ($2,500 max) phases out above $85K MAGI, so most residents benefit. If married filing separately, this deduction is not available.
- **Commuter benefits** — many hospitals offer pre-tax transit benefits. You can set aside up to $325/month pre-tax for transit, saving ~$1,200/year in taxes.
- **NY state and city taxes are fully deductible on federal returns** up to the $10,000 SALT cap. This matters more as an attending.

---

## The Bottom Line

On $4,500/month take-home in NYC, there is not much margin for error. A roommate adds $700+/month of breathing room. Moonlighting adds $800-$2,000/month but comes with tax complexity. The WCI waterfall gives you a clear priority list so you do not have to agonize over every dollar. And whatever tool you choose — YNAB, Monarch, or a plain spreadsheet — the act of tracking your spending is worth more than the tool itself.`,
  },
  {
    slug: 'nyc-housing-guide',
    title: 'Finding Housing as a Resident in NYC',
    description:
      'Neighborhood deep dives, broker fees, the 40x rule, guarantors, and where to actually live.',
    category: 'lifestyle',
    readTime: '17 min',
    iconName: 'Home',
    content: `# Finding Housing as a Resident in NYC

Finding an apartment in New York City is a full-contact sport. You are competing against thousands of applicants, navigating arcane financial requirements, and trying to do it all remotely before you have started earning a paycheck. This guide covers everything: when to start looking, where to live, how to qualify, and what to watch out for.

---

## Start on Match Day

Seriously. The NYC rental market moves fast, and your timeline is compressed. Here is the schedule:

- **Match Day (mid-March):** Start researching neighborhoods. Join your co-resident group chat and ask who wants to be roommates.
- **April-May:** Browse listings to calibrate your expectations. Learn the neighborhoods.
- **Late May-June:** Start actively searching. Most listings are for occupancy 2-4 weeks from posting.
- **Early-to-mid June:** Sign a lease. Move-in dates of June 15-25 give you time to settle before July 1.

Do not wait until late June. The best apartments get snapped up quickly, and you do not want to be apartment hunting during orientation week.

---

## Rent, Don't Buy

This should be obvious, but occasionally someone asks. **Do not buy property during residency.** You do not have a down payment, your income will change dramatically in 3-5 years, you may relocate for fellowship, and the transaction costs of buying and selling would erase any equity gains. Rent for now.

---

## The 30% Rule Is Impossible in NYC

The standard financial advice is to spend no more than 30% of gross income on housing. On a $75K salary, that is $1,875/month.

The median one-bedroom apartment in Manhattan is over $4,000/month. In Brooklyn, it is $3,200. Even in the most affordable neighborhoods, you are looking at $1,800-$2,200 for a one-bedroom.

**Reality:** Most NYC residents spend 35-50% of take-home pay on housing, or they get a roommate. The 30% rule was not designed for New York. Adjust accordingly and compensate by being disciplined in other spending categories.

---

## Neighborhood Deep Dives

### Sunset Park, Brooklyn — ~$1,800/1BR
- **Commute to NYU Langone:** 45-55 min via N/R to Kips Bay, or D to 34th
- **Commute to NYP-Lower Manhattan:** 35-45 min
- **Vibe:** Diverse, family-oriented, excellent food (Chinatown and Latin American cuisine), Industry City for coffee/coworking
- **Pros:** Genuinely affordable, large apartments, neighborhood feel
- **Cons:** Long commute, limited nightlife, farther from co-residents in Manhattan

### Bay Ridge, Brooklyn — ~$2,100/1BR
- **Commute to NYU Langone:** 50-60 min via R train
- **Vibe:** Quiet, residential, waterfront access, feels like a small town within NYC
- **Pros:** Spacious apartments, safe, good restaurants, close to Shore Road park and running paths
- **Cons:** One of the longest commutes, can feel isolated from the rest of the city

### Kips Bay / Murray Hill, Manhattan — ~$4,300/1BR (or ~$2,200 with roommate)
- **Commute to NYU Langone:** 10-15 min walk or one subway stop
- **Vibe:** Young professional, convenience-oriented, plenty of restaurants and bars
- **Pros:** Walk to work (invaluable on 28-hour call days), surrounded by co-residents, easy social life
- **Cons:** Expensive, smaller apartments, noisy

### Washington Heights, Manhattan — ~$1,900/1BR
- **Commute to NYP-Columbia:** 5-10 min walk
- **Commute to NYU Langone:** 40-50 min via A/1 train
- **Vibe:** Dominican culture, The Cloisters, Fort Tryon Park, affordable by Manhattan standards
- **Pros:** Affordable, great if training at Columbia, beautiful parks
- **Cons:** Far from midtown/downtown, limited subway options

### Astoria, Queens — ~$2,200/1BR
- **Commute to NYU Langone:** 30-40 min via N/W
- **Vibe:** Diverse food scene, young professional, lively but not chaotic
- **Pros:** Good balance of price, space, and commute. Strong restaurant and bar scene.
- **Cons:** Not as cheap as it used to be, can be crowded

---

## The 40x Income Rule

Most NYC landlords require that your **annual gross income is at least 40 times the monthly rent.** On a $75K salary, you qualify for apartments up to **$1,875/month**.

This creates an obvious problem: nearly no one-bedroom apartment in NYC rents for $1,875. Solutions:

### Option 1: Roommate
Split a $3,400 two-bedroom and each person qualifies for their $1,700 share.

### Option 2: Guarantor
A guarantor (usually a parent) cosigns the lease. Most landlords require the guarantor to earn **80x the monthly rent** in annual income. For a $2,200 apartment, your guarantor needs to earn $176,000/year.

### Option 3: NYU Lease Guarantor Program
NYU Langone and some other academic medical centers offer an **institutional guarantor program** for residents who cannot meet the 40x rule and do not have a personal guarantor. Ask your GME office about this — it can be the difference between getting your preferred apartment and being rejected.

### Option 4: Institutional Housing
Some programs offer subsidized housing. NYU has housing at Alumni Hall and other buildings. Columbia offers housing in Washington Heights. These are often the most affordable options, though availability is limited and apartments can be small or dated.

---

## The FARE Act and Broker Fees

New York's **FARE Act** (effective 2025) shifted broker fees from tenants to landlords in most cases. Previously, tenants routinely paid 12-15% of annual rent (a $3,000-$4,500 upfront cost) to a broker they did not hire.

**Current rules:** If the landlord hires the broker, the landlord pays the fee. If you hire a broker yourself to help you search, you pay. In practice, most listings now advertise "no fee" apartments.

**However:** Some landlords have simply raised rents to offset the fee. And if you use a buyer's broker to help you search, you will still pay. For most residents, searching on StreetEasy, Zillow, or Apartments.com without a broker is the most cost-effective approach.

---

## Move-In Costs

Budget for the following upfront costs:

| Item | Typical Cost |
|------|-------------|
| First month's rent | $1,800-$2,200 |
| Security deposit (1 month) | $1,800-$2,200 |
| Broker fee (if applicable) | $0-$3,600 |
| Moving costs | $300-$800 |
| Basic furnishings | $500-$1,500 |
| **Total** | **$4,400-$10,300** |

Many residents use their first paycheck advance or a small personal loan to cover move-in costs. Some programs offer a relocation stipend ($500-$1,500). Ask your GME office.

---

## Roommate Strategies

The financial case for a roommate is overwhelming ($600-$800/month savings), but compatibility matters. Tips:

- **Find a co-resident** — shared understanding of irregular hours, similar lifestyle
- **Discuss expectations early** — cleanliness, guests, noise, shared vs. separate groceries
- **Two-bedroom is ideal** — studios with a temporary wall partition technically violate building codes and lack real privacy
- **Both names on the lease** — protects both parties if one needs to move

---

## The Bottom Line

Housing is your biggest expense and your biggest quality-of-life decision. Start looking on Match Day, get a roommate if you can tolerate it, and prioritize commute time over apartment aesthetics. A 45-minute subway commute after a 28-hour shift is brutal. If you can walk to work, your life during intern year will be meaningfully better — even if the apartment is smaller than you would like.`,
  },
  {
    slug: 'intern-year-survival',
    title: 'The Intern Year Survival Guide',
    description:
      'Impostor syndrome, night float, clinical tips, mental health, and what to expect on July 1st.',
    category: 'lifestyle',
    readTime: '15 min',
    iconName: 'Heart',
    content: `# The Intern Year Survival Guide

July 1st is simultaneously the most exciting and terrifying day of your medical career. Yesterday you were a medical student. Today you write real orders. Nurses call you for real problems. Patients depend on you for real decisions. The gap between what you know and what you are expected to do has never felt wider.

Here is what to expect and how to survive it.

---

## The July 1st Transition

The first two weeks are chaos — and that is normal. You will fumble with the EMR, forget where the supply room is, take 30 minutes to put in an order that will take you 30 seconds by October, and feel convinced that you are the least prepared intern in history.

You are not. Every intern feels this way. Every senior resident remembers feeling this way. The nurses know it is July, and the good ones will guide you through it. Accept help gracefully.

**What to do on Day 1:**
- Introduce yourself to every nurse on your unit by name
- Find the code cart, crash cart, and nearest fire extinguisher
- Learn how to place a consult and order labs in the EMR
- Identify your senior resident and establish how they want to be contacted (text, page, call)
- Eat lunch, even when you think you cannot

---

## Impostor Syndrome

Research shows that **33-44% of medical trainees** experience impostor syndrome — the persistent belief that you are less competent than others perceive you to be and that you will eventually be "found out."

Impostor syndrome is more common among:
- First-generation physicians
- Women in male-dominated specialties
- Underrepresented minorities in medicine
- High achievers (which describes every person who made it through medical school)

**The truth:** You matched. A committee of physicians reviewed your application and decided you belonged in their program. They were not wrong. You do not need to feel confident to be competent. Competence will come. Confidence follows.

**What helps:**
- Name it when you feel it ("This is impostor syndrome, not reality")
- Talk to co-interns — you will discover everyone feels the same way
- Track your wins — keep a brief note of things you handled well each week
- Seek feedback from senior residents — specific feedback replaces vague anxiety

---

## The 80-Hour Work Week

ACGME duty hour regulations:

- **80 hours per week** averaged over 4 weeks
- **No more than 24 hours** of continuous duty + 4 hours for handoff
- **One day off per 7** averaged over 4 weeks (this is the minimum — some programs do better)
- **10 hours off** between shifts
- **No more than every 3rd night** on in-house call averaged over 4 weeks

**Reality check:** Some rotations will feel like more than 80 hours. Some weeks genuinely are. Track your hours — most programs use an electronic logging system. If violations are consistent, report them. ACGME takes this seriously, and you are not being difficult by reporting.

---

## Night Float Tips

Night float is uniquely disorienting. You are making decisions in the middle of the night, often with less backup, on patients you do not know.

**Sleep strategy:**
- Blackout curtains (non-negotiable, $20 on Amazon)
- Consistent sleep schedule — sleep 8am-4pm or 9am-5pm every day of your night stretch
- Melatonin 3mg before daytime sleep if needed
- Do NOT try to "flip back" to a daytime schedule on your days off during a night float block

**Clinical strategy:**
- Review the sign-out carefully before the night starts
- Know every patient's code status
- Identify the 2-3 sickest patients and check on them first
- Lower your threshold for calling your senior — night is not the time for independent heroics

---

## Clinical Survival Tips

### "When the nurse says come look at the patient, RUN"
This is the most important piece of clinical advice you will receive. Experienced nurses have seen hundreds of patients decompensate. If they are concerned enough to call you, the patient is sicker than you think. Go immediately. Do not finish your note first.

### The Overnight Essentials
- **Chest pain:** EKG, troponin, vitals, and eyeball the patient. Do not just order from the workroom.
- **Fever:** Blood cultures x2, UA with culture, chest X-ray, lactate. Consider lines as a source.
- **Altered mental status:** Glucose (stat, fingerstick), vitals, O2 sat, medications review. UTI in the elderly. Head CT if acute.
- **Hypotension:** Fluid bolus, assess volume status, check for bleeding, review drips, call your senior early.
- **Falls:** Neuro exam, assess for head strike, orthostatic vitals, check anticoagulation status.

### Time Management
- **Batch tasks:** Pre-round, see sick patients first, write notes on stable patients after rounds
- **Touch every patient** before rounds — even if briefly. Attendings will ask about patients you have not seen.
- **Write your to-do list on paper** — crossing things off is satisfying and prevents things from falling through cracks

---

## Burnout

Burnout rates in physicians jump from **4% at the start of medical school** to **55% during intern year.** This is not a personal failing — it is a structural problem with the training system.

Warning signs:
- Emotional exhaustion (feeling drained even after sleep)
- Depersonalization (referring to patients by diagnosis instead of name, cynicism)
- Loss of personal accomplishment (nothing feels meaningful)
- Irritability with family, friends, or colleagues that is new for you

**What to do:**
- Protect at least one non-medicine activity per week (exercise, hobby, social time)
- Use your vacation days — do not save them all for the end of the year
- Talk to your program director if you are struggling — most are more supportive than you expect
- If you are having thoughts of self-harm, call immediately:

**Physician Support Line: 1-888-409-0141** (free, confidential, staffed by psychiatrists who understand medical training — available 24/7)

**988 Suicide & Crisis Lifeline:** Call or text 988

---

## Relationships During Residency

Whether you are single, dating, married, or a parent, intern year strains relationships.

- **Communicate proactively** — share your schedule weekly so your partner knows what to expect
- **Protect at least one shared meal per week** — even if it is takeout at 9pm
- **If you are a parent:** Ask co-residents and seniors how they manage childcare logistics. There are solutions you have not thought of yet.
- **If you are single:** You will have less energy for dating than you expect. That is okay. This is temporary.

---

## Self-Care Basics

These sound simple. They are hard to maintain during intern year. That is exactly why they matter.

- **Sleep:** Prioritize 7 hours on non-call nights. Sleep debt is real and cumulative.
- **Exercise:** 20-30 minutes, 3 times per week. Walk, run, gym, yoga — anything. Exercise is the single most effective intervention for burnout and depression.
- **Nutrition:** Meal prep on your day off. Hospital cafeteria food is expensive and mediocre. Even basic meal prep saves money and improves energy.
- **Hydration:** Carry a water bottle. You will forget to drink water during 12-hour shifts.

---

## Financial Setup: First Month Checklist

- [ ] Set up direct deposit
- [ ] Enroll in health, dental, and vision insurance
- [ ] Enroll in 403(b) — at least enough for employer match
- [ ] Open a high-yield savings account for emergency fund
- [ ] Open a Roth IRA (Fidelity, Vanguard, or Schwab)
- [ ] Enroll in IDR plan for student loans
- [ ] Submit PSLF Employment Certification Form
- [ ] Get disability insurance quotes (ask about GSI window)

---

## The Bottom Line

Intern year is the hardest year of your professional life. It is also temporary. You will be a fundamentally different — and better — physician by June 30th. The discomfort you feel in July is the feeling of rapid growth. Lean on your co-residents, accept help from nurses and seniors, protect your sleep and your relationships, and ask for help before you need it.`,
  },
  {
    slug: 'post-match-checklist',
    title: 'The Complete Post-Match Checklist',
    description:
      'Everything to do between Match Day and Day 1 — timeline organized, nothing forgotten.',
    category: 'lifestyle',
    readTime: '12 min',
    iconName: 'CheckSquare',
    content: `# The Complete Post-Match Checklist

You matched. The euphoria is real — savor it. But between now and July 1st, there is a substantial list of administrative, financial, and logistical tasks to complete. Miss any of them and your first weeks of residency become unnecessarily stressful. This timeline keeps everything organized.

---

## Match Week (Mid-March)

### Celebrate
This is not a joke. You worked for this for a decade. Take a few days to be proud, to thank the people who supported you, and to enjoy the moment before the logistics begin.

### Connect with Co-Residents
- Join the program's group chat (WhatsApp, GroupMe, Signal — your program will set one up)
- Introduce yourself. Ask who is looking for roommates.
- If moving to a new city, ask current residents for neighborhood recommendations
- Find out who your chief residents are — they are your best resource for practical questions

### Notify Your Medical School
- Confirm graduation timeline and ensure your dean's office will send your final transcript and MSPE to your residency program
- Verify your diploma will arrive before residency start date

---

## April - May

### Onboarding Paperwork
Your program will send a packet of forms. Complete them promptly — delays here can delay your start.

- **Employment application** — personal info, emergency contacts, references
- **Background check authorization** — criminal, drug screening
- **I-9 employment verification** — bring passport or driver's license + Social Security card
- **Tax forms** (W-4, state withholding) — claim appropriate allowances
- **Direct deposit enrollment** — have your bank routing and account numbers ready
- **Benefits enrollment** — health insurance, dental, vision, life insurance, 403(b)
- **NPI number** — if you do not already have one, apply at nppes.cms.hhs.gov (free, takes 1-2 weeks)

### BLS/ACLS Certification
Most programs require current **BLS (Basic Life Support)** and **ACLS (Advanced Cardiovascular Life Support)** certification before your start date. Some programs arrange group sessions; others require you to complete it on your own.

- **BLS:** American Heart Association course, ~$65, 4 hours
- **ACLS:** AHA course, ~$200-$250, 12-16 hours
- If your certification expires before July 1, renew it now

### Medical License Application
- **Apply to your state medical board** — processing takes 8-16 weeks, so apply early
- **Training permit vs. full license:** Most states issue a training permit or limited license for residents. Your GME office will guide you on the specific type.
- **Required documents:** Medical school transcript, USMLE/COMLEX scores, photo ID, application fee ($200-$600 depending on state)
- **Step 3 timing:** Some states require Step 3 for a full medical license. Check your state's requirements.

### Student Loan Setup
- **Log into StudentAid.gov** — confirm your loan servicer, loan types, and balances
- **Apply for an IDR plan** (RAP or IBR) — you can submit your application before your first paycheck using estimated income
- **Do NOT go into forbearance** — interest accrues and months do not count toward PSLF
- **If consolidating FFEL loans:** Start now — consolidation takes 30-60 days

### Disability Insurance
- **Ask your GME office about GSI (Guaranteed Standard Issue) windows** — these typically open during orientation
- **Get quotes from an independent broker** — compare Guardian, MassMutual, The Standard
- **Buy a policy during PGY-1** — youngest age = lowest premiums, locked in for career
- **Target: $5,000/month own-occupation** with Future Purchase Option and COLA riders

### Housing
- **Start searching actively** in May-June (see NYC Housing Guide for details)
- **Budget for move-in costs:** First month + security deposit + broker fee (if applicable) = $4,000-$8,000
- **Consider roommates** — the financial benefit is significant
- **Sign lease with move-in date of June 15-20** — gives you time to settle before July 1

---

## June

### Move Early
Do not move on June 30th. Give yourself **at least one week** before orientation to:
- Unpack and make your apartment livable
- Learn your commute (try it during rush hour)
- Locate the nearest grocery store, pharmacy, and laundromat
- Set up your kitchen — you will not have time to do this once residency starts

### Set Up Utilities and Services
- **Electric and gas** — contact Con Edison (NYC) or your local utility
- **Internet** — schedule installation early. ISPs in NYC can take 1-2 weeks.
- **Renters insurance** — $12-$20/month, covers theft and liability. Required by most landlords.
- **Change your address** — USPS, driver's license (within 30 days in most states), banks, student loan servicer

### Tour the Hospital
Most programs include a hospital tour during orientation, but go on your own beforehand if possible.
- Find the ED, ICU, call rooms, cafeteria, resident lounge
- Locate the supply room, medication dispensing machines, code cart
- Figure out parking or bike storage if applicable
- Download the hospital's EMR mobile app

### Enroll in Benefits
During orientation, you will have a benefits enrollment window. Decisions to make:

- **Health insurance:** Compare plans. HDHP unlocks HSA but has higher out-of-pocket costs.
- **403(b):** Enroll at least enough to capture the employer match. Decide pre-tax vs. Roth based on PSLF strategy.
- **HSA:** If choosing HDHP, set up HSA and begin contributions
- **Life insurance:** Group term life through your employer is usually cheap ($5-$10/month for $100-$200K). Worth it if you have dependents.

### Submit Your First PSLF Employment Certification Form (ECF)
- Download the PSLF Form from StudentAid.gov
- Have your GME office or HR complete the employer section
- Submit to MOHELA
- **Do this in your first month** — it triggers your loans being transferred to MOHELA and starts the clock on PSLF tracking

### Financial Accounts
- **Open a high-yield savings account** — Ally, Marcus, or SoFi (4-5% APY as of 2026)
- **Open a Roth IRA** — Fidelity, Vanguard, or Schwab. Set up $625/month auto-contribution.
- **Set up a budget** — YNAB, Monarch, or a spreadsheet. Track spending from Day 1.

---

## What NOT to Do

### Don't Study
You just finished 4 years of medical school and passed Step exams. You will learn what you need to know on the job. Use this time to set up your life, not to pre-study.

### Don't Make Major Purchases
No new car. No expensive furniture. No luxury vacation on credit. Your financial picture is about to change dramatically (new income, new expenses, loan payments starting), and you need a few months of actual paychecks before you know what you can afford.

### Don't Ignore Your Loans
The single most common financial mistake new residents make is putting loans into forbearance because it is the default. Every month of forbearance costs you ~$1,300-$1,600 in accrued interest and one lost PSLF qualifying payment. Enroll in an IDR plan before your first payment is due.

### Don't Sign Up for Everything at Once
Financial advisors, insurance salespeople, and investment firms will target you aggressively. You are a future high earner and they know it. Say no to everything that is not: (1) disability insurance, (2) employer retirement match, or (3) a Roth IRA. Everything else can wait.

---

## The Bottom Line

The three months between Match Day and Day 1 are your last stretch of flexible time for years. Use them wisely. The administrative tasks — licensing, loan enrollment, insurance, housing — are not glamorous, but getting them right saves you thousands of dollars and countless hours of stress during intern year. Do the boring stuff now so you can focus on being a doctor in July.`,
  },
  {
    slug: 'fellowship-career-planning',
    title: 'Fellowship vs. Straight to Practice: Career Planning',
    description:
      'Fellowship ROI, academic vs private, contract negotiation, and the attending job search.',
    category: 'career',
    readTime: '16 min',
    iconName: 'Compass',
    content: `# Fellowship vs. Straight to Practice: Career Planning

At some point during residency — usually around PGY-2 or PGY-3 — you face the biggest career decision since choosing medical school: **Do you pursue fellowship or go straight to practice?**

This guide provides a framework for making that decision, the financial math behind it, and practical guidance on the attending job search and contract negotiation.

---

## The Fellowship Decision Framework

Fellowship is not inherently good or bad. It is an investment of 1-3 years of additional training (at resident salary) in exchange for subspecialty expertise, different job opportunities, and potentially higher long-term earnings. The question is whether the return justifies the cost for your specific situation.

### Reasons to Pursue Fellowship
- **Genuine interest in a subspecialty** — you love the work and want to do it daily
- **Required for your desired practice** — some jobs simply require fellowship training (cardiac anesthesia at an academic center, interventional cardiology, surgical subspecialties)
- **Academic career aspirations** — fellowship is essentially required for a faculty position
- **Higher earning potential** in certain subspecialties (but not all — see math below)
- **PSLF optimization** — additional years at a nonprofit = more qualifying payments at lower IDR amounts

### Reasons to Skip Fellowship
- **Opportunity cost** — 1-3 years of attending salary lost ($350K-$500K/year depending on specialty)
- **You are happy with general practice** — not everyone needs to subspecialize
- **Diminishing financial returns** — some fellowships do not significantly increase earning potential
- **Burnout** — if you are running on fumes at the end of residency, more training may do more harm than good
- **Geographic flexibility** — generalists can work almost anywhere; subspecialists may be limited to larger markets

---

## The Financial Math

The financial analysis of fellowship is straightforward: compare the present value of lifetime earnings with and without fellowship.

### Example: Anesthesiology

**Path A — General Anesthesiology (no fellowship):**
- Finish residency at age 32
- Starting salary: $400,000-$450,000 (private practice), $325,000-$375,000 (academic)
- Median career earnings by age 65: ~$525,000/year (inflation-adjusted average)

**Path B — Cardiac Anesthesiology Fellowship (1 year):**
- Fellowship salary: ~$90,000 (age 32)
- Starting salary: $425,000-$500,000 (higher complexity, higher demand)
- Median career earnings by age 65: ~$590,000/year (inflation-adjusted average)

**The gap:** Cardiac fellowship costs ~$310,000 in year-one opportunity cost (attending salary minus fellowship salary) but adds ~$65,000/year in higher earnings. **Breakeven: approximately 5-6 years** after fellowship completion.

### Example: Internal Medicine → Cardiology

**Path A — Hospitalist (no fellowship):**
- Starting salary: $280,000-$340,000
- Career median: ~$320,000/year

**Path B — Interventional Cardiology (3-year cardiology + 1-year interventional):**
- 4 years of fellowship at ~$85,000/year
- Starting salary: $550,000-$700,000
- Career median: ~$600,000/year

**The gap:** 4 years of fellowship costs ~$900,000 in opportunity cost, but the $280,000/year salary differential means **breakeven in ~4 years** after fellowship. Over a 30-year career, the interventional cardiologist earns $5-8 million more.

**Key insight:** Fellowships with large salary differentials (interventional cardiology, orthopedic subspecialties, Mohs surgery) have strong financial returns. Fellowships with small differentials (many internal medicine subspecialties, general surgery subspecialties with similar pay) may never pay off financially — pursue them for non-financial reasons.

---

## PSLF and Fellowship

If you are pursuing PSLF, fellowship actually helps your financial picture:

- Fellowship years are additional qualifying payments at **low IDR amounts** (based on fellow salary)
- More years of training = more payments made before you become a high-earning attending
- A resident/fellow doing 4 years residency + 2 years fellowship at a nonprofit has **72 PSLF qualifying payments** before their first attending paycheck — leaving only 48 months as an attending before forgiveness

**Important:** Your fellowship must be at a 501(c)(3) employer, and you must stay on an IDR plan and submit annual ECFs.

---

## Academic vs. Private Practice vs. Hospital-Employed

### Academic Medicine
- **Salary:** Lowest (typically 20-40% below private practice)
- **Benefits:** Teaching, research time, intellectual stimulation, sabbaticals, PSLF eligibility
- **Downsides:** Publish-or-perish pressure, committee work, slower salary growth
- **Best for:** Physicians who love teaching, want protected research time, or are pursuing PSLF

### Private Practice (Partnership Track)
- **Salary:** Highest ceiling, but often lower initially with a buy-in period
- **Benefits:** Autonomy, ownership equity, profit sharing, highest long-term earnings
- **Downsides:** Business risk, overhead, call burden, partnership politics, no PSLF
- **Best for:** Physicians who want autonomy and maximum earning potential

### Hospital-Employed
- **Salary:** Middle ground — higher than academic, lower ceiling than private
- **Benefits:** Predictable income, no business overhead, benefits package, some PSLF eligibility (if nonprofit hospital)
- **Downsides:** Less autonomy, productivity pressure (wRVU targets), potential for contract non-renewal
- **Best for:** Physicians who want stability without business ownership headaches

---

## The Attending Job Search Timeline

Start earlier than you think.

- **18 months before completion:** Begin exploring markets and practice types. Attend specialty conferences with job fairs.
- **12-15 months out:** Actively apply. Engage recruiters (they are free to you — employers pay them). Network with alumni and attendings in your target areas.
- **9-12 months out:** Interview. Visit practices. Meet potential partners.
- **6-9 months out:** Negotiate and sign a contract. Have it reviewed by a physician contract attorney.
- **3-6 months out:** Obtain state medical license, hospital credentials, DEA registration, malpractice insurance.

**Do not wait until your final year to start looking.** The best positions fill 12+ months in advance, and credentialing alone takes 3-6 months.

---

## Contract Negotiation Basics

Every attending contract has standard elements. Understand each one before signing.

### Base Salary and Compensation Model
- **Salary guarantee:** Fixed salary for years 1-2, then transition to productivity-based
- **Production-based (wRVU):** Pay tied to work Relative Value Units generated. Higher ceiling, more variability.
- **Know the conversion factor:** $45-$65/wRVU is typical depending on specialty

### Signing Bonus
- Common: $10,000-$50,000 (some surgical specialties higher)
- **Read the clawback clause:** If you leave within 1-3 years, you may owe it back pro-rated

### Non-Compete Clause
- Restricts where you can practice if you leave (typically 25-50 mile radius, 1-2 years)
- **Negotiate this aggressively** — overly broad non-competes can force you to relocate
- Some states (California, Colorado, Oklahoma) ban or severely limit physician non-competes

### Tail Coverage (Malpractice)
- If the employer provides **occurrence-based** malpractice insurance, you are covered for events that occurred during employment regardless of when the claim is filed
- If **claims-made**, you need **tail coverage** when you leave — this can cost $30,000-$100,000+
- **Negotiate tail coverage into your contract** — employer pays if you are terminated without cause, you pay if you voluntarily leave. Ideally, employer pays regardless.

### Other Key Terms
- **CME allowance:** $2,000-$5,000/year + 5-10 days off for conferences
- **Relocation assistance:** $5,000-$15,000
- **Loan repayment assistance:** Some employers (especially rural or underserved areas) offer $50,000-$200,000 in loan repayment
- **Partnership track:** If private practice, understand the timeline and buy-in cost
- **Termination clause:** How much notice is required? What constitutes "cause"?

**Always have a physician contract attorney review your contract.** Cost: $500-$1,500. This is the best money you will spend. They will catch unfavorable terms you would miss.

---

## Geographic Considerations

Where you practice affects your financial life as much as your salary:

- **State income tax:** A $400K salary in Texas (0% state tax) nets ~$30,000 more per year than the same salary in California (13.3% top rate)
- **Cost of living:** $400K in Nashville goes much further than $400K in San Francisco
- **Loan repayment programs:** Federal and state programs offer $50,000-$200,000 in loan repayment for working in underserved areas (NHSC, state-specific programs)
- **Malpractice environment:** Some states have tort reform (Texas, Indiana) with lower premiums; others (New York, Pennsylvania) have significantly higher costs

---

## CV Building During Residency

Regardless of your career path, start building your CV during training:

- **Publications:** Even 2-3 case reports or review articles strengthen your candidacy
- **Presentations:** Grand rounds, poster presentations at regional/national conferences
- **Quality improvement projects:** Increasingly valued by employers and for MOC
- **Leadership:** Chief resident, committee involvement, teaching awards
- **Board certification:** Pass your boards on the first attempt — this matters to employers

---

## The Bottom Line

Fellowship is a career decision, not just an educational one. Run the financial math, but do not let it be the only factor. The physician who loves their work and finds it meaningful will have a better career — financially and otherwise — than the one who optimized for salary alone. Start the job search early, negotiate your contract carefully, and hire an attorney to review it. The decisions you make in the last 12-18 months of training shape the next 30 years of your career.`,
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getGuidesByCategory(category: Guide['category']): Guide[] {
  return guides.filter((g) => g.category === category);
}

export function getRelatedGuides(slug: string, limit = 3): Guide[] {
  const guide = getGuideBySlug(slug);
  if (!guide) return [];
  return guides
    .filter((g) => g.slug !== slug && g.category === guide.category)
    .slice(0, limit);
}
