'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguageStore } from '@/lib/stores/language-store'
import { Hexagon, FileDown, Infinity as InfinityIcon } from 'lucide-react'

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

// ===== HERO SECTION =====
function Hero() {
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
            <span className="text-accent-steel text-sm self-center">
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

// ===== SOCIAL PROOF =====
function SocialProof() {
  const { t, language } = useLanguageStore()
  
  const metrics = [
    { value: '90%', label: t.socialProof.savings },
    { value: '<5min', label: t.socialProof.time },
    { value: '10x', label: t.socialProof.cost },
  ]

  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 border-t border-concrete-mid/20">
      <motion.div
        key={language}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
      >
        {metrics.map((metric) => (
          <motion.div 
            key={metric.label}
            variants={scaleIn}
            className="text-center"
          >
            <div className="font-mono text-4xl md:text-5xl font-bold text-accent-forge mb-2">
              {metric.value}
            </div>
            <div className="text-accent-steel text-sm tracking-wide uppercase">
              {metric.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

// ===== BENEFITS =====
function Benefits() {
  const { t, language } = useLanguageStore()
  
  const benefits = [
    {
      icon: <Hexagon className="w-8 h-8" strokeWidth={1.5} />,
      headline: t.benefits.precision.title,
      description: t.benefits.precision.desc,
    },
    {
      icon: <FileDown className="w-8 h-8" strokeWidth={1.5} />,
      headline: t.benefits.templates.title,
      description: t.benefits.templates.desc,
    },
    {
      icon: <InfinityIcon className="w-8 h-8" strokeWidth={1.5} />,
      headline: t.benefits.anyWeight.title,
      description: t.benefits.anyWeight.desc,
    },
  ]

  return (
    <section className="py-20 px-6 md:px-12 lg:px-24">
      <motion.div
        key={language}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-5xl mx-auto"
      >
        <motion.h2 
          variants={fadeUp}
          className="font-display text-3xl md:text-4xl font-bold text-concrete-light mb-16 text-center"
        >
          {t.benefits.title}
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.headline}
              variants={fadeUp}
              className="group p-6 border border-concrete-mid/20 hover:border-accent-forge/30 transition-colors"
            >
              <div className="text-accent-steel group-hover:text-accent-forge transition-colors mb-4">
                {benefit.icon}
              </div>
              <h3 className="font-display text-xl font-bold text-concrete-light mb-3">
                {benefit.headline}
              </h3>
              <p className="text-accent-steel leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

// ===== HOW IT WORKS =====
function HowItWorks() {
  const { t, language } = useLanguageStore()
  
  const steps = [
    { number: '01', title: t.howItWorks.step1.title, description: t.howItWorks.step1.desc },
    { number: '02', title: t.howItWorks.step2.title, description: t.howItWorks.step2.desc },
    { number: '03', title: t.howItWorks.step3.title, description: t.howItWorks.step3.desc },
  ]

  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-linear-to-b from-transparent to-accent-iron/20">
      <motion.div
        key={language}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-4xl mx-auto"
      >
        <motion.h2 
          variants={fadeUp}
          className="font-display text-3xl md:text-4xl font-bold text-concrete-light mb-16 text-center"
        >
          {t.howItWorks.title}
        </motion.h2>
        
        <div className="space-y-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              variants={fadeUp}
              className="flex items-start gap-6"
            >
              <div className="font-mono text-5xl font-bold text-accent-forge/30">
                {step.number}
              </div>
              <div className="pt-2">
                <h3 className="font-display text-xl font-bold text-concrete-light mb-1">
                  {step.title}
                </h3>
                <p className="text-accent-steel">
                  {step.description}
                </p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute left-13 mt-16 w-px h-8 bg-accent-forge/20" />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

// ===== FINAL CTA =====
function FinalCTA() {
  const { t, language } = useLanguageStore()
  
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24">
      <motion.div
        key={language}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="font-display text-3xl md:text-5xl font-bold text-concrete-light mb-6">
          {t.finalCTA.title}
        </h2>
        <p className="text-xl text-accent-steel mb-10 max-w-xl mx-auto">
          {t.finalCTA.subtitle}
        </p>
        
        <Link
          href="/tools/forge"
          className="inline-flex items-center justify-center px-12 py-5 bg-accent-forge text-concrete-light font-display font-bold text-xl tracking-wide uppercase transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(255,69,0,0.4)]"
        >
          {t.finalCTA.button}
        </Link>
        
        <p className="mt-6 text-sm text-concrete-mid">
          {t.finalCTA.note}
        </p>
      </motion.div>
    </section>
  )
}

// ===== MINIMAL FOOTER =====
function Footer() {
  const { t } = useLanguageStore()
  
  return (
    <footer className="py-8 px-6 md:px-12 lg:px-24 border-t border-concrete-mid/20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-concrete-mid">
        <div className="font-display font-bold text-concrete-light">
          {t.common.brand}
        </div>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-concrete-light transition-colors">{t.common.privacy}</Link>
          <Link href="#" className="hover:text-concrete-light transition-colors">{t.common.terms}</Link>
        </div>
      </div>
    </footer>
  )
}

// ===== STICKY CTA HEADER =====
function StickyHeader() {
  const { t } = useLanguageStore()
  
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-concrete-dark/90 backdrop-blur-sm border-b border-concrete-mid/10"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <div className="relative h-8 w-8">
            <Image 
              src="/lets-dumbbell-logo.png" 
              alt={t.common.brand} 
              fill 
              className="object-contain" 
              priority
            />
          </div>
          <span className="font-display font-bold text-lg tracking-wide text-concrete-light">
            LET'S DUMBBELL
          </span>
        </Link>
        <Link
          href="/tools/forge"
          className="px-6 py-2 bg-accent-forge text-concrete-light font-display font-bold text-sm tracking-wide uppercase transition-all hover:bg-accent-forge/90"
        >
          {t.common.startBuilding}
        </Link>
      </div>
    </motion.header>
  )
}

// ===== MAIN PAGE =====
export default function Home() {
  return (
    <main className="min-h-screen bg-concrete-dark text-concrete-light overflow-x-hidden font-sans">
      <StickyHeader />
      <Hero />
      <SocialProof />
      <Benefits />
      <HowItWorks />
      <FinalCTA />
      <Footer />
    </main>
  )
}
