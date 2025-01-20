import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/react"
import { Toaster } from "@/components/ui/toaster"

import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        {children}
        <SpeedInsights />
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}

