import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageCircle, Loader2 } from 'lucide-react';
import { apiUrl } from '@/lib/api';

const PRESTATIONS = [
  {
    category: 'plomberie',
    categoryLabel: 'Plomberie',
    items: [
      'Réparation fuite de tuyau',
      'Débouchage WC',
      'Débouchage canalisation',
      "Réparation ballon d'eau chaude",
      'Recherche de fuite non destructive',
      'Réparation fuite chasse d\'eau',
      "Installation d'un robinet",
      "Installation ballon d'eau chaude",
      'Installation WC classique',
      'Réparation fuite de douche',
    ],
  },
  {
    category: 'electricite',
    categoryLabel: 'Électricité',
    items: [
      'Remise aux normes tableau électrique',
      'Réparation de prise murale',
      "Réparation d'un tableau électrique",
      'Recherche de panne électrique',
      'Panne électrique inconnue',
    ],
  },
  {
    category: 'solutions2026',
    categoryLabel: 'Solutions 2026',
    items: ['Pompe à chaleur (PAC)', 'Borne IRVE', 'Domotique & maison connectée'],
  },
  {
    category: 'autre',
    categoryLabel: 'Autre',
    items: ['Autre demande'],
  },
] as const;

export default function ContactSection() {
  const [nom, setNom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [prestation, setPrestation] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const [service, prestationLabel] = prestation.split('::');
      const res = await fetch(apiUrl('devis'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom, telephone, email, service, prestation: prestationLabel, message, website }),
      });
      if (res.ok) {
        setStatus('success');
        setNom(''); setTelephone(''); setEmail(''); setPrestation(''); setMessage('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-800 border-t border-slate-700">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Contact & Devis Gratuit</h2>
          <p className="text-slate-400 text-lg">
            Une urgence ou un projet de rénovation ? Contactez-nous dès maintenant, nous vous répondons dans les plus brefs délais.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start max-w-6xl mx-auto">
          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900 rounded-3xl p-8 md:p-10 border border-slate-700 shadow-xl"
          >
            {status === 'success' ? (
              <div className="min-h-[400px] flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Demande envoyée !</h3>
                <p className="text-slate-400">Nous avons bien reçu votre demande de devis et vous recontacterons très rapidement.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-8 text-blue-400 hover:text-blue-300 font-medium"
                >
                  Envoyer une autre demande
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
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
                {status === 'error' && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-sm">
                    Une erreur est survenue. Appelez-nous directement au <a href="tel:0760730588" className="font-bold underline">07 60 73 05 88</a>.
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-slate-300">Prénom & Nom</label>
                    <input
                      type="text" id="name" required value={nom}
                      onChange={e => setNom(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      placeholder="Jean Dupont"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-slate-300">Téléphone</label>
                    <input
                      type="tel" id="phone" required value={telephone}
                      onChange={e => setTelephone(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      placeholder="06 XX XX XX XX"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-300">Email</label>
                  <input
                    type="email" id="email" required value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    placeholder="jean.dupont@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="prestation" className="text-sm font-medium text-slate-300">Prestation souhaitée</label>
                  <select
                    id="prestation" required value={prestation}
                    onChange={e => setPrestation(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none"
                  >
                    <option value="">Sélectionnez une prestation</option>
                    {PRESTATIONS.map(group => (
                      <optgroup key={group.category} label={group.categoryLabel}>
                        {group.items.map(item => (
                          <option key={item} value={`${group.category}::${item}`}>{item}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-slate-300">Message</label>
                  <textarea
                    id="message" rows={4} required value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                    placeholder="Décrivez votre besoin en quelques mots..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-6 py-4 flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-blue-900/30"
                >
                  {status === 'loading' ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Envoi en cours…</>
                  ) : (
                    <>Envoyer ma demande <Send className="w-4 h-4" /></>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8 h-full"
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
              <div className="flex items-start gap-4 p-6 bg-slate-900/50 rounded-2xl border border-slate-700">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Zone d'intervention</h4>
                  <p className="text-slate-400 leading-relaxed">Dordogne (24)<br />et alentours</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-slate-900/50 rounded-2xl border border-slate-700">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Téléphone</h4>
                  <a href="tel:0760730588" className="text-amber-500 font-semibold hover:text-amber-400 transition-colors text-lg">07 60 73 05 88</a>
                  <p className="text-slate-400 text-sm mt-1">Urgences 24h/7j</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-slate-900/50 rounded-2xl border border-slate-700">
                <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6 text-[#25D366]" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">WhatsApp</h4>
                  <a
                    href="https://wa.me/33749693708"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366] text-white font-semibold text-sm hover:bg-[#1ebe5d] transition-colors mt-1"
                  >
                    Envoyer un message
                  </a>
                </div>
              </div>

              <div className="sm:col-span-2 lg:col-span-1 flex items-start gap-4 p-6 bg-slate-900/50 rounded-2xl border border-slate-700 min-w-0">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-blue-500" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-white font-bold text-lg mb-1">Email</h4>
                  <a href="mailto:contact@plombier-electricien-dordogne.fr" className="text-slate-300 hover:text-white transition-colors text-sm sm:text-base whitespace-nowrap">contact@plombier-electricien-dordogne.fr</a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-slate-900/50 rounded-2xl border border-slate-700">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-slate-300" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Horaires</h4>
                  <p className="text-amber-500 font-bold text-lg">24h/24 — 7j/7</p>
                  <p className="text-slate-400 text-sm mt-1">Disponible tous les jours, même les jours fériés</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="flex-1 min-h-[250px] rounded-3xl overflow-hidden border border-slate-700 bg-slate-900 shadow-lg relative isolate">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d173649.2!2d0.7558!3d45.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47ff05b4ce15d5a1%3A0x40affd7a5f2e2540!2sDordogne!5e0!3m2!1sfr!2sfr!4v1625000000001!5m2!1sfr!2sfr"
                width="100%"
                height="100%"
                style={{ border: 0, position: 'absolute', inset: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(80%) contrast(90%) grayscale(60%)' }}
                allowFullScreen={false}
                loading="lazy"
                title="Carte d'intervention TBP Plomberie en Dordogne"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
