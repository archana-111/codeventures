'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PORTFOLIO_PROJECTS, PortfolioProject } from '@/data/codeventures-data';
import { useTheme } from '@/components/ThemeProvider';

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

function portfolioSummary(project: PortfolioProject) {
  const firstSentence = project.description.split(/(?<=[.!?])\s+/)[0] ?? project.description;
  return firstSentence.length > 140 ? `${firstSentence.slice(0, 137).trim()}…` : firstSentence;
}

function PortfolioDarkCard({
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
      className={`relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0a0c10] text-white shadow-[0_24px_60px_rgba(0,0,0,0.45)] ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: portfolioGradientFor(seed) }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-transparent via-[#0a0c10]/40 to-[#0a0c10]/90"
        aria-hidden
      />
      <div className="relative z-[1] flex h-full flex-col">{children}</div>
    </article>
  );
}

function PortfolioLightFeature({ project }: { project: PortfolioProject }) {
  return (
    <article className="portfolio-light-feature group">
      <div className="portfolio-light-media relative mb-6 aspect-[16/10] lg:mb-8 lg:aspect-[2/1]">
        <Image
          src={project.image}
          alt={project.name}
          fill
          sizes="(max-width: 1024px) 100vw, 80vw"
          className="object-cover"
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-4">
        <div className="lg:col-span-4">
          <p className="cv-kicker mb-2 !text-[0.6875rem]">{project.sector}</p>
          <h3 className="text-2xl font-semibold tracking-[-0.032em] text-cv-fg sm:text-[1.75rem] lg:text-[1.875rem]">
            {project.name}
          </h3>
        </div>
        <div className="lg:col-span-5">
          <p className="text-base leading-relaxed text-cv-fg-muted">{portfolioSummary(project)}</p>
          <p className="mt-4 text-sm text-cv-fg-subtle">
            <span className="font-semibold text-cv-fg">Outcome · </span>
            {project.impact}
          </p>
        </div>
        <div className="flex flex-wrap content-start gap-1.5 lg:col-span-3">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="cv-tag rounded-md px-2.5 py-1 text-xs">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function PortfolioLightCompact({ project }: { project: PortfolioProject }) {
  return (
    <article className="portfolio-light-compact group flex h-full flex-col">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-cv-border-subtle">
        <Image
          src={project.image}
          alt={project.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h4 className="text-lg font-semibold tracking-[-0.028em] text-cv-fg">{project.name}</h4>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-cv-fg-muted">
          {portfolioSummary(project)}
        </p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
          {project.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="cv-tag rounded-md px-2 py-0.5 text-[11px]">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function FeaturedPortfolio() {
  const { theme, mounted } = useTheme();
  const siteLight = mounted && theme === 'light';
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'SaaS' | 'Deep Tech' | 'Mobile' | 'Marketplace'>('All');

  const filteredProjects =
    selectedFilter === 'All'
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.sector === selectedFilter);

  const spotlightProjects = filteredProjects.slice(0, 4);
  const secondaryProjects = filteredProjects.slice(4);

  return (
    <section id="portfolio" className="relative border-t border-cv-border-subtle bg-cv-page py-20 sm:py-28 lg:py-32">
      <div className="site-wrap">
        <div className={siteLight ? 'section-light-split' : 'mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end'}>
          <div className="max-w-2xl">
            <p className={siteLight ? 'cv-kicker mb-4' : 'mb-5 text-sm font-medium text-[#00BFA5]'}>
              Startup portfolio
            </p>
            <h2
              className={
                siteLight
                  ? 'cv-section-heading text-3xl sm:text-4xl lg:text-[3.25rem]'
                  : 'text-4xl font-bold leading-[1.04] tracking-[-0.035em] text-cv-fg sm:text-5xl md:text-6xl lg:text-[64px]'
              }
            >
              Real ideas. Real products.
              <br />
              Real progress.
            </h2>
          </div>
          <p
            className={
              siteLight
                ? 'cv-section-lead max-w-sm lg:pb-1'
                : 'max-w-md text-base font-normal leading-relaxed text-cv-fg-subtle sm:text-lg lg:text-xl'
            }
          >
            Early-stage ventures co-built with CodeVentures—from MVP to scale.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap items-center gap-2 sm:mb-12">
          {(['All', 'SaaS', 'Deep Tech', 'Mobile', 'Marketplace'] as const).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setSelectedFilter(filter)}
              className={`cv-filter-btn px-4 py-2 text-sm font-medium transition-all duration-200 sm:px-5 sm:py-2.5 ${
                selectedFilter === filter
                  ? siteLight
                    ? 'is-active'
                    : 'bg-emerald-500 text-cv-on-accent shadow-lg shadow-emerald-500/20'
                  : siteLight
                    ? ''
                    : 'border border-cv-border bg-cv-nav text-cv-fg-muted hover:bg-cv-border-subtle hover:text-cv-fg'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {siteLight ? (
          <>
            <div className="mb-12 sm:mb-16">
              {spotlightProjects.map((project) => (
                <PortfolioLightFeature key={project.id} project={project} />
              ))}
            </div>
            {secondaryProjects.length > 0 && (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6">
                {secondaryProjects.map((project) => (
                  <PortfolioLightCompact key={project.id} project={project} />
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <div className="mb-16 space-y-5 sm:space-y-6">
              {spotlightProjects.map((project, index) => {
                const isReversed = index % 2 === 1;
                return (
                  <PortfolioDarkCard key={project.id} seed={project.id} className="p-6 sm:p-8 lg:p-9">
                    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
                      <div className={`lg:col-span-6 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                        <h3 className="mb-3 text-3xl font-bold leading-[1.08] tracking-[-0.035em] text-white sm:text-[34px]">
                          {project.name}
                        </h3>
                        <p className="mb-4 max-w-lg text-base leading-relaxed text-white/75">
                          {portfolioSummary(project)}
                        </p>
                        <p className="mb-5 text-sm text-white/60">
                          <span className="font-semibold text-white/90">Outcome · </span>
                          {project.impact}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0, 4).map((tag) => (
                            <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/75">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className={`lg:col-span-6 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                        <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] border border-white/[0.08] bg-black/40">
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
                  </PortfolioDarkCard>
                );
              })}
            </div>
            {secondaryProjects.length > 0 && (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {secondaryProjects.map((project) => (
                  <PortfolioDarkCard key={project.id} seed={project.id} className="flex flex-col p-5">
                    <div className="relative mb-4 aspect-[16/11] overflow-hidden rounded-[16px] border border-white/[0.08] bg-black/40">
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover"
                      />
                    </div>
                    <h4 className="mb-2 text-xl font-bold leading-[1.1] tracking-[-0.03em] text-white">
                      {project.name}
                    </h4>
                    <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-white/65">
                      {portfolioSummary(project)}
                    </p>
                    <div className="mt-auto flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] text-white/75">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </PortfolioDarkCard>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
