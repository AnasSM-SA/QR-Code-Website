export type Language = "ar" | "en";

export const LANGUAGE_STORAGE_KEY = "qr-studio-language";

export const translations = {
  en: {
    pageTitle: "QR Studio",
    githubProfile: "AnasSM-SA on GitHub",
    skipLink: "Skip to QR creator",
    languageLabel: "Choose language",
    english: "English",
    arabic: "العربية",
    appearanceLabel: "Appearance",
    lightTheme: "Light",
    darkTheme: "Dark",
    systemTheme: "System",
    eyebrow: "Private by design",
    heading: "Turn information into a QR code",
    introduction:
      "Choose a content type, preview your code instantly, and download a crisp PNG—without sending your data anywhere.",
    privacyNote: "Generated locally. Your content is never stored.",
    chooseContentType: "Choose content type",
    urlType: "URL",
    textType: "Text",
    emailType: "Email",
    phoneType: "Phone",
    whatsappType: "WhatsApp",
    formHeading: "Enter your link",
    formDescription:
      "We’ll add https:// when a valid web address does not include a protocol.",
    urlLabel: "Website address",
    urlPlaceholder: "example.com",
    urlHint: "Use a complete link or a domain such as example.com.",
    normalizedLabel: "QR destination",
    textFormHeading: "Write your text",
    textFormDescription:
      "Use plain text for notes, instructions, order numbers, or short messages.",
    textLabel: "Text",
    textPlaceholder: "Type the information to encode",
    textHint: "Longer text creates a denser QR code.",
    characterCount: "characters",
    emailFormHeading: "Prepare an email",
    emailFormDescription:
      "Scanning opens the default email app with your optional subject and message.",
    emailLabel: "Email address",
    emailPlaceholder: "hello@example.com",
    subjectLabel: "Subject (optional)",
    subjectPlaceholder: "What is this email about?",
    emailBodyLabel: "Message (optional)",
    emailBodyPlaceholder: "Write a prefilled email message",
    emailHint: "A valid email address is required.",
    phoneFormHeading: "Add a phone number",
    phoneFormDescription:
      "Scanning gives the user the option to call this international number.",
    countryCodeLabel: "Country code",
    countryCodePlaceholder: "+966",
    phoneNumberLabel: "Phone number",
    phoneNumberPlaceholder: "50 123 4567",
    phoneHint:
      "Enter the country code separately. Spaces, dashes, and parentheses are accepted.",
    phoneDetails: "International phone details",
    whatsappFormHeading: "Start a WhatsApp chat",
    whatsappFormDescription:
      "Scanning opens WhatsApp with the number and optional message.",
    messageLabel: "Message (optional)",
    whatsappMessagePlaceholder: "Write a prefilled WhatsApp message",
    colorHeading: "QR colors",
    colorDescription:
      "Choose foreground and background colors. Always test the final code.",
    foregroundColor: "Foreground",
    backgroundColor: "Background",
    invalidColor: "Enter a six-digit HEX color such as #000000.",
    contrastRatio: "Contrast ratio",
    resetColors: "Reset colors",
    contrastWarning:
      "Low contrast may make this QR code difficult to scan. Generation and download remain available; test it before use.",
    previewHeading: "Preview",
    previewDescription: "Your QR code updates automatically.",
    emptyTitle: "Your QR code will appear here",
    emptyMessage: "Enter a website address to create a preview.",
    textEmptyMessage: "Enter some text to create a preview.",
    emailEmptyMessage: "Enter an email address to create a preview.",
    phoneEmptyMessage: "Enter a phone number to create a preview.",
    whatsappEmptyMessage: "Enter WhatsApp details to create a preview.",
    invalidTitle: "Check the information",
    invalidMessage:
      "Enter a valid website address using http://, https://, or a domain such as example.com.",
    invalidEmailMessage: "Enter a valid email address.",
    invalidPhoneMessage:
      "Enter a valid country code and phone number in international format.",
    tooLargeTitle: "This content is too long",
    tooLargeMessage:
      "The QR payload exceeds 1,500 UTF-8 bytes. Shorten the content before continuing.",
    libraryErrorTitle: "The preview could not be created",
    libraryErrorMessage:
      "Check the address and try again. Your data has not left this browser.",
    ready: "QR code ready",
    densityWarning:
      "This content creates a dense QR code and may be harder to scan.",
    byteCount: "UTF-8 bytes",
    download: "Download PNG",
    downloadHint: "1024 × 1024 PNG",
    downloadError:
      "The PNG could not be downloaded. Please try again in a supported browser.",
  },
  ar: {
    pageTitle: "QR Studio",
    githubProfile: "AnasSM-SA على GitHub",
    skipLink: "انتقل إلى أداة إنشاء الرمز",
    languageLabel: "اختر اللغة",
    english: "English",
    arabic: "العربية",
    appearanceLabel: "المظهر",
    lightTheme: "فاتح",
    darkTheme: "داكن",
    systemTheme: "النظام",
    eyebrow: "خصوصيتك أولًا",
    heading: "حوّل معلوماتك إلى رمز QR",
    introduction:
      "اختر نوع المحتوى، عاين الرمز فورًا، ثم نزّل صورة PNG واضحة دون إرسال بياناتك إلى أي مكان.",
    privacyNote: "يُنشأ الرمز محليًا ولا يتم حفظ محتواك.",
    chooseContentType: "اختر نوع المحتوى",
    urlType: "رابط",
    textType: "نص",
    emailType: "بريد إلكتروني",
    phoneType: "هاتف",
    whatsappType: "WhatsApp",
    formHeading: "أدخل رابطك",
    formDescription:
      "سنضيف https:// تلقائيًا عندما يكون عنوان الموقع صالحًا ولا يحتوي على بروتوكول.",
    urlLabel: "عنوان الموقع",
    urlPlaceholder: "example.com",
    urlHint: "استخدم رابطًا كاملًا أو نطاقًا مثل example.com.",
    normalizedLabel: "وجهة رمز QR",
    textFormHeading: "اكتب نصك",
    textFormDescription:
      "استخدم النص العادي للملاحظات أو التعليمات أو أرقام الطلبات أو الرسائل القصيرة.",
    textLabel: "النص",
    textPlaceholder: "اكتب المعلومات التي تريد تضمينها",
    textHint: "يؤدي النص الأطول إلى إنشاء رمز QR أكثر كثافة.",
    characterCount: "حرف",
    emailFormHeading: "جهّز رسالة بريد",
    emailFormDescription:
      "يفتح المسح تطبيق البريد مع العنوان والموضوع والرسالة الاختيارية.",
    emailLabel: "عنوان البريد الإلكتروني",
    emailPlaceholder: "hello@example.com",
    subjectLabel: "الموضوع (اختياري)",
    subjectPlaceholder: "ما موضوع هذه الرسالة؟",
    emailBodyLabel: "نص الرسالة (اختياري)",
    emailBodyPlaceholder: "اكتب نصًا جاهزًا للرسالة",
    emailHint: "يجب إدخال عنوان بريد إلكتروني صالح.",
    phoneFormHeading: "أضف رقم هاتف",
    phoneFormDescription:
      "يمنح المسح المستخدم خيار الاتصال بهذا الرقم الدولي.",
    countryCodeLabel: "رمز الدولة",
    countryCodePlaceholder: "+966",
    phoneNumberLabel: "رقم الهاتف",
    phoneNumberPlaceholder: "50 123 4567",
    phoneHint:
      "أدخل رمز الدولة منفصلًا. يمكن استخدام المسافات والشرطات والأقواس.",
    phoneDetails: "بيانات الهاتف الدولي",
    whatsappFormHeading: "ابدأ محادثة WhatsApp",
    whatsappFormDescription:
      "يفتح المسح WhatsApp مع الرقم والنص الاختياري.",
    messageLabel: "الرسالة (اختياري)",
    whatsappMessagePlaceholder: "اكتب رسالة WhatsApp جاهزة",
    colorHeading: "ألوان رمز QR",
    colorDescription:
      "اختر لوني الرمز والخلفية، واختبر الرمز النهائي دائمًا.",
    foregroundColor: "لون الرمز",
    backgroundColor: "لون الخلفية",
    invalidColor: "أدخل لون HEX من ست خانات مثل #000000.",
    contrastRatio: "نسبة التباين",
    resetColors: "إعادة ضبط الألوان",
    contrastWarning:
      "قد يصعب مسح رمز QR بسبب انخفاض التباين. سيظل الإنشاء والتنزيل متاحين؛ اختبر الرمز قبل استخدامه.",
    previewHeading: "المعاينة",
    previewDescription: "يتحدث رمز QR تلقائيًا.",
    emptyTitle: "سيظهر رمز QR هنا",
    emptyMessage: "أدخل عنوان موقع لإنشاء المعاينة.",
    textEmptyMessage: "أدخل نصًا لإنشاء المعاينة.",
    emailEmptyMessage: "أدخل عنوان بريد إلكتروني لإنشاء المعاينة.",
    phoneEmptyMessage: "أدخل رقم هاتف لإنشاء المعاينة.",
    whatsappEmptyMessage: "أدخل بيانات WhatsApp لإنشاء المعاينة.",
    invalidTitle: "تحقق من المعلومات",
    invalidMessage:
      "أدخل عنوانًا صالحًا يبدأ بـ http:// أو https://، أو نطاقًا مثل example.com.",
    invalidEmailMessage: "أدخل عنوان بريد إلكتروني صالحًا.",
    invalidPhoneMessage: "أدخل رمز دولة ورقم هاتف صالحين بالصيغة الدولية.",
    tooLargeTitle: "هذا المحتوى طويل جدًا",
    tooLargeMessage:
      "تتجاوز بيانات الرمز ١٬٥٠٠ بايت بترميز UTF-8. اختصر المحتوى قبل المتابعة.",
    libraryErrorTitle: "تعذر إنشاء المعاينة",
    libraryErrorMessage:
      "تحقق من العنوان وحاول مرة أخرى. لم تغادر بياناتك هذا المتصفح.",
    ready: "رمز QR جاهز",
    densityWarning:
      "ينتج هذا المحتوى رمز QR كثيفًا وقد يكون مسحه أكثر صعوبة.",
    byteCount: "بايت بترميز UTF-8",
    download: "تنزيل PNG",
    downloadHint: "PNG بحجم ١٠٢٤ × ١٠٢٤",
    downloadError:
      "تعذر تنزيل صورة PNG. حاول مرة أخرى باستخدام متصفح مدعوم.",
  },
} as const;

export type Translation = (typeof translations)[Language];

export function getInitialLanguage(): Language {
  if (typeof window === "undefined") {
    return "en";
  }

  try {
    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return storedLanguage === "ar" || storedLanguage === "en"
      ? storedLanguage
      : "en";
  } catch {
    return "en";
  }
}

export function persistLanguage(language: Language): void {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // The interface still works when browser storage is unavailable.
  }
}
