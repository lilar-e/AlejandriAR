'use client'

import { useState, useEffect } from 'react'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { FiSearch, FiMoon, FiSun, FiHeart, FiHome, FiBook, FiX } from 'react-icons/fi'
import { Outfit } from 'next/font/google'
import BookCard from '../components/BookCard'
import SearchBar from '../components/SearchBar'
import PDFViewer from '../components/PDFViewer'

const outfit = Outfit({ subsets: ['latin'] })

const firebaseConfig = {
  apiKey: "AIzaSyAKHyKaRHwox0pqx4oNRHZpEr4hgpGpsLk",
  authDomain: "alejandriar-9d2c6.firebaseapp.com",
  projectId: "alejandriar-9d2c6",
  storageBucket: "alejandriar-9d2c6.firebasestorage.app",
  messagingSenderId: "245662175686",
  appId: "1:245662175686:web:c05e313b7e355d260522c7"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

type Book = {
  id: string
  title: string
  author: string
  url: string
  coverUrl?: string
  category?: string
}

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [showSearch, setShowSearch] = useState(false) 
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState('home')
  const [showPDFViewer, setShowPDFViewer] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [searchResults, setSearchResults] = useState<Book[]>([])

  useEffect(() => {
    const fetchBooks = async () => {
      const querySnapshot = await getDocs(collection(db, 'libros'))
      const booksData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Book))
      setBooks(booksData)
      setIsLoading(false)
    }

    fetchBooks()
  }, [])

  useEffect(() => {
    const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]')
    setRecentSearches(recentSearches)
  }, [])

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  const handleSearch = (query: string) => {
    const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]')
    if (!recentSearches.includes(query)) {
      recentSearches.push(query)
      localStorage.setItem('recentSearches', JSON.stringify(recentSearches))
    }
    
    const results = books.filter(book => 
      book.title.toLowerCase().includes(query.toLowerCase()) || 
      book.author.toLowerCase().includes(query.toLowerCase())
    )
    
    setSearchResults(results)
    setShowSearch(true)
  }

  const handleFavorite = (bookId: string) => {
    const updatedFavorites = favorites.includes(bookId)
      ? favorites.filter(id => id !== bookId)
      : [...favorites, bookId];

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const filteredBooks = books.filter(book => {
    if (selectedCategory) {
      return book.category?.toLowerCase() === selectedCategory.toLowerCase()
    }
    return true
  })

  const displayedBooks = activeTab === 'favorites'
    ? books.filter(book => favorites.includes(book.id)) // Solo mostrar favoritos
    : filteredBooks; // Mostrar todos los libros filtrados

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-slate-50 to-gray-100 text-gray-900'} ${outfit.className}`}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className={`bg-white/70 dark:bg-gray-800 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50`}>
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                AlejandriAR
              </h1>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowSearch(true)}
                  className="p-2 rounded-xl bg-white/50 dark:bg-gray-700 hover:bg-white/80 dark:hover:bg-gray-600 transition-all"
                >
                  <FiSearch className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory(null); // Borrar el filtrado
                  }}
                  className="p-2 rounded-xl bg-white/50 dark:bg-gray-700 hover:bg-white/80 dark:hover:bg-gray-600 transition-all"
                >
                  <FiX className="w-5 h-5" /> 
                </button>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 rounded-xl bg-white/50 dark:bg-gray-700 hover:bg-white/80 dark:hover:bg-gray-600 transition-all"
                >
                  {isDarkMode ? <FiSun className="w-5 h-5 text-gray-600 dark:text-gray-300" /> : <FiMoon className="w-5 h-5 text-gray-600 dark:text-gray-300" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="pt-24 pb-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {displayedBooks.map(book => (
              <BookCard
                key={book.id}
                book={book}
                isFavorite={favorites.includes(book.id)}
                onFavorite={() => handleFavorite(book.id)}
                onClick={() => {
                  setSelectedBook(book);
                  setShowPDFViewer(true);
                }}
              />
            ))}
          </div>

          {/* Mostrar resultados de búsqueda */}
          {searchResults.length > 0 && (
            <div className="mt-4">
              <h2 className="text-lg font-bold">Resultados de búsqueda:</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {searchResults.map(book => (
                  <BookCard
                    key={book.id}
                    book={book}
                    isFavorite={favorites.includes(book.id)}
                    onFavorite={() => handleFavorite(book.id)}
                    onClick={() => {
                      setSelectedBook(book);
                      setShowPDFViewer(true);
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Barra de navegación inferior con glassmorphism */}
      <nav className="fixed bottom-4 left-4 right-4 z-50">
        <div className="max-w-xs mx-auto bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex justify-around p-4">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center gap-1 transition-colors ${
                activeTab === 'home'
                  ? 'text-indigo-500 dark:text-indigo-400'
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              <FiHome className="w-6 h-6" />
              <span className="text-xs font-medium">Inicio</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('favorites'); // Cambia a la pestaña de favoritos
              }}
              className={`flex flex-col items-center gap-1 transition-colors ${
                activeTab === 'favorites'
                  ? 'text-indigo-500 dark:text-indigo-400'
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              <FiHeart className="w-6 h-6" />
              <span className="text-xs font-medium">Favoritos</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Modal de búsqueda */}
      {showSearch && (
        <SearchBar
          onClose={() => setShowSearch(false)}
          onSearch={handleSearch}
          searchResults={searchResults}
        />
      )}

      {showPDFViewer && selectedBook && (
        <PDFViewer
          url={selectedBook.url}
          onClose={() => setShowPDFViewer(false)}
          title={selectedBook.title}
        />
      )}
    </div>
  )
}
