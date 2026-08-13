import nodemailer from "nodemailer";
import { siteConfig } from "@/config/site";

export type ContactEmailInput = {
  name: string;
  email: string;
  message: string;
};

export function getEmailConfig() {
  return {
    host: process.env.SMTP_HOST ?? "smtp.hostinger.com",
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: true,
    user: process.env.SMTP_USER ?? siteConfig.email,
    pass: process.env.SMTP_PASS ?? "",
    to: process.env.CONTACT_TO_EMAIL ?? siteConfig.email,
  };
}

export async function sendContactEmail(input: ContactEmailInput): Promise<boolean> {
  const { host, port, secure, user, pass, to } = getEmailConfig();
  if (!pass) return false;
  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });
    await transporter.sendMail({
      from: `"${input.name}" <${user}>`,
      replyTo: input.email,
      to,
      subject: `Contact Request — ${input.name || "Website visitor"}`,
      text: `Name: ${input.name}\nEmail: ${input.email}\n\n${input.message}`,
    });
    return true;
  } catch {
    return false;
  }
}
