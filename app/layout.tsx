import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/react"
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
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}

