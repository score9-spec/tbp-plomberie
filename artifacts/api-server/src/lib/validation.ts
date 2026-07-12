import { z } from "zod";

const nom = z.string().trim().min(2, "Nom trop court").max(100);
const telephone = z
  .string()
  .trim()
  .min(6, "Numéro de téléphone invalide")
  .max(20)
  .regex(/^[0-9+().\s-]+$/, "Numéro de téléphone invalide");
const email = z.string().trim().email("Email invalide").max(200).optional().or(z.literal(""));
const message = z.string().trim().max(2000).optional().or(z.literal(""));
// Honeypot: a hidden field real users never fill. Accepts any value so it never fails
// validation itself — the route handler checks it and silently no-ops instead of
// returning an error that would tip a bot off.
const honeypot = z.string().max(500).optional().or(z.literal(""));

export const devisSchema = z.object({
  nom,
  telephone,
  email,
  service: z.string().trim().max(50).optional().or(z.literal("")),
  prestation: z.string().trim().max(200).optional().or(z.literal("")),
  message,
  website: honeypot,
});

export const callbackSchema = z.object({
  nom,
  telephone,
  motif: message,
  website: honeypot,
});
