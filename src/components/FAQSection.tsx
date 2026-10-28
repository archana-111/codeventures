'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQS } from '@/data/codeventures-data';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory =
      activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-24 sm:py-32 lg:py-40 bg-cv-page border-t border-cv-border-subtle">
      <div className="site-wrap">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5 lg:sticky lg:top-36 h-fit">
            <p className="text-sm font-medium text-[#00BFA5] mb-5">Frequently asked questions</p>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-bold text-cv-fg tracking-[-0.035em] leading-[1.04] mb-6">
              Have questions?
              <br />
              We’ve got straight answers.
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-cv-fg-subtle font-normal leading-relaxed mb-8 max-w-xl">
              Everything you need to know about partnering with CodeVentures,
              our Discovery Workshop, equity terms, and post-launch support.
            </p>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions..."
              className="w-full rounded-[14px] bg-cv-input border border-cv-border text-cv-fg text-[15px] placeholder:text-cv-fg-muted focus:outline-none focus:border-[#00BFA5]/50 px-5 py-3.5 mb-6"
            />

            <div className="flex flex-wrap gap-2">
              {['All', 'General', 'Process', 'Pricing', 'Technical'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? 'bg-emerald-500 text-cv-on-accent'
                      : 'bg-cv-nav text-cv-fg-muted hover:text-cv-fg border border-cv-border'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 divide-y divide-cv-border-subtle border-y border-cv-border-subtle">
            {filteredFaqs.length === 0 ? (
              <div className="py-12 text-base text-cv-fg-muted">
                No matching questions found. Feel free to contact our team directly.
              </div>
            ) : (
              filteredFaqs.map((faq, idx) => {
                const isOpen = openIndex === idx;

                return (
                  <div key={faq.question} className="py-6 sm:py-8">
                    <button
                      onClick={() => toggleAccordion(idx)}
                      className="w-full text-left flex items-start justify-between gap-6 group focus:outline-none"
                      aria-expanded={isOpen}
                    >
                      <span className="text-lg sm:text-xl font-bold text-cv-fg group-hover:text-[#00BFA5] transition-colors leading-[1.2] tracking-[-0.03em]">
                        {faq.question}
                      </span>
                      <span className="w-8 h-8 rounded-full border border-cv-border flex items-center justify-center text-cv-fg-subtle group-hover:border-[#00BFA5]/50 group-hover:text-[#00BFA5] transition-all shrink-0 mt-0.5">
                        {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </span>
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <p className="text-cv-fg-subtle text-base sm:text-lg font-normal leading-relaxed pr-8 sm:pr-12">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
