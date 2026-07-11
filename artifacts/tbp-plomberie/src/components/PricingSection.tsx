import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, Zap, Droplets, Search, ShowerHead, Waves, Plug, Flame, ArrowRight } from 'lucide-react';

const prestations = [
  {
    icon: Droplets,
    label: "Réparation fuite de tuyau",
    prix: "149 € – 199 €",
    color: "blue",
  },
  {
    icon: Wrench,
    label: "Débouchage WC",
    prix: "130 € – 200 €",
    color: "amber",
  },
  {
    icon: Waves,
    label: "Débouchage canalisation",
    prix: "290 € – 390 €",
    color: "blue",
  },
  {
    icon: Flame,
    label: "Réparation ballon d'eau chaude",
    prix: "150 € – 350 €",
    color: "amber",
  },
  {
    icon: Search,
    label: "Recherche de fuite non destructive",
    prix: "380 € – 480 €",
    color: "blue",
  },
  {
    icon: Zap,
    label: "Réparation fuite chasse d'eau",
    prix: "149 € – 200 €",
    color: "amber",
  },
  {
    icon: Plug,
    label: "Installation d'un robinet",
    prix: "150 € – 450 €",
    color: "blue",
  },
  {
    icon: Flame,
    label: "Installation ballon d'eau chaude",
    prix: "250 € – sur devis",
    color: "amber",
  },
  {
    icon: Wrench,
    label: "Installation WC classique",
    prix: "200 € – 500 €",
    color: "blue",
  },
  {
    icon: ShowerHead,
    label: "Réparation fuite de douche",
    prix: "149 € – 200 €",
    color: "amber",
  },
];

const colorMap = {
  blue:  { bg: "bg-blue-500/10",  icon: "text-blue-400",  badge: "bg-blue-500/10 text-blue-300 border-blue-500/20",  hover: "hover:border-blue-500/40 hover:shadow-blue-900/20" },
  amber: { bg: "bg-amber-500/10", icon: "text-amber-400", badge: "bg-amber-500/10 text-amber-300 border-amber-500/20", hover: "hover:border-amber-500/40 hover:shadow-amber-900/20" },
};

export default function PricingSection() {
  return (
    <section id="tarifs" className="py-24 bg-slate-800 relative overflow-hidden">
      {/* background decoration */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-semibold mb-4 border border-blue-500/20 uppercase tracking-wider">
            Transparence des prix
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Nos tarifs plomberie
          </h2>
          <p className="text-slate-400 text-lg">
            Des prix clairs, annoncés avant chaque intervention. Pas de mauvaise surprise sur la facture.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {prestations.map((item, i) => {
            const c = colorMap[item.color as keyof typeof colorMap];
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`group relative bg-slate-900 rounded-2xl p-6 border border-slate-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${c.hover}`}
              >
                {/* icon */}
                <div className={`w-11 h-11 rounded-xl ${c.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-5 h-5 ${c.icon}`} />
                </div>

                {/* label */}
                <p className="text-white font-semibold text-sm leading-snug mb-4 min-h-[40px]">
                  {item.label}
                </p>

                {/* price badge */}
                <div className={`inline-flex items-center px-3 py-1.5 rounded-full border text-sm font-bold ${c.badge}`}>
                  {item.prix}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer note + CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-6xl mx-auto px-1">
          <p className="text-slate-500 text-sm">
            Tarifs indicatifs TTC, hors fournitures. Devis gratuit pour les travaux importants.
          </p>
          <a
            href="#contact"
            className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-900/30 hover:-translate-y-0.5"
          >
            Demander un devis gratuit <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
