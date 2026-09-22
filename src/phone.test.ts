import { describe, expect, it } from "vitest";
import {
  buildPhonePayload,
  normalizeInternationalPhoneNumber,
} from "./phone";

describe("normalizeInternationalPhoneNumber", () => {
  it("combines a country code and formatted phone number", () => {
    expect(
      normalizeInternationalPhoneNumber("+966", "50 123-4567"),
    ).toBe("+966501234567");
  });

  it("adds a plus sign when the country code omits it", () => {
    expect(normalizeInternationalPhoneNumber("44", "20 7946 0958")).toBe(
      "+442079460958",
    );
  });

  it("rejects letters, missing parts, and oversized numbers", () => {
    expect(normalizeInternationalPhoneNumber("+966", "CALL-ME")).toBeNull();
    expect(normalizeInternationalPhoneNumber("", "501234567")).toBeNull();
    expect(normalizeInternationalPhoneNumber("+0", "501234567")).toBeNull();
    expect(
      normalizeInternationalPhoneNumber("+966", "123456789012345"),
    ).toBeNull();
  });
});

describe("buildPhonePayload", () => {
  it("returns empty when both fields are empty", () => {
    expect(buildPhonePayload("", "")).toEqual({
      status: "empty",
      byteLength: 0,
    });
  });

  it("rejects incomplete phone information", () => {
    expect(buildPhonePayload("+966", "")).toEqual({
      status: "invalid",
      byteLength: 0,
    });
  });

  it("builds a tel payload in international form", () => {
    const result = buildPhonePayload("+966", "50 123 4567");

    expect(result.status).toBe("valid");
    if (result.status === "valid") {
      expect(result.payload).toBe("tel:+966501234567");
    }
  });
});
