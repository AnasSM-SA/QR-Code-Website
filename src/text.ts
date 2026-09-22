import { finalizePayload, type PayloadResult } from "./payload";

export function buildTextPayload(text: string): PayloadResult {
  if (!text.trim()) {
    return { status: "empty", byteLength: 0 };
  }

  return finalizePayload(text);
}
