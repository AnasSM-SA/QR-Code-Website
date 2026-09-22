import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  BACKGROUND_COLOR_STORAGE_KEY,
  DEFAULT_QR_COLORS,
  FOREGROUND_COLOR_STORAGE_KEY,
  getContrastRatio,
  getInitialQrColors,
  isValidHexColor,
  persistQrColors,
} from "./colors";

describe("QR colors", () => {
  beforeEach(() => {
    vi.stubGlobal("window", {
      localStorage: {
        getItem: vi.fn(),
        setItem: vi.fn(),
      },
    });
  });

  it("validates complete six-digit HEX colors", () => {
    expect(isValidHexColor("#12abEF")).toBe(true);
    expect(isValidHexColor("#fff")).toBe(false);
    expect(isValidHexColor("000000")).toBe(false);
  });

  it("calculates standard contrast ratios", () => {
    expect(getContrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 4);
    expect(getContrastRatio("#777777", "#888888")).toBeLessThan(4.5);
  });

  it("falls back from invalid stored colors", () => {
    vi.mocked(window.localStorage.getItem).mockReturnValue("not-a-color");
    expect(getInitialQrColors()).toEqual(DEFAULT_QR_COLORS);
  });

  it("persists valid foreground and background colors", () => {
    persistQrColors({ foreground: "#112233", background: "#AABBCC" });
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      FOREGROUND_COLOR_STORAGE_KEY,
      "#112233",
    );
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      BACKGROUND_COLOR_STORAGE_KEY,
      "#aabbcc",
    );
  });
});
