'use client';

import React, { useState } from 'react';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ImpactMetrics from '@/components/ImpactMetrics';
import ServicesShowcase from '@/components/ServicesShowcase';
import ProgramBenefits from '@/components/ProgramBenefits';
import FeaturedPortfolio from '@/components/FeaturedPortfolio';
import PartnershipModels from '@/components/PartnershipModels';
import FounderSection from '@/components/FounderSection';
import PartnerNetwork from '@/components/PartnerNetwork';
import FAQSection from '@/components/FAQSection';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import ApplicationModal from '@/components/ApplicationModal';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>(undefined);

  const handleOpenApply = (modelName?: string) => {
    setSelectedPlan(modelName);
    setModalOpen(true);
  };

  const handleCloseApply = () => {
    setModalOpen(false);
  };

  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen bg-cv-page text-cv-fg selection:bg-[#00BFA5]/20 selection:text-[#00BFA5]">
        <Header onOpenApply={() => handleOpenApply()} />

        <main>
          {/* SECTION 01 — Premium Hero Experience */}
          <HeroSection onOpenApply={() => handleOpenApply()} />

          {/* SECTION 02 — Why CodeVentures (Capabilities Showcase) */}
          <ServicesShowcase />

          {/* SECTION 03 — Studio / Credibility and Impact */}
          <ImpactMetrics />

          {/* SECTION 04 — The CodeVentures Advantage (Program Benefits) */}
          <ProgramBenefits />

          {/* SECTION 05 — Startup Portfolio */}
          <FeaturedPortfolio />

          {/* SECTION 07 — Startup Partnership Models */}
          <PartnershipModels onOpenApply={handleOpenApply} />

          {/* SECTION 08 — Meet the Founder */}
          <FounderSection />

          {/* SECTION 09 — Founder Benefits and Partner Network */}
          <PartnerNetwork />

          {/* SECTION 10 — FAQ */}
          <FAQSection />

          {/* SECTION 11 — High-Impact Final CTA */}
          <FinalCTA preselectedModel={selectedPlan} />
        </main>

        <Footer />

        {/* Global Application Modal */}
        <ApplicationModal
          isOpen={modalOpen}
          onClose={handleCloseApply}
          selectedModel={selectedPlan}
        />
      </div>
    </SmoothScrollProvider>
  );
}
