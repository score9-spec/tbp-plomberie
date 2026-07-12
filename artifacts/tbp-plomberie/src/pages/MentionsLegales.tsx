import React from 'react';
import LegalPageLayout from './LegalPageLayout';

export default function MentionsLegales() {
  return (
    <LegalPageLayout title="Mentions Légales" updatedAt="11 juillet 2026">
      <section>
        <h2>Éditeur du site</h2>
        <p>
          Le présent site est édité par TBP Plomberie, entreprise individuelle (EI).
        </p>
        <ul>
          <li>Nom commercial : TBP Plomberie</li>
          <li>SIREN : 820 633 774</li>
          <li>Adresse : 3020 route des fontaines, Minzac, 24610</li>
          <li>Téléphone : 07 60 73 05 88</li>
          <li>Email : tbpplomberie33@gmail.com</li>
          <li>Responsable de la publication : TBP Plomberie</li>
        </ul>
      </section>

      <section>
        <h2>Hébergement</h2>
        <p>
          L'hébergeur du site sera communiqué dans une prochaine mise à jour de cette page.
        </p>
      </section>

      <section>
        <h2>Activité</h2>
        <p>
          TBP Plomberie exerce une activité d'artisan plombier-électricien en Dordogne (24) :
          dépannage, installation et rénovation en plomberie et électricité, ainsi que des
          solutions énergétiques (pompes à chaleur, bornes de recharge IRVE, domotique).
        </p>
      </section>

      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          L'ensemble des contenus présents sur ce site (textes, images, logo, mise en page) est la
          propriété de TBP Plomberie, sauf mention contraire, et ne peut être reproduit, distribué
          ou exploité sans autorisation préalable.
        </p>
      </section>

      <section>
        <h2>Responsabilité</h2>
        <p>
          TBP Plomberie s'efforce d'assurer l'exactitude des informations diffusées sur ce site,
          notamment les tarifs indicatifs, mais ne saurait être tenu responsable d'erreurs ou
          d'omissions. Les tarifs affichés sont indicatifs et non contractuels ; seul le devis
          signé fait foi.
        </p>
      </section>

      <section>
        <h2>Liens externes</h2>
        <p>
          Le site peut contenir des liens vers des services tiers (WhatsApp, Google Maps). TBP
          Plomberie n'est pas responsable du contenu ou des pratiques de confidentialité de ces
          services externes.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Pour toute question relative à ces mentions légales, vous pouvez nous contacter au
          07 60 73 05 88 ou par email à{' '}
          <a href="mailto:tbpplomberie33@gmail.com">tbpplomberie33@gmail.com</a>.
        </p>
      </section>
    </LegalPageLayout>
  );
}
