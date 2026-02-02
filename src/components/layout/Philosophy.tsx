'use client'

import { motion } from 'framer-motion'

const philosophyItems = [
  {
    icon: '⎔', // Hexagon symbol
    title: 'PRECISION',
    description: 'Engineered calculations, not guesswork',
  },
  {
    icon: '◈', // Diamond symbol
    title: 'ECONOMY',
    description: '$20 materials, $200 results',
  },
  {
    icon: '⚒', // Hammer and pick
    title: 'MASTERY',
    description: 'Build it, own it, use it',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0, 0, 0.2, 1] as const },
  },
}

export function Philosophy() {
  return (
    <section className="bg-concrete-dark py-24 px-4 md:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
      >
        {philosophyItems.map((item) => (
          <motion.div
            key={item.title}
            variants={itemVariants}
            className="text-center"
          >
            {/* Industrial Icon */}
            <div className="text-5xl mb-6 text-accent-steel">{item.icon}</div>

            {/* Title */}
            <h3 className="font-display text-xl font-bold text-concrete-light tracking-wider mb-4">
              {item.title}
            </h3>

            {/* Divider */}
            <div className="w-12 h-px bg-concrete-mid mx-auto mb-4" />

            {/* Description */}
            <p className="font-body text-accent-steel text-base leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
