'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import {
  User,
  GraduationCap,
  PiggyBank,
  Home,
  ShieldCheck,
  Target,
  ArrowRight,
  ArrowLeft,
  Stethoscope,
  Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUserProfile, DEFAULT_PROFILE } from '@/hooks/useUserProfile';
import type { UserProfile } from '@/lib/types';

const STEPS = [
  { title: "Let's get to know you", subtitle: 'Basic info about you and your training path.', icon: User },
  { title: 'Your Student Loans', subtitle: 'We need the numbers to build your repayment strategy.', icon: GraduationCap },
  { title: 'Financial Snapshot', subtitle: 'A quick look at where you stand today.', icon: PiggyBank },
  { title: 'Life in Your New City', subtitle: 'Housing, commute, and day-to-day logistics.', icon: Home },
  { title: 'Protecting Yourself', subtitle: 'Insurance is boring until you need it.', icon: ShieldCheck },
  { title: 'Your Goals', subtitle: 'What does success look like for you?', icon: Target },
];

const SPECIALTIES = [
  'Anesthesiology', 'Dermatology', 'Emergency Medicine', 'Family Medicine',
  'Internal Medicine', 'Neurology', 'OB/GYN', 'Ophthalmology', 'Orthopedic Surgery',
  'Otolaryngology', 'Pathology', 'Pediatrics', 'Physical Medicine & Rehabilitation',
  'Plastic Surgery', 'Psychiatry', 'Radiology', 'General Surgery', 'Urology',
  'Vascular Surgery', 'Cardiothoracic Surgery', 'Neurosurgery',
];

const CONCERNS = [
  { value: 'student_loans', label: 'Paying off student loans' },
  { value: 'budgeting', label: 'Living on a resident salary' },
  { value: 'disability_insurance', label: 'Disability insurance' },
  { value: 'investing', label: 'Starting to invest' },
  { value: 'housing', label: 'Finding affordable housing' },
  { value: 'taxes', label: 'Tax optimization' },
  { value: 'family_planning', label: 'Family planning costs' },
  { value: 'burnout', label: 'Financial stress & burnout' },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { profile, updateProfile } = useUserProfile();
  const [step, setStep] = useState(0);

  const handleNext = (data: Partial<UserProfile>) => {
    updateProfile({ ...data, onboardingStep: step + 1 });
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      router.push('/dashboard');
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-card flex flex-col">
      {/* Top bar */}
      <div className="bg-white border-b border-card-border">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-2.5 mb-4">
            <Stethoscope className="w-5 h-5 text-accent-emerald" />
            <span className="font-bold text-lg text-primary">MedFin</span>
          </div>
          {/* Progress bar */}
          <div className="flex items-center gap-2">
            {STEPS.map((s, i) => (
              <div key={i} className="flex-1 flex items-center gap-2">
                <div
                  className={cn(
                    'h-1.5 rounded-full flex-1 transition-colors duration-300',
                    i < step ? 'bg-accent-emerald' : i === step ? 'bg-accent-blue' : 'bg-card-border'
                  )}
                />
              </div>
            ))}
          </div>
          <p className="text-xs text-muted mt-2">
            Step {step + 1} of {STEPS.length}
          </p>
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 flex flex-col">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full flex-1">
          <div className="flex items-center gap-3 mb-2">
            {(() => {
              const Icon = STEPS[step].icon;
              return <Icon className="w-6 h-6 text-accent-blue" />;
            })()}
            <h1 className="text-2xl sm:text-3xl font-bold text-primary">{STEPS[step].title}</h1>
          </div>
          <p className="text-muted mb-8">{STEPS[step].subtitle}</p>

          {step === 0 && <Step1 profile={profile} onSubmit={handleNext} />}
          {step === 1 && <Step2 profile={profile} onSubmit={handleNext} onBack={handleBack} />}
          {step === 2 && <Step3 profile={profile} onSubmit={handleNext} onBack={handleBack} />}
          {step === 3 && <Step4 profile={profile} onSubmit={handleNext} onBack={handleBack} />}
          {step === 4 && <Step5 profile={profile} onSubmit={handleNext} onBack={handleBack} />}
          {step === 5 && <Step6 profile={profile} onSubmit={handleNext} onBack={handleBack} />}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Reusable form components
// ---------------------------------------------------------------------------

function FieldLabel({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-foreground mb-1.5">
      {children}
    </label>
  );
}

function InputField({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        'w-full rounded-lg border border-card-border bg-white px-3 py-2.5 text-sm text-foreground placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-accent-blue/30 focus:border-accent-blue transition-colors',
        className
      )}
    />
  );
}

function SelectField({ className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        'w-full rounded-lg border border-card-border bg-white px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent-blue/30 focus:border-accent-blue transition-colors',
        className
      )}
    >
      {children}
    </select>
  );
}

