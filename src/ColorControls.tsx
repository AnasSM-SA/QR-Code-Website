import { useState } from "react";
import {
  DEFAULT_QR_COLORS,
  getContrastRatio,
  normalizeHexColor,
  type QrColors,
} from "./colors";
import type { Translation } from "./i18n";

type ColorControlsProps = {
  colors: QrColors;
  copy: Translation;
  onChange: (colors: QrColors) => void;
};

type ColorFieldProps = {
  id: string;
  label: string;
  value: string;
  invalidMessage: string;
  onChange: (value: string) => void;
};

function ColorField({
  id,
  label,
  value,
  invalidMessage,
  onChange,
}: ColorFieldProps) {
  const [draft, setDraft] = useState(value);
  const normalizedDraft = normalizeHexColor(draft);
  const errorId = `${id}-error`;

  function commitDraft() {
    if (normalizedDraft) {
      setDraft(normalizedDraft);
      onChange(normalizedDraft);
    }
  }

  return (
    <div className="color-field">
      <label htmlFor={`${id}-text`}>{label}</label>
      <div className="color-inputs">
        <input
          id={`${id}-picker`}
          className="color-picker"
          type="color"
          value={value}
          aria-label={label}
          onChange={(event) => onChange(event.target.value)}
        />
        <input
          id={`${id}-text`}
          className="color-hex-input"
          type="text"
          inputMode="text"
          autoCapitalize="none"
          spellCheck="false"
          dir="ltr"
          value={draft}
          aria-invalid={!normalizedDraft}
          aria-describedby={!normalizedDraft ? errorId : undefined}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={commitDraft}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              commitDraft();
            }
          }}
        />
      </div>
      {!normalizedDraft && (
        <p className="field-error" id={errorId} role="alert">
          {invalidMessage}
        </p>
      )}
    </div>
  );
}

export function ColorControls({
  colors,
  copy,
  onChange,
}: ColorControlsProps) {
  const contrastRatio = getContrastRatio(
    colors.foreground,
    colors.background,
  );
  const hasLowContrast = contrastRatio < 4.5;

  return (
    <fieldset className="color-controls">
      <legend>{copy.colorHeading}</legend>
      <p>{copy.colorDescription}</p>

      <div className="color-fields">
        <ColorField
          key={`foreground-${colors.foreground}`}
          id="foreground-color"
          label={copy.foregroundColor}
          value={colors.foreground}
          invalidMessage={copy.invalidColor}
          onChange={(foreground) => onChange({ ...colors, foreground })}
        />
        <ColorField
          key={`background-${colors.background}`}
          id="background-color"
          label={copy.backgroundColor}
          value={colors.background}
          invalidMessage={copy.invalidColor}
          onChange={(background) => onChange({ ...colors, background })}
        />
      </div>

      <div className="color-summary">
        <span>
          {copy.contrastRatio}: {contrastRatio.toFixed(2)}:1
        </span>
        <button
          type="button"
          className="secondary-button"
          onClick={() => onChange({ ...DEFAULT_QR_COLORS })}
        >
          {copy.resetColors}
        </button>
      </div>

      {hasLowContrast && (
        <p className="contrast-warning" role="status">
          <span aria-hidden="true">!</span>
          {copy.contrastWarning}
        </p>
      )}
    </fieldset>
  );
}
