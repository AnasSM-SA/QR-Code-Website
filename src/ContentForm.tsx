import {
  type ContentFormState,
  type ContentType,
} from "./content";
import type { Translation } from "./i18n";
import type { PayloadResult } from "./payload";

type ContentFormProps = {
  state: ContentFormState;
  result: PayloadResult;
  selectedLabel: string;
  copy: Translation;
  onChange: (state: ContentFormState) => void;
};

function getFormHeading(copy: Translation, type: ContentType): string {
  switch (type) {
    case "url":
      return copy.formHeading;
    case "text":
      return copy.textFormHeading;
    case "email":
      return copy.emailFormHeading;
    case "phone":
      return copy.phoneFormHeading;
    case "whatsapp":
      return copy.whatsappFormHeading;
  }
}

function getFormDescription(copy: Translation, type: ContentType): string {
  switch (type) {
    case "url":
      return copy.formDescription;
    case "text":
      return copy.textFormDescription;
    case "email":
      return copy.emailFormDescription;
    case "phone":
      return copy.phoneFormDescription;
    case "whatsapp":
      return copy.whatsappFormDescription;
  }
}

function getInvalidMessage(copy: Translation, type: ContentType): string {
  switch (type) {
    case "url":
      return copy.invalidMessage;
    case "email":
      return copy.invalidEmailMessage;
    case "phone":
    case "whatsapp":
      return copy.invalidPhoneMessage;
    case "text":
      return copy.tooLargeMessage;
  }
}

export function ContentForm({
  state,
  result,
  selectedLabel,
  copy,
  onChange,
}: ContentFormProps) {
  const hasInvalidData = result.status === "invalid";
  const hasOversizedData = result.status === "too-large";
  const hasBlockingError = hasInvalidData || hasOversizedData;
  const errorMessage = hasOversizedData
    ? copy.tooLargeMessage
    : getInvalidMessage(copy, state.type);

  return (
    <>
      <div className="panel-heading">
        <span className="content-chip">{selectedLabel}</span>
        <h2>{getFormHeading(copy, state.type)}</h2>
        <p>{getFormDescription(copy, state.type)}</p>
      </div>

      {state.type === "url" && (
        <div className="field-group">
          <label htmlFor="website-url">{copy.urlLabel}</label>
          <div className="url-input-wrap">
            <input
              id="website-url"
              type="text"
              inputMode="url"
              autoCapitalize="none"
              autoComplete="url"
              spellCheck="false"
              dir="ltr"
              value={state.url}
              placeholder={copy.urlPlaceholder}
              aria-invalid={hasBlockingError}
              aria-describedby={
                hasBlockingError ? "url-hint content-error" : "url-hint"
              }
              onChange={(event) =>
                onChange({ type: "url", url: event.target.value })
              }
            />
          </div>
          <p className="field-hint" id="url-hint">
            {copy.urlHint}
          </p>
        </div>
      )}

      {state.type === "text" && (
        <div className="field-group">
          <label htmlFor="plain-text">{copy.textLabel}</label>
          <textarea
            id="plain-text"
            rows={6}
            dir="auto"
            value={state.text}
            placeholder={copy.textPlaceholder}
            aria-invalid={hasBlockingError}
            aria-describedby={
              hasBlockingError ? "text-hint content-error" : "text-hint"
            }
            onChange={(event) =>
              onChange({ type: "text", text: event.target.value })
            }
          />
          <div className="field-meta" id="text-hint">
            <span>{copy.textHint}</span>
            <span>
              {Array.from(state.text).length} {copy.characterCount}
            </span>
          </div>
        </div>
      )}

      {state.type === "email" && (
        <div className="field-stack">
          <div className="field-group">
            <label htmlFor="email-address">{copy.emailLabel}</label>
            <input
              id="email-address"
              className="text-input"
              type="email"
              inputMode="email"
              autoCapitalize="none"
              autoComplete="email"
              spellCheck="false"
              dir="ltr"
              value={state.email}
              placeholder={copy.emailPlaceholder}
              aria-invalid={hasBlockingError}
              aria-describedby={
                hasBlockingError ? "email-hint content-error" : "email-hint"
              }
              onChange={(event) =>
                onChange({ ...state, email: event.target.value })
              }
            />
            <p className="field-hint" id="email-hint">
              {copy.emailHint}
            </p>
          </div>

          <div className="field-group">
            <label htmlFor="email-subject">{copy.subjectLabel}</label>
            <input
              id="email-subject"
              className="text-input"
              type="text"
              dir="auto"
              value={state.subject}
              placeholder={copy.subjectPlaceholder}
              aria-invalid={hasOversizedData}
              aria-describedby={
                hasOversizedData ? "content-error" : undefined
              }
              onChange={(event) =>
                onChange({ ...state, subject: event.target.value })
              }
            />
          </div>

          <div className="field-group">
            <label htmlFor="email-body">{copy.emailBodyLabel}</label>
            <textarea
              id="email-body"
              rows={4}
              dir="auto"
              value={state.body}
              placeholder={copy.emailBodyPlaceholder}
              aria-invalid={hasOversizedData}
              aria-describedby={
                hasOversizedData ? "content-error" : undefined
              }
              onChange={(event) =>
                onChange({ ...state, body: event.target.value })
              }
            />
          </div>
        </div>
      )}

      {(state.type === "phone" ||
        state.type === "whatsapp") && (
        <div className="field-stack">
          <fieldset className="phone-fields">
            <legend className="sr-only">{copy.phoneDetails}</legend>
            <div className="field-group">
              <label htmlFor="country-code">{copy.countryCodeLabel}</label>
              <input
                id="country-code"
                className="text-input"
                type="tel"
                inputMode="tel"
                autoComplete="tel-country-code"
                dir="ltr"
                value={state.countryCode}
                placeholder={copy.countryCodePlaceholder}
                aria-invalid={hasBlockingError}
                aria-describedby={
                  hasBlockingError
                    ? "phone-hint content-error"
                    : "phone-hint"
                }
                onChange={(event) =>
                  onChange({ ...state, countryCode: event.target.value })
                }
              />
            </div>

            <div className="field-group">
              <label htmlFor="phone-number">{copy.phoneNumberLabel}</label>
              <input
                id="phone-number"
                className="text-input"
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                dir="ltr"
                value={state.phoneNumber}
                placeholder={copy.phoneNumberPlaceholder}
                aria-invalid={hasBlockingError}
                aria-describedby={
                  hasBlockingError
                    ? "phone-hint content-error"
                    : "phone-hint"
                }
                onChange={(event) =>
                  onChange({ ...state, phoneNumber: event.target.value })
                }
              />
            </div>
          </fieldset>

          <p className="field-hint phone-hint" id="phone-hint">
            {copy.phoneHint}
          </p>

          {state.type === "whatsapp" && (
            <div className="field-group">
              <label htmlFor={`${state.type}-message`}>
                {copy.messageLabel}
              </label>
              <textarea
                id={`${state.type}-message`}
                rows={4}
                dir="auto"
                value={state.message}
                placeholder={copy.whatsappMessagePlaceholder}
                aria-invalid={hasOversizedData}
                aria-describedby={
                  hasOversizedData ? "content-error" : undefined
                }
                onChange={(event) =>
                  onChange({ ...state, message: event.target.value })
                }
              />
            </div>
          )}
        </div>
      )}

      {hasBlockingError && (
        <p className="field-error form-error" id="content-error" role="alert">
          {errorMessage}
        </p>
      )}
    </>
  );
}
