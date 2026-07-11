import { Router } from "express";
import nodemailer from "nodemailer";
import { logger } from "../lib/logger";

const router = Router();

router.post("/callback", async (req, res) => {
  const { nom, telephone, motif } = req.body as {
    nom?: string;
    telephone?: string;
    motif?: string;
  };

  if (!nom || !telephone) {
    res.status(400).json({ error: "Nom et téléphone requis." });
    return;
  }

  const gmailUser = "tbpplomberie33@gmail.com";
  const gmailPass = process.env["GMAIL_APP_PASSWORD"];

  if (!gmailPass) {
    logger.warn("GMAIL_APP_PASSWORD non configuré — email non envoyé");
    // On répond quand même OK côté client pour ne pas bloquer
    res.json({ ok: true });
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailPass },
  });

  const html = `
    <div style="font-family:sans-serif;max-width:520px;margin:0 auto;background:#0f172a;color:#e2e8f0;padding:32px;border-radius:12px;">
      <h2 style="color:#3b82f6;margin-top:0;">📞 Nouvelle demande de rappel — TBP Plomberie</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:8px 0;color:#94a3b8;width:120px;">Nom</td>
          <td style="padding:8px 0;font-weight:bold;">${nom}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#94a3b8;">Téléphone</td>
          <td style="padding:8px 0;font-weight:bold;"><a href="tel:${telephone}" style="color:#f59e0b;">${telephone}</a></td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#94a3b8;">Motif</td>
          <td style="padding:8px 0;">${motif || "Non précisé"}</td>
        </tr>
      </table>
      <p style="margin-top:24px;color:#64748b;font-size:13px;">
        Reçu le ${new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" })} · TBP Plomberie Dordogne
      </p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"TBP Plomberie Site" <${gmailUser}>`,
      to: gmailUser,
      subject: `🔔 Rappel demandé — ${nom} (${telephone})`,
      html,
    });
    logger.info({ nom, telephone }, "Email de rappel envoyé");
    res.json({ ok: true });
  } catch (err) {
    logger.error({ err }, "Erreur envoi email");
    res.status(500).json({ error: "Erreur lors de l'envoi de l'email." });
  }
});

export default router;
