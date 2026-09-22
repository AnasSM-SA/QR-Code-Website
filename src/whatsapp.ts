import { finalizePayload, type PayloadResult } from "./payload";
import { normalizeInternationalPhoneNumber } from "./phone";

export function buildWhatsAppPayload(
  countryCode: string,
  phoneNumber: string,
  message: string,
): PayloadResult {
  if (!countryCode.trim() && !phoneNumber.trim() && !message.trim()) {
    return { status: "empty", byteLength: 0 };
  }

  const normalizedNumber = normalizeInternationalPhoneNumber(
    countryCode,
    phoneNumber,
  );

  if (!normalizedNumber) {
    return { status: "invalid", byteLength: 0 };
  }

  const digitsOnlyNumber = normalizedNumber.slice(1);
  const messageQuery = message.trim()
    ? `?text=${encodeURIComponent(message)}`
    : "";

  return finalizePayload(
    `https://wa.me/${digitsOnlyNumber}${messageQuery}`,
  );
}
