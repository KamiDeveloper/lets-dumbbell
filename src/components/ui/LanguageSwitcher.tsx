'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useLanguageStore } from '@/lib/stores/language-store'
import type { Language } from '@/lib/i18n/translations'

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: 'EN' },
  { code: 'es', label: 'Español', flag: 'ES' },
  { code: 'ja', label: '日本語', flag: 'JP' },
]

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguageStore()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-full right-0 mb-4 bg-concrete-dark border border-concrete-mid/30 rounded-lg shadow-2xl overflow-hidden min-w-35"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code)
                  setIsOpen(false)
                }}
                className={`w-full px-4 py-3 text-left text-sm transition-colors flex items-center justify-between ${
                  language === lang.code
                    ? 'bg-accent-forge text-concrete-light'
                    : 'text-concrete-mid hover:text-concrete-light hover:bg-concrete-mid/10'
                }`}
              >
                <span>{lang.label}</span>
                {language === lang.code && <span>✓</span>}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-concrete-dark border border-concrete-mid/30 shadow-lg flex items-center justify-center text-concrete-light hover:border-accent-forge transition-colors group"
      >
        <span className="font-display font-bold text-sm tracking-wide group-hover:text-accent-forge transition-colors">
          {languages.find((l) => l.code === language)?.flag}
        </span>
      </motion.button>
    </div>
  )
}
