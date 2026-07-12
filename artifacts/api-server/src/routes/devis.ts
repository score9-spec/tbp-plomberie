import { Router } from "express";
import { logger } from "../lib/logger";
import { generateDevisPdf } from "../lib/devisPdf";
import { devisSchema } from "../lib/validation";
import { logSubmission } from "../lib/submissionLog";
import { createMailer, gmailUser } from "../lib/mailer";

const router = Router();

const tarifs: Record<string, { label: string; prix: string }[]> = {
  plomberie: [
    { label: "Réparation fuite de tuyau", prix: "149 € – 199 €" },
    { label: "Débouchage WC", prix: "130 € – 200 €" },
    { label: "Débouchage canalisation", prix: "290 € – 390 €" },
    { label: "Réparation ballon d'eau chaude", prix: "150 € – 350 €" },
    { label: "Recherche de fuite non destructive", prix: "380 € – 480 €" },
    { label: "Réparation fuite chasse d'eau", prix: "149 € – 200 €" },
    { label: "Installation d'un robinet", prix: "150 € – 450 €" },
    { label: "Installation ballon d'eau chaude", prix: "250 € – sur devis" },
    { label: "Installation WC classique", prix: "200 € – 500 €" },
    { label: "Réparation fuite de douche", prix: "149 € – 200 €" },
  ],
  electricite: [
    { label: "Remise aux normes tableau électrique", prix: "À partir de 440 € – sur devis" },
    { label: "Réparation de prise murale", prix: "140 € – 180 €" },
    { label: "Réparation d'un tableau électrique", prix: "130 € – 250 €" },
    { label: "Recherche de panne électrique", prix: "150 € – 190 €" },
    { label: "Panne électrique inconnue", prix: "130 € – 380 €" },
  ],
};

