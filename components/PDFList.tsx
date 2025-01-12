'use client'

import { useState, useEffect, Suspense } from 'react'
import { FileText, Download } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

interface PDFFile {
  id: number
  name: string
  category: string
  url: string
}

interface PDFListProps {
  pdfFiles: PDFFile[]
}

export default function PDFList({ pdfFiles }: PDFListProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [filteredFiles, setFilteredFiles] = useState(pdfFiles)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    const filtered = pdfFiles.filter(file =>
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'all' || file.category === selectedCategory)
    )
    setFilteredFiles(filtered)
  }, [searchTerm, selectedCategory, pdfFiles])

  const handleFileSelect = (file: PDFFile) => {
    if (file.url) {
      const fileId = file.url.split('/d/')[1].split('/')[0]
      router.push(`?fileId=${fileId}`)
    }
  }

  const handleDownload = (file: PDFFile, e: React.MouseEvent) => {
    e.stopPropagation()
    if (file.url) {
      const downloadUrl = `https://drive.google.com/uc?export=download&id=${file.url.split('/d/')[1].split('/')[0]}`
      window.open(downloadUrl, '_blank')
    }
  }

  return (
    <Suspense fallback={<div>Cargando archivos...</div>}>
      <div>
        <input
          type="text"
          placeholder="Buscar archivos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Todas las Categorías</option>
          <option value="enfermeria">Enfermería</option>
          <option value="esi">ESI</option>
          <option value="cuentos">Cuentos</option>
        </select>
        <ul className="space-y-2">
          {filteredFiles.map((file) => (
            <li
              key={file.id}
              onClick={() => handleFileSelect(file)}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-100 ${
                searchParams.get('fileId') === file.url.split('/d/')[1]?.split('/')[0]
                  ? 'bg-blue-100'
                  : ''
              }`}
            >
              <div className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-500" />
                <div>
                  <p className="font-medium">{file.name}</p>
                </div>
              </div>
              {file.url && (
                <button
                  onClick={(e) => handleDownload(file, e)}
                  className="p-2 text-gray-500 hover:text-blue-500 transition-colors"
                >
                  <Download className="w-5 h-5" />
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Suspense>
  )
}