function NavButtons({
  onBack,
  nextLabel = 'Continue',
  showBack = true,
}: {
  onBack?: () => void;
  nextLabel?: string;
  showBack?: boolean;
}) {
  return (
    <div className="flex items-center justify-between pt-8">
      {showBack && onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      ) : (
        <div />
      )}
      <button
        type="submit"
        className="inline-flex items-center gap-2 bg-accent-blue hover:bg-accent-blue/90 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors"
      >
        {nextLabel} <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 1: About You
// ---------------------------------------------------------------------------

function Step1({ profile, onSubmit }: { profile: UserProfile; onSubmit: (d: Partial<UserProfile>) => void }) {
  const { register, handleSubmit } = useForm({ defaultValues: profile });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <FieldLabel htmlFor="name">First Name</FieldLabel>
          <InputField id="name" {...register('name')} placeholder="Your first name" />
        </div>
        <div>
          <FieldLabel htmlFor="birthYear">Birth Year</FieldLabel>
          <InputField id="birthYear" type="number" {...register('birthYear', { valueAsNumber: true })} placeholder="1996" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <FieldLabel htmlFor="maritalStatus">Marital Status</FieldLabel>
          <SelectField id="maritalStatus" {...register('maritalStatus')}>
            <option value="single">Single</option>
            <option value="partnered">Partnered</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
          </SelectField>
        </div>
        <div>
          <FieldLabel htmlFor="dependents">Dependents</FieldLabel>
          <InputField id="dependents" type="number" min={0} {...register('dependents', { valueAsNumber: true })} />
        </div>
      </div>

      <div>
        <FieldLabel htmlFor="medicalSchool">Medical School</FieldLabel>
        <InputField id="medicalSchool" {...register('medicalSchool')} placeholder="e.g. SUNY Downstate" />
      </div>

      <div>
        <FieldLabel htmlFor="program">Residency Program</FieldLabel>
        <InputField id="program" {...register('program')} placeholder="e.g. NYP-Brooklyn Methodist Anesthesiology" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <FieldLabel htmlFor="specialty">Specialty</FieldLabel>
          <SelectField id="specialty" {...register('specialty')}>
            {SPECIALTIES.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </SelectField>
        </div>
        <div>
          <FieldLabel htmlFor="pgyLevel">PGY Level</FieldLabel>
          <SelectField id="pgyLevel" {...register('pgyLevel', { valueAsNumber: true })}>
            {[1, 2, 3, 4, 5, 6, 7].map(y => (
              <option key={y} value={y}>PGY-{y}</option>
            ))}
          </SelectField>
        </div>
      </div>

      <div>
        <FieldLabel htmlFor="fellowshipInterest">Fellowship Interest</FieldLabel>
        <InputField id="fellowshipInterest" {...register('fellowshipInterest')} placeholder="e.g. Critical Care, or None" />
      </div>

      <NavButtons showBack={false} />
    </form>
  );
}

// ---------------------------------------------------------------------------
// Step 2: Student Loans
// ---------------------------------------------------------------------------

function Step2({ profile, onSubmit, onBack }: { profile: UserProfile; onSubmit: (d: Partial<UserProfile>) => void; onBack: () => void }) {
  const { register, handleSubmit, watch, setValue } = useForm({ defaultValues: profile });
  const totalDebt = watch('totalDebt');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <FieldLabel>Total Student Loan Debt</FieldLabel>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min={0}
            max={500000}
            step={5000}
            value={totalDebt}
            onChange={e => setValue('totalDebt', Number(e.target.value))}
            className="flex-1"
          />
          <InputField
            type="number"
            className="w-32"
            {...register('totalDebt', { valueAsNumber: true })}
          />
        </div>
        <p className="text-xs text-muted mt-1">${(totalDebt || 0).toLocaleString()}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div>
          <FieldLabel htmlFor="federalDirect">Federal Direct</FieldLabel>
          <InputField id="federalDirect" type="number" {...register('federalDirect', { valueAsNumber: true })} placeholder="$120,000" />
        </div>
        <div>
          <FieldLabel htmlFor="gradPlus">Grad PLUS</FieldLabel>
          <InputField id="gradPlus" type="number" {...register('gradPlus', { valueAsNumber: true })} placeholder="$100,000" />
        </div>
        <div>
          <FieldLabel htmlFor="privateLoan">Private</FieldLabel>
          <InputField id="privateLoan" type="number" {...register('privateLoan', { valueAsNumber: true })} placeholder="$0" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <FieldLabel htmlFor="avgInterestRate">Avg Interest Rate (%)</FieldLabel>
          <InputField id="avgInterestRate" type="number" step={0.1} {...register('avgInterestRate', { valueAsNumber: true })} placeholder="6.5" />
          <p className="text-xs text-muted mt-1">Enter as decimal, e.g. 0.065 for 6.5%</p>
        </div>
        <div>
          <FieldLabel htmlFor="loanServicer">Loan Servicer</FieldLabel>
          <SelectField id="loanServicer" {...register('loanServicer')}>
            <option value="MOHELA">MOHELA</option>
            <option value="Aidvantage">Aidvantage</option>
            <option value="Nelnet">Nelnet</option>
            <option value="EdFinancial">EdFinancial</option>
            <option value="Other">Other</option>
          </SelectField>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <FieldLabel htmlFor="loanStatus">Loan Status</FieldLabel>
          <SelectField id="loanStatus" {...register('loanStatus')}>
            <option value="In Grace Period">In Grace Period</option>
            <option value="In Repayment">In Repayment</option>
            <option value="Deferment">Deferment</option>
            <option value="Forbearance">Forbearance</option>
          </SelectField>
        </div>
        <div>
          <FieldLabel htmlFor="filingStatus">Tax Filing Status</FieldLabel>
          <SelectField id="filingStatus" {...register('filingStatus')}>
            <option value="single">Single</option>
            <option value="married_jointly">Married Filing Jointly</option>
            <option value="married_separately">Married Filing Separately</option>
            <option value="head_of_household">Head of Household</option>
          </SelectField>
        </div>
      </div>

      <div>
        <FieldLabel htmlFor="spouseIncome">Spouse Income (if applicable)</FieldLabel>
        <InputField id="spouseIncome" type="number" {...register('spouseIncome', { valueAsNumber: true })} placeholder="0" />
      </div>

      <NavButtons onBack={onBack} />
    </form>
  );
}

