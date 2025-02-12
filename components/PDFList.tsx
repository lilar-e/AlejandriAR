'use client'

import { useState } from 'react'
import { FileText, Download } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'
import AddBookModal from './AddBookModal'
import { FiHeart } from 'react-icons/fi'

type PDFFile = {
  id: string;
  name: string;
  category: string;
  url?: string;
  tags?: string[];
};

export default function PDFList({ pdfFiles, favorites, onToggleFavorite }: { pdfFiles: PDFFile[], favorites: string[], onToggleFavorite: (id: string) => void }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)

  const filteredFiles = pdfFiles.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
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

  const handleAddBook = async (newBook) => {
    // Aquí iría la lógica para enviar al backend
    console.log('Nuevo libro:', newBook)
    // Actualizar la lista de PDFs
    // setPdfFiles(prev => [...prev, newBook])
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Documentos</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Agregar libro
        </button>
      </div>

      {pdfFiles.map((pdf) => (
        <div 
          key={pdf.id}
          className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all group bg-white dark:bg-gray-800 relative"
        >
          <div className="flex justify-between items-start">
            <div 
              className="flex-1 cursor-pointer"
              onClick={() => handleFileSelect(pdf)}
            >
              <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                {pdf.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {pdf.category}
              </p>
            </div>
            <button
              onClick={() => onToggleFavorite(pdf.id)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors z-10"
              aria-label={favorites.includes(pdf.id) ? "Quitar de favoritos" : "Agregar a favoritos"}
            >
              <FiHeart 
                className={`h-5 w-5 ${
                  favorites.includes(pdf.id) 
                    ? 'text-red-500 fill-current' 
                    : 'text-gray-400 dark:text-gray-500'
                }`}
              />
            </button>
          </div>

          {pdf.tags && pdf.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {pdf.tags.map((tag) => (
                <span 
                  key={tag}
                  className="text-xs px-2 py-1 rounded-full bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Indicador visual de que es clickeable */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500 rounded-lg transition-colors" />
        </div>
      ))}

      {showAddModal && (
        <AddBookModal
          onAdd={handleAddBook}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  )
}

