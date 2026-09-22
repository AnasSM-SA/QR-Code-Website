export const DENSITY_WARNING_BYTES = 800;
export const MAX_PAYLOAD_BYTES = 1_500;

export type PayloadResult =
  | { status: "empty"; byteLength: 0 }
  | { status: "invalid"; byteLength: 0 }
  | { status: "too-large"; byteLength: number }
  | {
      status: "valid";
      payload: string;
      byteLength: number;
      hasDensityWarning: boolean;
    };

export function getUtf8ByteLength(value: string): number {
  return new TextEncoder().encode(value).length;
}

export function finalizePayload(payload: string): PayloadResult {
  const byteLength = getUtf8ByteLength(payload);

  if (byteLength > MAX_PAYLOAD_BYTES) {
    return { status: "too-large", byteLength };
  }

  return {
    status: "valid",
    payload,
    byteLength,
    hasDensityWarning: byteLength > DENSITY_WARNING_BYTES,
  };
}
