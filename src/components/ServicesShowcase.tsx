'use client';

import React from 'react';
import Image from 'next/image';
import { CAPABILITIES, type CapabilityItem } from '@/data/codeventures-data';
import { useTheme } from '@/components/ThemeProvider';

const DARK_TEAL_GRADIENT = {
  featured:
    'radial-gradient(ellipse 140% 90% at 50% -8%, #7ff5e0 0%, #00BFA5 28%, rgba(0,191,165,0.18) 52%, transparent 70%)',
  tall:
    'radial-gradient(ellipse 135% 88% at 22% -10%, #7ff5e0 0%, #00BFA5 26%, rgba(0,191,165,0.17) 50%, transparent 72%)',
  compact:
    'radial-gradient(ellipse 125% 82% at 78% -8%, #7ff5e0 0%, #00BFA5 24%, rgba(0,191,165,0.15) 48%, transparent 70%)',
} as const;

function ServiceCard({
  cap,
  variant,
  wide = false,
  className = '',
  siteLight,
}: {
  cap: CapabilityItem;
  variant: 'light' | 'featured';
  wide?: boolean;
  className?: string;
  siteLight: boolean;
}) {
  const featured = variant === 'featured';
  const light = siteLight;
  const darkTealGradient = featured
    ? DARK_TEAL_GRADIENT.featured
    : wide
      ? DARK_TEAL_GRADIENT.tall
      : DARK_TEAL_GRADIENT.compact;

  return (
    <article
      className={`relative flex h-full min-h-0 flex-col overflow-hidden rounded-[28px] p-7 sm:p-8 lg:p-9 ${
        light
          ? `service-card-light cv-surface-card text-cv-fg ${featured ? 'service-card-light--featured' : ''}`
          : 'bg-[#0a0c10] text-white border border-cv-border-subtle'
      } ${featured ? 'min-h-[560px]' : ''} ${className}`}
    >
      {light && (
        <Image
          src="/assets/services-card-arcs.jpg"
          alt=""
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="service-card-art pointer-events-none z-0 object-cover object-right-bottom"
        />
      )}
      {light && (
        <div className="service-card-scrim pointer-events-none absolute inset-0 z-[1]" aria-hidden />
      )}
      {light && (
        <div
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            background: darkTealGradient,
            opacity: featured ? 0.42 : wide ? 0.36 : 0.32,
          }}
          aria-hidden
        />
      )}
      {!light && (
        <>
          <div
            className="pointer-events-none absolute inset-0 z-0"
            style={{ background: darkTealGradient }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#0a0c10]/15 via-[#0a0c10]/45 to-[#0a0c10]/92"
            aria-hidden
          />
        </>
      )}
      {featured && (
        <p
          className={`relative z-10 mb-auto text-[13px] font-medium ${
            light ? 'text-cv-fg-muted' : 'text-white/60'
          }`}
        >
          {cap.number}
        </p>
      )}

      <div
        className={`relative z-[2] flex flex-1 ${
          featured
            ? 'mt-auto flex-col justify-end'
            : wide
              ? 'flex-col lg:flex-row lg:items-start lg:gap-16'
              : 'flex-col'
        }`}
      >
        <div className={wide ? 'lg:max-w-xl' : ''}>
          {!featured && (
            <p
              className={`mb-5 text-[13px] font-medium ${
                light ? 'text-cv-fg-muted' : 'text-white/60'
              }`}
            >
              {cap.number}
            </p>
          )}

          <h3
            className={`text-[28px] font-bold leading-[1.08] tracking-[-0.035em] sm:text-[32px] lg:text-[36px] ${
              light ? 'text-cv-fg' : 'text-white'
            }`}
          >
            {cap.title}
          </h3>

          <p
            className={`mt-4 text-[15px] font-medium leading-snug ${
              light ? 'text-cv-fg' : 'text-white/85'
            }`}
          >
            {cap.tagline}
          </p>

          <p
            className={`mt-3 text-sm leading-relaxed sm:text-[15px] ${
              wide ? 'max-w-xl' : 'max-w-md'
            } ${light ? 'text-cv-fg-subtle' : 'text-white/65'}`}
          >
            {cap.description}
          </p>
        </div>

        <div className={`mt-6 ${wide ? 'lg:mt-12 lg:flex-1' : ''}`}>
          <ul className={`space-y-2.5 ${wide ? 'lg:columns-2 lg:gap-x-10' : ''}`}>
            {cap.deliverables.map((item) => (
              <li
                key={item}
                className={`flex items-start gap-2.5 text-sm leading-snug ${
                  wide ? 'break-inside-avoid mb-2.5' : ''
                } ${light ? 'text-cv-fg-subtle' : 'text-white/75'}`}
              >
                <span
                  className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                    light ? 'bg-[#00BFA5]' : 'bg-white/80'
                  }`}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2">
            {cap.tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-full px-3 py-1 text-xs ${
                  light
                    ? 'bg-cv-elevated text-cv-fg-muted ring-1 ring-cv-border-subtle'
                    : 'bg-white/10 text-white/75'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ServicesShowcase() {
  const [web, deep, mobile] = CAPABILITIES;
  const { theme } = useTheme();
  const siteLight = theme === 'light';

  return (
    <section
      id="services"
      className="relative border-t border-cv-border-subtle bg-cv-page py-24 sm:py-32 lg:py-40"
    >
      <div className="site-wrap">
        <div className="mb-12 max-w-3xl lg:mb-16">
          <p className="mb-5 text-sm font-medium text-[#00BFA5]">Why CodeVentures</p>
          <h2 className="mb-6 text-4xl font-bold leading-[1.04] tracking-[-0.035em] text-cv-fg sm:text-5xl md:text-6xl lg:text-[64px]">
            More than developers.
            <br />
            Your partners in building.
          </h2>
          <p className="max-w-xl text-base font-normal leading-relaxed text-cv-fg-subtle sm:text-lg lg:text-xl">
            CodeVentures combines product engineering, startup strategy,
            technical leadership, and practical growth support to turn
            ambitious ideas into viable businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
          <ServiceCard cap={web} variant="light" wide siteLight={siteLight} className="lg:row-span-2" />
          <ServiceCard cap={deep} variant="featured" siteLight={siteLight} className="lg:row-span-2" />
          <div className="services-orbs-tile relative min-h-[240px] overflow-hidden rounded-[28px] bg-black lg:min-h-[280px]">
            <Image
              src="/assets/services-orbs.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="services-orbs-art object-cover"
            />
          </div>
          <ServiceCard cap={mobile} variant="light" siteLight={siteLight} />
        </div>
      </div>
    </section>
  );
}
