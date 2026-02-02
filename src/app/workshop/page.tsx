import Link from 'next/link'
import type { Metadata } from 'next'
import { Github } from 'lucide-react'
import { Footer } from '@/components/layout'

export const metadata: Metadata = {
  title: 'Workshop | Project Dumbbell',
  description: 'Select your tool and start building DIY strength equipment',
}

const tools = [
  {
    id: 'forge',
    name: 'THE FORGE',
    subtitle: 'Mortero Dumbbells',
    description: 'Hexagonal precision weights',
    href: '/tools/forge',
    icon: '⎔',
    available: true,
  },
  {
    id: 'vector',
    name: 'THE VECTOR',
    subtitle: 'Parallettes & Dip Bars',
    description: 'PVC pipe optimizer',
    href: '/tools/vector',
    icon: '▤',
    available: false,
  },
  {
    id: 'box',
    name: 'THE BOX',
    subtitle: 'Plyometric Box 3-in-1',
    description: 'Plywood nesting calculator',
    href: '/tools/box',
    icon: '▣',
    available: false,
  },
  {
    id: 'orb',
    name: 'THE ORB',
    subtitle: 'Medicine Ball / Slamball',
    description: 'Sphere density calculator',
    href: '/tools/orb',
    icon: '◯',
    available: false,
  },
  {
    id: 'silo',
    name: 'THE SILO',
    subtitle: 'Sandbags',
    description: 'Filler system optimizer',
    href: '/tools/silo',
    icon: '▮',
    available: false,
  },
  {
    id: 'rig',
    name: 'THE RIG',
    subtitle: 'Suspension / TRX',
    description: 'Load rating calculator',
    href: '/tools/rig',
    icon: '⛓',
    available: false,
  },
]

export default function WorkshopPage() {
  return (
    <div className="min-h-screen bg-concrete-dark">
      {/* Header */}
      <header className="flex items-center justify-between px-4 md:px-8 py-6 border-b border-concrete-mid/20">
        <Link
          href="/"
          className="flex items-center gap-2 text-concrete-light hover:text-accent-steel transition-colors"
        >
          <span className="text-xl">←</span>
          <span className="font-display text-sm tracking-wider uppercase">
            Home
          </span>
        </Link>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-concrete-light tracking-tight">
          THE WORKSHOP
        </h1>
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/KamiDeveloper/lets-dumbbell"
            target="_blank"
            rel="noopener noreferrer"
            className="text-concrete-mid hover:text-concrete-light transition-colors"
          >
            <Github className="w-6 h-6" />
          </Link>
          <div className="w-px h-6 bg-concrete-mid/30" />
          <div className="w-12" />
        </div>
      </header>

      {/* Tool Grid */}
      <main className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.id}
              href={tool.available ? tool.href : '#'}
              className={`group relative aspect-square p-6 flex flex-col justify-between
                bg-linear-to-br from-concrete-dark to-accent-iron
                border border-concrete-mid/20
                transition-all duration-200
                ${
                  tool.available
                    ? 'hover:-translate-y-1 hover:shadow-lg hover:shadow-black/40 cursor-pointer'
                    : 'opacity-50 cursor-not-allowed'
                }`}
            >
              {/* Icon */}
              <div className="text-5xl text-accent-steel group-hover:text-accent-forge transition-colors">
                {tool.icon}
              </div>

              {/* Content */}
              <div>
                <h3 className="font-display text-xl font-bold text-concrete-light tracking-wider mb-1">
                  {tool.name}
                </h3>
                <div className="w-12 h-px bg-concrete-mid mb-2" />
                <p className="font-display text-sm text-accent-steel mb-1">
                  {tool.subtitle}
                </p>
                <p className="text-sm text-concrete-mid">{tool.description}</p>
              </div>

              {/* CTA */}
              <div className="flex items-center justify-between mt-4">
                <span
                  className={`font-mono text-xs tracking-wider ${
                    tool.available ? 'text-accent-forge' : 'text-concrete-mid'
                  }`}
                >
                  {tool.available ? 'ENTER →' : 'COMING SOON'}
                </span>
              </div>

              {/* Hover border effect */}
              {tool.available && (
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent-forge/30 transition-colors pointer-events-none" />
              )}
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
