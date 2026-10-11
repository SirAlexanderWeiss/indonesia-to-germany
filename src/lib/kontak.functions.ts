import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Sent through the connected Gmail account via the Lovable connector gateway.
const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_mail/gmail/v1";
const RECIPIENT = "deutschlab.bydew@gmail.com";

const labels = {
  id: {
    subject: "Pendaftaran kelas",
    name: "Nama",
    email: "Email",
    goal: "Tujuan",
    level: "Level",
    course: "Kelas",
    language: "Bahasa",
  },
  de: {
    subject: "Anmeldung",
    name: "Name",
    email: "E-Mail",
    goal: "Ziel",
    level: "Niveau",
    course: "Kurs",
    language: "Sprache",
  },
} as const;

const inputSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  goal: z.string().trim().min(1).max(120),
  currentLevel: z.string().trim().min(1).max(120),
  courseLevel: z.enum(["A1", "A2", "unsure"]),
  message: z.string().trim().min(1).max(1500),
  language: z.enum(["id", "de"]),
});

function b64encodeUtf8(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function encodeHeader(value: string): string {
  return /^[\x00-\x7F]*$/.test(value)
    ? value
    : `=?UTF-8?B?${b64encodeUtf8(value)}?=`;
}

function buildRawEmail(input: z.infer<typeof inputSchema>): string {
  const l = labels[input.language];
  const subject = `${l.subject} ${input.courseLevel} — ${input.name}`;
  const body = [
    `${l.name}: ${input.name}`,
    `${l.email}: ${input.email}`,
    `${l.goal}: ${input.goal}`,
    `${l.level}: ${input.currentLevel}`,
    `${l.course}: ${input.courseLevel}`,
    `${l.language}: ${input.language.toUpperCase()}`,
    "",
    input.message,
  ].join("\n");

  const email = [
    `To: ${RECIPIENT}`,
    `Reply-To: ${input.email}`,
    `Subject: ${encodeHeader(subject)}`,
    "MIME-Version: 1.0",
    'Content-Type: text/plain; charset="UTF-8"',
    "",
    body,
  ].join("\r\n");

  return b64encodeUtf8(email)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export const sendContactRequest = createServerFn({ method: "POST" })
  .inputValidator((data) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    const lovableApiKey = process.env["LOVABLE_API_KEY"];
    const connectionKey = process.env["GOOGLE_MAIL_API_KEY"];
    if (!lovableApiKey || !connectionKey) {
      console.error("Gmail gateway credentials missing");
      return { ok: false as const, reason: "not_configured" };
    }

    try {
      const response = await fetch(`${GATEWAY_URL}/users/me/messages/send`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${lovableApiKey}`,
          "X-Connection-Api-Key": connectionKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ raw: buildRawEmail(data) }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error(`Gmail send failed [${response.status}]: ${errorBody}`);
        return { ok: false as const, reason: "send_failed" };
      }
      return { ok: true as const };
    } catch (error) {
      console.error("Gmail send error:", error);
      return { ok: false as const, reason: "send_failed" };
    }
  });
