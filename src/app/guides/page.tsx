'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Landmark,
  FileCheck,
  TrendingUp,
  ShieldCheck,
  BookOpen,
  Wallet,
  Home,
  Heart,
  CheckSquare,
  Compass,
  Clock,
  ArrowRight,
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { guides, Guide } from '@/lib/data/guides';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Landmark,
  FileCheck,
  TrendingUp,
  ShieldCheck,
  BookOpen,
  Wallet,
  Home,
  Heart,
  CheckSquare,
  Compass,
};

const categories = [
  { key: 'all', label: 'All' },
  { key: 'financial', label: 'Financial' },
  { key: 'clinical', label: 'Clinical' },
  { key: 'lifestyle', label: 'Lifestyle' },
  { key: 'career', label: 'Career' },
] as const;

const categoryColors: Record<Guide['category'], { badge: string; accent: string }> = {
  financial: {
    badge: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    accent: 'bg-emerald-50 text-emerald-600',
  },
  clinical: {
    badge: 'bg-blue-50 text-blue-700 border border-blue-200',
    accent: 'bg-blue-50 text-blue-600',
  },
  lifestyle: {
    badge: 'bg-purple-50 text-purple-700 border border-purple-200',
    accent: 'bg-purple-50 text-purple-600',
  },
  career: {
    badge: 'bg-amber-50 text-amber-700 border border-amber-200',
    accent: 'bg-amber-50 text-amber-600',
  },
};

export default function GuidesPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filtered =
    activeCategory === 'all'
      ? guides
      : guides.filter((g) => g.category === activeCategory);

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Resident Guides
          </h1>
          <p className="mt-3 text-lg text-slate-500 max-w-2xl leading-relaxed">
            Deep dives into everything you need to know — loans, taxes, insurance, exams,
            housing, and more.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mb-8 flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.key
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Guide Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((guide) => {
            const Icon = iconMap[guide.iconName];
            const colors = categoryColors[guide.category];

            return (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group block bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-slate-300 transition-all duration-200"
              >
                {/* Icon + Category */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2.5 rounded-lg ${colors.accent}`}>
                    {Icon && <Icon className="w-5 h-5" />}
                  </div>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${colors.badge}`}
                  >
                    {guide.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors leading-snug">
                  {guide.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-500 mb-4 leading-relaxed line-clamp-2">
                  {guide.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <span className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    {guide.readTime} read
                  </span>
                  <span className="text-xs font-medium text-blue-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Read guide
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-400 text-lg">No guides in this category yet.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
