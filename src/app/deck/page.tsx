'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  AlertTriangle,
  Search,
  User,
  Target,
  Users,
  ClipboardList,
  Scale,
  PiggyBank,
  Home,
  Calendar,
  Shield,
  TrendingUp,
  DollarSign,
  Code,
  Layers,
  Lightbulb,
  BookOpen,
  Rocket,
  Monitor,
  BarChart3,
  Map,
  Heart,
  ExternalLink,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Slide Components                                                   */
/* ------------------------------------------------------------------ */

function SlideTitle() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white px-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center">
          <GraduationCap className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-7xl font-bold tracking-tight">
          Med<span className="text-emerald-400">Fin</span>
        </h1>
      </div>
      <p className="text-2xl text-slate-300 mb-3 font-light">Your Financial Co-Pilot for Residency</p>
      <div className="w-24 h-1 bg-emerald-500 rounded-full mb-6" />
      <p className="text-lg text-slate-400">Business & Product Requirements</p>
    </div>
  );
}

function SlideProblem() {
  const stats = [
    { value: '140K+', label: 'Residents in training', color: 'text-blue-400' },
    { value: '$200K+', label: 'Average student debt', color: 'text-amber-400' },
    { value: '75%', label: 'Financially stressed', color: 'text-red-400' },
    { value: '0', label: 'Unified solutions exist', color: 'text-emerald-400' },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-slate-950 via-red-950/20 to-slate-900 text-white px-8">
      <div className="flex items-center gap-3 mb-10">
        <AlertTriangle className="w-8 h-8 text-amber-400" />
        <h2 className="text-5xl font-bold">The Problem</h2>
      </div>
      <div className="grid grid-cols-2 gap-8 max-w-3xl w-full mb-10">
        {stats.map((s) => (
          <div key={s.label} className="bg-slate-800/60 rounded-2xl p-8 text-center border border-slate-700">
            <p className={`text-5xl font-black mb-2 ${s.color}`}>{s.value}</p>
            <p className="text-slate-400 text-lg">{s.label}</p>
          </div>
        ))}
      </div>
      <p className="text-xl text-slate-400 max-w-2xl text-center leading-relaxed">
        79-95% of residents want financial education but <span className="text-amber-400 font-semibold">no standardized curriculum exists</span>.
        Major legislative changes (Grad PLUS elimination July 2026, SAVE plan dead) make guidance more critical than ever.
      </p>
    </div>
  );
}

function SlideMarketGap() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-900 text-white px-8">
      <div className="flex items-center gap-3 mb-10">
        <Search className="w-8 h-8 text-blue-400" />
        <h2 className="text-5xl font-bold">Market Gap</h2>
      </div>
      <div className="grid grid-cols-2 gap-8 max-w-4xl w-full">
        <div className="bg-slate-800/60 rounded-2xl p-8 border border-slate-700">
          <h3 className="text-2xl font-bold text-red-400 mb-6">What Exists</h3>
          <ul className="space-y-4 text-lg">
            <li className="flex items-start gap-3">
              <span className="text-red-400 mt-1">x</span>
              <span><span className="text-white font-semibold">White Coat Investor</span> — Generic blog content</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-400 mt-1">x</span>
              <span><span className="text-white font-semibold">AAMC FIRST</span> — Basic loan calculators</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-400 mt-1">x</span>
              <span><span className="text-white font-semibold">SoFi / Laurel Road</span> — Refinance sales tools</span>
            </li>
          </ul>
        </div>
        <div className="bg-emerald-900/30 rounded-2xl p-8 border border-emerald-700/50">
          <h3 className="text-2xl font-bold text-emerald-400 mb-6">What's Missing</h3>
          <ul className="space-y-4 text-lg">
            <li className="flex items-start gap-3">
              <span className="text-emerald-400 mt-1">+</span>
              <span>Personalized, <span className="text-emerald-400 font-semibold">mobile-first</span> planning</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-400 mt-1">+</span>
              <span>All-in-one: loans + housing + insurance + career</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-emerald-400 mt-1">+</span>
              <span>Program-specific data & recommendations</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function SlideAlif() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-slate-950 via-violet-950/20 to-slate-900 text-white px-8">
      <div className="flex items-center gap-3 mb-8">
        <User className="w-8 h-8 text-violet-400" />
        <h2 className="text-5xl font-bold">Meet Alif Manon</h2>
      </div>
      <p className="text-xl text-slate-400 mb-8">Our primary user persona</p>
      <div className="grid grid-cols-3 gap-6 max-w-4xl w-full">
        <div className="bg-slate-800/60 rounded-2xl p-6 border border-slate-700 text-center">
          <GraduationCap className="w-8 h-8 text-blue-400 mx-auto mb-3" />
          <p className="text-lg font-semibold mb-1">Education</p>
          <p className="text-slate-400">Rutgers Medical School</p>
        </div>
        <div className="bg-slate-800/60 rounded-2xl p-6 border border-slate-700 text-center">
          <Target className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
          <p className="text-lg font-semibold mb-1">Match</p>
          <p className="text-slate-400">NYU Brooklyn — Anesthesiology</p>
        </div>
        <div className="bg-slate-800/60 rounded-2xl p-6 border border-slate-700 text-center">
          <DollarSign className="w-8 h-8 text-amber-400 mx-auto mb-3" />
          <p className="text-lg font-semibold mb-1">Debt</p>
          <p className="text-amber-400 text-2xl font-black">$315K</p>
        </div>
      </div>
      <div className="mt-8 bg-slate-800/40 rounded-2xl p-6 max-w-4xl w-full border border-slate-700">
        <p className="text-lg text-slate-300 text-center leading-relaxed">
          Splitting time between <span className="text-blue-400 font-semibold">Manhattan & Brooklyn</span> campuses.
          Works 60-80 hrs/week. Overwhelmed by financial decisions.
          Wants someone to <span className="text-emerald-400 font-semibold italic">"just tell me what to do."</span>
        </p>
      </div>
    </div>
  );
}

