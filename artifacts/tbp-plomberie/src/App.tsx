import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Router, Switch, Route } from 'wouter';
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
import GallerySection from '@/components/GallerySection';
import MentionsLegales from '@/pages/MentionsLegales';
import PolitiqueConfidentialite from '@/pages/PolitiqueConfidentialite';

const queryClient = new QueryClient();

function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 font-sans selection:bg-blue-600 selection:text-white">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <GallerySection />
        <PricingSection />
        <WhyUsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingFAB />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Switch>
            <Route path="/mentions-legales" component={MentionsLegales} />
            <Route path="/politique-confidentialite" component={PolitiqueConfidentialite} />
            <Route path="/" component={HomePage} />
          </Switch>
        </Router>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
