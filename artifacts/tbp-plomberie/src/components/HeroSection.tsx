import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2 } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';
import { apiUrl } from '@/lib/api';

export default function HeroSection() {
  const [nom, setNom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [motif, setMotif] = useState('');
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(apiUrl('callback'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom, telephone, motif, website }),
      });
      if (res.ok) {
        setStatus('success');
        setNom(''); setTelephone(''); setMotif('');
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})`, transform: 'scale(1.05)' }}
        />
        <div className="absolute inset-0 bg-slate-900/70 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
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

        {/* Callback Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="w-full max-w-xl bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 p-4 rounded-2xl shadow-2xl"
        >
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center py-6 text-green-400 gap-2">
              <CheckCircle2 className="w-8 h-8" />
              <p className="font-semibold text-lg">Demande envoyée !</p>
              <p className="text-slate-400 text-sm">Nous vous rappelons très vite.</p>
            </div>
          ) : status === 'error' ? (
            <div className="flex flex-col items-center justify-center py-6 text-red-400 gap-2">
              <p className="font-semibold">Une erreur est survenue.</p>
              <p className="text-slate-400 text-sm">Appelez-nous directement au 07 60 73 05 88.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                name="website"
                value={website}
                onChange={e => setWebsite(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] w-px h-px opacity-0"
              />
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Votre nom"
                  required
                  value={nom}
                  onChange={e => setNom(e.target.value)}
                  className="flex-1 bg-slate-900/60 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
                <input
                  type="tel"
                  placeholder="Votre téléphone"
                  required
                  value={telephone}
                  onChange={e => setTelephone(e.target.value)}
                  className="flex-1 bg-slate-900/60 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
              <input
                type="text"
                placeholder="Motif de l'intervention (ex: fuite, débouchage, devis...)"
                value={motif}
                onChange={e => setMotif(e.target.value)}
                className="w-full bg-slate-900/60 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-semibold rounded-xl px-8 py-3 transition-colors shadow-lg shadow-blue-900/50"
              >
                {status === 'loading' ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Envoi en cours…</>
                ) : (
                  'Être rappelé'
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
