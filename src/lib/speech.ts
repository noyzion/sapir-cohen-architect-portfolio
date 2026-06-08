import type { Locale } from "@/types";

let activeUtterance: SpeechSynthesisUtterance | null = null;

export function isSpeechSupported() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function stopSpeech() {
  if (!isSpeechSupported()) return;
  window.speechSynthesis.cancel();
  activeUtterance = null;
}

export function speakText(text: string, locale: Locale) {
  if (!isSpeechSupported()) return false;
  const trimmed = text.trim();
  if (!trimmed) return false;

  stopSpeech();
  const utterance = new SpeechSynthesisUtterance(trimmed);
  utterance.lang = locale === "he" ? "he-IL" : "en-US";
  utterance.rate = 0.95;
  activeUtterance = utterance;
  window.speechSynthesis.speak(utterance);
  return true;
}

export function speakSelection(locale: Locale) {
  const selection = window.getSelection()?.toString() ?? "";
  return speakText(selection, locale);
}

export function speakMainContent(locale: Locale) {
  const main = document.getElementById("main-content");
  if (!main) return false;
  return speakText(main.innerText, locale);
}
