'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Montserrat } from 'next/font/google'
import PDFList from '@/components/PDFList'
import PDFViewer from '@/components/PDFViewer'
import { getPdfs } from '@/lib/getPdfs'

const montserrat = Montserrat({ subsets: ['latin'] })

export default function HomePage() {
  const [pdfFiles, setPdfFiles] = useState([])

  useEffect(() => {
    getPdfs().then(data => setPdfFiles(data))
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <header>
        <h1 className={`${montserrat.className} text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400`}>
          Alejandria<span className="text-blue-600">R</span>
        </h1>
        <nav className="flex justify-between items-center mb-6">
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="text-blue-600 hover:underline">Inicio</Link>
            </li>
            <li className="text-blue-600 hover:underline" style={{ position: 'relative', left: '10px' }}>
              <Link href="/colaborar">Colaborar</Link>
            </li>
            <li>
              <Link href="/login" className="text-blue-600 hover:underline">Iniciar sesion</Link>
            </li>
          </ul> 
        </nav>
      </header>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 mb-6 md:mb-0 md:mr-6">
          <PDFList pdfFiles={pdfFiles} favorites={[]} onToggleFavorite={() => {}} />
        </div>
        <div className="w-full md:w-3/4">
          <PDFViewer url="" onClose={() => {}} />
        </div>
      </div>
    </div>
  )
}

