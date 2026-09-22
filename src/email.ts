import { finalizePayload, type PayloadResult } from "./payload";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmailAddress(email: string): boolean {
  return EMAIL_PATTERN.test(email.trim());
}

export function escapeEmailQrValue(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\r\n|\r|\n/g, "\\n")
    .replace(/;/g, "\\;")
    .replace(/:/g, "\\:");
}

export function buildEmailPayload(
  email: string,
  subject: string,
  body: string,
): PayloadResult {
  if (!email.trim() && !subject.trim() && !body.trim()) {
    return { status: "empty", byteLength: 0 };
  }

  const normalizedEmail = email.trim();

  if (!isValidEmailAddress(normalizedEmail)) {
    return { status: "invalid", byteLength: 0 };
  }

  return finalizePayload(
    `MATMSG:TO:${escapeEmailQrValue(normalizedEmail)};` +
      `SUB:${escapeEmailQrValue(subject.trim())};` +
      `BODY:${escapeEmailQrValue(body.trim())};;`,
  );
}
