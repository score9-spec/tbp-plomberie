import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Zap, Droplets, Search, ShowerHead, Waves, Plug, Flame, ArrowRight, CircuitBoard, TriangleAlert, TableProperties } from 'lucide-react';

const plomberie = [
  { icon: Droplets,  label: "Réparation fuite de tuyau",           prix: "149 € – 199 €" },
  { icon: Wrench,    label: "Débouchage WC",                        prix: "130 € – 200 €" },
  { icon: Waves,     label: "Débouchage canalisation",              prix: "290 € – 390 €" },
  { icon: Flame,     label: "Réparation ballon d'eau chaude",       prix: "150 € – 350 €" },
  { icon: Search,    label: "Recherche de fuite non destructive",   prix: "380 € – 480 €" },
  { icon: Wrench,    label: "Réparation fuite chasse d'eau",        prix: "149 € – 200 €" },
  { icon: Plug,      label: "Installation d'un robinet",            prix: "150 € – 450 €" },
  { icon: Flame,     label: "Installation ballon d'eau chaude",     prix: "250 € – sur devis" },
  { icon: Wrench,    label: "Installation WC classique",            prix: "200 € – 500 €" },
  { icon: ShowerHead,label: "Réparation fuite de douche",          prix: "149 € – 200 €" },
];

const electricite = [
  { icon: TableProperties, label: "Remise aux normes tableau électrique", prix: "À partir de 440 € – sur devis" },
  { icon: Plug,            label: "Réparation de prise murale",           prix: "140 € – 180 €" },
  { icon: CircuitBoard,    label: "Réparation d'un tableau électrique",   prix: "130 € – 250 €" },
  { icon: Search,          label: "Recherche de panne électrique",        prix: "150 € – 190 €" },
  { icon: TriangleAlert,   label: "Panne électrique inconnue",            prix: "130 € – 380 €" },
];

const tabs = [
  { key: 'plomberie',   label: 'Plomberie',   icon: Droplets, color: 'blue',  data: plomberie },
  { key: 'electricite', label: 'Électricité', icon: Zap,      color: 'amber', data: electricite },
] as const;

const colorMap = {
  blue:  { bg: "bg-blue-500/10",  icon: "text-blue-400",  badge: "bg-blue-500/10 text-blue-300 border-blue-500/20",   hover: "hover:border-blue-500/40" },
  amber: { bg: "bg-amber-500/10", icon: "text-amber-400", badge: "bg-amber-500/10 text-amber-300 border-amber-500/20", hover: "hover:border-amber-500/40" },
};

export default function PricingSection() {
  const [activeTab, setActiveTab] = useState<'plomberie' | 'electricite'>('plomberie');

  const current = tabs.find(t => t.key === activeTab)!;
  const c = colorMap[current.color];

  return (
    <section id="tarifs" className="py-24 bg-slate-800 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-semibold mb-4 border border-blue-500/20 uppercase tracking-wider">
            Transparence totale
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Nos tarifs</h2>
          <p className="text-slate-400 text-lg">On vous annonce le prix avant de commencer. Toujours.</p>
        </div>

        {/* Trust banner */}
        <div className="max-w-6xl mx-auto mb-10">
          <div className="relative rounded-2xl overflow-hidden border border-green-500/20 bg-green-500/5 px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 to-emerald-500 rounded-l-2xl" />
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green-500/15 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-bold text-base">Devis gratuit avant toute intervention — prix ferme et définitif</p>
                <p className="text-slate-400 text-sm mt-0.5">Vous savez exactement combien vous allez payer avant qu'on commence. Aucun frais caché, aucune surprise à la fin. C'est notre engagement.</p>
              </div>
            </div>
            <a href="tel:0760730588" className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-500 hover:bg-green-400 text-white font-bold text-sm transition-all whitespace-nowrap">
              Appeler maintenant
            </a>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-6xl mx-auto mb-8 flex gap-3">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all border ${
                  active
                    ? tab.color === 'blue'
                      ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/30'
                      : 'bg-amber-500 border-amber-400 text-slate-900 shadow-lg shadow-amber-900/30'
                    : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-white hover:border-slate-500'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-6xl mx-auto"
          >
            {current.data.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className={`group relative bg-slate-900 rounded-2xl p-6 border border-slate-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${c.hover}`}
                >
                  <div className={`w-11 h-11 rounded-xl ${c.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-5 h-5 ${c.icon}`} />
                  </div>
                  <p className="text-white font-semibold text-sm leading-snug mb-4 min-h-[40px]">{item.label}</p>
                  <div className={`inline-flex items-center px-3 py-1.5 rounded-full border text-sm font-bold ${c.badge}`}>
                    {item.prix}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <div className="mt-10 flex flex-col gap-4 max-w-6xl mx-auto px-1">
          <div className="flex flex-wrap gap-3">
            {["Prix annoncé avant intervention", "Aucun frais caché", "Devis écrit sur demande", "Pas de supplément surprise"].map(badge => (
              <span key={badge} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-700/60 text-slate-300 text-xs font-medium border border-slate-600/50">
                <svg className="w-3.5 h-3.5 text-green-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {badge}
              </span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">Tarifs indicatifs TTC, hors fournitures. Valables en Dordogne et alentours.</p>
            <a href="#contact" className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-900/30 hover:-translate-y-0.5">
              Demander un devis gratuit <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
