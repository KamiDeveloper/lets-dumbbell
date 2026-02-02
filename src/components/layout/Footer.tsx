'use client'

import Link from 'next/link'
import { useLanguageStore } from '@/lib/stores/language-store'
import { Github } from 'lucide-react'

export function Footer() {
    const { t } = useLanguageStore()

    return (
        <footer className="py-8 px-6 md:px-12 lg:px-24 border-t border-concrete-mid/20 bg-concrete-dark">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-concrete-mid">
                <div className="font-display font-bold text-concrete-light">
                    {t.common.brand}
                </div>
                <div className="flex gap-6">
                    <Link href="/privacy" className="hover:text-concrete-light transition-colors">{t.common.privacy}</Link>
                    <Link href="/terms" className="hover:text-concrete-light transition-colors">{t.common.terms}</Link>
                    <Link
                        href="https://github.com/KamiDeveloper/lets-dumbbell"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-concrete-light transition-colors inline-flex items-center gap-1"
                    >
                        <Github className="w-4 h-4" />
                        GitHub
                    </Link>
                    <Link href="https://kamidev.app" rel="noopener noreferrer" className="hover:text-concrete-light transition-colors">KamiDev</Link>
                </div>
            </div>
        </footer>
    )
}
