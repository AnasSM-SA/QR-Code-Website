import { buildEmailPayload } from "./email";
import { type PayloadResult } from "./payload";
import { buildPhonePayload } from "./phone";
import { buildTextPayload } from "./text";
import { buildUrlPayload } from "./url";
import { buildWhatsAppPayload } from "./whatsapp";

export const CONTENT_TYPES = [
  "url",
  "text",
  "email",
  "phone",
  "whatsapp",
] as const;

export type ContentType = (typeof CONTENT_TYPES)[number];

export type ContentFormState =
  | { type: "url"; url: string }
  | { type: "text"; text: string }
  | { type: "email"; email: string; subject: string; body: string }
  | { type: "phone"; countryCode: string; phoneNumber: string }
  | {
      type: "whatsapp";
      countryCode: string;
      phoneNumber: string;
      message: string;
    };

export function createEmptyContentState(type: ContentType): ContentFormState {
  switch (type) {
    case "url":
      return { type, url: "" };
    case "text":
      return { type, text: "" };
    case "email":
      return { type, email: "", subject: "", body: "" };
    case "phone":
      return { type, countryCode: "", phoneNumber: "" };
    case "whatsapp":
      return {
        type,
        countryCode: "",
        phoneNumber: "",
        message: "",
      };
  }
}

export function buildContentPayload(
  state: ContentFormState,
): PayloadResult {
  switch (state.type) {
    case "url":
      return buildUrlPayload(state.url);
    case "text":
      return buildTextPayload(state.text);
    case "email":
      return buildEmailPayload(state.email, state.subject, state.body);
    case "phone":
      return buildPhonePayload(state.countryCode, state.phoneNumber);
    case "whatsapp":
      return buildWhatsAppPayload(
        state.countryCode,
        state.phoneNumber,
        state.message,
      );
  }
}
