"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { LEGAL_ROUTES } from "@/data/legalCopy";
import {
  applyA11yPrefs,
  defaultA11yPrefs,
  loadA11yPrefs,
  saveA11yPrefs,
  type A11yPrefs,
  type A11yTextScale,
} from "@/lib/a11yPreferences";
import {
  isSpeechSupported,
  speakMainContent,
  speakSelection,
  stopSpeech,
} from "@/lib/speech";

const copy = {
  he: {
    open: "פתיחת תפריט נגישות",
    close: "סגירת תפריט נגישות",
    title: "נגישות",
    textSize: "גודל טקסט",
    smaller: "הקטנת טקסט",
    larger: "הגדלת טקסט",
    highContrast: "ניגודיות גבוהה",
    underlineLinks: "הדגשת קישורים",
    readableFont: "גופן קריא",
    readSelection: "הקראת טקסט מסומן",
    readPage: "הקראת תוכן העמוד",
    stopRead: "עצירת הקראה",
    reset: "איפוס הגדרות",
    statement: "הצהרת נגישות",
    speechUnsupported: "הדפדפן לא תומך בהקראת טקסט",
    noSelection: "יש לסמן טקסט להקראה",
  },
  en: {
    open: "Open accessibility menu",
    close: "Close accessibility menu",
    title: "Accessibility",
    textSize: "Text size",
    smaller: "Decrease text size",
    larger: "Increase text size",
    highContrast: "High contrast",
    underlineLinks: "Underline links",
    readableFont: "Readable font",
    readSelection: "Read selected text",
    readPage: "Read page content",
    stopRead: "Stop reading",
    reset: "Reset settings",
    statement: "Accessibility statement",
    speechUnsupported: "Text-to-speech is not supported in this browser",
    noSelection: "Select text on the page to read it aloud",
  },
};

function AccessibilityIcon() {
  return (
    <svg
      className="a11y-toolbar__icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="7" r="1.25" fill="currentColor" stroke="none" />
      <path d="M12 8.25V13" />
      <path d="M7 11h10" />
      <path d="M12 13l-3 4" />
      <path d="M12 13l3 4" />
    </svg>
  );
}

export function AccessibilityToolbar() {
  const { locale } = useLanguage();
  const t = copy[locale];
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<A11yPrefs>(defaultA11yPrefs);
  const [speechMsg, setSpeechMsg] = useState("");

  useEffect(() => {
    const loaded = loadA11yPrefs();
    setPrefs(loaded);
    applyA11yPrefs(loaded);
  }, []);

  const updatePrefs = useCallback((next: A11yPrefs) => {
    setPrefs(next);
    saveA11yPrefs(next);
    applyA11yPrefs(next);
  }, []);

  function setTextScale(scale: A11yTextScale) {
    updatePrefs({ ...prefs, textScale: scale });
  }

  function toggle(key: keyof Pick<A11yPrefs, "highContrast" | "underlineLinks" | "readableFont">) {
    updatePrefs({ ...prefs, [key]: !prefs[key] });
  }

  function handleReadSelection() {
    if (!isSpeechSupported()) {
      setSpeechMsg(t.speechUnsupported);
      return;
    }
    const ok = speakSelection(locale);
    setSpeechMsg(ok ? "" : t.noSelection);
  }

  function handleReadPage() {
    if (!isSpeechSupported()) {
      setSpeechMsg(t.speechUnsupported);
      return;
    }
    speakMainContent(locale);
    setSpeechMsg("");
  }

  function handleStop() {
    stopSpeech();
    setSpeechMsg("");
  }

  function handleReset() {
    stopSpeech();
    setSpeechMsg("");
    updatePrefs(defaultA11yPrefs);
  }

  return (
    <div className="a11y-toolbar">
      {open ? (
        <div
          id={panelId}
          className="a11y-toolbar__panel"
          role="region"
          aria-label={t.title}
        >
          <p className="a11y-toolbar__title">{t.title}</p>

          <div className="a11y-toolbar__group">
            <span className="a11y-toolbar__label">{t.textSize}</span>
            <div className="a11y-toolbar__row">
              <button
                type="button"
                className="a11y-toolbar__btn"
                onClick={() => setTextScale(Math.max(0, prefs.textScale - 1) as A11yTextScale)}
                aria-label={t.smaller}
              >
                A−
              </button>
              <button
                type="button"
                className="a11y-toolbar__btn"
                onClick={() => setTextScale(Math.min(2, prefs.textScale + 1) as A11yTextScale)}
                aria-label={t.larger}
              >
                A+
              </button>
            </div>
          </div>

          <label className="a11y-toolbar__toggle">
            <input
              type="checkbox"
              checked={prefs.highContrast}
              onChange={() => toggle("highContrast")}
            />
            <span>{t.highContrast}</span>
          </label>

          <label className="a11y-toolbar__toggle">
            <input
              type="checkbox"
              checked={prefs.underlineLinks}
              onChange={() => toggle("underlineLinks")}
            />
            <span>{t.underlineLinks}</span>
          </label>

          <label className="a11y-toolbar__toggle">
            <input
              type="checkbox"
              checked={prefs.readableFont}
              onChange={() => toggle("readableFont")}
            />
            <span>{t.readableFont}</span>
          </label>

          <div className="a11y-toolbar__group">
            <button type="button" className="a11y-toolbar__action" onClick={handleReadSelection}>
              {t.readSelection}
            </button>
            <button type="button" className="a11y-toolbar__action" onClick={handleReadPage}>
              {t.readPage}
            </button>
            <button type="button" className="a11y-toolbar__action" onClick={handleStop}>
              {t.stopRead}
            </button>
            {speechMsg ? (
              <p className="a11y-toolbar__note" role="status">
                {speechMsg}
              </p>
            ) : null}
          </div>

          <button type="button" className="a11y-toolbar__action" onClick={handleReset}>
            {t.reset}
          </button>

          <Link
            href={LEGAL_ROUTES.accessibility}
            className="a11y-toolbar__link"
            onClick={() => setOpen(false)}
          >
            {t.statement}
          </Link>
        </div>
      ) : null}

      <button
        type="button"
        className="a11y-toolbar__fab"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={open ? t.close : t.open}
        onClick={() => setOpen((v) => !v)}
      >
        <AccessibilityIcon />
      </button>
    </div>
  );
}
