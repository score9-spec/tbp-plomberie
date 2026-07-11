import React from 'react';
import { motion } from 'framer-motion';
import { Droplet, Zap, Sun, CheckCircle } from 'lucide-react';
import { useInView } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function ServicesSection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 bg-slate-900 relative z-10" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">
            Expertise Complète, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Intervention Unique</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Un seul artisan qualifié pour gérer l'ensemble de vos réseaux d'eau et d'électricité. Fiabilité garantie, sans intermédiaires.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Plomberie Card */}
          <motion.div 
            variants={cardVariants}
            className="group bg-slate-800 rounded-3xl p-8 border border-slate-700 hover:border-blue-500/50 hover:bg-slate-800/80 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_-15px_rgba(29,78,216,0.3)] flex flex-col"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Droplet className="w-7 h-7 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Plomberie</h3>
            <ul className="space-y-3 mb-8 flex-1">
              {['Dépannage fuites & urgences', 'Installation salle de bain complète', 'Débouchage canalisation rapide', 'Remplacement chauffe-eau'].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300">
                  <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a href="#contact" className="inline-flex items-center text-blue-400 font-semibold hover:text-blue-300 transition-colors">
              Demander un devis &rarr;
            </a>
          </motion.div>

          {/* Électricité Card */}
          <motion.div 
            variants={cardVariants}
            className="group bg-slate-800 rounded-3xl p-8 border border-slate-700 hover:border-amber-500/50 hover:bg-slate-800/80 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_-15px_rgba(245,158,11,0.3)] flex flex-col"
          >
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-7 h-7 text-amber-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Électricité</h3>
            <ul className="space-y-3 mb-8 flex-1">
              {['Mise aux normes NF C 15-100', 'Remplacement tableau électrique', 'Dépannage urgent coupure', 'Câblage et éclairage intérieur/extérieur'].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300">
                  <CheckCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a href="#contact" className="inline-flex items-center text-amber-500 font-semibold hover:text-amber-400 transition-colors">
              Demander un devis &rarr;
            </a>
          </motion.div>

          {/* Solutions 2026 Card - Featured */}
          <motion.div 
            variants={cardVariants}
            className="group relative bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700/50 md:col-span-2 lg:col-span-1 hover:-translate-y-2 transition-all duration-300 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Featured Gradient Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 to-amber-500" />
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-amber-500 p-0.5 group-hover:scale-110 transition-transform">
                <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                  <Sun className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Populaire
              </span>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Solutions 2026</h3>
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-amber-400 font-medium mb-4 relative z-10">
              L'énergie de demain, aujourd'hui
            </p>
            
            <ul className="space-y-3 mb-8 flex-1 relative z-10">
              {['Installation Pompes à Chaleur (PAC)', 'Bornes IRVE pour véhicules électriques', 'Domotique & Maison connectée', 'Optimisation énergétique globale'].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300">
                  <CheckCircle className="w-5 h-5 text-white shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a href="#contact" className="inline-flex items-center justify-center w-full py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-amber-600 hover:from-blue-500 hover:to-amber-500 text-white font-bold transition-all relative z-10 shadow-lg shadow-blue-900/20">
              Étude gratuite de votre projet
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
