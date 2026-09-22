import { describe, expect, it } from "vitest";
import { buildWhatsAppPayload } from "./whatsapp";

describe("buildWhatsAppPayload", () => {
  it("returns empty when every field is empty", () => {
    expect(buildWhatsAppPayload("", "", "")).toEqual({
      status: "empty",
      byteLength: 0,
    });
  });

  it("rejects an invalid phone number", () => {
    expect(buildWhatsAppPayload("+966", "hello", "")).toEqual({
      status: "invalid",
      byteLength: 0,
    });
  });

  it("uses a digits-only wa.me number", () => {
    const result = buildWhatsAppPayload("+966", "(50) 123-4567", "");

    expect(result.status).toBe("valid");
    if (result.status === "valid") {
      expect(result.payload).toBe("https://wa.me/966501234567");
    }
  });

  it("percent-encodes the optional message", () => {
    const result = buildWhatsAppPayload(
      "+966",
      "50 123 4567",
      "مرحبًا & hello",
    );

    expect(result.status).toBe("valid");
    if (result.status === "valid") {
      expect(result.payload).toBe(
        `https://wa.me/966501234567?text=${encodeURIComponent(
          "مرحبًا & hello",
        )}`,
      );
    }
  });
});
