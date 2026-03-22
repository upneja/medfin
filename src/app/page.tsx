'use client';

import Link from 'next/link';
import {
  Stethoscope,
  Landmark,
  Wallet,
  TrendingUp,
  Heart,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

const VALUE_PROPS = [
  {
    icon: Landmark,
    title: 'Loan Strategy',
    description:
      'PSLF vs. aggressive payoff — see exactly which path saves you the most money based on your specialty and career goals.',
  },
  {
    icon: Wallet,
    title: 'Budget Builder',
    description:
      'A realistic budget built for your city and salary. No guessing — we know what PGY-1s actually spend.',
  },
  {
    icon: TrendingUp,
    title: 'Career Projections',
    description:
      'Fellowship ROI, salary comparisons, and net worth projections across academic vs. private practice paths.',
  },
  {
    icon: Heart,
    title: 'Life Planning',
    description:
      'Insurance gaps, housing analysis, timeline milestones — the stuff they never taught you in med school.',
  },
];

const STATS = [
  { value: '140,000+', label: 'Residents in training' },
  { value: '$200K+', label: 'Average medical school debt' },
  { value: '75%', label: 'Report financial stress' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Stethoscope className="w-6 h-6 text-emerald-600" />
            <span className="font-bold text-xl text-slate-800 tracking-tight">MedFin</span>
          </div>
          <Link
            href="/onboarding"
            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="max-w-2xl">
            <p className="text-emerald-400 font-semibold text-sm tracking-wide uppercase mb-4">
              For medical residents, by people who get it
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              Your Financial Co-Pilot
              <br />
              <span className="text-emerald-400">for Residency</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/70 leading-relaxed mb-10 max-w-lg">
              You matched. Now plan the rest. MedFin gives you a personalized
              financial roadmap — loans, budget, insurance, career — built for
              your program, your city, your life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/onboarding"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl text-base transition-colors"
              >
                Get Started — It&apos;s Free
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-medium px-8 py-3.5 rounded-xl text-base transition-colors"
              >
                See Demo Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-12">
            {STATS.map(stat => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-20 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Everything you need, nothing you don&apos;t
            </h2>
            <p className="text-slate-500 mt-4 max-w-xl mx-auto text-lg">
              No sales pitches. No affiliate links. Just clear, personalized guidance
              for the most important financial years of your career.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {VALUE_PROPS.map(prop => (
              <div
                key={prop.title}
                className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                  <prop.icon className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{prop.title}</h3>
                <p className="text-slate-500 leading-relaxed">{prop.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-slate-50 border-y border-slate-200 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Three steps to a plan
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Tell us about you', desc: '5-minute onboarding covers your loans, program, and goals.' },
              { step: '2', title: 'Get your roadmap', desc: 'Personalized loan strategy, budget, timeline, and insurance analysis.' },
              { step: '3', title: 'Take action', desc: 'Clear next steps you can act on today — no financial advisor required.' },
            ].map(s => (
              <div key={s.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Built for new residents</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-lg mx-auto">
            {[
              'PSLF eligibility analysis',
              'IDR payment calculator',
              'NYC neighborhood housing guide',
              'Disability insurance advisor',
              'Fellowship ROI projections',
              'Net worth tracker',
            ].map(item => (
              <div key={item} className="flex items-center gap-2 text-sm text-slate-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl text-base mt-10 transition-colors"
          >
            Get Started — It&apos;s Free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Stethoscope className="w-4 h-4 text-emerald-600" />
            MedFin — Not financial advice. For educational purposes only.
          </div>
          <p className="text-xs text-slate-400">
            Made for residents who deserve better than a generic budget spreadsheet.
          </p>
        </div>
      </footer>
    </div>
  );
}
