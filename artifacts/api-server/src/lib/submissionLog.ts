import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { logger } from "./logger";

const logDir = path.resolve(process.cwd(), "data");
const logFile = path.join(logDir, "submissions.jsonl");

export type SubmissionRecord = {
  type: "devis" | "callback";
  receivedAt: string;
  nom: string;
  telephone: string;
  email?: string;
  service?: string;
  prestation?: string;
  message?: string;
  emailSent: boolean;
};

export async function logSubmission(record: SubmissionRecord): Promise<void> {
  try {
    await mkdir(logDir, { recursive: true });
    await appendFile(logFile, `${JSON.stringify(record)}\n`, "utf8");
  } catch (err) {
    // Persistence is a safety net, not a hard dependency — never fail the request over it.
    logger.error({ err }, "Impossible d'écrire dans le journal des demandes");
  }
}
