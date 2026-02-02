'use client'

import { motion } from 'framer-motion'
import { BrutalistButton, NoiseOverlay } from '@/components/ui'


export function Hero() {
  return (
    <section className="relative h-screen overflow-hidden bg-concrete-dark">
      <NoiseOverlay />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="font-display text-[clamp(2.5rem,8vw,6rem)] font-bold text-concrete-light tracking-tight text-center"
        >
          PROJECT DUMBBELL
        </motion.h1>

        {/* ASCII Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="w-64 h-px bg-concrete-mid my-8"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="font-display text-[clamp(1rem,2vw,1.5rem)] text-accent-steel tracking-wide text-center"
        >
          ENGINEER YOUR STRENGTH
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-16"
        >
          <BrutalistButton variant="primary" href="/workshop">
            GET STARTED
          </BrutalistButton>
          <BrutalistButton variant="secondary" href="/tools/forge">
            THE FORGE
          </BrutalistButton>
        </motion.div>
      </div>
    </section>
  )
}
