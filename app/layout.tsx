'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import Navigation from '@/components/Navigation'
import Loading from '@/components/Loading'
import { useState, useEffect } from 'react'
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // 3 seconds minimum loading time

    return () => clearTimeout(timer)
  }, [])

  return (
    <html lang="es">
      <body className={inter.className}>
        {isLoading && <Loading />}
        <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Navigation />
          </div>
        </header>
        <main>{children}</main>
        <SpeedInsights />
      </body>
    </html>
  )
}

