import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ContentForm } from "./ContentForm";
import { ContentTypeSelector } from "./ContentTypeSelector";
import { ColorControls } from "./ColorControls";
import {
  getInitialQrColors,
  persistQrColors,
  type QrColors,
} from "./colors";
import {
  buildContentPayload,
  createEmptyContentState,
  type ContentFormState,
  type ContentType,
} from "./content";
import {
  getInitialLanguage,
  persistLanguage,
  translations,
  type Language,
  type Translation,
} from "./i18n";
import {
  getInitialThemePreference,
  parseThemePreference,
  persistThemePreference,
  resolveThemePreference,
  SYSTEM_THEME_QUERY,
  type ThemePreference,
} from "./theme";
import {
  clearQrCode,
  createQrCode,
  downloadQrCode,
  mountQrCode,
  updateQrCode,
  type QrCodeInstance,
} from "./qr";

function getEmptyPreviewMessage(
  copy: Translation,
  type: ContentType,
): string {
  switch (type) {
    case "url":
      return copy.emptyMessage;
    case "text":
      return copy.textEmptyMessage;
    case "email":
      return copy.emailEmptyMessage;
    case "phone":
      return copy.phoneEmptyMessage;
    case "whatsapp":
      return copy.whatsappEmptyMessage;
  }
}

