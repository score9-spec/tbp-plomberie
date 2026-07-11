import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, ArrowRight } from 'lucide-react';

const prestations = [
  { label: "Réparation d'une fuite de tuyau",              prix: "149 € – 199 €" },
  { label: "Débouchage d'un WC",                           prix: "130 € – 200 €" },
  { label: "Débouchage de canalisation",                   prix: "290 € – 390 €" },
  { label: "Réparation d'un ballon d'eau chaude",          prix: "150 € – 350 €" },
  { label: "Recherche de fuite non destructive",           prix: "380 € – 480 €" },
  { label: "Réparation d'une fuite sur chasse d'eau",      prix: "149 € – 200 €" },
  { label: "Installation d'un robinet",                    prix: "150 € – 450 €" },
  { label: "Installation d'un ballon d'eau chaude",        prix: "250 € – sur devis" },
  { label: "Installation d'un WC classique",               prix: "200 € – 500 €" },
  { label: "Réparation d'une fuite de douche",             prix: "149 € – 200 €" },
];

export default function PricingSection() {
  return (
    <section id="tarifs" className="py-24 bg-slate-900 relative">
      {/* subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(29,78,216,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(29,78,216,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-semibold mb-4 border border-blue-500/20 uppercase tracking-wider">
            Transparence des prix
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Nos tarifs plomberie
          </h2>
          <p className="text-slate-400 text-lg">
            Des prix clairs, annoncés avant toute intervention. Pas de mauvaise surprise sur la facture.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="rounded-3xl overflow-hidden border border-slate-700 shadow-2xl">
            {prestations.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`flex items-center justify-between gap-4 px-6 py-4 group hover:bg-blue-600/5 transition-colors ${
                  i % 2 === 0 ? 'bg-slate-800' : 'bg-slate-800/60'
                } ${i !== prestations.length - 1 ? 'border-b border-slate-700/60' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition-colors">
                    <Wrench className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-slate-200 font-medium">{item.label}</span>
                </div>
                <span className="shrink-0 text-amber-400 font-bold text-sm md:text-base whitespace-nowrap">
                  {item.prix}
                </span>
              </motion.div>
            ))}
          </div>

          {/* disclaimer + CTA */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
            <p className="text-slate-500 text-sm">
              Tarifs indicatifs, hors fournitures. Devis gratuit sur site pour les travaux importants.
            </p>
            <a
              href="#contact"
              className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-900/30"
            >
              Devis gratuit <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
