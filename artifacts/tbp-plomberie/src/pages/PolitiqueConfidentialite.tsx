import React from 'react';
import LegalPageLayout from './LegalPageLayout';

export default function PolitiqueConfidentialite() {
  return (
    <LegalPageLayout title="Politique de Confidentialité" updatedAt="12 juillet 2026">
      <section>
        <h2>Responsable du traitement</h2>
        <p>
          TBP Plomberie (SIREN 820 633 774), 3020 route des fontaines, Minzac, 24610, est
          responsable du traitement des données collectées via ce site. Contact :{' '}
          <a href="mailto:contact@plombier-electricien-dordogne.fr">contact@plombier-electricien-dordogne.fr</a> — 07 60 73 05 88.
        </p>
      </section>

      <section>
        <h2>Données collectées</h2>
        <p>Lorsque vous utilisez le formulaire de contact ou de demande de devis, nous collectons :</p>
        <ul>
          <li>Votre nom et prénom</li>
          <li>Votre numéro de téléphone</li>
          <li>Votre adresse email</li>
          <li>La prestation demandée et le message décrivant votre besoin</li>
        </ul>
      </section>

      <section>
        <h2>Finalité du traitement</h2>
        <p>
          Ces données sont utilisées uniquement pour traiter votre demande : vous recontacter,
          établir un devis et, le cas échéant, réaliser la prestation demandée. Elles ne sont ni
          revendues ni utilisées à des fins de prospection commerciale non sollicitée.
        </p>
      </section>

      <section>
        <h2>Base légale</h2>
        <p>
          Le traitement repose sur l'exécution de mesures précontractuelles prises à votre demande
          (article 6.1.b du RGPD) : répondre à votre demande de devis ou de rappel.
        </p>
      </section>

      <section>
        <h2>Destinataires des données</h2>
        <p>
          Vos données sont reçues par TBP Plomberie via un envoi d'email utilisant Resend, un
          service d'acheminement d'emails transactionnels, qui agit en tant que sous-traitant
          technique. Le site est hébergé par Vercel (frontend) et Render (serveur applicatif) — voir
          les{' '}
          <a href="/mentions-legales">mentions légales</a> pour le détail. Aucune autre entreprise
          tierce n'a accès à vos données.
        </p>
      </section>

      <section>
        <h2>Durée de conservation</h2>
        <p>
          Les données transmises via le formulaire sont conservées le temps nécessaire au
          traitement de votre demande et à la relation commerciale qui peut en découler, puis
          supprimées ou archivées conformément aux obligations légales et comptables applicables.
        </p>
      </section>

      <section>
        <h2>Vos droits</h2>
        <p>
          Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi
          Informatique et Libertés, vous disposez d'un droit d'accès, de rectification,
          d'effacement, de limitation et d'opposition concernant vos données personnelles. Vous
          pouvez exercer ces droits en nous contactant à{' '}
          <a href="mailto:contact@plombier-electricien-dordogne.fr">contact@plombier-electricien-dordogne.fr</a> ou au{' '}
          07 60 73 05 88.
        </p>
      </section>

      <section>
        <h2>Cookies et services tiers</h2>
        <p>
          Ce site intègre une carte interactive (Google Maps) et des liens vers WhatsApp. Ces
          services tiers peuvent déposer leurs propres cookies ou traceurs lorsque vous interagissez
          avec eux, selon leur propre politique de confidentialité, indépendante de TBP Plomberie.
          Le site lui-même ne dépose pas de cookie de suivi ou publicitaire.
        </p>
      </section>

      <section>
        <h2>Sécurité</h2>
        <p>
          Nous mettons en œuvre des mesures raisonnables pour protéger vos données contre tout accès,
          modification ou divulgation non autorisés.
        </p>
      </section>
    </LegalPageLayout>
  );
}
