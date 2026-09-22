import { describe, expect, it } from "vitest";
import {
  buildContentPayload,
  createEmptyContentState,
} from "./content";

describe("createEmptyContentState", () => {
  it("creates a clean state when the content type changes", () => {
    expect(createEmptyContentState("phone")).toEqual({
      type: "phone",
      countryCode: "",
      phoneNumber: "",
    });
    expect(createEmptyContentState("whatsapp")).toEqual({
      type: "whatsapp",
      countryCode: "",
      phoneNumber: "",
      message: "",
    });
  });

});

describe("buildContentPayload", () => {
  it("dispatches the selected content type to its payload builder", () => {
    const result = buildContentPayload({
      type: "text",
      text: "QR Studio",
    });

    expect(result.status).toBe("valid");
    if (result.status === "valid") {
      expect(result.payload).toBe("QR Studio");
    }
  });
});
