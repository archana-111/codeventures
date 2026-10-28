'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { PARTNER_PERKS } from '@/data/codeventures-data';

export default function PartnerNetwork() {
  return (
    <section id="perks" className="relative py-24 sm:py-32 lg:py-40 bg-cv-page border-t border-cv-border-subtle">
      <div className="site-wrap">
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <p className="text-sm font-medium text-[#00BFA5] mb-5">Founder ecosystem perks</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold text-cv-fg tracking-[-0.035em] leading-[1.04] mb-6">
            Over $100K+ in partner credits
            <br />
            & discounts.
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-cv-fg-subtle font-normal leading-relaxed max-w-2xl mx-auto">
            Every startup that joins CodeVentures receives immediate, pre-negotiated credits
            and institutional discounts across our premier cloud, payment, and tool ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-12">
          {PARTNER_PERKS.map((perk) => (
            <div key={perk.name} className="cv-light-panel rounded-[18px] bg-cv-elevated/90 backdrop-blur-xl border border-cv-border p-7 sm:p-8 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <div className="relative h-8 w-28 flex items-center justify-start dark:brightness-200 dark:contrast-125">
                  <Image
                    src={perk.logo}
                    alt={perk.name}
                    width={100}
                    height={32}
                    className="max-h-7 w-auto object-contain dark:invert"
                  />
                </div>
                <span className="text-sm text-cv-fg-muted">{perk.category}</span>
              </div>

              <p className="text-2xl sm:text-3xl font-bold text-cv-fg tracking-[-0.035em] leading-[1.04] mb-3">
                {perk.value}
              </p>
              <h3 className="text-lg font-medium text-cv-fg mb-2">{perk.name}</h3>
              <p className="text-base text-cv-fg-subtle leading-relaxed font-normal">
                {perk.description}
              </p>
            </div>
          ))}
        </div>

        <div className="cv-light-panel rounded-[18px] bg-cv-elevated/90 backdrop-blur-xl border border-cv-border p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h4 className="text-xl font-bold text-cv-fg tracking-[-0.03em] leading-[1.15] mb-2">
              Need specialized enterprise partnerships?
            </h4>
            <p className="text-base text-cv-fg-subtle leading-relaxed max-w-xl">
              We also connect founders with Microsoft for Startups, GitHub Enterprise, and OpenAI startup credits through our alumni network.
            </p>
          </div>

          <a
            href="#apply"
            className="cv-btn-primary shrink-0 group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-cv-on-accent font-semibold text-sm tracking-wide transition-all duration-300"
          >
            <span>Explore partner eligibility</span>
            <span className="w-5 h-5 rounded-full bg-cv-on-accent/15 flex items-center justify-center">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
