'use client';

import React from 'react';
import Image from 'next/image';
import { TESTIMONIALS } from '@/data/codeventures-data';

export default function FounderSection() {
  return (
    <section id="founder" className="relative py-24 sm:py-32 lg:py-40 bg-cv-page border-t border-cv-border-subtle">
      <div className="site-wrap">
        <div className="cv-light-panel rounded-[18px] bg-cv-elevated/90 backdrop-blur-xl border border-cv-border p-8 sm:p-12 lg:p-16 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full p-[3px] border border-[#00BFA5]/40">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-neutral-900">
                  <Image
                    src="/assets/team/aji-abraham.webp"
                    alt="Aji Abraham — Founder & CEO"
                    fill
                    sizes="(max-width: 768px) 256px, 320px"
                    className="object-cover object-top"
                  />
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-lg font-bold text-cv-fg tracking-[-0.03em]">Aji Abraham</p>
                <p className="text-sm font-medium text-[#00BFA5] mt-1">Founder & CEO</p>
                <p className="text-sm text-cv-fg-muted mt-1">
                  Armia Systems, Inc. & CodeVentures
                </p>
                <p className="text-sm text-cv-fg-muted mt-2">
                  20+ years scaling technology companies
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <p className="text-sm font-medium text-[#00BFA5] mb-5">Founder’s commitment</p>

              <h2 className="text-3xl sm:text-4xl lg:text-[54px] font-bold text-cv-fg tracking-[-0.035em] leading-[1.04] mb-8">
                “We’re not just an agency.
                <br />
                We are equity partners in your journey.”
              </h2>

              <div className="space-y-4 text-cv-fg-subtle text-base sm:text-lg leading-relaxed font-normal">
                <p>
                  As the startup studio for development agency{' '}
                  <strong className="text-cv-fg font-medium">Armia Systems, Inc.</strong>,
                  our partnership model entails startup partners covering development costs
                  through a deliberate blend of cash and equity.
                </p>
                <p>
                  By the conclusion of your initial Discovery Consultation, we’ll have outlined
                  crucial elements including user flow, MVP definition, high-level architecture,
                  user stories, development timeline, and go-to-market strategy. As equity
                  partners, we’re deeply invested in your success far beyond product delivery.
                </p>
              </div>

              <div className="mt-10 pt-8 border-t border-cv-border-subtle grid grid-cols-3 gap-6">
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-cv-fg tracking-[-0.035em] leading-[1.04]">2003</p>
                  <p className="text-sm text-cv-fg-muted mt-2 leading-snug">Armia Systems founded</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-cv-fg tracking-[-0.035em] leading-[1.04]">34</p>
                  <p className="text-sm text-cv-fg-muted mt-2 leading-snug">Seed rounds supported</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-cv-fg tracking-[-0.035em] leading-[1.04]">CTO</p>
                  <p className="text-sm text-cv-fg-muted mt-2 leading-snug">Direct executive guidance</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-medium text-[#00BFA5] mb-4">Voices of confidence</p>
            <h3 className="text-3xl sm:text-4xl font-bold text-cv-fg tracking-[-0.035em] leading-[1.04]">
              What founders say about our work.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.author} className="cv-light-panel rounded-[18px] bg-cv-elevated/90 backdrop-blur-xl border border-cv-border p-7 sm:p-8 flex flex-col justify-between">
                <p className="text-cv-fg-subtle text-base leading-relaxed mb-8 font-normal">
                  “{t.quote}”
                </p>

                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden bg-neutral-800 shrink-0 border border-white/10">
                    <Image
                      src={t.avatar}
                      alt={t.author}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-cv-fg">{t.author}</h4>
                    <p className="text-sm text-cv-fg-muted">{t.role}, {t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
