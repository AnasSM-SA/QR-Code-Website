import { describe, expect, it } from "vitest";
import {
  buildEmailPayload,
  escapeEmailQrValue,
  isValidEmailAddress,
} from "./email";

describe("isValidEmailAddress", () => {
  it("accepts a normal email address", () => {
    expect(isValidEmailAddress("hello@example.com")).toBe(true);
  });

  it("rejects malformed addresses", () => {
    expect(isValidEmailAddress("hello@")).toBe(false);
    expect(isValidEmailAddress("hello example.com")).toBe(false);
  });
});

describe("buildEmailPayload", () => {
  it("returns empty when all fields are empty", () => {
    expect(buildEmailPayload("", "", "")).toEqual({
      status: "empty",
      byteLength: 0,
    });
  });

  it("rejects an invalid required email address", () => {
    expect(buildEmailPayload("invalid", "Subject", "")).toEqual({
      status: "invalid",
      byteLength: 0,
    });
  });

  it("builds a scanner-friendly email action without optional values", () => {
    const result = buildEmailPayload(" hello@example.com ", "", "");

    expect(result.status).toBe("valid");
    if (result.status === "valid") {
      expect(result.payload).toBe(
        "MATMSG:TO:hello@example.com;SUB:;BODY:;;",
      );
    }
  });

  it("includes optional Unicode subject and body values", () => {
    const result = buildEmailPayload(
      "hello@example.com",
      "Project update",
      "مرحبًا & welcome",
    );

    expect(result.status).toBe("valid");
    if (result.status === "valid") {
      expect(result.payload).toBe(
        "MATMSG:TO:hello@example.com;SUB:Project update;" +
          "BODY:مرحبًا & welcome;;",
      );
    }
  });

  it("escapes MATMSG delimiters and line breaks", () => {
    expect(escapeEmailQrValue("one:two;three\\four\nfive")).toBe(
      "one\\:two\\;three\\\\four\\nfive",
    );
  });
});