function SlideValueProp() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-slate-950 via-emerald-950/20 to-slate-900 text-white px-8">
      <div className="flex items-center gap-3 mb-8">
        <Target className="w-8 h-8 text-emerald-400" />
        <h2 className="text-5xl font-bold">Core Value Proposition</h2>
      </div>
      <div className="bg-slate-800/60 rounded-2xl p-10 max-w-3xl border border-emerald-700/40 mb-8">
        <p className="text-3xl text-center font-light leading-relaxed text-slate-200">
          &ldquo;Tell me exactly what to do based on{' '}
          <span className="text-emerald-400 font-bold">MY debt</span>,{' '}
          <span className="text-blue-400 font-bold">MY program</span>,{' '}
          <span className="text-amber-400 font-bold">MY specialty</span>{' '}
          — not generic advice.&rdquo;
        </p>
      </div>
      <div className="grid grid-cols-3 gap-6 max-w-3xl w-full">
        {[
          { icon: <PiggyBank className="w-6 h-6" />, text: 'Personalized loan strategy' },
          { icon: <Home className="w-6 h-6" />, text: 'Location-aware budgeting' },
          { icon: <TrendingUp className="w-6 h-6" />, text: 'Career trajectory modeling' },
        ].map((item) => (
          <div key={item.text} className="flex flex-col items-center gap-2 text-center text-slate-400">
            <div className="text-emerald-400">{item.icon}</div>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlidePersonas() {
  const personas = [
    {
      title: 'The New Resident',
      color: 'text-blue-400',
      border: 'border-blue-700/40',
      bg: 'bg-blue-900/20',
      traits: ['Just matched', '$200K+ debt', 'Moving to new city', 'Needs "tell me what to do"'],
    },
    {
      title: 'The Mid-Resident',
      color: 'text-emerald-400',
      border: 'border-emerald-700/40',
      bg: 'bg-emerald-900/20',
      traits: ['PGY-2 or PGY-3', 'Optimizing setup', 'Fellowship vs attending', 'Career trajectory'],
    },
    {
      title: 'The Graduating Resident',
      color: 'text-amber-400',
      border: 'border-amber-700/40',
      bg: 'bg-amber-900/20',
      traits: ['Final year', 'Job search', 'PSLF vs refinance', '"Live like a resident" plan'],
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white px-8">
      <div className="flex items-center gap-3 mb-10">
        <Users className="w-8 h-8 text-blue-400" />
        <h2 className="text-5xl font-bold">User Personas</h2>
      </div>
      <div className="grid grid-cols-3 gap-8 max-w-5xl w-full">
        {personas.map((p) => (
          <div key={p.title} className={`${p.bg} rounded-2xl p-8 border ${p.border}`}>
            <h3 className={`text-2xl font-bold ${p.color} mb-6`}>{p.title}</h3>
            <ul className="space-y-3">
              {p.traits.map((t) => (
                <li key={t} className="text-slate-300 flex items-start gap-2">
                  <span className={`${p.color} mt-1`}>&bull;</span> {t}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideCUJ({ num, title, icon, gradient, items, highlight }: {
  num: number; title: string; icon: React.ReactNode; gradient: string;
  items: string[]; highlight?: string;
}) {
  return (
    <div className={`flex flex-col items-center justify-center h-full ${gradient} text-white px-8`}>
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <h2 className="text-4xl font-bold">CUJ-{num}: {title}</h2>
      </div>
      {highlight && (
        <p className="text-xl text-emerald-400 font-semibold mb-8">{highlight}</p>
      )}
      {!highlight && <div className="mb-8" />}
      <div className="grid grid-cols-2 gap-4 max-w-4xl w-full">
        {items.map((item, i) => (
          <div key={i} className="bg-slate-800/60 rounded-xl p-5 border border-slate-700 flex items-start gap-3">
            <span className="text-emerald-400 font-bold text-lg shrink-0">{i + 1}</span>
            <p className="text-slate-300">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideOnboarding() {
  return (
    <SlideCUJ
      num={1}
      title="Onboarding"
      icon={<ClipboardList className="w-8 h-8 text-blue-400" />}
      gradient="bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-900"
      highlight="6-step wizard, progressive disclosure, <15 min"
      items={[
        'Identity: Name, med school (Rutgers), program (NYU Brooklyn), specialty',
        'Loans: $315K total debt, interest rates, servicer, grace period status',
        'Financial Snapshot: Savings, credit score, retirement accounts',
        'Living Situation: Brooklyn housing, no car, multi-site rotations',
        'Insurance: Disability, life, health status check',
        'Goals: Post-residency vision, top concerns, financial style',
      ]}
    />
  );
}

function SlideLoanStrategy() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-slate-950 via-emerald-950/20 to-slate-900 text-white px-8">
      <div className="flex items-center gap-3 mb-8">
        <Scale className="w-8 h-8 text-emerald-400" />
        <h2 className="text-4xl font-bold">CUJ-2: Loan Strategy</h2>
      </div>
      <p className="text-xl text-slate-400 mb-8">Side-by-side comparison of 3 paths</p>
      <div className="grid grid-cols-3 gap-6 max-w-5xl w-full">
        {[
          {
            title: 'PSLF',
            color: 'text-emerald-400',
            border: 'border-emerald-700/40',
            bg: 'bg-emerald-900/20',
            details: ['120 qualifying payments', '4yr residency + 1yr fellowship + 5yr academic', 'IDR monthly payments', 'Remaining balance forgiven tax-free'],
          },
          {
            title: 'Aggressive Payoff',
            color: 'text-blue-400',
            border: 'border-blue-700/40',
            bg: 'bg-blue-900/20',
            details: ['Refinance after residency', 'Pay off in ~5 years', 'Higher monthly payments', 'No forgiveness needed'],
          },
          {
            title: 'Standard IDR',
            color: 'text-amber-400',
            border: 'border-amber-700/40',
            bg: 'bg-amber-900/20',
            details: ['20-25 year repayment', 'No PSLF enrollment', 'Lower monthly payments', 'Taxable forgiveness at end'],
          },
        ].map((s) => (
          <div key={s.title} className={`${s.bg} rounded-2xl p-6 border ${s.border}`}>
            <h3 className={`text-xl font-bold ${s.color} mb-4`}>{s.title}</h3>
            <ul className="space-y-2">
              {s.details.map((d) => (
                <li key={d} className="text-slate-300 text-sm flex items-start gap-2">
                  <span className={s.color}>&bull;</span> {d}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="text-lg text-emerald-400 mt-8 font-semibold">
        Recommendation: &ldquo;PSLF saves you $X vs. aggressive payoff&rdquo;
      </p>
    </div>
  );
}

function SlideBudget() {
  return (
    <SlideCUJ
      num={3}
      title="Budget Builder"
      icon={<PiggyBank className="w-8 h-8 text-emerald-400" />}
      gradient="bg-gradient-to-br from-slate-950 via-teal-950/20 to-slate-900"
      highlight="Pre-filled NYC budget, WCI waterfall, real-time adjustments"
      items={[
        'Pre-filled with NYC-specific costs: $1,800 rent, $140 transit, $350 groceries',
        'Income auto-calculated: $75K salary - taxes = $4,500/month take-home',
        'Visual income vs. expenses breakdown with color-coded health indicators',
        'WCI Waterfall: Emergency fund -> Roth IRA -> Disability insurance',
        'Real-time updates as user adjusts categories with sliders',
        'Savings rate calculation and financial health score',
      ]}
    />
  );
}

function SlideHousing() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-slate-950 via-orange-950/15 to-slate-900 text-white px-8">
      <div className="flex items-center gap-3 mb-8">
        <Home className="w-8 h-8 text-amber-400" />
        <h2 className="text-4xl font-bold">CUJ-4: Housing Analyzer</h2>
      </div>
      <div className="grid grid-cols-3 gap-6 max-w-5xl w-full mb-8">
        {[
          { name: 'Sunset Park', rent: '$1,800', commuteBK: '5 min walk', commuteMH: '50 min N/R', color: 'text-emerald-400', tag: 'Best Value' },
          { name: 'Bay Ridge', rent: '$2,100', commuteBK: '15 min bus', commuteMH: '55 min R', color: 'text-blue-400', tag: '' },
          { name: 'Kips Bay (Manhattan)', rent: '$4,300', commuteBK: '50 min N/R', commuteMH: '5 min walk', color: 'text-red-400', tag: 'Expensive' },
        ].map((n) => (
          <div key={n.name} className="bg-slate-800/60 rounded-2xl p-6 border border-slate-700">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-bold">{n.name}</h3>
              {n.tag && <span className={`text-xs px-2 py-1 rounded-full ${n.tag === 'Best Value' ? 'bg-emerald-900/50 text-emerald-400' : 'bg-red-900/50 text-red-400'}`}>{n.tag}</span>}
            </div>
            <p className={`text-3xl font-black ${n.color} mb-3`}>{n.rent}<span className="text-sm text-slate-500 font-normal">/mo</span></p>
            <p className="text-sm text-slate-400">NYU Brooklyn: {n.commuteBK}</p>
            <p className="text-sm text-slate-400">Manhattan: {n.commuteMH}</p>
          </div>
        ))}
      </div>
      <div className="bg-emerald-900/30 rounded-2xl p-6 max-w-3xl w-full border border-emerald-700/40 text-center">
        <p className="text-2xl font-bold text-emerald-400">Sunset Park saves $30,000/year vs Kips Bay</p>
      </div>
    </div>
  );
}

function SlideTimeline() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-slate-950 via-indigo-950/20 to-slate-900 text-white px-8">
      <div className="flex items-center gap-3 mb-8">
        <Calendar className="w-8 h-8 text-indigo-400" />
        <h2 className="text-4xl font-bold">CUJ-5: Timeline</h2>
      </div>
      <p className="text-xl text-slate-400 mb-8">4-year roadmap with financial milestones</p>
      <div className="grid grid-cols-4 gap-4 max-w-5xl w-full">
        {[
          { year: 'PGY-1', color: 'border-blue-500', items: ['Orientation', 'Set up IDR/PSLF', 'Buy disability insurance', 'Take Step 3'] },
          { year: 'CA-1', color: 'border-emerald-500', items: ['Simulation boot camp', 'Subspecialty rotations', 'BASIC Exam (June)', 'Annual PSLF cert'] },
          { year: 'CA-2', color: 'border-amber-500', items: ['Senior call', 'Fellowship exploration', 'ITE Exam', 'Roth IRA contributions'] },
          { year: 'CA-3', color: 'border-violet-500', items: ['Bellevue team captain', 'Fellowship/job interviews', 'Contract review', 'Graduation'] },
        ].map((y) => (
          <div key={y.year} className={`bg-slate-800/60 rounded-2xl p-5 border-t-4 ${y.color} border border-slate-700`}>
            <h3 className="text-xl font-bold mb-4">{y.year}</h3>
            <ul className="space-y-2">
              {y.items.map((it) => (
                <li key={it} className="text-sm text-slate-300 flex items-start gap-2">
                  <span className="text-slate-500">&bull;</span> {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideInsurance() {
  return (
    <SlideCUJ
      num={6}
      title="Insurance Advisor"
      icon={<Shield className="w-8 h-8 text-blue-400" />}
      gradient="bg-gradient-to-br from-slate-950 via-sky-950/20 to-slate-900"
      highlight="Gap analysis, own-occupation disability, specialty-specific risks"
      items={[
        'NYU provides: Group LTD (60% salary, NOT own-occupation), basic life (1.5x salary)',
        'Gap identified: Need individual own-occupation disability insurance',
        '"As an anesthesiologist, your hands are your career. 25% of physicians experience a 90+ day disability."',
        'Estimated cost: ~$100-$175/month for $5,000/month benefit',
        'Recommended carriers: Guardian, MassMutual, The Standard, Principal',
        'Dependents? Add term life insurance: $30-$60/month for $1-2M coverage',
      ]}
    />
  );
}

function SlideCareer() {
  return (
    <SlideCUJ
      num={7}
      title="Career Projections"
      icon={<TrendingUp className="w-8 h-8 text-emerald-400" />}
      gradient="bg-gradient-to-br from-slate-950 via-emerald-950/15 to-slate-900"
      highlight="$525K attending salary, fellowship ROI, net worth projection"
      items={[
        'Anesthesiology salary range: $400K (academic) to $700K+ (private practice)',
        'Fellowship impact: Cardiac +$60K, Pain +$15K, Critical Care +$25K',
        '"Live like a resident": keep $75K lifestyle on $525K = pay off $315K in <3 years',
        'Max retirement contributions + aggressive loan payoff',
        'Net worth projection: 10, 20, 30-year interactive visualization',
        'Visualizes the "light at the end of the tunnel"',
      ]}
    />
  );
}

function SlideAlifNumbers() {
  const numbers = [
    { label: 'PGY-1 Salary', value: '$75,000', sub: '/year', color: 'text-blue-400' },
    { label: 'Monthly Take-Home', value: '$4,500', sub: '/month', color: 'text-emerald-400' },
    { label: 'Rent (Sunset Park)', value: '$1,800', sub: '/month', color: 'text-amber-400' },
    { label: 'IDR Payment', value: '$429', sub: '/month', color: 'text-violet-400' },
    { label: 'PSLF Eligible', value: 'Yes', sub: 'NYU is 501(c)(3)', color: 'text-emerald-400' },
    { label: 'Attending Salary', value: '$525K', sub: 'projected', color: 'text-emerald-400' },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-slate-950 via-violet-950/20 to-slate-900 text-white px-8">
      <div className="flex items-center gap-3 mb-8">
        <DollarSign className="w-8 h-8 text-emerald-400" />
        <h2 className="text-5xl font-bold">Alif&apos;s Numbers</h2>
      </div>
      <div className="grid grid-cols-3 gap-6 max-w-4xl w-full mb-8">
        {numbers.map((n) => (
          <div key={n.label} className="bg-slate-800/60 rounded-2xl p-6 border border-slate-700 text-center">
            <p className="text-sm text-slate-500 uppercase tracking-wider mb-2">{n.label}</p>
            <p className={`text-4xl font-black ${n.color}`}>{n.value}</p>
            <p className="text-sm text-slate-500 mt-1">{n.sub}</p>
          </div>
        ))}
      </div>
      <div className="bg-slate-800/40 rounded-2xl p-5 max-w-4xl w-full border border-slate-700">
        <p className="text-center text-slate-400">
          NY State tax ~5.5% + NYC tax ~3.1% + Federal + FICA = effective take-home of <span className="text-emerald-400 font-bold">$4,500/month</span>
        </p>
      </div>
    </div>
  );
}

function SlideTechStack() {
  const tech = [
    { name: 'Next.js 16', desc: 'App Router, SSR', color: 'text-white' },
    { name: 'TypeScript', desc: 'Full-stack type safety', color: 'text-blue-400' },
    { name: 'Tailwind CSS', desc: 'Utility-first styling', color: 'text-cyan-400' },
    { name: 'Recharts', desc: 'Financial visualizations', color: 'text-emerald-400' },
    { name: 'Vercel', desc: 'Zero-config deployment', color: 'text-white' },
    { name: 'React Hook Form + Zod', desc: 'Form validation', color: 'text-violet-400' },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-slate-950 via-cyan-950/20 to-slate-900 text-white px-8">
      <div className="flex items-center gap-3 mb-10">
        <Code className="w-8 h-8 text-cyan-400" />
        <h2 className="text-5xl font-bold">Tech Stack</h2>
      </div>
      <div className="grid grid-cols-3 gap-6 max-w-4xl w-full">
        {tech.map((t) => (
          <div key={t.name} className="bg-slate-800/60 rounded-2xl p-6 border border-slate-700 text-center">
            <p className={`text-2xl font-bold ${t.color} mb-2`}>{t.name}</p>
            <p className="text-slate-400">{t.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideArchitecture() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-slate-950 via-indigo-950/15 to-slate-900 text-white px-8">
      <div className="flex items-center gap-3 mb-10">
        <Layers className="w-8 h-8 text-indigo-400" />
        <h2 className="text-5xl font-bold">Architecture</h2>
      </div>
      <div className="grid grid-cols-3 gap-8 max-w-5xl w-full">
        <div className="bg-blue-900/20 rounded-2xl p-6 border border-blue-700/40">
          <h3 className="text-xl font-bold text-blue-400 mb-4">Data Layer</h3>
          <p className="text-4xl font-black text-blue-400 mb-4">6</p>
          <p className="text-slate-400 mb-3">Calculation Engines</p>
          <ul className="space-y-1 text-sm text-slate-500">
            <li>IDR Calculator</li>
            <li>PSLF Scenario Engine</li>
            <li>Tax Estimation</li>
            <li>Budget Engine</li>
            <li>Housing Analysis</li>
            <li>Net Worth Projector</li>
          </ul>
        </div>
        <div className="bg-emerald-900/20 rounded-2xl p-6 border border-emerald-700/40">
          <h3 className="text-xl font-bold text-emerald-400 mb-4">UI Layer</h3>
          <p className="text-4xl font-black text-emerald-400 mb-4">10</p>
          <p className="text-slate-400 mb-3">Pages</p>
          <ul className="space-y-1 text-sm text-slate-500">
            <li>Landing, Onboarding</li>
            <li>Dashboard, Loans</li>
            <li>Budget, Housing</li>
            <li>Timeline, Insurance</li>
            <li>Career, Deck</li>
          </ul>
        </div>
        <div className="bg-amber-900/20 rounded-2xl p-6 border border-amber-700/40">
          <h3 className="text-xl font-bold text-amber-400 mb-4">Test Suite</h3>
          <p className="text-4xl font-black text-amber-400 mb-4">69</p>
          <p className="text-slate-400 mb-3">Tests Passing</p>
          <ul className="space-y-1 text-sm text-slate-500">
            <li>Unit tests (calculations)</li>
            <li>CUJ integration tests</li>
            <li>Component tests</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function SlideDecisions() {
  const decisions = [
    { decision: 'SQLite V1', why: 'Zero-config for prototype; Prisma makes migration to PostgreSQL trivial', icon: <Layers className="w-5 h-5 text-blue-400" /> },
    { decision: 'Client-side calculations', why: 'No server round-trips, instant feedback, works offline', icon: <Code className="w-5 h-5 text-emerald-400" /> },
    { decision: 'No Plaid integration', why: 'Reduces security scope, faster to ship V1', icon: <Shield className="w-5 h-5 text-amber-400" /> },
    { decision: 'Hardcoded data first', why: 'Faster to prototype, no API costs, data is relatively static', icon: <Lightbulb className="w-5 h-5 text-violet-400" /> },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-slate-950 via-amber-950/15 to-slate-900 text-white px-8">
      <div className="flex items-center gap-3 mb-10">
        <Lightbulb className="w-8 h-8 text-amber-400" />
        <h2 className="text-5xl font-bold">Key Decisions</h2>
      </div>
      <div className="grid grid-cols-2 gap-6 max-w-4xl w-full">
        {decisions.map((d) => (
          <div key={d.decision} className="bg-slate-800/60 rounded-2xl p-6 border border-slate-700 flex items-start gap-4">
            <div className="shrink-0 mt-1">{d.icon}</div>
            <div>
              <p className="text-xl font-bold mb-2">{d.decision}</p>
              <p className="text-slate-400">{d.why}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideResearch() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-slate-950 via-teal-950/15 to-slate-900 text-white px-8">
      <div className="flex items-center gap-3 mb-10">
        <BookOpen className="w-8 h-8 text-teal-400" />
        <h2 className="text-5xl font-bold">Research Depth</h2>
      </div>
      <div className="grid grid-cols-3 gap-8 max-w-4xl w-full mb-8">
        {[
          { value: '7', label: 'Parallel Research Agents', color: 'text-teal-400' },
          { value: '80+', label: 'Sources Analyzed', color: 'text-blue-400' },
          { value: '3+', label: 'Community Platforms', color: 'text-emerald-400' },
        ].map((s) => (
          <div key={s.label} className="bg-slate-800/60 rounded-2xl p-8 border border-slate-700 text-center">
            <p className={`text-5xl font-black ${s.color} mb-2`}>{s.value}</p>
            <p className="text-slate-400">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="bg-slate-800/40 rounded-2xl p-6 max-w-4xl w-full border border-slate-700">
        <p className="text-center text-slate-400 text-lg">
          Deep dives into <span className="text-teal-400 font-semibold">Reddit</span>,{' '}
          <span className="text-blue-400 font-semibold">Student Doctor Network</span>,{' '}
          <span className="text-emerald-400 font-semibold">White Coat Investor</span>{' '}
          community insights, AAMC data, and legislative analysis
        </p>
      </div>
    </div>
  );
}

function SlideWhatWeBuilt() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-slate-950 via-emerald-950/20 to-slate-900 text-white px-8">
      <div className="flex items-center gap-3 mb-8">
        <Rocket className="w-8 h-8 text-emerald-400" />
        <h2 className="text-5xl font-bold">What We Built</h2>
      </div>
      <div className="grid grid-cols-2 gap-6 max-w-4xl w-full mb-8">
        <div className="bg-emerald-900/20 rounded-2xl p-8 border border-emerald-700/40 text-center">
          <p className="text-6xl font-black text-emerald-400 mb-2">7</p>
          <p className="text-xl text-slate-300">Critical User Journeys</p>
          <p className="text-slate-500 mt-2">All implemented end-to-end</p>
        </div>
        <div className="bg-blue-900/20 rounded-2xl p-8 border border-blue-700/40 text-center">
          <p className="text-6xl font-black text-blue-400 mb-2">69/69</p>
          <p className="text-xl text-slate-300">Tests Passing</p>
          <p className="text-slate-500 mt-2">Calculations, CUJs, components</p>
        </div>
      </div>
      <div className="bg-slate-800/40 rounded-2xl p-6 max-w-4xl w-full border border-slate-700">
        <p className="text-center text-lg text-slate-300">
          Live prototype with full onboarding, loan strategy engine, budget builder, housing analyzer, timeline, insurance advisor, and career projections
        </p>
      </div>
    </div>
  );
}

function SlideDemo() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-900 text-white px-8">
      <div className="flex items-center gap-3 mb-8">
        <Monitor className="w-8 h-8 text-blue-400" />
        <h2 className="text-5xl font-bold">Live Demo</h2>
      </div>
      <div className="bg-slate-800/60 rounded-2xl p-10 max-w-2xl w-full border border-blue-700/40 text-center mb-8">
        <a
          href="https://medfin-nine.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-3xl font-bold text-blue-400 hover:text-blue-300 transition-colors flex items-center justify-center gap-3"
        >
          medfin-nine.vercel.app
          <ExternalLink className="w-6 h-6" />
        </a>
      </div>
      <div className="grid grid-cols-2 gap-6 max-w-2xl w-full">
        <div className="bg-slate-800/60 rounded-2xl p-6 border border-slate-700 text-center">
          <div className="w-32 h-32 bg-white rounded-xl mx-auto mb-4 flex items-center justify-center">
            <div className="text-slate-900 text-xs font-mono text-center">
              <p className="font-bold text-sm mb-1">QR Code</p>
              <p>Scan to visit</p>
            </div>
          </div>
          <p className="text-slate-400">Scan to visit</p>
        </div>
        <div className="bg-slate-800/60 rounded-2xl p-6 border border-slate-700 text-center flex flex-col items-center justify-center">
          <Code className="w-8 h-8 text-slate-400 mb-3" />
          <p className="text-lg font-semibold mb-1">GitHub</p>
          <p className="text-slate-400">Source code available</p>
        </div>
      </div>
    </div>
  );
}

function SlideMetrics() {
  const metrics = [
    { value: '>70%', label: 'Onboarding completion rate', color: 'text-emerald-400', icon: <ClipboardList className="w-6 h-6" /> },
    { value: '<5 min', label: 'Time to first insight', color: 'text-blue-400', icon: <TrendingUp className="w-6 h-6" /> },
    { value: '>50%', label: '7-day retention', color: 'text-amber-400', icon: <Heart className="w-6 h-6" /> },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-slate-950 via-emerald-950/15 to-slate-900 text-white px-8">
      <div className="flex items-center gap-3 mb-10">
        <BarChart3 className="w-8 h-8 text-emerald-400" />
        <h2 className="text-5xl font-bold">Success Metrics</h2>
      </div>
      <div className="grid grid-cols-3 gap-8 max-w-4xl w-full">
        {metrics.map((m) => (
          <div key={m.label} className="bg-slate-800/60 rounded-2xl p-8 border border-slate-700 text-center">
            <div className={`${m.color} mx-auto mb-4 flex justify-center`}>{m.icon}</div>
            <p className={`text-5xl font-black ${m.color} mb-3`}>{m.value}</p>
            <p className="text-slate-400">{m.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 bg-slate-800/40 rounded-2xl p-5 max-w-4xl w-full border border-slate-700">
        <p className="text-center text-slate-400">
          Primary CUJ: Alif can complete onboarding and see personalized recommendations in <span className="text-emerald-400 font-bold">one session</span>
        </p>
      </div>
    </div>
  );
}

function SlideRoadmap() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-slate-950 via-blue-950/15 to-slate-900 text-white px-8">
      <div className="flex items-center gap-3 mb-10">
        <Map className="w-8 h-8 text-blue-400" />
        <h2 className="text-5xl font-bold">Roadmap</h2>
      </div>
      <div className="flex items-stretch gap-4 max-w-5xl w-full">
        {[
          {
            phase: 'V1 — Current',
            color: 'border-emerald-500',
            bg: 'bg-emerald-900/20',
            textColor: 'text-emerald-400',
            items: ['Full onboarding flow', '7 CUJs implemented', 'All calculation engines', 'Hardcoded data for NYU Anesthesiology', '69 passing tests'],
          },
          {
            phase: 'V2 — Scale',
            color: 'border-blue-500',
            bg: 'bg-blue-900/20',
            textColor: 'text-blue-400',
            items: ['User authentication (NextAuth)', 'Database persistence (PostgreSQL)', 'More programs & specialties', 'Budget tracking (manual)'],
          },
          {
            phase: 'V3 — Growth',
            color: 'border-violet-500',
            bg: 'bg-violet-900/20',
            textColor: 'text-violet-400',
            items: ['Plaid integration', 'Community features', 'Push notifications', 'Financial advisor matching', 'Contract review tools'],
          },
        ].map((p, i) => (
          <div key={p.phase} className="flex-1 flex flex-col">
            <div className={`${p.bg} rounded-2xl p-6 border-t-4 ${p.color} border border-slate-700 flex-1`}>
              <h3 className={`text-xl font-bold ${p.textColor} mb-4`}>{p.phase}</h3>
              <ul className="space-y-2">
                {p.items.map((item) => (
                  <li key={item} className="text-slate-300 text-sm flex items-start gap-2">
                    <span className={p.textColor}>&bull;</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            {i < 2 && (
              <div className="flex justify-center py-2">
                <ChevronRight className="w-6 h-6 text-slate-600" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideThankYou() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-slate-950 via-emerald-950/20 to-slate-900 text-white px-8">
      <div className="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center mb-6">
        <GraduationCap className="w-10 h-10 text-white" />
      </div>
      <h2 className="text-6xl font-bold mb-4">
        Thank You
      </h2>
      <p className="text-2xl text-slate-400 mb-10">Questions?</p>
      <div className="grid grid-cols-2 gap-6 max-w-md w-full">
        <a
          href="https://medfin-nine.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-slate-800/60 rounded-xl p-4 border border-slate-700 text-center hover:border-emerald-500/50 transition-colors"
        >
          <Monitor className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
          <p className="text-sm text-slate-400">Live App</p>
          <p className="text-emerald-400 text-xs mt-1">medfin-nine.vercel.app</p>
        </a>
        <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700 text-center">
          <Code className="w-6 h-6 text-blue-400 mx-auto mb-2" />
          <p className="text-sm text-slate-400">Source Code</p>
          <p className="text-blue-400 text-xs mt-1">GitHub</p>
        </div>
      </div>
      <div className="mt-12 w-24 h-1 bg-emerald-500 rounded-full" />
      <p className="mt-4 text-slate-600 text-sm">
        Med<span className="text-emerald-500">Fin</span> — Your Financial Co-Pilot for Residency
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Deck Component                                                */
/* ------------------------------------------------------------------ */

const slides = [
  SlideTitle,
  SlideProblem,
  SlideMarketGap,
  SlideAlif,
  SlideValueProp,
  SlidePersonas,
  SlideOnboarding,
  SlideLoanStrategy,
  SlideBudget,
  SlideHousing,
  SlideTimeline,
  SlideInsurance,
  SlideCareer,
  SlideAlifNumbers,
  SlideTechStack,
  SlideArchitecture,
  SlideDecisions,
  SlideResearch,
  SlideWhatWeBuilt,
  SlideDemo,
  SlideMetrics,
  SlideRoadmap,
  SlideThankYou,
];

export default function DeckPage() {
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  const goNext = useCallback(() => {
    setCurrent((c) => Math.min(c + 1, total - 1));
  }, [total]);

  const goPrev = useCallback(() => {
    setCurrent((c) => Math.max(c - 1, 0));
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        goNext();
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      }
      if (e.key === 'Home') {
        e.preventDefault();
        setCurrent(0);
      }
      if (e.key === 'End') {
        e.preventDefault();
        setCurrent(total - 1);
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev, total]);

  const CurrentSlide = slides[current];

  return (
    <div
      className="h-screen w-screen overflow-hidden relative select-none"
      onClick={goNext}
    >
      {/* Slide content with transition */}
      <div
        key={current}
        className="h-full w-full animate-fade-in"
        style={{
          animation: 'fadeSlideIn 0.35s ease-out',
        }}
      >
        <CurrentSlide />
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-800/80 backdrop-blur-sm rounded-full px-4 py-2 text-slate-400 text-sm font-mono z-10">
        {current + 1} / {total}
      </div>

      {/* Navigation arrows */}
      {current > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-800/60 hover:bg-slate-700/80 backdrop-blur-sm rounded-full p-3 text-slate-400 hover:text-white transition-all z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}
      {current < total - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-800/60 hover:bg-slate-700/80 backdrop-blur-sm rounded-full p-3 text-slate-400 hover:text-white transition-all z-10"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Progress bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-slate-800 z-10">
        <div
          className="h-full bg-emerald-500 transition-all duration-300 ease-out"
          style={{ width: `${((current + 1) / total) * 100}%` }}
        />
      </div>

      {/* Inline keyframe animation */}
      <style>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
