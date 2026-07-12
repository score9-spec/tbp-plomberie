import { Resend } from "resend";

export const gmailUser = "tbpplomberie33@gmail.com";
export const senderAddress = process.env["MAIL_FROM"] ?? "TBP Plomberie <onboarding@resend.dev>";

export interface MailAttachment {
  filename: string;
  content: Buffer;
  contentType?: string;
}

export interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  attachments?: MailAttachment[];
}

export interface MailResult {
  id?: string;
}

export function createMailer() {
  const apiKey = process.env["RESEND_API_KEY"];
  if (!apiKey) return null;

  const resend = new Resend(apiKey);

  return {
    async sendMail(opts: SendMailOptions): Promise<MailResult> {
      const { data, error } = await resend.emails.send({
        from: senderAddress,
        to: opts.to,
        subject: opts.subject,
        html: opts.html,
        text: opts.text,
        replyTo: opts.replyTo,
        attachments: opts.attachments?.map((a) => ({
          filename: a.filename,
          content: a.content,
        })),
      });

      if (error) {
        throw new Error(`Resend error: ${error.name} - ${error.message}`);
      }

      return { id: data?.id };
    },
  };
}

export type Mailer = ReturnType<typeof createMailer>;
