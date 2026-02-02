'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface BrutalistButtonProps {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'secondary'
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
}

export function BrutalistButton({
  children,
  href,
  variant = 'primary',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}: BrutalistButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center px-8 py-4 font-display font-bold text-sm tracking-wider uppercase transition-all duration-150'

  const variants = {
    primary:
      'bg-accent-forge text-concrete-light border-3 border-concrete-dark hover:translate-y-0.5 hover:shadow-[inset_0_-4px_0_rgba(0,0,0,0.3)]',
    secondary:
      'bg-transparent text-concrete-light border-2 border-concrete-light hover:bg-concrete-dark',
  }

  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer'

  const combinedClasses = `${baseClasses} ${variants[variant]} ${disabledClasses} ${className}`

  if (href) {
    return (
      <motion.div whileTap={{ scale: 0.98 }}>
        <Link href={href} className={combinedClasses}>
          {children}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  )
}
