import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck, Award, Flame, Plug } from 'lucide-react';

const CountUp = ({ end, duration = 2, suffix = '' }: { end: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        // Easing out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(easeOut * end));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="text-5xl md:text-7xl font-extrabold text-white tabular-nums tracking-tighter">
      {count}{suffix}
    </span>
  );
};

export default function WhyUsSection() {
  return (
    <section id="pourquoi-nous" className="py-24 bg-slate-800 border-y border-slate-700/50 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -translate-y-1/2" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] -translate-y-1/2" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Pourquoi nous choisir ?</h2>
          <p className="text-slate-400 text-lg">
            Nous bâtissons notre réputation sur l'excellence, la transparence et la fiabilité de nos interventions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center mb-16">
          <div className="flex flex-col items-center">
            <CountUp end={15} suffix="+" />
            <span className="text-slate-400 font-medium text-lg mt-4 uppercase tracking-wider">Années d'expérience</span>
          </div>
          <div className="flex flex-col items-center">
            <CountUp end={2847} suffix="+" />
            <span className="text-slate-400 font-medium text-lg mt-4 uppercase tracking-wider">Interventions réalisées</span>
          </div>
          <div className="flex flex-col items-center">
            <CountUp end={98} suffix="%" />
            <span className="text-slate-400 font-medium text-lg mt-4 uppercase tracking-wider">Clients satisfaits</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 px-6 py-4 bg-slate-900/50 rounded-2xl border border-slate-700 backdrop-blur-sm"
          >
            <Award className="w-8 h-8 text-blue-500" />
            <div className="text-left">
              <div className="text-white font-bold text-lg">Certifié RGE</div>
              <div className="text-slate-400 text-sm">Qualibat & Éco-artisan</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3 px-6 py-4 bg-slate-900/50 rounded-2xl border border-slate-700 backdrop-blur-sm"
          >
            <ShieldCheck className="w-8 h-8 text-amber-500" />
            <div className="text-left">
              <div className="text-white font-bold text-lg">Normes NF C 15-100</div>
              <div className="text-slate-400 text-sm">Garantie décennale incluse</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3 px-6 py-4 bg-slate-900/50 rounded-2xl border border-slate-700 backdrop-blur-sm"
          >
            <Flame className="w-8 h-8 text-blue-500" />
            <div className="text-left">
              <div className="text-white font-bold text-lg">QualiPAC</div>
              <div className="text-slate-400 text-sm">Installateur certifié pompes à chaleur</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-3 px-6 py-4 bg-slate-900/50 rounded-2xl border border-slate-700 backdrop-blur-sm"
          >
            <Plug className="w-8 h-8 text-amber-500" />
            <div className="text-left">
              <div className="text-white font-bold text-lg">Habilitation IRVE</div>
              <div className="text-slate-400 text-sm">Qualifelec — bornes de recharge</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
