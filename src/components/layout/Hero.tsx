'use client'

import { motion } from 'framer-motion'
import { BrutalistButton, NoiseOverlay } from '@/components/ui'
import { useLanguageStore } from '@/lib/stores/language-store'
import Image from 'next/image'
import Link from 'next/link'
import { Github } from 'lucide-react'


// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }
  }
}

export function Hero() {
  const { t, language } = useLanguageStore()
  
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 py-16 relative overflow-hidden">
      {/* Brutalist grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `
          linear-gradient(to right, var(--concrete-mid) 1px, transparent 1px),
          linear-gradient(to bottom, var(--concrete-mid) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px'
      }} />

      {/* Mobile Hero Background Image (Faded) */}
      <div className="absolute inset-0 lg:hidden pointer-events-none z-0 overflow-hidden">
        <div className="absolute -right-20 top-1/4 w-[150%] h-[60%] opacity-20 rotate-[-15deg] blur-[2px]">
            <Image
              src="/images/hero-dumbells.png"
              alt="Background texture"
              fill
              className="object-contain"
              priority
            />
        </div>
        {/* Gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-linear-to-r from-concrete-dark via-concrete-dark/90 to-transparent" />
      </div>
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
        <motion.div
          key={language}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Value Proposition */}
          <motion.h1 
            variants={fadeUp}
            className="font-display text-[clamp(2.5rem,7vw,5rem)] font-bold text-concrete-light leading-[1.1] tracking-tight mb-6"
          >
            {t.hero.headline.line1}<br />
            <span className="text-accent-forge">{t.hero.headline.highlight}</span>
          </motion.h1>
          
          {/* Subheadline - WHO + WHY */}
          <motion.p 
            variants={fadeUp}
            className="text-xl md:text-2xl text-accent-steel max-w-2xl mb-8 leading-relaxed"
          >
            {t.hero.subheadline}
            <span className="text-concrete-light font-medium">{t.hero.subheadlineHighlight}</span>
          </motion.p>
          
          {/* Primary CTA */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link
              href="/tools/forge"
              className="inline-flex items-center justify-center px-8 py-4 bg-accent-forge text-concrete-light font-display font-bold text-lg tracking-wide uppercase transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(255,69,0,0.3)]"
            >
              {t.hero.startParams}
            </Link>
            <Link
              href="https://github.com/KamiDeveloper/lets-dumbbell"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-concrete-light text-concrete-light font-display font-bold text-lg tracking-wide uppercase transition-all duration-200 hover:bg-concrete-light hover:text-concrete-dark"
            >
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </Link>
          </motion.div>
          
          <motion.div variants={fadeUp} className="flex items-center gap-4">
            <span className="text-accent-steel text-sm">
              {t.common.noSignup}
            </span>
          </motion.div>
          
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative aspect-3/4 w-full max-w-md mx-auto">
            <Image
              src="/images/hero-dumbells.png"
              alt="Hand-built concrete dumbbell"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <div className="scroll-indicator-text">{t.scrollIndicator}</div>
        <div className="scroll-indicator-arrow">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <polyline points="6 12 12 18 18 12"></polyline>
            <line x1="12" y1="5" x2="12" y2="18"></line>
          </svg>
        </div>
      </div>
    </section>
  )
}
