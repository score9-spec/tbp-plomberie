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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent ${
        scrolled ? 'bg-slate-900/80 backdrop-blur-md border-slate-800 shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group z-50 relative">
            <div className="flex -space-x-1">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform">
                <Droplet className="w-4 h-4 text-white" />
              </div>
              <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center relative z-0 group-hover:scale-110 transition-transform delay-75">
                <Zap className="w-4 h-4 text-white" />
              </div>
            </div>
            <span className="text-xl md:text-2xl font-bold tracking-tight text-white ml-1">
              TBP Plomberie
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-blue-500 after:transition-all hover:after:w-full"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:0760730588"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-slate-900 font-semibold text-sm transition-all duration-300 border border-amber-500/20"
            >
              <Phone className="w-4 h-4" />
              Urgence : 07 60 73 05 88
            </a>
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all duration-300 shadow-[0_0_15px_rgba(29,78,216,0.3)] hover:shadow-[0_0_25px_rgba(29,78,216,0.5)] hover:-translate-y-0.5"
            >
              Devis Gratuit
            </a>
          </div>

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

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-0 pt-24 bg-slate-900 z-40 lg:hidden flex flex-col"
          >
            <div className="container mx-auto px-4 flex flex-col gap-6">
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-bold text-slate-300 hover:text-white border-b border-slate-800 pb-4"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
              <div className="flex flex-col gap-4 mt-4">
                <a
                  href="tel:0760730588"
                  className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-amber-500 text-slate-900 font-bold text-lg w-full"
                >
                  <Phone className="w-5 h-5" />
                  Urgence : 07 60 73 05 88
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center px-6 py-4 rounded-xl bg-blue-600 text-white font-bold text-lg w-full"
                >
                  Demander un devis
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
