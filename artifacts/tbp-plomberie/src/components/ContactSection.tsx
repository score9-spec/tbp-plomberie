import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageCircle } from 'lucide-react';

export default function ContactSection() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setFormStatus('idle'), 5000);
    }, 1000);
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
            {formStatus === 'success' ? (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message envoyé avec succès !</h3>
                <p className="text-slate-400">Nous vous recontacterons très rapidement pour évaluer votre besoin.</p>
                <button 
                  onClick={() => setFormStatus('idle')}
                  className="mt-8 text-blue-400 hover:text-blue-300 font-medium"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-slate-300">Prénom & Nom</label>
                    <input 
                      type="text" 
                      id="name" 
                      required
                      className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      placeholder="Jean Dupont"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-slate-300">Téléphone</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      required
                      className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      placeholder="06 XX XX XX XX"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-300">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    required
                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    placeholder="jean.dupont@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="service" className="text-sm font-medium text-slate-300">Type de besoin</label>
                  <select 
                    id="service" 
                    required
                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all appearance-none"
                  >
                    <option value="">Sélectionnez un service</option>
                    <option value="plomberie">Plomberie (Dépannage, Installation)</option>
                    <option value="electricite">Électricité (Mise aux normes, Tableau)</option>
                    <option value="solutions2026">Solutions 2026 (PAC, IRVE, Domotique)</option>
                    <option value="autre">Autre demande</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-slate-300">Message</label>
                  <textarea 
                    id="message" 
                    rows={4}
                    required
                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                    placeholder="Décrivez votre besoin en quelques mots..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={formStatus === 'submitting'}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-6 py-4 flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-blue-900/30"
                >
                  {formStatus === 'submitting' ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    <>
                      Envoyer ma demande <Send className="w-4 h-4" />
                    </>
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
                  <p className="text-slate-400 text-sm mt-2">+33 7 49 69 37 08</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-slate-900/50 rounded-2xl border border-slate-700">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Email</h4>
                  <a href="mailto:tbpplomberie33@gmail.com" className="text-slate-300 hover:text-white transition-colors break-all">tbpplomberie33@gmail.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-slate-900/50 rounded-2xl border border-slate-700">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-slate-300" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Horaires</h4>
                  <p className="text-slate-400">Lun–Ven : 8h – 19h</p>
                  <p className="text-slate-400">Sam : 9h – 17h</p>
                  <p className="text-slate-400 font-medium text-amber-500 mt-1">Dimanche : Urgences uniquement</p>
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
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
