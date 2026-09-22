export const FOREGROUND_COLOR_STORAGE_KEY = "qr-studio-foreground-color";
export const BACKGROUND_COLOR_STORAGE_KEY = "qr-studio-background-color";

export const DEFAULT_QR_COLORS = {
  foreground: "#000000",
  background: "#ffffff",
} as const;

export type QrColors = {
  foreground: string;
  background: string;
};

const HEX_COLOR_PATTERN = /^#[0-9a-f]{6}$/i;

export function isValidHexColor(value: string): boolean {
  return HEX_COLOR_PATTERN.test(value);
}

export function normalizeHexColor(value: string): string | null {
  const normalized = value.trim().toLowerCase();
  return isValidHexColor(normalized) ? normalized : null;
}

function readStoredColor(key: string, fallback: string): string {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const stored = window.localStorage.getItem(key);
    return stored && isValidHexColor(stored) ? stored.toLowerCase() : fallback;
  } catch {
    return fallback;
  }
}

export function getInitialQrColors(): QrColors {
  return {
    foreground: readStoredColor(
      FOREGROUND_COLOR_STORAGE_KEY,
      DEFAULT_QR_COLORS.foreground,
    ),
    background: readStoredColor(
      BACKGROUND_COLOR_STORAGE_KEY,
      DEFAULT_QR_COLORS.background,
    ),
  };
}

export function persistQrColors(colors: QrColors): void {
  try {
    if (isValidHexColor(colors.foreground)) {
      window.localStorage.setItem(
        FOREGROUND_COLOR_STORAGE_KEY,
        colors.foreground.toLowerCase(),
      );
    }
    if (isValidHexColor(colors.background)) {
      window.localStorage.setItem(
        BACKGROUND_COLOR_STORAGE_KEY,
        colors.background.toLowerCase(),
      );
    }
  } catch {
    // Color controls still work when browser storage is unavailable.
  }
}

function getRelativeLuminance(hexColor: string): number {
  const channels = [1, 3, 5].map((start) => {
    const channel = Number.parseInt(hexColor.slice(start, start + 2), 16) / 255;
    return channel <= 0.04045
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4;
  });

  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

export function getContrastRatio(
  foreground: string,
  background: string,
): number {
  if (!isValidHexColor(foreground) || !isValidHexColor(background)) {
    return 1;
  }

  const foregroundLuminance = getRelativeLuminance(foreground);
  const backgroundLuminance = getRelativeLuminance(background);
  const lighter = Math.max(foregroundLuminance, backgroundLuminance);
  const darker = Math.min(foregroundLuminance, backgroundLuminance);
  return (lighter + 0.05) / (darker + 0.05);
}
