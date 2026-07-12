import React from 'react';
import { Link } from 'wouter';
import { ArrowLeft, Droplet, Zap } from 'lucide-react';

export default function LegalPageLayout({
  title,
  updatedAt,
  children,
}: {
  title: string;
  updatedAt: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-300">
      <header className="border-b border-slate-800">
        <div className="container mx-auto px-4 md:px-6 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex -space-x-1">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <Droplet className="w-4 h-4 text-white" />
              </div>
              <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
            </div>
            <span className="text-lg font-bold tracking-tight text-white ml-1">TBP Plomberie</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au site
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-16 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{title}</h1>
        <p className="text-sm text-slate-500 mb-10">Dernière mise à jour : {updatedAt}</p>
        <div className="prose prose-invert prose-slate max-w-none space-y-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-3 [&_p]:leading-relaxed [&_li]:leading-relaxed [&_a]:text-blue-400">
          {children}
        </div>
      </main>

      <footer className="border-t border-slate-800 py-8">
        <div className="container mx-auto px-4 md:px-6 text-sm text-slate-500 text-center">
          © 2026 TBP Plomberie – SIREN : 820 633 774
        </div>
      </footer>
    </div>
  );
}
