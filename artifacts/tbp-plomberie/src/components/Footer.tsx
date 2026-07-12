import React from 'react';
import { Link } from 'wouter';
import { SiTiktok } from 'react-icons/si';
import logo from '@/assets/logo.png';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8 text-slate-400">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-12">
          
          <div className="flex flex-col items-center md:items-start gap-4 max-w-sm text-center md:text-left">
            <a href="#" className="flex items-center gap-2 group">
              <img src={logo} alt="TBP Plomberie" className="w-9 h-9 rounded-full object-cover" />
              <span className="text-xl font-bold tracking-tight text-white ml-1">
                TBP Plomberie
              </span>
            </a>
            <p className="text-sm">
              Artisan de confiance en Dordogne pour tous vos travaux de plomberie, électricité et solutions énergétiques d'avenir.
            </p>
          </div>

          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-100 hover:text-slate-900 transition-colors border border-slate-700" aria-label="TikTok">
              <SiTiktok className="w-4 h-4" />
            </a>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-slate-800 text-sm">
          <p>© 2026 TBP Plomberie – SIREN : 820 633 774</p>
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions Légales</Link>
            <Link href="/politique-confidentialite" className="hover:text-white transition-colors">Politique de Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
