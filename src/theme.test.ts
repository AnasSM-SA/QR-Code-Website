import { describe, expect, it } from "vitest";
import {
  parseThemePreference,
  readThemePreference,
  resolveThemePreference,
  THEME_STORAGE_KEY,
  writeThemePreference,
} from "./theme";

describe("parseThemePreference", () => {
  it.each(["light", "dark", "system"] as const)(
    "accepts the %s preference",
    (preference) => {
      expect(parseThemePreference(preference)).toBe(preference);
    },
  );

  it("uses system for missing or unsupported stored values", () => {
    expect(parseThemePreference(null)).toBe("system");
    expect(parseThemePreference("sepia")).toBe("system");
  });
});

describe("theme preference storage", () => {
  it("reads a supported stored preference", () => {
    const storage = {
      getItem: (key: string) => (key === THEME_STORAGE_KEY ? "dark" : null),
    };

    expect(readThemePreference(storage)).toBe("dark");
  });

  it("writes only the selected preference key and value", () => {
    const storedValues = new Map<string, string>();
    const storage = {
      setItem: (key: string, value: string) => storedValues.set(key, value),
    };

    writeThemePreference(storage, "light");

    expect(storedValues).toEqual(
      new Map([[THEME_STORAGE_KEY, "light"]]),
    );
  });
});

describe("resolveThemePreference", () => {
  it("preserves explicit light and dark preferences", () => {
    expect(resolveThemePreference("light", true)).toBe("light");
    expect(resolveThemePreference("dark", false)).toBe("dark");
  });

  it("follows the system preference when system is selected", () => {
    expect(resolveThemePreference("system", true)).toBe("dark");
    expect(resolveThemePreference("system", false)).toBe("light");
  });
});
