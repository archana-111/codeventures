'use client';

import React from 'react';
import Image from 'next/image';
import { CAPABILITIES, type CapabilityItem } from '@/data/codeventures-data';
import { useTheme } from '@/components/ThemeProvider';

function ServiceCard({
  cap,
  variant,
  wide = false,
  horizontal = false,
  className = '',
  siteLight,
}: {
  cap: CapabilityItem;
  variant: 'light' | 'featured';
  wide?: boolean;
  horizontal?: boolean;
  className?: string;
  siteLight: boolean;
}) {
  const light = variant === 'light' || (variant === 'featured' && siteLight);
  const featured = variant === 'featured';

  const radius = light ? 'rounded-2xl' : 'rounded-[28px]';
  const lightFeatured = light && featured;

  return (
    <article
      className={`relative flex h-full min-h-0 overflow-hidden ${radius} ${
        light
          ? `service-card-light cv-surface-card text-cv-fg ${lightFeatured ? 'service-card-light--featured' : ''} ${
              horizontal ? 'flex flex-col lg:flex-row lg:min-h-[300px]' : 'flex flex-col'
            }`
          : `flex flex-col p-7 sm:p-8 lg:p-9 bg-[#0a0c10] text-white border border-cv-border-subtle ${
              featured ? 'min-h-[560px]' : ''
            }`
      } ${className}`}
    >
      {featured && !light && (
        <p className="relative z-10 mb-auto text-[13px] font-medium text-white/60">{cap.number}</p>
      )}
      {light && horizontal && (
        <div className="relative min-h-[200px] w-full shrink-0 lg:min-h-0 lg:w-[44%] lg:border-r lg:border-cv-border-subtle">
          <Image
            src="/assets/services-card-arcs.jpg"
            alt=""
            fill
            sizes="(min-width: 1024px) 44vw, 100vw"
            className="pointer-events-none z-0 object-cover object-right-bottom"
          />
          <div className="service-light-scrim pointer-events-none absolute inset-0 z-[1]" aria-hidden />
        </div>
      )}

      {light && !horizontal && (
        <>
          <Image
            src="/assets/services-card-arcs.jpg"
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="pointer-events-none z-0 object-cover object-right-bottom"
          />
          <div className="service-light-scrim pointer-events-none absolute inset-0 z-[1]" aria-hidden />
        </>
      )}

      {featured && !light && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 140% 90% at 50% -8%, #7ff5e0 0%, #00BFA5 28%, rgba(0,191,165,0.18) 52%, transparent 70%)',
          }}
        />
      )}

      <div
        className={`relative z-[2] flex flex-1 flex-col p-6 sm:p-7 lg:p-8 ${
          featured && !light ? 'mt-auto justify-end' : ''
        } ${featured && light ? 'justify-between' : ''}`}
      >
        {(light || !featured) && (
          <p
            className={`text-xs font-semibold uppercase tracking-[0.08em] ${
              light ? 'mb-4 text-cv-fg-muted' : 'mb-5 text-[13px] font-medium text-white/60'
            }`}
          >
            {cap.number}
          </p>
        )}

        <div className={wide && !horizontal ? 'lg:max-w-xl' : ''}>
          <h3
            className={`text-[1.625rem] font-semibold leading-[1.12] tracking-[-0.032em] sm:text-[1.75rem] lg:text-[1.875rem] ${
              light ? 'text-cv-fg' : 'text-white'
            }`}
          >
            {cap.title}
          </h3>

          <p
            className={`mt-3 text-[15px] font-medium leading-snug ${
              light ? 'text-cv-fg' : 'text-white/85'
            }`}
          >
            {cap.tagline}
          </p>

          <p
            className={`mt-2.5 text-sm leading-relaxed sm:text-[15px] ${
              wide && !horizontal ? 'max-w-xl' : 'max-w-md'
            } ${light ? 'text-cv-fg-muted' : 'text-white/65'}`}
          >
            {cap.description}
          </p>
        </div>

        <div className={`mt-5 ${wide && !horizontal ? 'lg:mt-6' : ''}`}>
          <ul className={`space-y-2 ${wide && !horizontal ? 'lg:columns-2 lg:gap-x-8' : ''}`}>
            {cap.deliverables.map((item) => (
              <li
                key={item}
                className={`flex items-start gap-2.5 text-sm leading-snug ${
                  wide && !horizontal ? 'break-inside-avoid mb-2' : ''
                } ${light ? 'text-cv-fg-subtle' : 'text-white/75'}`}
              >
                <span
                  className={`mt-2 h-1 w-1 shrink-0 rounded-full ${
                    light ? 'bg-emerald-500' : 'bg-white/80'
                  }`}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {cap.tags.map((tag) => (
              <span
                key={tag}
                className={`text-xs ${
                  light
                    ? 'cv-tag rounded-md px-2.5 py-1'
                    : 'rounded-full bg-white/10 px-3 py-1 text-white/75'
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
  const { theme, mounted } = useTheme();
  const siteLight = mounted && theme === 'light';

  return (
    <section
      id="services"
      className="relative border-t border-cv-border-subtle bg-cv-page-alt py-20 sm:py-28 lg:py-32"
    >
      <div className="site-wrap">
        <div className={siteLight ? 'section-light-split' : 'mb-12 max-w-3xl lg:mb-16'}>
          <div>
            <p className={siteLight ? 'cv-kicker mb-4' : 'mb-5 text-sm font-medium text-[#00BFA5]'}>
              Why CodeVentures
            </p>
            <h2
              className={
                siteLight
                  ? 'cv-section-heading text-3xl sm:text-4xl lg:text-[3.25rem]'
                  : 'mb-6 text-4xl font-bold leading-[1.04] tracking-[-0.035em] text-cv-fg sm:text-5xl md:text-6xl lg:text-[64px]'
              }
            >
              More than developers.
              <br />
              Your partners in building.
            </h2>
          </div>
          <p
            className={
              siteLight
                ? 'cv-section-lead max-w-md lg:pb-1'
                : 'max-w-xl text-base font-normal leading-relaxed text-cv-fg-subtle sm:text-lg lg:text-xl'
            }
          >
            CodeVentures combines product engineering, startup strategy, technical
            leadership, and practical growth support to turn ambitious ideas into
            viable businesses.
          </p>
        </div>

        {siteLight ? (
          <div className="services-light-layout">
            <ServiceCard
              cap={web}
              variant="light"
              siteLight
              wide
              horizontal
              className="service-card-light--hero"
            />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <ServiceCard cap={deep} variant="featured" siteLight />
              <ServiceCard cap={mobile} variant="light" siteLight />
            </div>
            <div className="services-light-visual relative aspect-[21/8] sm:aspect-[21/7]">
              <Image
                src="/assets/services-orbs.jpg"
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
            <ServiceCard cap={web} variant="light" siteLight={siteLight} className="lg:row-span-2 p-7 sm:p-8 lg:p-9" wide />
            <ServiceCard cap={deep} variant="featured" siteLight={siteLight} className="lg:row-span-2 p-7 sm:p-8 lg:p-9" />
            <div className="relative min-h-[240px] overflow-hidden rounded-[28px] bg-black lg:min-h-[280px]">
              <Image
                src="/assets/services-orbs.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
            <ServiceCard cap={mobile} variant="light" siteLight={siteLight} className="p-7 sm:p-8 lg:p-9" />
          </div>
        )}
      </div>
    </section>
  );
}
