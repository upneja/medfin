'use client';

import { use, useMemo } from 'react';
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
  ArrowLeft,
  Clock,
  ArrowRight,
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { getGuideBySlug, getRelatedGuides, Guide } from '@/lib/data/guides';

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

const categoryColors: Record<Guide['category'], string> = {
  financial: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  clinical: 'bg-blue-50 text-blue-700 border border-blue-200',
  lifestyle: 'bg-purple-50 text-purple-700 border border-purple-200',
  career: 'bg-amber-50 text-amber-700 border border-amber-200',
};

const categoryAccents: Record<Guide['category'], string> = {
  financial: 'bg-emerald-50 text-emerald-600',
  clinical: 'bg-blue-50 text-blue-600',
  lifestyle: 'bg-purple-50 text-purple-600',
  career: 'bg-amber-50 text-amber-600',
};

// ─── Simple Markdown-to-JSX renderer ─────────────────────────────────────────

function renderMarkdown(md: string): React.ReactNode[] {
  const lines = md.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  const nextKey = () => key++;

  // Inline formatting
  function renderInline(text: string): React.ReactNode {
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let ik = 0;

    while (remaining.length > 0) {
      // Bold
      const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
      // Inline code
      const codeMatch = remaining.match(/`([^`]+)`/);
      // Link
      const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);

      // Find earliest match
      const matches = [
        boldMatch ? { type: 'bold', index: boldMatch.index!, match: boldMatch } : null,
        codeMatch ? { type: 'code', index: codeMatch.index!, match: codeMatch } : null,
        linkMatch ? { type: 'link', index: linkMatch.index!, match: linkMatch } : null,
      ]
        .filter(Boolean)
        .sort((a, b) => a!.index - b!.index);

      if (matches.length === 0) {
        parts.push(remaining);
        break;
      }

      const first = matches[0]!;
      const before = remaining.slice(0, first.index);
      if (before) parts.push(before);

      if (first.type === 'bold') {
        parts.push(
          <strong key={ik++} className="font-semibold text-slate-900">
            {first.match[1]}
          </strong>
        );
        remaining = remaining.slice(first.index + first.match[0].length);
      } else if (first.type === 'code') {
        parts.push(
          <code
            key={ik++}
            className="px-1.5 py-0.5 bg-slate-100 text-slate-800 rounded text-sm font-mono"
          >
            {first.match[1]}
          </code>
        );
        remaining = remaining.slice(first.index + first.match[0].length);
      } else if (first.type === 'link') {
        parts.push(
          <a
            key={ik++}
            href={first.match[2]}
            className="text-blue-600 underline underline-offset-2 hover:text-blue-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            {first.match[1]}
          </a>
        );
        remaining = remaining.slice(first.index + first.match[0].length);
      }
    }

    return parts.length === 1 ? parts[0] : <>{parts}</>;
  }

  while (i < lines.length) {
    const line = lines[i];

    // Skip empty lines
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Horizontal rule
    if (/^---+$/.test(line.trim())) {
      elements.push(<hr key={nextKey()} className="my-8 border-slate-200" />);
      i++;
      continue;
    }

    // H1
    if (line.startsWith('# ')) {
      elements.push(
        <h1
          key={nextKey()}
          id={line.slice(2).trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')}
          className="text-3xl font-bold text-slate-900 mt-10 mb-4"
        >
          {renderInline(line.slice(2).trim())}
        </h1>
      );
      i++;
      continue;
    }

    // H2
    if (line.startsWith('## ')) {
      elements.push(
        <h2
          key={nextKey()}
          id={line.slice(3).trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')}
          className="text-2xl font-bold text-slate-900 mt-10 mb-3 pb-2 border-b border-slate-100"
        >
          {renderInline(line.slice(3).trim())}
        </h2>
      );
      i++;
      continue;
    }

    // H3
    if (line.startsWith('### ')) {
      elements.push(
        <h3
          key={nextKey()}
          id={line.slice(4).trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')}
          className="text-xl font-semibold text-slate-900 mt-8 mb-2"
        >
          {renderInline(line.slice(4).trim())}
        </h3>
      );
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith('> ')) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <blockquote
          key={nextKey()}
          className="border-l-4 border-blue-300 bg-blue-50 pl-4 py-3 pr-4 my-4 rounded-r-lg text-slate-700 italic"
        >
          {quoteLines.map((ql, qi) => (
            <p key={qi}>{renderInline(ql)}</p>
          ))}
        </blockquote>
      );
      continue;
    }

    // Code block
    if (line.trim().startsWith('```')) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      elements.push(
        <pre
          key={nextKey()}
          className="bg-slate-900 text-slate-100 rounded-lg p-4 my-4 overflow-x-auto text-sm font-mono leading-relaxed"
        >
          <code>{codeLines.join('\n')}</code>
        </pre>
      );
      continue;
    }

    // Unordered list
    if (/^[-*] /.test(line.trim())) {
      const items: string[] = [];
      while (i < lines.length && /^[-*] /.test(lines[i].trim())) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <ul key={nextKey()} className="my-4 space-y-2 ml-1">
          {items.map((item, idx) => (
            <li key={idx} className="flex gap-2 text-slate-700 leading-relaxed">
              <span className="text-slate-400 mt-1.5 shrink-0">
                <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor">
                  <circle cx="3" cy="3" r="3" />
                </svg>
              </span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(line.trim())) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ''));
        i++;
      }
      elements.push(
        <ol key={nextKey()} className="my-4 space-y-2 ml-1 list-none">
          {items.map((item, idx) => (
            <li key={idx} className="flex gap-3 text-slate-700 leading-relaxed">
              <span className="text-slate-400 font-semibold text-sm mt-0.5 shrink-0 w-5 text-right">
                {idx + 1}.
              </span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Table
    if (line.includes('|') && line.trim().startsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].includes('|') && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      // Parse header
      const parseRow = (row: string) =>
        row
          .split('|')
          .map((c) => c.trim())
          .filter(Boolean);

      const header = parseRow(tableLines[0]);
      // Skip separator line (index 1)
      const bodyLines = tableLines.slice(2);

      elements.push(
        <div key={nextKey()} className="my-6 overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50">
                {header.map((h, hi) => (
                  <th
                    key={hi}
                    className="px-4 py-3 text-left font-semibold text-slate-700 border-b border-slate-200"
                  >
                    {renderInline(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyLines.map((row, ri) => (
                <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  {parseRow(row).map((cell, ci) => (
                    <td key={ci} className="px-4 py-3 text-slate-600 border-b border-slate-100">
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Paragraph (default)
    elements.push(
      <p key={nextKey()} className="text-slate-700 leading-relaxed my-3">
        {renderInline(line)}
      </p>
    );
    i++;
  }

  return elements;
}

// Extract h2 headings for table of contents
function extractHeadings(md: string): { text: string; id: string }[] {
  const headings: { text: string; id: string }[] = [];
  for (const line of md.split('\n')) {
    if (line.startsWith('## ')) {
      const text = line.slice(3).trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      headings.push({ text, id });
    }
  }
  return headings;
}

// ─── Page Component ──────────────────────────────────────────────────────────

export default function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const guide = getGuideBySlug(slug);
  const related = getRelatedGuides(slug, 3);

  const headings = useMemo(() => (guide ? extractHeadings(guide.content) : []), [guide]);
  const renderedContent = useMemo(() => (guide ? renderMarkdown(guide.content) : []), [guide]);

  if (!guide) {
    return (
      <DashboardLayout>
        <div className="max-w-3xl mx-auto py-20 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Guide not found</h1>
          <p className="text-slate-500 mb-6">
            The guide you are looking for does not exist or has been moved.
          </p>
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all guides
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const Icon = iconMap[guide.iconName];

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        {/* Back link */}
        <Link
          href="/guides"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          All guides
        </Link>

        {/* Article header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${categoryColors[guide.category]}`}
            >
              {guide.category}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              {guide.readTime} read
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
            {guide.title}
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-3xl">
            {guide.description}
          </p>
        </header>

        {/* Content area with optional TOC sidebar */}
        <div className="flex gap-10">
          {/* Main article */}
          <article className="flex-1 min-w-0 max-w-3xl">
            <div className="border-t border-slate-100 pt-8">{renderedContent}</div>
          </article>

          {/* Table of contents sidebar */}
          {headings.length > 0 && (
            <aside className="hidden xl:block w-56 shrink-0">
              <nav className="sticky top-24">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  On this page
                </h4>
                <ul className="space-y-2 border-l border-slate-200">
                  {headings.map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className="block pl-3 text-sm text-slate-500 hover:text-slate-900 transition-colors leading-snug py-0.5"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          )}
        </div>

        {/* Related Guides */}
        {related.length > 0 && (
          <section className="mt-16 pt-10 border-t border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Related Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((rg) => {
                const RIcon = iconMap[rg.iconName];
                return (
                  <Link
                    key={rg.slug}
                    href={`/guides/${rg.slug}`}
                    className="group block bg-white border border-slate-200 rounded-xl p-5 hover:shadow-lg hover:border-slate-300 transition-all duration-200"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${categoryAccents[rg.category]}`}>
                        {RIcon && <RIcon className="w-4 h-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                          {rg.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-3">
                      {rg.description}
                    </p>
                    <span className="flex items-center gap-1 text-xs font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      Read guide
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </DashboardLayout>
  );
}
