'use client';

import React from 'react';
import Image from 'next/image';
import { CAPABILITIES, type CapabilityItem } from '@/data/codeventures-data';
import { useTheme } from '@/components/ThemeProvider';

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
  const light = variant === 'light' || (variant === 'featured' && siteLight);
  const featured = variant === 'featured';

  return (
    <article
      className={`relative flex h-full min-h-0 flex-col overflow-hidden rounded-[28px] p-7 sm:p-8 lg:p-9 ${
        light
          ? 'border border-neutral-200/90 bg-white text-neutral-950 shadow-[0_12px_40px_rgba(15,23,42,0.08)]'
          : 'bg-[#0a0c10] text-white border border-cv-border-subtle'
      } ${featured ? 'min-h-[560px]' : ''} ${className}`}
    >
      {light && (
        <Image
          src="/assets/services-card-arcs.jpg"
          alt=""
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="pointer-events-none z-0 object-cover object-right-bottom"
        />
      )}
      {light && (
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-white via-white/82 to-white/20"
          aria-hidden
        />
      )}
      {featured && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 140% 90% at 50% -8%, #7ff5e0 0%, #00BFA5 28%, rgba(0,191,165,0.18) 52%, transparent 70%)',
          }}
        />
      )}

      {featured && (
        <p className="relative z-10 mb-auto text-[13px] font-medium text-white/60">
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
                light ? 'text-neutral-500' : 'text-white/60'
              }`}
            >
              {cap.number}
            </p>
          )}

          <h3
            className={`text-[28px] font-bold leading-[1.08] tracking-[-0.035em] sm:text-[32px] lg:text-[36px] ${
              light ? 'text-neutral-950' : 'text-white'
            }`}
          >
            {cap.title}
          </h3>

          <p
            className={`mt-4 text-[15px] font-medium leading-snug ${
              light ? 'text-neutral-800' : 'text-white/85'
            }`}
          >
            {cap.tagline}
          </p>

          <p
            className={`mt-3 text-sm leading-relaxed sm:text-[15px] ${
              wide ? 'max-w-xl' : 'max-w-md'
            } ${light ? 'text-neutral-600' : 'text-white/65'}`}
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
                } ${light ? 'text-neutral-700' : 'text-white/75'}`}
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
                    ? 'bg-neutral-100 text-neutral-700 ring-1 ring-neutral-200/80'
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
  const { theme, mounted } = useTheme();
  const siteLight = mounted && theme === 'light';

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
          <ServiceCard cap={web} variant="light" siteLight={siteLight} className="lg:row-span-2" />
          <ServiceCard cap={deep} variant="featured" siteLight={siteLight} className="lg:row-span-2" />
          <div className="relative min-h-[240px] overflow-hidden rounded-[28px] bg-black lg:min-h-[280px]">
            <Image
              src="/assets/services-orbs.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover"
            />
          </div>
          <ServiceCard cap={mobile} variant="light" siteLight={siteLight} />
        </div>
      </div>
    </section>
  );
}
