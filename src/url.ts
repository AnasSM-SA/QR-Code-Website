import {
  finalizePayload,
  type PayloadResult,
} from "./payload";

export {
  DENSITY_WARNING_BYTES,
  getUtf8ByteLength,
  MAX_PAYLOAD_BYTES,
} from "./payload";

const EXPLICIT_SCHEME = /^[a-zA-Z][a-zA-Z\d+.-]*:/;
const ALLOWED_PROTOCOLS = new Set(["http:", "https:"]);

export type UrlPayloadResult = PayloadResult;

function hasValidHostname(url: URL, requiresDomainShape: boolean): boolean {
  const hostname = url.hostname;

  if (!hostname || hostname.startsWith(".") || hostname.endsWith(".")) {
    return false;
  }

  if (!requiresDomainShape || hostname === "localhost") {
    return true;
  }

  return hostname.includes(".");
}

export function normalizeUrlInput(input: string): string | null {
  const trimmedInput = input.trim();

  if (!trimmedInput) {
    return null;
  }

  const hasExplicitScheme = EXPLICIT_SCHEME.test(trimmedInput);

  try {
    const candidate = hasExplicitScheme
      ? new URL(trimmedInput)
      : new URL(`https://${trimmedInput}`);

    if (
      !ALLOWED_PROTOCOLS.has(candidate.protocol) ||
      !hasValidHostname(candidate, !hasExplicitScheme)
    ) {
      return null;
    }

    return candidate.toString();
  } catch {
    return null;
  }
}

export function isValidUrlInput(input: string): boolean {
  return normalizeUrlInput(input) !== null;
}

export function buildUrlPayload(input: string): UrlPayloadResult {
  if (!input.trim()) {
    return { status: "empty", byteLength: 0 };
  }

  const normalizedUrl = normalizeUrlInput(input);

  if (!normalizedUrl) {
    return { status: "invalid", byteLength: 0 };
  }

  return finalizePayload(normalizedUrl);
}
