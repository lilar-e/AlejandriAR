import { useState, useEffect } from 'react'
import { FiX, FiSearch, FiClock, FiTag } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

type Book = {
  id: string
  title: string
  author: string
  url: string
  coverUrl?: string
}

type SearchBarProps = {
  onClose: () => void
  onSearch: (query: string) => void
  searchResults: Book[]
}

export default function SearchBar({ onClose, onSearch, searchResults }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [recentSearches] = useState(['ESI', 'Enfermería', 'LGBTIQ+'])
  const [categories] = useState(['Novelas', 'Cuentos', 'Educación', 'Salud'])

  const handleSearch = (query: string) => {
    onSearch(query)
  }

  const getThumbnailUrl = (url: string) => {
    const fileId = url.match(/[-\w]{25,}(?!.*[-\w]{25,})/)?.[0];
    return fileId ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w400` : null;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl"
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="max-w-2xl mx-auto px-4 py-6"
        >
          {/* Barra de búsqueda */}
          <div className="relative">
            <div className="flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 rounded-2xl p-2 shadow-sm border border-gray-200/50 dark:border-gray-700/50">
              <FiSearch className="w-5 h-5 text-gray-400 dark:text-gray-300 ml-2" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                }}
                placeholder="Buscar por título o autor..."
                className="flex-1 bg-transparent border-none focus:outline-none text-base text-gray-900 dark:text-gray-200"
                autoFocus
              />
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <FiX className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </motion.button>
            </div>
          </div>

          {/* Contenido de búsqueda */}
          <div className="mt-6 space-y-6">
            {/* Búsquedas recientes */}
            <div>
              <h3 className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                <FiClock className="w-4 h-4" />
                <span>Búsquedas recientes</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map(term => (
                  <button
                    key={term}
                    onClick={() => handleSearch(term)}
                    className="px-4 py-2 rounded-xl bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-800/80 backdrop-blur-sm transition-all text-sm"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Categorías */}
            <div>
              <h3 className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                <FiTag className="w-4 h-4" />
                <span>Categorías</span>
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => handleSearch(category)}
                    className="px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-800/80 backdrop-blur-sm transition-all text-sm text-left"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {searchResults.length > 0 && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {searchResults.map(book => (
                  <div 
                    key={book.id} 
                    className="p-4 border border-gray-200 rounded-lg shadow-md bg-white dark:bg-gray-800"
                  >
                    <img 
                      src={book.coverUrl || getThumbnailUrl(book.url) || ''} 
                      alt={book.title} 
                      className="w-full h-32 object-cover rounded-md mb-2"
                    />
                    <h3 className="text-lg font-semibold">{book.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{book.author}</p>
                    <button
                      onClick={() => {
                        onSearch(book.url); // Llama a la función para abrir el PDF
                        onClose(); // Cierra el buscador
                      }}
                      className="mt-2 w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                      Leer libro
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
} 