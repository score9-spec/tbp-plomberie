import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplet, Zap, Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { name: 'Services', href: '#services' },
  { name: 'Tarifs', href: '#tarifs' },
  { name: 'Pourquoi Nous', href: '#pourquoi-nous' },
  { name: 'Avis', href: '#avis' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* ── Alert Banner ── */}
      <AnimatePresence>
        {bannerVisible && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="relative bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 bg-[length:200%_100%] animate-[shimmer_2.5s_linear_infinite]">
              <div className="container mx-auto px-4 py-2 flex items-center justify-center gap-3 text-slate-900 text-sm font-bold">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600" />
                </span>
                <Zap className="w-4 h-4 shrink-0" />
                <span className="tracking-wide uppercase text-xs md:text-sm">
                  Disponible&nbsp;
                  <span className="underline decoration-2 underline-offset-2">24h/24 — 7j/7</span>
                  &nbsp;·&nbsp;Interventions d'urgence en Dordogne
                </span>
                <a
                  href="tel:0760730588"
                  className="shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-amber-400 hover:bg-slate-800 transition-colors text-xs font-extrabold tracking-wider"
                >
                  <Phone className="w-3 h-3" />
                  07 60 73 05 88
                </a>
                <button
                  onClick={() => setBannerVisible(false)}
                  aria-label="Fermer"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-black/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Navbar ── */}
      <div className={`transition-all duration-300 border-b border-transparent ${
        scrolled ? 'bg-slate-900/90 backdrop-blur-md border-slate-800 shadow-lg py-2' : 'bg-slate-900/60 backdrop-blur-sm py-3'
      }`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between gap-4">

            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group shrink-0 z-50 relative">
              <div className="flex -space-x-1">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform">
                  <Droplet className="w-4 h-4 text-white" />
                </div>
                <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center relative z-0 group-hover:scale-110 transition-transform delay-75">
                  <Zap className="w-4 h-4 text-white" />
                </div>
              </div>
              <span className="text-lg font-bold tracking-tight text-white ml-1 whitespace-nowrap">
                TBP Plomberie
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-blue-500 after:transition-all hover:after:w-full whitespace-nowrap"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Desktop CTA — single button, phone is already in the banner */}
            <a
              href="#contact"
              className="hidden lg:inline-flex px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all shadow-[0_0_15px_rgba(29,78,216,0.3)] hover:-translate-y-0.5 shrink-0 whitespace-nowrap"
            >
              Devis Gratuit
            </a>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden p-2 text-slate-300 hover:text-white z-50 relative"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-slate-900 border-t border-slate-800 shadow-2xl"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-semibold text-slate-300 hover:text-white border-b border-slate-800 py-3"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
              <div className="flex flex-col gap-3 mt-2">
                <a
                  href="tel:0760730588"
                  className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-amber-500 text-slate-900 font-bold text-base w-full"
                >
                  <Phone className="w-5 h-5" />
                  07 60 73 05 88
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center px-6 py-4 rounded-xl bg-blue-600 text-white font-bold text-base w-full"
                >
                  Demander un devis gratuit
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
