/* eslint-disable @typescript-eslint/no-unused-vars */

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AlejandriAR - Materiales Educativos Esenciales',
  description: 'Accede a materiales educativos como Educación Sexual Integral, guías de enfermería, primeros auxilios, y más.',
  keywords: [
    'Educación Sexual Integral',
    'ESI',
    'Materiales educativos',
    'Enfermería',
    'Primeros Auxilios',
    'PDF educativos',
    'AlejandriAR',
  ],
  authors: [{ name: 'Tu Nombre', url: 'https://tu-dominio.com' }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'AlejandriAR - Materiales Educativos Esenciales',
    description: 'Encuentra recursos clave como Educación Sexual Integral, guías de enfermería y mucho más.',
    url: 'https://tu-dominio.com',
    images: [
      {
        url: 'https://tu-dominio.com/imagen-relevante.jpg',
        alt: 'Vista previa de AlejandriAR',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AlejandriAR - Materiales Educativos Esenciales',
    description: 'Descubre materiales educativos importantes como guías de ESI y enfermería en AlejandriAR.',
    images: ['https://tu-dominio.com/imagen-relevante.jpg'],
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