// ---------------------------------------------------------------------------
// Step 3: Financial Snapshot
// ---------------------------------------------------------------------------

function Step3({ profile, onSubmit, onBack }: { profile: UserProfile; onSubmit: (d: Partial<UserProfile>) => void; onBack: () => void }) {
  const { register, handleSubmit } = useForm({ defaultValues: profile });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <FieldLabel htmlFor="savings">Total Savings</FieldLabel>
          <InputField id="savings" type="number" {...register('savings', { valueAsNumber: true })} placeholder="5000" />
        </div>
        <div>
          <FieldLabel htmlFor="otherDebts">Other Debts (car, credit card, etc.)</FieldLabel>
          <InputField id="otherDebts" type="number" {...register('otherDebts', { valueAsNumber: true })} placeholder="0" />
        </div>
      </div>

      <div>
        <FieldLabel htmlFor="creditScore">Credit Score Range</FieldLabel>
        <SelectField id="creditScore" {...register('creditScore')}>
          <option value="below-620">Below 620</option>
          <option value="620-659">620 - 659</option>
          <option value="660-689">660 - 689</option>
          <option value="690-719">690 - 719</option>
          <option value="720-759">720 - 759</option>
          <option value="760+">760+</option>
        </SelectField>
      </div>

      <div>
        <FieldLabel htmlFor="retirementBalance">Retirement Account Balance</FieldLabel>
        <InputField id="retirementBalance" type="number" {...register('retirementBalance', { valueAsNumber: true })} placeholder="0" />
        <p className="text-xs text-muted mt-1">401(k), IRA, Roth IRA, etc. combined</p>
      </div>

      <NavButtons onBack={onBack} />
    </form>
  );
}

// ---------------------------------------------------------------------------
// Step 4: Life in Your City
// ---------------------------------------------------------------------------

function Step4({ profile, onSubmit, onBack }: { profile: UserProfile; onSubmit: (d: Partial<UserProfile>) => void; onBack: () => void }) {
  const { register, handleSubmit, watch, setValue } = useForm({ defaultValues: profile });
  const rentBudget = watch('rentBudget');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <FieldLabel htmlFor="housingSituation">Housing Situation</FieldLabel>
        <SelectField id="housingSituation" {...register('housingSituation')}>
          <option value="looking">Looking for a place</option>
          <option value="renting">Already renting</option>
          <option value="with_family">Living with family</option>
          <option value="owns">Own a home</option>
        </SelectField>
      </div>

      <div>
        <FieldLabel>Monthly Rent Budget</FieldLabel>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min={800}
            max={4000}
            step={50}
            value={rentBudget}
            onChange={e => setValue('rentBudget', Number(e.target.value))}
            className="flex-1"
          />
          <InputField
            type="number"
            className="w-32"
            {...register('rentBudget', { valueAsNumber: true })}
          />
        </div>
        <p className="text-xs text-muted mt-1">${(rentBudget || 0).toLocaleString()}/month</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <FieldLabel htmlFor="hasCar">Do you have a car?</FieldLabel>
          <SelectField id="hasCar" {...register('hasCar')}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </SelectField>
        </div>
        <div>
          <FieldLabel htmlFor="carPayment">Monthly Car Payment</FieldLabel>
          <InputField id="carPayment" type="number" {...register('carPayment', { valueAsNumber: true })} placeholder="0" />
        </div>
      </div>

      <div>
        <FieldLabel htmlFor="multiSite">Multi-site rotations?</FieldLabel>
        <SelectField id="multiSite" {...register('multiSite')}>
          <option value="true">Yes — I rotate between campuses</option>
          <option value="false">No — single site</option>
        </SelectField>
      </div>

      <NavButtons onBack={onBack} />
    </form>
  );
}

