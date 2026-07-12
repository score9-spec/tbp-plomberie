import React from 'react';
import { motion } from 'framer-motion';
import plomberie2 from '@/assets/gallery/plomberie-2.jpg';
import chauffage from '@/assets/gallery/chauffage.jpg';
import electricite1 from '@/assets/gallery/electricite-1.jpg';
import electricite2 from '@/assets/gallery/electricite-2.jpg';

const photos = [
  { src: plomberie2, alt: 'Technicienne TBP Plomberie sur un chantier', label: 'Chantier de plomberie — Sarlat' },
  { src: electricite1, alt: "Intervention sur tableau électrique", label: 'Mise aux normes tableau électrique' },
  { src: chauffage, alt: 'Entretien de chaudière et ballon d\'eau chaude', label: "Entretien chaudière — Bergerac" },
  { src: electricite2, alt: 'Électricien intervenant sur une armoire électrique', label: 'Câblage armoire électrique' },
];

export default function GallerySection() {
  return (
    <section id="realisations" className="py-24 bg-slate-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-semibold mb-4 border border-blue-500/20 uppercase tracking-wider">
            Sur le terrain
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Nos réalisations</h2>
          <p className="text-slate-400 text-lg">
            Un aperçu de nos interventions récentes en plomberie, électricité et chauffage en Dordogne.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {photos.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative group rounded-2xl overflow-hidden border border-slate-700"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="w-full h-full object-cover aspect-square group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white text-sm font-semibold">{photo.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
