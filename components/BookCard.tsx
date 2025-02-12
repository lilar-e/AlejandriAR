import { FiHeart, FiBookOpen } from 'react-icons/fi'
import Image from 'next/image'

type BookCardProps = {
  book: {
    id: string
    title: string
    author: string
    url: string
    category: string
    coverUrl?: string
  }
  isFavorite: boolean
  onFavorite: () => void
  onClick: (url: string) => void
}

export default function BookCard({ book, isFavorite, onFavorite, onClick }: BookCardProps) {
  // Función para generar una miniatura del PDF usando la API de Google Drive
  const getThumbnailUrl = (url: string) => {
    const fileId = url.match(/[-\w]{25,}(?!.*[-\w]{25,})/)?.[0]
    return fileId ? `https://drive.google.com/thumbnail?id=${fileId}&sz=w400` : null
  }

  const getDownloadUrl = (url: string) => {
    const fileIdMatch = url.match(/\/d\/([^/]+)/);
    const fileId = fileIdMatch ? fileIdMatch[1] : null;
    return fileId ? `https://drive.google.com/uc?export=view&id=${fileId}` : null;
  }

  return (
    <div className="relative group animate-fadeIn">
      <div 
        onClick={() => onClick(getDownloadUrl(book.url))}
        className="aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white dark:bg-gray-800"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 dark:from-black/10 dark:to-black/5 backdrop-blur-sm group-hover:backdrop-blur-md transition-all duration-300" />
        
        {/* Portada */}
        <div className="absolute inset-0">
          {book.coverUrl || getThumbnailUrl(book.url) ? (
            <Image
              src={book.coverUrl || getThumbnailUrl(book.url)}
              alt={book.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          ) : (
            <div 
              className="w-full h-full bg-gradient-to-br"
              style={{ 
                backgroundImage: `linear-gradient(135deg, ${generatePastelColor()}, ${generatePastelColor()})` 
              }}
            />
          )}
        </div>

        {/* Overlay con glassmorphism */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-50 group-hover:opacity-70 transition-all duration-300" />

        {/* Contenido */}
        <div className="relative h-full p-4 flex flex-col justify-between">
          <div className="flex justify-end">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onFavorite();
              }}
              className="p-2 rounded-xl bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 active:scale-95 z-10"
            >
              <FiHeart 
                className={`w-4 h-4 transition-colors ${
                  isFavorite ? 'text-pink-500 fill-pink-500' : 'text-white'
                }`}
              />
            </button>
          </div>

          <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <div className="space-y-1">
              <h2 className="text-base font-medium text-white line-clamp-2">
                {book.title}
              </h2>
              <p className="text-sm text-white/70">{book.author}</p>
              <span className="inline-block px-2 py-1 text-xs rounded-full bg-white/20 text-white/90">
                {book.category}
              </span>
            </div>
          </div>
        </div>

        {/* Botón de lectura con glassmorphism */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-0">
          <span className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 backdrop-blur-md">
            <FiBookOpen className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">Leer ahora</span>
          </span>
        </div>
      </div>
    </div>
  )
}

function generatePastelColor() {
  const hue = Math.floor(Math.random() * 360)
  return `hsl(${hue}, 70%, 85%)`
} 