import { describe, expect, it } from "vitest";
import { MAX_PAYLOAD_BYTES } from "./payload";
import { buildTextPayload } from "./text";

describe("buildTextPayload", () => {
  it("returns empty for blank text", () => {
    expect(buildTextPayload("   ")).toEqual({
      status: "empty",
      byteLength: 0,
    });
  });

  it("uses the entered text without adding a prefix or trimming it", () => {
    const result = buildTextPayload("  مرحبًا QR  ");

    expect(result.status).toBe("valid");
    if (result.status === "valid") {
      expect(result.payload).toBe("  مرحبًا QR  ");
    }
  });

  it("warns for dense text payloads", () => {
    const result = buildTextPayload("a".repeat(801));

    expect(result.status).toBe("valid");
    if (result.status === "valid") {
      expect(result.hasDensityWarning).toBe(true);
    }
  });

  it("rejects payloads above the shared byte limit", () => {
    expect(buildTextPayload("a".repeat(MAX_PAYLOAD_BYTES + 1)).status).toBe(
      "too-large",
    );
  });
});
