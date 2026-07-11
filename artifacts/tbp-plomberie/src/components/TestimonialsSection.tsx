import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Marie-Claire D.",
    location: "Périgueux",
    text: "Intervention extrêmement rapide un dimanche matin pour une fuite importante. Le plombier a été professionnel, rassurant et le tarif était annoncé d'avance. Je recommande les yeux fermés.",
    rating: 5,
  },
  {
    name: "Thomas B.",
    location: "Bergerac",
    text: "Rénovation complète de mon tableau électrique et installation d'une borne de recharge pour ma voiture. Travail impeccable, propre, et de très bons conseils. Un vrai artisan !",
    rating: 5,
  },
  {
    name: "Jean-Pierre M.",
    location: "Sarlat",
    text: "Mise en place d'une pompe à chaleur avec TBP. Devis clair, respect des délais, équipe sympathique. Ma facture d'énergie a déjà bien baissé. Merci pour votre sérieux.",
    rating: 5,
  }
];

export default function TestimonialsSection() {
  return (
    <section id="avis" className="py-24 bg-slate-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Ce que disent nos clients</h2>
          <p className="text-slate-400 text-lg">
            La satisfaction de nos clients est notre meilleure publicité. Découvrez leurs retours sur nos interventions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-slate-800 rounded-3xl p-8 border border-slate-700 relative group hover:border-slate-500 transition-colors"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-slate-700/50 group-hover:text-blue-500/20 transition-colors" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                ))}
              </div>
              
              <p className="text-slate-300 text-lg leading-relaxed mb-8 italic">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold text-xl">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-bold">{testimonial.name}</h4>
                  <p className="text-slate-400 text-sm">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
