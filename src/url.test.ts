import { describe, expect, it } from "vitest";
import {
  DENSITY_WARNING_BYTES,
  MAX_PAYLOAD_BYTES,
  buildUrlPayload,
  getUtf8ByteLength,
  isValidUrlInput,
  normalizeUrlInput,
} from "./url";

describe("normalizeUrlInput", () => {
  it("trims surrounding whitespace", () => {
    expect(normalizeUrlInput("  https://example.com/path  ")).toBe(
      "https://example.com/path",
    );
  });

  it("adds https to a valid domain-like input", () => {
    expect(normalizeUrlInput("example.com/docs")).toBe(
      "https://example.com/docs",
    );
  });

  it("preserves an explicitly supplied valid protocol", () => {
    expect(normalizeUrlInput("http://example.com")).toBe(
      "http://example.com/",
    );
    expect(normalizeUrlInput("https://example.com")).toBe(
      "https://example.com/",
    );
  });

  it("rejects unsupported protocols and non-domain text", () => {
    expect(normalizeUrlInput("javascript:alert(1)")).toBeNull();
    expect(normalizeUrlInput("mailto:hello@example.com")).toBeNull();
    expect(normalizeUrlInput("not a web address")).toBeNull();
    expect(normalizeUrlInput("example")).toBeNull();
  });
});

describe("isValidUrlInput", () => {
  it("accepts http and https web addresses", () => {
    expect(isValidUrlInput("https://example.com")).toBe(true);
    expect(isValidUrlInput("www.example.com")).toBe(true);
  });

  it("rejects empty and malformed values", () => {
    expect(isValidUrlInput("")).toBe(false);
    expect(isValidUrlInput("https://")).toBe(false);
    expect(isValidUrlInput("example .com")).toBe(false);
  });
});

describe("buildUrlPayload", () => {
  it("returns distinct empty and invalid states", () => {
    expect(buildUrlPayload("   ")).toEqual({
      status: "empty",
      byteLength: 0,
    });
    expect(buildUrlPayload("not valid")).toEqual({
      status: "invalid",
      byteLength: 0,
    });
  });

  it("builds a normalized URL payload", () => {
    expect(buildUrlPayload(" example.com ")).toEqual({
      status: "valid",
      payload: "https://example.com/",
      byteLength: getUtf8ByteLength("https://example.com/"),
      hasDensityWarning: false,
    });
  });

  it("uses UTF-8 bytes rather than visible character count", () => {
    expect(getUtf8ByteLength("مرحبا")).toBeGreaterThan("مرحبا".length);
  });

  it("warns when the normalized payload exceeds 800 UTF-8 bytes", () => {
    const result = buildUrlPayload(
      `https://example.com/?value=${"a".repeat(DENSITY_WARNING_BYTES)}`,
    );

    expect(result.status).toBe("valid");
    if (result.status === "valid") {
      expect(result.byteLength).toBeGreaterThan(DENSITY_WARNING_BYTES);
      expect(result.hasDensityWarning).toBe(true);
    }
  });

  it("rejects payloads above 1,500 UTF-8 bytes without truncating", () => {
    const result = buildUrlPayload(
      `https://example.com/?value=${"a".repeat(MAX_PAYLOAD_BYTES)}`,
    );

    expect(result.status).toBe("too-large");
    expect(result.byteLength).toBeGreaterThan(MAX_PAYLOAD_BYTES);
  });
});
