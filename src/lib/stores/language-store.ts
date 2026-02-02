import { create } from 'zustand'
import { translations, type Language } from '@/lib/i18n/translations'

interface LanguageState {
  language: Language
  t: typeof translations.en
  setLanguage: (lang: Language) => void
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: 'en',
  t: translations.en,
  setLanguage: (lang) =>
    set({
      language: lang,
      t: translations[lang],
    }),
}))
