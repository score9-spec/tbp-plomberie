import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import WhyUsSection from '@/components/WhyUsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import FloatingFAB from '@/components/FloatingFAB';
import PricingSection from '@/components/PricingSection';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-slate-900 text-slate-50 font-sans selection:bg-blue-600 selection:text-white">
          <Navbar />
          <main>
            <HeroSection />
            <ServicesSection />
            <PricingSection />
            <WhyUsSection />
            <TestimonialsSection />
            <ContactSection />
          </main>
          <Footer />
          <FloatingFAB />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
