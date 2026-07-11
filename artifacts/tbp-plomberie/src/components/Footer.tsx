import React from 'react';
import { Droplet, Zap } from 'lucide-react';
import { SiFacebook, SiInstagram } from 'react-icons/si';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8 text-slate-400">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-12">
          
          <div className="flex flex-col items-center md:items-start gap-4 max-w-sm text-center md:text-left">
            <a href="#" className="flex items-center gap-2 group">
              <div className="flex -space-x-1">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <Droplet className="w-4 h-4 text-white" />
                </div>
                <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-white ml-1">
                TBP Plomberie
              </span>
            </a>
            <p className="text-sm">
              Artisan de confiance en Dordogne pour tous vos travaux de plomberie, électricité et solutions énergétiques d'avenir.
            </p>
          </div>

          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors border border-slate-700" aria-label="Facebook">
              <SiFacebook className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-colors border border-slate-700" aria-label="Instagram">
              <SiInstagram className="w-4 h-4" />
            </a>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-slate-800 text-sm">
          <p>© 2026 TBP Plomberie – SIREN : XXX XXX XXX</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
            <a href="#" className="hover:text-white transition-colors">Politique de Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
