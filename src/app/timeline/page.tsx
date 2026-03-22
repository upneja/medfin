'use client';

import { useState } from 'react';
import {
  CalendarClock,
  Stethoscope,
  DollarSign,
  GraduationCap,
  ClipboardList,
  ChevronDown,
  ChevronUp,
  MapPin,
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useUserProfile } from '@/hooks/useUserProfile';
import { cn } from '@/lib/utils';

interface Milestone {
  id: string;
  pgyYear: number;
  month: number;
  category: 'clinical' | 'financial' | 'exam' | 'career' | 'administrative';
  title: string;
  description: string;
  actionItems: string[];
}

const MILESTONES: Milestone[] = [
  // PGY-1 / CA-1
  { id: 'm1', pgyYear: 1, month: 7, category: 'administrative', title: 'Start Residency', description: 'First day of intern year. Orientation, badge, EMR training.', actionItems: ['Complete HR paperwork', 'Set up direct deposit', 'Review benefits elections'] },
  { id: 'm2', pgyYear: 1, month: 7, category: 'financial', title: 'Submit PSLF ECF', description: 'Submit your first Employment Certification Form to MOHELA to start counting qualifying payments.', actionItems: ['Download PSLF form from studentaid.gov', 'Get HR signature', 'Submit to MOHELA'] },
  { id: 'm3', pgyYear: 1, month: 8, category: 'financial', title: 'Set Up IDR Plan', description: 'Enroll in SAVE or PAYE income-driven repayment to minimize payments during residency.', actionItems: ['Apply on studentaid.gov', 'Submit income documentation', 'Set up autopay for 0.25% rate reduction'] },
  { id: 'm4', pgyYear: 1, month: 9, category: 'financial', title: 'Get Disability Insurance', description: 'Purchase own-occupation disability insurance while you are young and healthy — premiums are lowest now.', actionItems: ['Get quotes from 2-3 carriers', 'Look for resident discount programs', 'Choose own-occupation, specialty-specific policy'] },
  { id: 'm5', pgyYear: 1, month: 10, category: 'financial', title: 'Open Roth IRA', description: 'You are in a low tax bracket now — contribute to a Roth IRA for tax-free growth.', actionItems: ['Open account at Vanguard/Fidelity/Schwab', 'Set up automatic monthly contributions', 'Choose a target-date fund or total market index'] },
  { id: 'm6', pgyYear: 1, month: 1, category: 'financial', title: 'Annual IDR Recertification', description: 'Recertify your income for IDR. File early in the year.', actionItems: ['Update income info on studentaid.gov', 'Consider filing taxes MFS if married'] },

  // PGY-2 / CA-1
  { id: 'm7', pgyYear: 2, month: 7, category: 'clinical', title: 'CA-1 Year Begins', description: 'First year in the operating room as anesthesiology resident. Heavy learning curve.', actionItems: ['Review department rotation schedule', 'Set up study schedule for ITE'] },
  { id: 'm8', pgyYear: 2, month: 7, category: 'financial', title: 'Annual PSLF ECF', description: 'Submit another Employment Certification Form. Do this every year.', actionItems: ['Download form', 'Get HR signature', 'Submit to MOHELA'] },
  { id: 'm9', pgyYear: 2, month: 2, category: 'exam', title: 'ITE Exam', description: 'In-Training Exam. Score benchmarks your knowledge for boards.', actionItems: ['Complete practice exams', 'Review weak areas'] },

  // PGY-3 / CA-2
  { id: 'm10', pgyYear: 3, month: 7, category: 'clinical', title: 'CA-2 Year Begins', description: 'More autonomy, subspecialty rotations. Start thinking about fellowship applications.', actionItems: ['Plan fellowship application timeline', 'Build subspecialty exposure'] },
  { id: 'm11', pgyYear: 3, month: 7, category: 'financial', title: 'Annual PSLF ECF', description: 'Third annual certification.', actionItems: ['Submit form to MOHELA'] },
  { id: 'm12', pgyYear: 3, month: 10, category: 'career', title: 'Fellowship Applications Open', description: 'If pursuing fellowship, start preparing applications.', actionItems: ['Update CV', 'Request letters of recommendation', 'Research programs'] },
  { id: 'm13', pgyYear: 3, month: 2, category: 'exam', title: 'ITE Exam', description: 'Second in-training exam. Aim for improvement over CA-1 score.', actionItems: ['Focused study plan', 'Practice questions'] },

  // PGY-4 / CA-3
  { id: 'm14', pgyYear: 4, month: 7, category: 'clinical', title: 'CA-3 Year Begins', description: 'Senior year. Leadership roles, final subspecialty rotations.', actionItems: ['Plan moonlighting if eligible', 'Start job search'] },
  { id: 'm15', pgyYear: 4, month: 7, category: 'financial', title: 'Annual PSLF ECF', description: 'Fourth annual certification. 48 qualifying payments down.', actionItems: ['Submit form', 'Verify payment count with MOHELA'] },
  { id: 'm16', pgyYear: 4, month: 9, category: 'exam', title: 'ABA Basic Exam', description: 'Part 1 of the American Board of Anesthesiology certification exam.', actionItems: ['Register for exam', 'Intensive board prep', 'Consider study group'] },
  { id: 'm17', pgyYear: 4, month: 1, category: 'career', title: 'Job Search / Contract Review', description: 'Start reviewing job offers and contracts.', actionItems: ['Hire a contract review attorney', 'Compare compensation packages', 'Negotiate terms'] },
  { id: 'm18', pgyYear: 4, month: 6, category: 'career', title: 'Graduation', description: 'Residency complete! Time for fellowship or attending life.', actionItems: ['Finalize job start date', 'Plan for income jump', 'Update financial plan for attending salary'] },
];

