import nodemailer, { type Transporter } from "nodemailer";

export const gmailUser = "tbpplomberie33@gmail.com";

export function createMailer(): Transporter | null {
  const pass = process.env["GMAIL_APP_PASSWORD"];
  if (!pass) return null;

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: { user: gmailUser, pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 10_000,
  });
}
