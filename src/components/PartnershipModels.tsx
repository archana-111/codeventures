'use client';

import React from 'react';
import {
  ArrowUpRight,
  Globe,
  Sparkles,
  Zap,
  Search,
  RefreshCw,
  Users,
  Database,
  Shield,
  Rocket,
  Compass,
  LineChart,
  Layers,
  Calendar,
  UserPlus,
} from 'lucide-react';
import { PRICING_PLANS } from '@/data/codeventures-data';
import { useTheme } from '@/components/ThemeProvider';

interface PartnershipModelsProps {
  onOpenApply?: (selectedModel?: string) => void;
}

const FEATURE_ICONS = [
  [Globe, Sparkles, Zap, Search, Database, Rocket],
  [RefreshCw, Compass, Calendar, Layers, LineChart, Shield, UserPlus],
  [Users, Sparkles, Calendar, Layers, RefreshCw, UserPlus],
];

export default function PartnershipModels({ onOpenApply }: PartnershipModelsProps) {
  const { theme, mounted } = useTheme();
  const siteLight = mounted && theme === 'light';

  const openApply = (modelName: string) => {
    if (onOpenApply) onOpenApply(modelName);
    else document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="models" className="relative py-24 sm:py-32 lg:py-40 bg-cv-page-alt border-t border-cv-border-subtle">
      <div className="site-wrap">
        <div className="max-w-2xl mx-auto text-center mb-14 lg:mb-16">
          <p className="cv-kicker mb-5">Partnership models</p>
          <h2 className="cv-section-heading text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold tracking-[-0.035em] leading-[1.04] mb-5">
            Choose how we build together.
          </h2>
          <p className="cv-section-lead text-base sm:text-lg font-normal">
            Every startup is unique. As the startup studio for development agency
            Armia Systems, Inc., our partnership models combine cash discounts with
            negotiated equity so we’re deeply invested in your long-term success.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5 items-stretch mb-12">
          {PRICING_PLANS.map((plan, planIdx) => {
            const featured = Boolean(plan.popular);
            const featuredDark = featured && !siteLight;
            const featuredLight = featured && siteLight;
            const icons = FEATURE_ICONS[planIdx] ?? FEATURE_ICONS[0];
            const introFeature = featured ? plan.features[0] : null;
            const listFeatures = featured ? plan.features.slice(1) : plan.features;

            return (
              <article
                key={plan.id}
                className={`relative flex flex-col overflow-hidden rounded-[22px] p-7 sm:p-8 ${
                  featuredDark
                    ? 'text-white border border-[#00BFA5]/35 shadow-[0_24px_70px_rgba(0,191,165,0.22)]'
                    : featuredLight
                      ? 'cv-surface-card text-cv-fg border-emerald-500/30 ring-1 ring-emerald-500/12'
                      : `bg-cv-elevated border border-cv-border-subtle text-cv-fg ${siteLight ? 'cv-light-panel' : ''}`
                }`}
                style={
                  featuredDark
                    ? {
                        background:
                          'linear-gradient(180deg, #101614 0%, #0a2c28 36%, #00BFA5 118%)',
                      }
                    : undefined
                }
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3
                    className={`text-[26px] sm:text-[30px] font-semibold tracking-[-0.03em] leading-[1.1] ${
                      featuredDark ? 'text-white' : 'text-cv-fg'
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <span
                    className={`max-w-[42%] pt-1.5 text-right text-[10px] font-semibold uppercase tracking-[0.12em] leading-snug ${
                      featuredDark ? 'text-white/45' : 'text-cv-fg-muted'
                    }`}
                  >
                    {plan.timeline}
                  </span>
                </div>

                <p className={`text-sm mb-6 ${featuredDark ? 'text-white/55' : 'text-cv-fg-muted'}`}>{plan.subtitle}</p>

                <div className={`border-t pt-6 mb-8 ${featuredDark ? 'border-white/[0.1]' : 'border-cv-border-subtle'}`}>
                  <p className={`text-[22px] sm:text-[26px] font-semibold tracking-[-0.03em] leading-tight ${featuredDark ? 'text-white' : 'text-cv-fg'}`}>
                    {plan.price}
                  </p>
                  <p className={`text-sm mt-1.5 ${featuredDark ? 'text-white/50' : 'text-cv-fg-muted'}`}>{plan.priceNote}</p>
                  <p className={`text-sm mt-2 ${featuredDark ? 'text-white/55' : 'text-cv-fg-muted'}`}>{plan.equity}</p>
                </div>

                {introFeature && (
                  <p className={`text-sm mb-4 ${featuredDark ? 'text-white/70' : 'text-cv-fg-subtle'}`}>{introFeature}:</p>
                )}

                <ul className="space-y-3 mb-10 flex-1">
                  {listFeatures.map((feat, i) => {
                    const Icon = icons[i % icons.length];
                    return (
                      <li key={feat} className={`flex items-start gap-3 text-sm leading-snug ${featuredDark ? 'text-white/80' : 'text-cv-fg-subtle'}`}>
                        <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${featuredDark ? 'text-white/70' : 'text-cv-fg-muted'}`} strokeWidth={1.75} />
                        <span>{feat}</span>
                      </li>
                    );
                  })}
                </ul>

                <button
                  onClick={() => openApply(plan.name)}
                  className={`mt-auto w-full inline-flex items-center justify-center gap-2 rounded-full py-3.5 px-6 text-sm font-semibold transition-all duration-300 ${
                    featured
                      ? 'cv-btn-primary bg-emerald-500 hover:bg-emerald-400 text-cv-on-accent dark:shadow-[0_8px_28px_rgba(0,191,165,0.45)]'
                      : 'cv-btn-secondary bg-cv-nav hover:bg-cv-border-subtle text-cv-fg border border-cv-border-subtle'
                  }`}
                >
                  <span>{plan.ctaLabel}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </article>
            );
          })}
        </div>

        <p className="text-center text-sm text-cv-fg-muted">
          Studio capacity: only 3 startups accepted per year.{' '}
          <a href="tel:3124236728" className="text-cv-fg-subtle hover:text-cv-fg transition-colors">
            Call (312) 423-6728
          </a>
        </p>
      </div>
    </section>
  );
}
