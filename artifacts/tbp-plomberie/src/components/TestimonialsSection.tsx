import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Marie-Claire D.",
    location: "Périgueux",
    text: "Intervention extrêmement rapide un dimanche matin pour une fuite importante sous l'évier de la cuisine. Arrivée en moins de 45 minutes, le problème réglé en une heure. Le plombier a été professionnel, rassurant, et le tarif était annoncé d'avance sans mauvaise surprise. Je recommande les yeux fermés à toute ma famille.",
    rating: 5,
  },
  {
    name: "Thomas B.",
    location: "Bergerac",
    text: "Rénovation complète de mon tableau électrique mis aux normes NF C 15-100, plus installation d'une borne de recharge pour ma voiture électrique. Travail impeccable, chantier propre, câblage soigné. De très bons conseils sur les aides disponibles (CEE). Un vrai artisan sérieux, pas un simple dépanneur.",
    rating: 5,
  },
  {
    name: "Jean-Pierre M.",
    location: "Sarlat",
    text: "Mise en place d'une pompe à chaleur air/eau avec TBP pour remplacer ma vieille chaudière au fioul. Devis clair, respect des délais, équipe propre et sympathique. Ils ont géré les démarches MaPrimeRénov' avec moi. Ma facture d'énergie a déjà bien baissé le premier mois. Investissement largement rentabilisé.",
    rating: 5,
  },
  {
    name: "Sandrine & Luc F.",
    location: "Périgueux",
    text: "Nous avons fait appel à TBP pour la réfection complète de notre salle de bain : dépose de l'ancienne installation, pose d'une douche à l'italienne, nouveau lavabo et robinetterie. Tout a été fait en 3 jours, avec un soin du détail remarquable. Le carrelage autour de la douche a été posé parfaitement. On est vraiment ravis du résultat, on a l'impression d'avoir une salle de bain neuve.",
    rating: 5,
  },
  {
    name: "Christophe A.",
    location: "Ribérac",
    text: "Fuite importante sur une canalisation extérieure enterrée un vendredi soir. TBP était là le samedi matin à 8h. Diagnostic rapide avec caméra d'inspection, réparation propre sans démolir tout le jardin. Honnêteté totale sur le devis, aucune surprise à la facture. Je les ai déjà recommandés à deux voisins qui ont été tout aussi satisfaits.",
    rating: 5,
  },
  {
    name: "Nathalie V.",
    location: "Montpon-Ménestérol",
    text: "Installation d'un système de domotique Legrand connecté dans notre maison : volets roulants, éclairage programmable et thermostat intelligent. TBP a su nous guider dans le choix du matériel sans nous vendre du superflu. La mise en service a été faite avec nous, application configurée sur nos téléphones. Le confort au quotidien est vraiment amélioré. Très professionnel du début à la fin.",
    rating: 5,
  },
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
