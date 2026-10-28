'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PORTFOLIO_PROJECTS, PortfolioProject } from '@/data/codeventures-data';
const PORTFOLIO_GRADIENTS = [
  'radial-gradient(ellipse 140% 90% at 8% -8%, #7ff5e0 0%, #00BFA5 24%, rgba(0,191,165,0.14) 46%, transparent 70%)',
  'radial-gradient(ellipse 120% 75% at 92% -10%, #7ff5e0 0%, #00BFA5 22%, rgba(0,191,165,0.18) 50%, transparent 74%)',
  'radial-gradient(ellipse 150% 95% at 50% -18%, #7ff5e0 0%, #00BFA5 28%, rgba(0,191,165,0.12) 44%, transparent 68%)',
  'radial-gradient(ellipse 110% 80% at 22% 108%, #1de9b6 0%, #00BFA5 20%, rgba(0,191,165,0.1) 42%, transparent 66%)',
  'radial-gradient(ellipse 125% 85% at 78% 105%, #7ff5e0 0%, #00a892 24%, rgba(0,191,165,0.15) 48%, transparent 72%)',
  'radial-gradient(ellipse 135% 88% at 65% -12%, #7ff5e0 0%, #00BFA5 26%, rgba(0,191,165,0.16) 52%, transparent 75%)',
  'radial-gradient(ellipse 115% 70% at 35% -14%, #4df0d8 0%, #00BFA5 25%, rgba(0,191,165,0.13) 47%, transparent 71%)',
] as const;

function hashSeed(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function portfolioGradientFor(id: string) {
  return PORTFOLIO_GRADIENTS[hashSeed(id) % PORTFOLIO_GRADIENTS.length];
}

function PortfolioCard({
  children,
  className = '',
  seed,
}: {
  children: React.ReactNode;
  className?: string;
  seed: string;
}) {
  return (
    <article
      className={`portfolio-card relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0a0c10] text-white shadow-[0_24px_60px_rgba(0,0,0,0.45)] ${className}`}
    >
      <div
        className="portfolio-card-glow pointer-events-none absolute inset-0 z-0"
        style={{ background: portfolioGradientFor(seed) }}
        aria-hidden
      />
      <div
        className="portfolio-vignette-dark pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-transparent via-[#0a0c10]/40 to-[#0a0c10]/90"
        aria-hidden
      />
      <div
        className="portfolio-vignette-light pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-cv-card/20 via-cv-card/75 to-cv-card"
        aria-hidden
      />
      <div className="relative z-[1] h-full flex flex-col">{children}</div>
    </article>
  );
}

function portfolioSummary(project: PortfolioProject) {
  const firstSentence = project.description.split(/(?<=[.!?])\s+/)[0] ?? project.description;
  return firstSentence.length > 140 ? `${firstSentence.slice(0, 137).trim()}…` : firstSentence;
}

export default function FeaturedPortfolio() {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'SaaS' | 'Deep Tech' | 'Mobile' | 'Marketplace'>('All');

  const filteredProjects =
    selectedFilter === 'All'
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.sector === selectedFilter);

  const spotlightProjects = filteredProjects.slice(0, 4);
  const secondaryProjects = filteredProjects.slice(4);

  return (
    <section id="portfolio" className="relative py-24 sm:py-32 lg:py-40 bg-cv-page-alt border-t border-cv-border-subtle">
      <div className="site-wrap">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#00BFA5] mb-5">Startup portfolio</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold text-cv-fg tracking-[-0.035em] leading-[1.04]">
              Real ideas. Real products.
              <br />
              Real progress.
            </h2>
          </div>

          <p className="text-base sm:text-lg lg:text-xl text-cv-fg-subtle max-w-md leading-relaxed font-normal">
            Early-stage ventures co-built with CodeVentures—from MVP to scale.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 mb-14">
          {(['All', 'SaaS', 'Deep Tech', 'Mobile', 'Marketplace'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedFilter === filter
                  ? 'bg-emerald-500 text-cv-on-accent shadow-lg shadow-emerald-500/20'
                  : 'bg-cv-nav text-cv-fg-muted hover:text-cv-fg border border-cv-border hover:bg-cv-border-subtle'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="space-y-5 sm:space-y-6 mb-16">
          {spotlightProjects.map((project, index) => {
            const isReversed = index % 2 === 1;

            return (
              <PortfolioCard key={project.id} seed={project.id} className="p-6 sm:p-8 lg:p-9">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                  <div className={`lg:col-span-6 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                    <h3 className="portfolio-card-title text-3xl sm:text-[34px] font-bold tracking-[-0.035em] leading-[1.08] mb-3">
                      {project.name}
                    </h3>

                    <p className="portfolio-card-summary text-base leading-relaxed mb-4 max-w-lg">
                      {portfolioSummary(project)}
                    </p>

                    <p className="portfolio-card-outcome text-sm mb-5">
                      <span className="portfolio-card-outcome-label font-semibold">Outcome · </span>
                      {project.impact}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="portfolio-tag rounded-full px-3 py-1 text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={`lg:col-span-6 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="portfolio-media portfolio-spotlight-media relative rounded-[20px] overflow-hidden aspect-[16/10] border border-white/[0.08] bg-black/40">
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </PortfolioCard>
            );
          })}
        </div>

        {secondaryProjects.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {secondaryProjects.map((project: PortfolioProject) => (
              <PortfolioCard key={project.id} seed={project.id} className="flex flex-col p-5">
                <div className="portfolio-media relative rounded-[16px] overflow-hidden aspect-[16/11] mb-4 border border-white/[0.08] bg-black/40">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <h4 className="portfolio-card-title text-xl font-bold tracking-[-0.03em] leading-[1.1] mb-2">
                  {project.name}
                </h4>
                <p className="portfolio-card-summary text-sm leading-relaxed line-clamp-2 mb-3">
                  {portfolioSummary(project)}
                </p>
                <div className="mt-auto flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="portfolio-tag rounded-full px-2.5 py-0.5 text-[11px]">
                      {tag}
                    </span>
                  ))}
                </div>
              </PortfolioCard>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