router.post("/devis", async (req, res) => {
  const parsed = devisSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Données invalides." });
    return;
  }

  if (parsed.data.website) {
    // Honeypot tripped — pretend success so the bot doesn't learn it was caught.
    res.json({ ok: true });
    return;
  }

  const { nom, telephone, email, service, prestation, message } = parsed.data;

  const transporter = createMailer();

  if (!transporter) {
    logger.warn("GMAIL_APP_PASSWORD non configuré — email non envoyé");
    await logSubmission({
      type: "devis",
      receivedAt: new Date().toISOString(),
      nom,
      telephone,
      email: email || undefined,
      service,
      prestation,
      message,
      emailSent: false,
    });
    res.json({ ok: true });
    return;
  }

  const serviceLabels: Record<string, string> = {
    plomberie: "Plomberie",
    electricite: "Électricité",
    solutions2026: "Solutions 2026 (PAC, IRVE, Domotique)",
    autre: "Autre demande",
  };

  const categoryLabel = service ? (serviceLabels[service] ?? service) : "Non précisé";
  const serviceLabel = prestation || categoryLabel;

  const html = `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;background:#0f172a;color:#e2e8f0;padding:32px;border-radius:12px;">
      <h2 style="color:#3b82f6;margin-top:0;">📋 Nouvelle demande de devis — TBP Plomberie</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:8px 0;color:#94a3b8;width:130px;vertical-align:top;">Nom</td>
          <td style="padding:8px 0;font-weight:bold;">${nom}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#94a3b8;vertical-align:top;">Téléphone</td>
          <td style="padding:8px 0;font-weight:bold;"><a href="tel:${telephone}" style="color:#f59e0b;">${telephone}</a></td>
        </tr>
        ${email ? `
        <tr>
          <td style="padding:8px 0;color:#94a3b8;vertical-align:top;">Email client</td>
          <td style="padding:8px 0;"><a href="mailto:${email}" style="color:#60a5fa;">${email}</a></td>
        </tr>` : ""}
        <tr>
          <td style="padding:8px 0;color:#94a3b8;vertical-align:top;">Catégorie</td>
          <td style="padding:8px 0;">${categoryLabel}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#94a3b8;vertical-align:top;">Prestation</td>
          <td style="padding:8px 0;font-weight:bold;">${serviceLabel}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#94a3b8;vertical-align:top;">Message</td>
          <td style="padding:8px 0;white-space:pre-wrap;">${message || "Non précisé"}</td>
        </tr>
      </table>
      <p style="margin-top:24px;color:#64748b;font-size:13px;">
        Reçu le ${new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" })} · TBP Plomberie Dordogne
      </p>
    </div>
  `;

  const categoryTarifs = service ? tarifs[service] : undefined;
  const matchedTarif = categoryTarifs?.find((t) => t.label === prestation);
  const serviceTarifs = matchedTarif ? [matchedTarif] : categoryTarifs;

  const clientHtml = `
    <div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#0f172a;">
      <p>Bonjour ${nom},</p>
      <p>Merci pour votre demande concernant <strong>${serviceLabel}</strong>. Vous trouverez votre devis indicatif en pièce jointe (PDF).</p>
      <p>Notre équipe va l'étudier et vous recontacter au ${telephone} dans les plus brefs délais.</p>
      <p style="margin-top:24px;color:#475569;font-size:13px;">
        TBP Plomberie Dordogne · Disponible 24h/24, 7j/7 · 07 60 73 05 88
      </p>
    </div>
  `;

  const clientText = [
    `Bonjour ${nom},`,
    ``,
    `Merci pour votre demande concernant ${serviceLabel}. Vous trouverez votre devis indicatif en pièce jointe (PDF).`,
    `Notre équipe va l'étudier et vous recontacter au ${telephone} dans les plus brefs délais.`,
    ``,
    `TBP Plomberie Dordogne - Disponible 24h/24, 7j/7 - 07 60 73 05 88`,
  ].join("\n");

  const internalText = [
    `Nouvelle demande de devis`,
    `Nom: ${nom}`,
    `Téléphone: ${telephone}`,
    email ? `Email client: ${email}` : null,
    `Catégorie: ${categoryLabel}`,
    `Prestation: ${serviceLabel}`,
    `Message: ${message || "Non précisé"}`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const internalResult = await transporter.sendMail({
      to: gmailUser,
      replyTo: email || undefined,
      subject: `Devis demandé — ${nom} - ${serviceLabel}`,
      html,
      text: internalText,
    });
    logger.info({ id: internalResult.id }, "Email interne envoyé (notification tbpplomberie33)");

    if (email) {
      try {
        const numero = `DEV-${Date.now().toString().slice(-8)}`;
        const pdf = await generateDevisPdf({
          numero,
          nom,
          telephone,
          email,
          serviceLabel,
          categoryLabel,
          message,
          tarifs: serviceTarifs,
        });

        const clientResult = await transporter.sendMail({
          to: email,
          subject: `Votre devis TBP Plomberie`,
          html: clientHtml,
          text: clientText,
          attachments: [
            {
              filename: `${numero}-tbp-plomberie.pdf`,
              content: pdf,
              contentType: "application/pdf",
            },
          ],
        });
        logger.info({ to: email, id: clientResult.id }, "Email client (devis PDF) envoyé");
      } catch (err) {
        logger.error({ err, to: email }, "Erreur envoi email de confirmation au client");
      }
    } else {
      logger.warn("Pas d'email client fourni — devis PDF non envoyé");
    }

    await logSubmission({
      type: "devis",
      receivedAt: new Date().toISOString(),
      nom,
      telephone,
      email: email || undefined,
      service,
      prestation,
      message,
      emailSent: true,
    });

    logger.info({ nom, telephone, service }, "Traitement devis terminé");
    res.json({ ok: true });
  } catch (err) {
    await logSubmission({
      type: "devis",
      receivedAt: new Date().toISOString(),
      nom,
      telephone,
      email: email || undefined,
      service,
      prestation,
      message,
      emailSent: false,
    });
    logger.error({ err }, "Erreur envoi email devis");
    res.status(500).json({ error: "Erreur lors de l'envoi." });
  }
});

export default router;
