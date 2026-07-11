import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Marie-Claire D.",
    location: "Périgueux",
    text: "J'avais une grosse fuite sous l'évier un dimanche matin, je paniquais complètement. Il est arrivé en moins d'une heure, très calme, il a tout réglé rapidement. Le prix était honnête et annoncé avant de commencer. Je ne m'y connais pas du tout en plomberie mais il a bien pris le temps de m'expliquer ce qu'il faisait. Super expérience.",
    rating: 5,
  },
  {
    name: "Thomas B.",
    location: "Bergerac",
    text: "J'avais besoin de refaire le tableau électrique de ma maison et d'installer une prise pour recharger ma voiture dans le garage. Tout s'est très bien passé, il est venu faire un état des lieux, m'a donné un devis clair, et le chantier a été propre du début à la fin. Il m'a aussi conseillé pour les aides auxquelles j'avais droit, ce que j'appréciais vraiment.",
    rating: 5,
  },
  {
    name: "Jean-Pierre M.",
    location: "Sarlat",
    text: "On voulait arrêter le fioul et passer à quelque chose de moins cher. TBP nous a bien orientés, sans chercher à nous vendre plus que nécessaire. Les travaux ont été faits dans les délais prévus et les gars étaient agréables. Depuis, on chauffe mieux et on paie beaucoup moins. On aurait dû le faire bien plus tôt.",
    rating: 5,
  },
  {
    name: "Sandrine & Luc F.",
    location: "Périgueux",
    text: "On a refait entièrement notre salle de bain avec TBP. On ne savait pas trop par où commencer mais ils ont tout géré. En trois jours c'était terminé, la douche, le lavabo, tout. On est bluffés par le résultat, c'est vraiment propre et bien fait. Les voisins ont demandé leur numéro en voyant le chantier.",
    rating: 5,
  },
  {
    name: "Christophe A.",
    location: "Ribérac",
    text: "Un vendredi soir j'ai découvert de l'eau qui remontait dans le jardin, j'étais perdu. J'ai appelé TBP et ils étaient là le lendemain matin. Ils ont trouvé où venait le problème sans tout creuser, et réparé rapidement. Tarif correct, pas de mauvaise surprise. Je les ai déjà conseillés à deux personnes dans mon entourage.",
    rating: 5,
  },
  {
    name: "Nathalie V.",
    location: "Montpon-Ménestérol",
    text: "On voulait rendre la maison un peu plus moderne, piloter le chauffage et les volets depuis le téléphone. TBP nous a expliqué simplement ce qui était possible et ce qui ne l'était pas. L'installation s'est faite sans galère, ils ont tout configuré avec nous avant de partir. Maintenant c'est vraiment pratique au quotidien.",
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