function getInvalidPreviewMessage(
  copy: Translation,
  type: ContentType,
): string {
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

function App() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [themePreference, setThemePreference] = useState<ThemePreference>(
    getInitialThemePreference,
  );
  const [contentState, setContentState] = useState<ContentFormState>(
    createEmptyContentState("url"),
  );
  const [qrColors, setQrColors] = useState<QrColors>(getInitialQrColors);
  const [hasQrError, setHasQrError] = useState(false);
  const [hasDownloadError, setHasDownloadError] = useState(false);
  const qrContainerRef = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<QrCodeInstance | null>(null);
  const copy = translations[language];
  const payloadResult = useMemo(
    () => buildContentPayload(contentState),
    [contentState],
  );
  const contentTypeLabels: Record<ContentType, string> = {
    url: copy.urlType,
    text: copy.textType,
    email: copy.emailType,
    phone: copy.phoneType,
    whatsapp: copy.whatsappType,
  };
  const selectedContentLabel = contentTypeLabels[contentState.type];
  const emptyPreviewMessage = getEmptyPreviewMessage(
    copy,
    contentState.type,
  );
  const invalidPreviewMessage = getInvalidPreviewMessage(
    copy,
    contentState.type,
  );

  useLayoutEffect(() => {
    const systemTheme = window.matchMedia(SYSTEM_THEME_QUERY);

    function applyTheme() {
      const resolvedTheme = resolveThemePreference(
        themePreference,
        systemTheme.matches,
      );
      document.documentElement.dataset.theme = resolvedTheme;
      document.documentElement.style.colorScheme = resolvedTheme;

      const themeColor = document.querySelector<HTMLMetaElement>(
        'meta[name="theme-color"]',
      );
      themeColor?.setAttribute(
        "content",
        resolvedTheme === "dark" ? "#0e1716" : "#f4f1e8",
      );
    }

    persistThemePreference(themePreference);
    applyTheme();

    if (themePreference !== "system") {
      return;
    }

    systemTheme.addEventListener("change", applyTheme);
    return () => systemTheme.removeEventListener("change", applyTheme);
  }, [themePreference]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.title = copy.pageTitle;
    persistLanguage(language);
  }, [copy.pageTitle, language]);

  useEffect(() => {
    persistQrColors(qrColors);
  }, [qrColors]);

  useEffect(() => {
    const container = qrContainerRef.current;

    if (!container || payloadResult.status !== "valid") {
      if (container) {
        clearQrCode(container);
      }
      qrCodeRef.current = null;
      return;
    }

    try {
      if (!qrCodeRef.current) {
        qrCodeRef.current = createQrCode(payloadResult.payload, qrColors);
        mountQrCode(qrCodeRef.current, container);
      } else {
        updateQrCode(qrCodeRef.current, payloadResult.payload, qrColors);
      }
    } catch {
      clearQrCode(container);
      qrCodeRef.current = null;
      queueMicrotask(() => setHasQrError(true));
    }
  }, [payloadResult, qrColors]);

  function handleContentChange(state: ContentFormState) {
    setContentState(state);
    setHasQrError(false);
    setHasDownloadError(false);
  }

  function handleContentTypeChange(type: ContentType) {
    handleContentChange(createEmptyContentState(type));
  }

  function handleColorChange(colors: QrColors) {
    setQrColors(colors);
    setHasQrError(false);
    setHasDownloadError(false);
  }

  async function handleDownload() {
    if (!qrCodeRef.current || payloadResult.status !== "valid") {
      return;
    }

    try {
      setHasDownloadError(false);
      await downloadQrCode(qrCodeRef.current);
    } catch {
      setHasDownloadError(true);
    }
  }

  const visualStatus = hasQrError ? "library-error" : payloadResult.status;
  return (
    <div className="app-shell">
      <a className="skip-link" href="#qr-creator">
        {copy.skipLink}
      </a>

      <header className="site-header">
        <a
          className="brand"
          href={import.meta.env.BASE_URL}
          aria-label={copy.pageTitle}
        >
          <span className="brand-mark" aria-hidden="true">
            QR
          </span>
          <span>{copy.pageTitle}</span>
        </a>

        <div className="header-actions">
          <label className="theme-picker">
            <span>{copy.appearanceLabel}</span>
            <select
              value={themePreference}
              aria-label={copy.appearanceLabel}
              onChange={(event) =>
                setThemePreference(parseThemePreference(event.target.value))
              }
            >
              <option value="light">{copy.lightTheme}</option>
              <option value="dark">{copy.darkTheme}</option>
              <option value="system">{copy.systemTheme}</option>
            </select>
          </label>

          <div
            className="language-switcher"
            role="group"
            aria-label={copy.languageLabel}
          >
            <button
              type="button"
              className={language === "en" ? "is-active" : ""}
              aria-pressed={language === "en"}
              onClick={() => setLanguage("en")}
            >
              {copy.english}
            </button>
            <button
              type="button"
              className={language === "ar" ? "is-active" : ""}
              aria-pressed={language === "ar"}
              onClick={() => setLanguage("ar")}
            >
              {copy.arabic}
            </button>
          </div>
        </div>
      </header>

      <main id="qr-creator">
        <section className="hero" aria-labelledby="page-heading">
          <div className="eyebrow">
            <span aria-hidden="true">●</span>
            {copy.eyebrow}
          </div>
          <h1 id="page-heading">{copy.heading}</h1>
          <p>{copy.introduction}</p>
          <div className="privacy-note">
            <span className="privacy-icon" aria-hidden="true">
              ✓
            </span>
            {copy.privacyNote}
          </div>
        </section>

        <section className="workspace" aria-label={copy.heading}>
          <form
            className="control-panel"
            onSubmit={(event) => event.preventDefault()}
            noValidate
          >
            <ContentTypeSelector
              selectedType={contentState.type}
              labels={contentTypeLabels}
              groupLabel={copy.chooseContentType}
              onChange={handleContentTypeChange}
            />

            <ContentForm
              state={contentState}
              result={payloadResult}
              selectedLabel={selectedContentLabel}
              copy={copy}
              onChange={handleContentChange}
            />

            <ColorControls
              colors={qrColors}
              copy={copy}
              onChange={handleColorChange}
            />

            {contentState.type === "url" &&
              payloadResult.status === "valid" && (
                <div className="destination-card">
                  <span>{copy.normalizedLabel}</span>
                  <code dir="ltr">{payloadResult.payload}</code>
                </div>
              )}
          </form>

          <section className="preview-panel" aria-labelledby="preview-heading">
            <div className="preview-heading">
              <div>
                <span className="section-kicker">
                  {selectedContentLabel}
                </span>
                <h2 id="preview-heading">{copy.previewHeading}</h2>
              </div>
              <p>{copy.previewDescription}</p>
            </div>

            <div
              className={`preview-stage preview-stage--${visualStatus}`}
              aria-live="polite"
              aria-atomic="true"
            >
              <div
                ref={qrContainerRef}
                className={
                  visualStatus === "valid"
                    ? "qr-canvas is-visible"
                    : "qr-canvas"
                }
                role={visualStatus === "valid" ? "img" : undefined}
                aria-label={
                  visualStatus === "valid" ? copy.ready : undefined
                }
              />

              {visualStatus === "empty" && (
                <div className="state-message">
                  <div className="placeholder-grid" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <h3>{copy.emptyTitle}</h3>
                  <p>{emptyPreviewMessage}</p>
                </div>
              )}

              {visualStatus === "invalid" && (
                <div className="state-message">
                  <span className="state-symbol" aria-hidden="true">
                    !
                  </span>
                  <h3>{copy.invalidTitle}</h3>
                  <p>{invalidPreviewMessage}</p>
                </div>
              )}

              {visualStatus === "too-large" && (
                <div className="state-message">
                  <span className="state-symbol" aria-hidden="true">
                    !
                  </span>
                  <h3>{copy.tooLargeTitle}</h3>
                  <p>{copy.tooLargeMessage}</p>
                </div>
              )}

              {visualStatus === "library-error" && (
                <div className="state-message">
                  <span className="state-symbol" aria-hidden="true">
                    !
                  </span>
                  <h3>{copy.libraryErrorTitle}</h3>
                  <p>{copy.libraryErrorMessage}</p>
                </div>
              )}
            </div>

            {payloadResult.status === "valid" && !hasQrError && (
              <div className="preview-actions">
                <div
                  className="ready-status"
                  role="status"
                  aria-live="polite"
                >
                  <span aria-hidden="true">✓</span>
                  <div>
                    <strong>{copy.ready}</strong>
                    <small>
                      {payloadResult.byteLength} {copy.byteCount}
                    </small>
                  </div>
                </div>

                {payloadResult.hasDensityWarning && (
                  <p className="density-warning" role="status">
                    <span aria-hidden="true">!</span>
                    {copy.densityWarning}
                  </p>
                )}

                <button
                  type="button"
                  className="download-button"
                  onClick={handleDownload}
                >
                  <span>{copy.download}</span>
                  <small>{copy.downloadHint}</small>
                </button>

                {hasDownloadError && (
                  <p className="download-error" role="alert">
                    {copy.downloadError}
                  </p>
                )}
              </div>
            )}
          </section>
        </section>
      </main>

      <footer className="site-footer">
        <a href="https://github.com/AnasSM-SA" rel="me">
          {copy.githubProfile}
        </a>
      </footer>
    </div>
  );
}

export default App;