const CATEGORY_CONFIG = {
  clinical: { color: 'bg-blue-600', textColor: 'text-blue-600', icon: Stethoscope, label: 'Clinical' },
  financial: { color: 'bg-emerald-600', textColor: 'text-emerald-600', icon: DollarSign, label: 'Financial' },
  exam: { color: 'bg-amber-600', textColor: 'text-amber-600', icon: GraduationCap, label: 'Exam' },
  career: { color: 'bg-purple-500', textColor: 'text-purple-600', icon: ClipboardList, label: 'Career' },
  administrative: { color: 'bg-gray-400', textColor: 'text-gray-500', icon: ClipboardList, label: 'Admin' },
};

const YEAR_LABELS: Record<number, string> = {
  1: 'PGY-1 (Intern Year)',
  2: 'CA-1',
  3: 'CA-2',
  4: 'CA-3',
};

export default function TimelinePage() {
  const { profile } = useUserProfile();
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['m1', 'm2', 'm3']));

  const toggleExpand = (id: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const years = [1, 2, 3, 4];
  const currentPgy = profile.pgyLevel;

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Your Training Timeline</h1>
        <p className="text-slate-500 mt-1">
          Key milestones across your {profile.specialty} residency.
        </p>
      </div>

      {/* Category legend */}
      <div className="flex flex-wrap gap-4 mb-8">
        {Object.entries(CATEGORY_CONFIG).map(([key, cfg]) => (
          <div key={key} className="flex items-center gap-1.5 text-xs">
            <span className={cn('w-2.5 h-2.5 rounded-full', cfg.color)} />
            <span className="text-slate-500">{cfg.label}</span>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="space-y-10">
        {years.map(year => {
          const yearMilestones = MILESTONES.filter(m => m.pgyYear === year);
          const isCurrent = year === currentPgy;

          return (
            <div key={year}>
              {/* Year header */}
              <div className="flex items-center gap-3 mb-5">
                <div className={cn(
                  'px-3 py-1.5 rounded-lg text-sm font-semibold',
                  isCurrent ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-900'
                )}>
                  {YEAR_LABELS[year] || `PGY-${year}`}
                </div>
                {isCurrent && (
                  <div className="flex items-center gap-1 text-xs text-blue-600 font-medium">
                    <MapPin className="w-3.5 h-3.5" /> You are here
                  </div>
                )}
              </div>

              {/* Milestones */}
              <div className="relative ml-4 border-l-2 border-slate-200 pl-6 space-y-4">
                {yearMilestones.map(m => {
                  const cfg = CATEGORY_CONFIG[m.category];
                  const Icon = cfg.icon;
                  const isOpen = expanded.has(m.id);
                  const monthName = new Date(2026, m.month - 1).toLocaleString('default', { month: 'short' });

                  return (
                    <div key={m.id} className="relative">
                      {/* Dot on timeline */}
                      <div className={cn(
                        'absolute -left-[31px] w-4 h-4 rounded-full border-2 border-white',
                        cfg.color
                      )} />

                      {/* Card */}
                      <button
                        onClick={() => toggleExpand(m.id)}
                        className="w-full text-left bg-white border border-slate-200 rounded-xl p-4 hover:shadow-sm transition-shadow"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3 min-w-0">
                            <Icon className={cn('w-4 h-4 flex-shrink-0 mt-0.5', cfg.textColor)} />
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="text-sm font-semibold text-slate-900">{m.title}</h3>
                                <span className="text-xs text-slate-400">{monthName}</span>
                              </div>
                              {isOpen && (
                                <div className="mt-2">
                                  <p className="text-sm text-slate-500">{m.description}</p>
                                  {m.actionItems.length > 0 && (
                                    <ul className="mt-3 space-y-1.5">
                                      {m.actionItems.map((ai, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-slate-900">
                                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0 mt-1.5" />
                                          {ai}
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                          )}
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
