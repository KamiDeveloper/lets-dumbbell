'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useState } from 'react'
import { useForgeStore } from '@/lib/stores/forge-store'
import { useLanguageStore } from '@/lib/stores/language-store'
import { generateDumbbellPDF } from '@/lib/pdf'
import { BrutalistButton, NoiseOverlay } from '@/components/ui'
import { motion, AnimatePresence } from 'framer-motion'

const Scene = dynamic(() => import('@/components/3d/Scene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-concrete-dark flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-concrete-mid border-t-accent-forge rounded-full animate-spin" />
    </div>
  ),
})

export default function ForgePage() {
  const { weightKg, quantity, spec, realisticMode, setWeight, setQuantity, setRealisticMode } = useForgeStore()
  const { t, language } = useLanguageStore()
  const [showRealisticModal, setShowRealisticModal] = useState(false)

  const handleRealisticToggle = () => {
    if (realisticMode) {
      setRealisticMode(false)
    } else {
      setShowRealisticModal(true)
    }
  }

  const confirmRealisticMode = () => {
    setRealisticMode(true)
    setShowRealisticModal(false)
  }

  return (
    <div className="min-h-screen bg-concrete-dark font-sans text-concrete-light">
      <NoiseOverlay />

      {/* Realistic Mode Switch (Fixed next to Language Switcher) */}
      <div className="fixed bottom-6 right-20 md:right-24 z-50 flex items-center gap-2 mr-4 md:mr-6">
          <button
            onClick={handleRealisticToggle}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-full border transition-all duration-300
              ${realisticMode 
                ? 'bg-accent-forge/20 border-accent-forge text-accent-forge shadow-[0_0_15px_rgba(255,69,0,0.3)]' 
                : 'bg-concrete-dark border-concrete-mid/50 text-concrete-mid hover:text-concrete-light hover:border-concrete-light'
              }
            `}
          >
            <div className={`w-2 h-2 rounded-full ${realisticMode ? 'bg-accent-forge animate-pulse' : 'bg-current'}`} />
            <span className="font-display text-xs font-bold tracking-wider uppercase hidden sm:block">
              {realisticMode ? 'Realistic ON' : 'Realistic OFF'}
            </span>
          </button>
      </div>

      {/* Warning Modal */}
      <AnimatePresence>
        {showRealisticModal && (
          <div className="fixed inset-0 z-100 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRealisticModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-concrete-dark border border-concrete-mid p-6 max-w-sm w-full shadow-2xl z-10"
            >
              <h3 className="font-display text-xl font-bold text-accent-forge mb-4">
                ⚠️ HIGH PERFORMANCE MODE
              </h3>
              <p className="text-concrete-light mb-6 text-sm leading-relaxed">
                Activating <span className="text-accent-forge font-bold">Realistic Illumination</span> enables advanced post-processing effects (Bloom, Noise, Particles, High-Res Shadows).
                <br/><br/>
                This may cause slowdowns on older devices or laptops without dedicated graphics cards.
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setShowRealisticModal(false)}
                  className="flex-1 py-3 px-4 border border-concrete-mid text-concrete-light font-display text-sm tracking-wider hover:bg-concrete-mid/10 transition-colors"
                >
                  CANCEL
                </button>
                <button 
                  onClick={confirmRealisticMode}
                  className="flex-1 py-3 px-4 bg-accent-forge text-concrete-light font-display font-bold text-sm tracking-wider hover:bg-accent-forge/90 transition-colors"
                >
                  ENABLE
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-4 md:px-8 py-4 border-b border-concrete-mid/20">
        <Link
          href="/"
          className="flex items-center gap-2 text-concrete-light hover:text-accent-steel transition-colors"
        >
          <span className="text-xl">←</span>
          <span className="font-display text-sm tracking-wider uppercase">
            {t.common.home}
          </span>
        </Link>
        <h1 className="font-display text-xl md:text-2xl font-bold text-concrete-light tracking-tight">
          {t.forge.title}
        </h1>
        <div className="w-20" />
      </header>

      {/* Main Content */}
      <main className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-4rem)]">
        {/* Left: Parameters */}
        <section className="p-6 md:p-8 lg:border-r border-concrete-mid/20">
          {/* Parameters Section */}
          <div className="mb-8">
            <h2 className="font-display text-lg font-bold text-concrete-light tracking-wider mb-6">
              {t.forge.parameters}
            </h2>
            <div className="h-px w-full bg-concrete-mid/30 mb-6" />

            {/* Weight Slider */}
            <div className="mb-8">
              <label className="block font-display text-sm text-accent-steel tracking-wide mb-3">
                {t.forge.targetWeight}
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0.5"
                  max="100"
                  step="0.5"
                  value={weightKg}
                  onChange={(e) => setWeight(parseFloat(e.target.value))}
                  className="flex-1 h-2 bg-concrete-mid/30 rounded-full appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none 
                    [&::-webkit-slider-thumb]:w-4 
                    [&::-webkit-slider-thumb]:h-4 
                    [&::-webkit-slider-thumb]:bg-accent-forge 
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:cursor-pointer"
                />
                <span className="font-mono text-xl text-concrete-light w-24 text-right">
                  {weightKg} kg
                </span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-8">
              <label className="block font-display text-sm text-accent-steel tracking-wide mb-3">
                {t.forge.quantity}
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => setQuantity(1)}
                  className={`flex-1 py-3 px-4 font-display text-sm tracking-wider border transition-all ${
                    quantity === 1
                      ? 'bg-accent-forge text-concrete-light border-accent-forge'
                      : 'bg-transparent text-concrete-light border-concrete-mid hover:border-accent-steel'
                  }`}
                >
                  {t.forge.single}
                </button>
                <button
                  onClick={() => setQuantity(2)}
                  className={`flex-1 py-3 px-4 font-display text-sm tracking-wider border transition-all ${
                    quantity === 2
                      ? 'bg-accent-forge text-concrete-light border-accent-forge'
                      : 'bg-transparent text-concrete-light border-concrete-mid hover:border-accent-steel'
                  }`}
                >
                  {t.forge.pair}
                </button>
              </div>
            </div>
          </div>

          {/* Calculations Section */}
          <div className="mb-8">
            <h2 className="font-display text-lg font-bold text-concrete-light tracking-wider mb-6">
              {t.forge.calculations}
            </h2>
            <div className="h-px w-full bg-concrete-mid/30 mb-6" />

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-accent-steel">{t.forge.perDumbbell}</span>
              </div>

              <div className="pl-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-accent-steel">• {t.forge.weight}:</span>
                  <span className="font-mono text-concrete-light">
                    {spec.target_weight_kg} kg
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-accent-steel">• {t.forge.molds}:</span>
                  <span className="font-mono text-concrete-light">
                    {spec.molds_needed}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-accent-steel">• {t.forge.mortar}:</span>
                  <span className="font-mono text-concrete-light">
                    {(spec.mortar_volume_per_mold * 2).toFixed(1)} L
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-accent-steel">• {t.forge.tube}:</span>
                  <span className="font-mono text-concrete-light">
                    {spec.tube_volume_per_dumbbell.toFixed(2)} L
                  </span>
                </div>
              </div>

              <div className="h-px w-full bg-concrete-mid/20 my-4" />

              <div className="flex justify-between">
                <span className="text-accent-steel">{t.forge.hexDimensions}</span>
              </div>

              <div className="pl-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-accent-steel">• {t.forge.side}:</span>
                  <span className="font-mono text-concrete-light">
                    {spec.hex_dimensions.side_length_cm} cm
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-accent-steel">• {t.forge.height}:</span>
                  <span className="font-mono text-concrete-light">
                    {spec.hex_dimensions.height_cm} cm
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-accent-steel">• {t.forge.width}:</span>
                  <span className="font-mono text-concrete-light">
                    {spec.hex_dimensions.width_cm} cm
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <BrutalistButton
              variant="primary"
              className="w-full"
              onClick={() =>
                generateDumbbellPDF({
                  spec,
                  projectName: `${weightKg}kg Hexagonal Dumbbell`,
                  language,
                })
              }
            >
              {t.forge.generatePDF}
            </BrutalistButton>
            {/*<BrutalistButton variant="secondary" className="w-full">
              {t.forge.saveProject}
            </BrutalistButton>*/}
          </div>
        </section>

        {/* Right: 3D Preview */}
        <section className="h-[50vh] lg:h-auto bg-concrete-dark relative overflow-hidden">
          {/* Brutalist grid background */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
            backgroundImage: `
              linear-gradient(to right, #6a6a6a 1px, transparent 1px),
              linear-gradient(to bottom, #6a6a6a 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }} />

          <div className="w-full h-full relative z-10">
            <Scene
              sideLength={spec.hex_dimensions.side_length_cm}
              height={spec.hex_dimensions.height_cm}
              tubeLength={spec.materials.tube_length}
              tubeDiameter={spec.materials.tube_diameter}
              chamferWidth={spec.hex_dimensions.chamfer_width_cm}
              realisticMode={realisticMode}
            />
          </div>
        </section>
      </main>
    </div>
  )
}
