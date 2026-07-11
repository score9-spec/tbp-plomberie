import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, X, Zap } from 'lucide-react';

export default function AlertBanner() {
  const [visible, setVisible] = useState(true);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative z-[60] overflow-hidden"
        >
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 bg-[length:200%_100%] animate-[shimmer_2.5s_linear_infinite]">
            <div className="container mx-auto px-4 py-2.5 flex items-center justify-center gap-3 text-slate-900 text-sm font-bold">
              {/* Flashing dot */}
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
              </span>

              <Zap className="w-4 h-4 shrink-0" />

              <span className="tracking-wide uppercase">
                Disponible&nbsp;
                <span className="underline decoration-2 underline-offset-2">24h/24 — 7j/7</span>
                &nbsp;·&nbsp;Interventions d'urgence en Dordogne
              </span>

              <a
                href="tel:0760730588"
                className="shrink-0 flex items-center gap-1.5 ml-2 px-3 py-1 rounded-full bg-slate-900 text-amber-400 hover:bg-slate-800 transition-colors text-xs font-extrabold tracking-wider"
              >
                <Phone className="w-3 h-3" />
                07 60 73 05 88
              </a>

              <button
                onClick={() => setVisible(false)}
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
  );
}
