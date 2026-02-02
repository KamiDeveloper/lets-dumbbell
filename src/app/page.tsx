'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguageStore } from '@/lib/stores/language-store'
import { Hexagon, FileDown, Infinity as InfinityIcon, Github } from 'lucide-react'
import { Hero, Footer } from '@/components/layout'

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
