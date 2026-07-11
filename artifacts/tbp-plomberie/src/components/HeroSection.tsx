import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, CheckCircle2 } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

export default function HeroSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${heroBg})`,
            transform: 'scale(1.05)'
          }}
        />
        <div className="absolute inset-0 bg-slate-900/70 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Interventions d'urgence 24/7
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
            <span className="block">TBP Plomberie,</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-amber-500">
              votre expert plombier-électricien en Dordogne
            </span>
          </h1>
          
          <p className="text-lg md:text-2xl text-slate-300 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
            Interventions rapides, installations modernes et solutions économes en énergie.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full max-w-2xl bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-2 md:p-3 rounded-2xl md:rounded-full shadow-2xl"
        >
          {isSubmitted ? (
            <div className="flex items-center justify-center h-[56px] text-green-400 font-medium gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>Demande envoyée ! Nous vous rappelons sous peu.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2 md:gap-3">
              <input 
                type="text" 
                placeholder="Votre nom" 
                required
                className="flex-1 bg-slate-900/50 border border-slate-700 rounded-xl md:rounded-full px-5 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
              <input 
                type="tel" 
                placeholder="Votre téléphone" 
                required
                className="flex-1 bg-slate-900/50 border border-slate-700 rounded-xl md:rounded-full px-5 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl md:rounded-full px-8 py-3 transition-colors shadow-lg shadow-blue-900/50"
              >
                Être rappelé
              </button>
            </form>
          )}
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <a href="#services" className="flex flex-col items-center gap-2 text-slate-400 hover:text-white transition-colors" aria-label="Découvrir nos services">
          <span className="text-xs uppercase tracking-widest font-semibold">Découvrir</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
