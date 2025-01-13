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
        <div className="bg-white rounded-lg shadow-md p-4 w-full">
      <input
        type="text"
        placeholder="Buscar archivos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      >
        <option value="all">Todas las Categorías</option>
        <option value="enfermeria">Enfermería</option>
        <option value="esi">ESI</option>
        <option value="cuentos">Cuentos</option>
        <option value="LGBTIQ+">LGBT</option>
        <option value="salud mental">Salud Mental</option>
      </select>
      <ul className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto w-full">
        {filteredFiles.map((file) => (
          <li
            key={file.id}
            onClick={() => handleFileSelect(file)}
            className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-100 text-sm ${
              searchParams.get('fileId') === file.url.split('/d/')[1]?.split('/')[0]
                ? 'bg-blue-100'
                : ''
            }`}
          >
            <div className="flex items-center w-full pr-2">
              <div className="w-8 flex-shrink-0">
                <FileText className="w-5 h-5 text-blue-500" />
              </div>
              <div className="flex-grow min-w-0 mr-2">
                <p className="font-medium truncate">{file.name}</p>
                <p className="text-xs text-gray-500 capitalize">{file.category}</p>
              </div>
              {file.url && (
                <button
                  onClick={(e) => handleDownload(file, e)}
                  className="p-1 text-gray-500 hover:text-blue-500 transition-colors flex-shrink-0"
                >
                  <Download className="w-4 h-4" />
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
    </Suspense>
  )
}
