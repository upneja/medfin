'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard,
  Landmark,
  Wallet,
  Home,
  CalendarClock,
  ShieldCheck,
  TrendingUp,
  BookOpen,
  Menu,
  X,
  Stethoscope,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/guides', label: 'Guides', icon: BookOpen },
  { href: '/loans', label: 'Loans', icon: Landmark },
  { href: '/budget', label: 'Budget', icon: Wallet },
  { href: '/housing', label: 'Housing', icon: Home },
  { href: '/timeline', label: 'Timeline', icon: CalendarClock },
  { href: '/insurance', label: 'Insurance', icon: ShieldCheck },
  { href: '/career', label: 'Career', icon: TrendingUp },
];

export default function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-slate-800 text-white h-14 flex items-center justify-between px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg">
          <Stethoscope className="w-5 h-5 text-emerald-400" />
          MedFin
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 bottom-0 z-50 w-60 bg-slate-800 text-white flex flex-col transition-transform duration-200',
          'lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="h-16 flex items-center gap-2.5 px-6 border-b border-white/10">
          <Stethoscope className="w-6 h-6 text-emerald-400 flex-shrink-0" />
          <span className="font-bold text-xl tracking-tight">MedFin</span>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1">
          {NAV_ITEMS.map(item => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  active
                    ? 'bg-blue-600 text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                )}
              >
                <item.icon className="w-[18px] h-[18px] flex-shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link
            href="/"
            className="text-xs text-white/40 hover:text-white/60 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </aside>
    </>
  );
}
