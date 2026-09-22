import { finalizePayload, type PayloadResult } from "./payload";

const COUNTRY_CODE_PATTERN = /^\+?[1-9]\d{0,2}$/;
const PHONE_INPUT_PATTERN = /^[\d\s()-]+$/;

function removePhoneFormatting(value: string): string {
  return value.replace(/[\s()-]/g, "");
}

export function normalizeInternationalPhoneNumber(
  countryCode: string,
  phoneNumber: string,
): string | null {
  const trimmedCountryCode = countryCode.trim();
  const trimmedPhoneNumber = phoneNumber.trim();

  if (
    !COUNTRY_CODE_PATTERN.test(trimmedCountryCode) ||
    !PHONE_INPUT_PATTERN.test(trimmedPhoneNumber)
  ) {
    return null;
  }

  const countryDigits = trimmedCountryCode.replace(/^\+/, "");
  const phoneDigits = removePhoneFormatting(trimmedPhoneNumber);
  const combinedDigits = `${countryDigits}${phoneDigits}`;

  if (
    phoneDigits.length < 4 ||
    combinedDigits.length < 7 ||
    combinedDigits.length > 15
  ) {
    return null;
  }

  return `+${combinedDigits}`;
}

export function buildPhonePayload(
  countryCode: string,
  phoneNumber: string,
): PayloadResult {
  if (!countryCode.trim() && !phoneNumber.trim()) {
    return { status: "empty", byteLength: 0 };
  }

  const normalizedNumber = normalizeInternationalPhoneNumber(
    countryCode,
    phoneNumber,
  );

  if (!normalizedNumber) {
    return { status: "invalid", byteLength: 0 };
  }

  return finalizePayload(`tel:${normalizedNumber}`);
}
