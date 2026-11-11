/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ModelosCatalog } from './components/ModelosCatalog';
import { WhyChooseUs } from './components/WhyChooseUs';
import { InspectionSection } from './components/InspectionSection';
import { Footer } from './components/Footer';
import { OrderModal, OrderConfiguration } from './components/OrderModal';
import { ContactModal } from './components/ContactModal';
import { CreditsModal } from './components/CreditsModal';
import { PHONE_CATALOG } from './utils/pricing';

export default function App() {
  const [selectedOrderConfig, setSelectedOrderConfig] = useState<OrderConfiguration | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [isCreditsModalOpen, setIsCreditsModalOpen] = useState<boolean>(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenDefaultOrder = () => {
    const defaultModel = PHONE_CATALOG[0];
    setSelectedOrderConfig({
      model: defaultModel,
      condition: 'refurbished_excellent',
      storage: '128GB',
      colorName: defaultModel.availableColors[0].name,
      finalPrice: defaultModel.basePrice,
      monthlyFinancing: `${(defaultModel.basePrice / 12).toFixed(2)} €/mes`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f7f7] text-[#0d2a1c] selection:bg-[#f6e016] selection:text-[#0d2a1c]">
      {/* Navigation Header */}
      <Navbar
        onOpenContact={() => setIsContactModalOpen(true)}
        onOpenCredits={() => setIsCreditsModalOpen(true)}
      />

      {/* Main Content Area */}
      <main id="top" className="flex-1">
        {/* Screen 1: Hero */}
        <Hero
          onExploreModels={() => scrollToSection('modelos')}
          onOpenHelp={() => setIsContactModalOpen(true)}
        />

        {/* Screen 2: Modelos Catalog */}
        <ModelosCatalog
          onSelectForOrder={(config) => setSelectedOrderConfig(config)}
          onOpenInspection={() => scrollToSection('garantia')}
        />

        {/* Screen 3: Por qué comprar */}
        <WhyChooseUs
          onOpenContact={() => setIsContactModalOpen(true)}
        />

        {/* Screen 4: Word-Highlight Moment & 50 Points Protocol */}
        <InspectionSection
          onOpenOrder={handleOpenDefaultOrder}
        />
      </main>

      {/* Footer */}
      <Footer
        onScrollTo={scrollToSection}
        onOpenContact={() => setIsContactModalOpen(true)}
        onOpenCredits={() => setIsCreditsModalOpen(true)}
      />

      {/* Modals & Drawers */}
      <OrderModal
        config={selectedOrderConfig}
        onClose={() => setSelectedOrderConfig(null)}
      />

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      <CreditsModal
        isOpen={isCreditsModalOpen}
        onClose={() => setIsCreditsModalOpen(false)}
      />
    </div>
  );
}
