'use client'

import { useState } from 'react'
import { FileText, Download } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

type PDFFile = {
  id: string;
  name: string;
  category: string;
  url?: string;
};

export default function PDFList({ pdfFiles }: { pdfFiles: PDFFile[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredFiles = pdfFiles.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toUpperCase()) &&
    (selectedCategory === 'all' || file.category === selectedCategory)
  )

  const handleFileSelect = (file: PDFFile) => {
    if (file.url) {
      const fileId = file.url.split('/d/')[1]?.split('/')[0]
      if (fileId) {
        router.push(`?fileId=${fileId}`)
      }
    }
  }

  /**
   * Handler for the download button click event.
   * @param file the PDFFile object
   * @param e the React.MouseEvent object
   */
  const handleDownload = (file: PDFFile, e: React.MouseEvent) => {
    // Stop the event from propagating to the file item click handler
    e.stopPropagation()
    if (file.url) {
      // Extract the file ID from the URL
      const fileId = file.url.split('/d/')[1]?.split('/')[0]
      if (fileId) {
        // Create the download URL
        const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`
        // Open the download URL in a new tab
        window.open(downloadUrl, '_blank')
      }
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full">
      <input
        type="text"
        placeholder="Buscar archivos..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      >
        {}
        <option value="all">Todos</option>
        {Array.from(new Set(pdfFiles.map(file => file.category))).map((category) => (
          <option key={category} value={category} className='capitalize'>
            {category}
          </option>
        ))}
      </select>
      <ul className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto w-full">
        {filteredFiles.length > 0 ? (
          filteredFiles.map((file) => (
            <li
              key={file.id}
              onClick={() => handleFileSelect(file)}
              className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-100 text-sm ${
                searchParams?.get('fileId') === file.url.split('/d/')[1]?.split('/')[0]
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
          ))
        ) : (
          <li className="text-center text-gray-500">No se encontraron archivos</li>
        )}
      </ul>
    </div>
  )
}