// ---------------------------------------------------------------------------
// Step 5: Insurance
// ---------------------------------------------------------------------------

function Step5({ profile, onSubmit, onBack }: { profile: UserProfile; onSubmit: (d: Partial<UserProfile>) => void; onBack: () => void }) {
  const { register, handleSubmit } = useForm({ defaultValues: profile });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <FieldLabel htmlFor="hasDisability">Do you have own-occupation disability insurance?</FieldLabel>
        <SelectField id="hasDisability" {...register('hasDisability')}>
          <option value="no">No</option>
          <option value="yes">Yes</option>
          <option value="unsure">Not sure</option>
        </SelectField>
        <p className="text-xs text-muted mt-1">This is separate from any employer-provided short-term disability.</p>
      </div>

      <div>
        <FieldLabel htmlFor="hasLife">Do you have life insurance?</FieldLabel>
        <SelectField id="hasLife" {...register('hasLife')}>
          <option value="no">No</option>
          <option value="yes">Yes</option>
          <option value="unsure">Not sure</option>
        </SelectField>
      </div>

      <div>
        <FieldLabel htmlFor="healthPlan">Health Insurance Plan</FieldLabel>
        <InputField id="healthPlan" {...register('healthPlan')} placeholder="e.g. NYP Resident Plan - Aetna" />
      </div>

      <NavButtons onBack={onBack} />
    </form>
  );
}

// ---------------------------------------------------------------------------
// Step 6: Goals
// ---------------------------------------------------------------------------

function Step6({ profile, onSubmit, onBack }: { profile: UserProfile; onSubmit: (d: Partial<UserProfile>) => void; onBack: () => void }) {
  const { register, handleSubmit, watch, setValue } = useForm({ defaultValues: profile });
  const topConcerns = watch('topConcerns') || [];

  const toggleConcern = (value: string) => {
    const current = topConcerns;
    if (current.includes(value)) {
      setValue('topConcerns', current.filter((c: string) => c !== value));
    } else if (current.length < 4) {
      setValue('topConcerns', [...current, value]);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <FieldLabel htmlFor="careerVision">Career Vision</FieldLabel>
        <SelectField id="careerVision" {...register('careerVision')}>
          <option value="academic">Academic Medicine</option>
          <option value="private_practice">Private Practice</option>
          <option value="hospital_employed">Hospital Employed</option>
          <option value="undecided">Undecided</option>
        </SelectField>
      </div>

      <div>
        <FieldLabel htmlFor="geoPreference">Where do you want to live long-term?</FieldLabel>
        <SelectField id="geoPreference" {...register('geoPreference')}>
          <option value="northeast">Northeast</option>
          <option value="southeast">Southeast</option>
          <option value="midwest">Midwest</option>
          <option value="southwest">Southwest</option>
          <option value="west">West Coast</option>
          <option value="flexible">Flexible / Open</option>
        </SelectField>
      </div>

      <div>
        <FieldLabel>Top Concerns (select up to 4)</FieldLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          {CONCERNS.map(c => {
            const selected = topConcerns.includes(c.value);
            return (
              <button
                type="button"
                key={c.value}
                onClick={() => toggleConcern(c.value)}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-lg border text-sm text-left transition-colors',
                  selected
                    ? 'border-accent-blue bg-accent-blue/5 text-accent-blue font-medium'
                    : 'border-card-border bg-white text-foreground hover:border-accent-blue/30'
                )}
              >
                {selected && <Check className="w-4 h-4 flex-shrink-0" />}
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <FieldLabel htmlFor="financialStyle">Financial Style</FieldLabel>
          <SelectField id="financialStyle" {...register('financialStyle')}>
            <option value="minimalist">Minimalist — keep it simple</option>
            <option value="balanced">Balanced — practical optimization</option>
            <option value="maximizer">Maximizer — optimize everything</option>
          </SelectField>
        </div>
        <div>
          <FieldLabel htmlFor="riskTolerance">Risk Tolerance</FieldLabel>
          <SelectField id="riskTolerance" {...register('riskTolerance')}>
            <option value="conservative">Conservative</option>
            <option value="moderate">Moderate</option>
            <option value="aggressive">Aggressive</option>
          </SelectField>
        </div>
      </div>

      <NavButtons onBack={onBack} nextLabel="See My Plan" />
    </form>
  );
}
