'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLanguageStore } from '@/lib/stores/language-store'
import { NoiseOverlay } from '@/components/ui'
import { Footer } from '@/components/layout'
import { ArrowLeft, Shield } from 'lucide-react'

export default function PrivacyPage() {
  const { t } = useLanguageStore()

  return (
    <main className="min-h-screen bg-concrete-dark text-concrete-light relative overflow-hidden font-sans">
      <NoiseOverlay />
      
      {/* Brutalist background grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `
          linear-gradient(to right, var(--concrete-mid) 1px, transparent 1px),
          linear-gradient(to bottom, var(--concrete-mid) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px'
      }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-accent-steel hover:text-concrete-light transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            BACK TO HOME
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-accent-forge/10 border border-accent-forge/30">
              <Shield className="w-8 h-8 text-accent-forge" />
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight uppercase">
              Privacy <span className="text-accent-forge">Policy</span>
            </h1>
          </div>
          <p className="text-accent-steel font-mono text-sm tracking-widest uppercase">
            Last Updated: February 2026
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-12 text-concrete-light/80 leading-relaxed"
        >
          <section className="border-l-2 border-accent-forge/30 pl-8 py-2">
            <h2 className="font-display text-2xl font-bold text-concrete-light mb-4 uppercase tracking-wide">
              1. The "No Data" Promise
            </h2>
            <p className="mb-4">
              LET'S DUMBBELL is engineered as a client-side utility. We do not require account registration, and we do not store your personal information on our servers.
            </p>
            <p>
              All calculations for your equipment happen directly in your browser. Your "projects" are stored locally on your device using browser storage (localStorage).
            </p>
          </section>

          <section className="border-l-2 border-concrete-mid/30 pl-8 py-2">
            <h2 className="font-display text-2xl font-bold text-concrete-light mb-4 uppercase tracking-wide">
              2. Information Usage
            </h2>
            <p className="mb-4">
              We do not use cookies for tracking or advertising. We may use minimal, privacy-focused analytics (like Vercel Analytics) to understand site traffic without identifying individual users.
            </p>
          </section>

          <section className="border-l-2 border-concrete-mid/30 pl-8 py-2">
            <h2 className="font-display text-2xl font-bold text-concrete-light mb-4 uppercase tracking-wide">
              3. Third-Party Links
            </h2>
            <p>
              Our tool provides links to external resources (like GitHub). We are not responsible for the privacy practices of these external sites.
            </p>
          </section>

          <section className="border-l-2 border-accent-forge/30 pl-8 py-2">
            <h2 className="font-display text-2xl font-bold text-concrete-light mb-4 uppercase tracking-wide">
              4. Contact
            </h2>
            <p>
              For any questions regarding this policy or the technical implementation of our privacy-first approach, please reach out via our GitHub repository.
            </p>
          </section>
        </motion.div>

        <Footer />
      </div>
    </main>
  )
}
