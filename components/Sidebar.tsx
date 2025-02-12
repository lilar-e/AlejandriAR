import { FiX, FiHome, FiHeart, FiBookmark, FiFolder } from 'react-icons/fi'

type SidebarProps = {
  isOpen: boolean
  onClose: () => void
  selectedCategory: string
  onSelectCategory: (category: string) => void
  categories: string[]
}

export default function Sidebar({
  isOpen,
  onClose,
  selectedCategory,
  onSelectCategory,
  categories
}: SidebarProps) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 transform transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="px-4 py-6 border-b dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent">
                AlejandriAR
              </h1>
              <button
                onClick={onClose}
                className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 dark:text-gray-400"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Biblioteca
            </h2>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            <button
              onClick={() => onSelectCategory('all')}
              className={`w-full flex items-center px-4 py-2 rounded-md ${
                selectedCategory === 'all'
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-200'
                  : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <FiHome className="mr-3 h-5 w-5" />
              <span>Todos</span>
            </button>

            <button
              onClick={() => onSelectCategory('favorites')}
              className={`w-full flex items-center px-4 py-2 rounded-md ${
                selectedCategory === 'favorites'
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-200'
                  : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <FiHeart className="mr-3 h-5 w-5" />
              <span>Favoritos</span>
            </button>

            <div className="pt-4">
              <p className="px-4 text-sm font-medium text-gray-400 uppercase">
                Categorías
              </p>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => onSelectCategory(category)}
                  className={`w-full flex items-center px-4 py-2 mt-1 rounded-md ${
                    selectedCategory === category
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-200'
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <FiFolder className="mr-3 h-5 w-5" />
                  <span>{category}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </>
  )
} 