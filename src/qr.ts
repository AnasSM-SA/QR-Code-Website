import QRCodeStyling from "qr-code-styling";
import type { QrColors } from "./colors";

const QR_EXPORT_SIZE = 1024;

export type QrCodeInstance = QRCodeStyling;

export function createQrCode(
  payload: string,
  colors: QrColors,
): QrCodeInstance {
  return new QRCodeStyling({
    width: QR_EXPORT_SIZE,
    height: QR_EXPORT_SIZE,
    type: "canvas",
    data: payload,
    margin: 48,
    qrOptions: {
      errorCorrectionLevel: "M",
    },
    dotsOptions: {
      color: colors.foreground,
      type: "square",
    },
    cornersSquareOptions: {
      color: colors.foreground,
      type: "square",
    },
    cornersDotOptions: {
      color: colors.foreground,
      type: "square",
    },
    backgroundOptions: {
      color: colors.background,
    },
  });
}

export function mountQrCode(
  qrCode: QrCodeInstance,
  container: HTMLElement,
): void {
  container.replaceChildren();
  qrCode.append(container);
}

export function updateQrCode(
  qrCode: QrCodeInstance,
  payload: string,
  colors: QrColors,
): void {
  qrCode.update({
    data: payload,
    dotsOptions: { color: colors.foreground },
    cornersSquareOptions: { color: colors.foreground },
    cornersDotOptions: { color: colors.foreground },
    backgroundOptions: { color: colors.background },
  });
}

export function clearQrCode(container: HTMLElement): void {
  container.replaceChildren();
}

export async function downloadQrCode(qrCode: QrCodeInstance): Promise<void> {
  await qrCode.download({
    name: "qr-studio-code",
    extension: "png",
  });
}
