import type { Metadata } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono, Noto_Sans_JP } from 'next/font/google'
import { LanguageSwitcher } from '@/components/ui'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const inter = Inter({
  variable: '--font-body',
  subsets: ['latin'],
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
})

const notoSansJP = Noto_Sans_JP({
  variable: '--font-jp',
  subsets: ['latin'], // 'latin' is usually enough to load the variable font, or preload: false
  weight: ['400', '500', '700'],
  preload: false,
})

export const metadata: Metadata = {
  title: "LET'S DUMBBELL | Engineer Your Strength",
  description:
    'DIY Strength Equipment Calculator - Engineer professional-grade gym equipment with precision calculators, 3D visualization, and printable templates.',
  keywords: [
    'DIY gym equipment',
    'concrete dumbbell',
    'homemade weights',
    'strength training',
    'fitness calculator',
  ],
  authors: [{ name: "LET'S DUMBBELL" }],
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: "LET'S DUMBBELL | Engineer Your Strength",
    description: 'From Workshop to Workout - Engineer Your Strength',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${notoSansJP.variable} antialiased bg-concrete-dark text-concrete-light`}
      >
        {children}
        <LanguageSwitcher />
      </body>
    </html>
  )
}
