import { Router } from "express";
import nodemailer from "nodemailer";
import { logger } from "../lib/logger";

const router = Router();

router.post("/devis", async (req, res) => {
  const { nom, telephone, email, service, message } = req.body as {
    nom?: string;
    telephone?: string;
    email?: string;
    service?: string;
    message?: string;
  };

  if (!nom || !telephone) {
    res.status(400).json({ error: "Nom et téléphone requis." });
    return;
  }

  const gmailUser = "tbpplomberie33@gmail.com";
  const gmailPass = process.env["GMAIL_APP_PASSWORD"];

  if (!gmailPass) {
    logger.warn("GMAIL_APP_PASSWORD non configuré — email non envoyé");
    res.json({ ok: true });
    return;
  }

  const serviceLabels: Record<string, string> = {
    plomberie: "Plomberie (Dépannage, Installation)",
    electricite: "Électricité (Mise aux normes, Tableau)",
    solutions2026: "Solutions 2026 (PAC, IRVE, Domotique)",
    autre: "Autre demande",
  };

  const serviceLabel = service ? (serviceLabels[service] ?? service) : "Non précisé";

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
          <td style="padding:8px 0;color:#94a3b8;vertical-align:top;">Service</td>
          <td style="padding:8px 0;">${serviceLabel}</td>
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

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailPass },
  });

  try {
    await transporter.sendMail({
      from: `"TBP Plomberie Site" <${gmailUser}>`,
      to: gmailUser,
      replyTo: email || undefined,
      subject: `📋 Devis demandé — ${nom} · ${serviceLabel}`,
      html,
    });
    logger.info({ nom, telephone, service }, "Email devis envoyé");
    res.json({ ok: true });
  } catch (err) {
    logger.error({ err }, "Erreur envoi email devis");
    res.status(500).json({ error: "Erreur lors de l'envoi." });
  }
});

export default router;
