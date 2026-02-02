'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { NoiseOverlay } from '@/components/ui'
import { Footer } from '@/components/layout'
import { ArrowLeft, Scale } from 'lucide-react'

export default function TermsPage() {
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
              <Scale className="w-8 h-8 text-accent-forge" />
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight uppercase">
              Terms of <span className="text-accent-forge">Service</span>
            </h1>
          </div>
          <p className="text-accent-steel font-mono text-sm tracking-widest uppercase">
            Agreement for DIY Engineers
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
              1. Safety Disclaimer (CRITICAL)
            </h2>
            <p className="mb-4 font-bold text-concrete-light">
              DIY weightlifting equipment carries inherent risks. 
            </p>
            <p className="mb-4">
              LET'S DUMBBELL provides geometric and volumetric calculations for informational purposes only. We do not guarantee the structural integrity of the equipment you build using our templates.
            </p>
            <p>
              By using this tool, you acknowledge that you are responsible for selecting appropriate materials (concrete mix, steel reinforcement, handle diameter) and ensuring the safety of your final build.
            </p>
          </section>

          <section className="border-l-2 border-concrete-mid/30 pl-8 py-2">
            <h2 className="font-display text-2xl font-bold text-concrete-light mb-4 uppercase tracking-wide">
              2. License & Usage
            </h2>
            <p className="mb-4">
              The software and calculators are provided under the MIT License. You are free to use the generated templates for personal or commercial builds.
            </p>
            <p>
              Redistribution of the core calculator logic must include original attribution to LET'S DUMBBELL.
            </p>
          </section>

          <section className="border-l-2 border-concrete-mid/30 pl-8 py-2">
            <h2 className="font-display text-2xl font-bold text-concrete-light mb-4 uppercase tracking-wide">
              3. No Warranty
            </h2>
            <p>
              THE SERVICE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
            </p>
          </section>

          <section className="border-l-2 border-accent-forge/30 pl-8 py-2">
            <h2 className="font-display text-2xl font-bold text-concrete-light mb-4 uppercase tracking-wide">
              4. Liability
            </h2>
            <p>
              In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.
            </p>
          </section>
        </motion.div>

        <Footer />
      </div>
    </main>
  )
}
