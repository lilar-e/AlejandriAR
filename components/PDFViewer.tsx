'use client'

import { useSearchParams } from 'next/navigation'

export default function PDFViewer() {
  const searchParams = useSearchParams()
  const fileId = searchParams.get('fileId')

  if (!fileId) {
    return (
      <div className="h-[calc(100vh-200px)] sm:h-[calc(100vh-250px)] flex items-center justify-center bg-white rounded-lg shadow-lg">
        <p className="text-gray-500 text-sm sm:text-base">Selecciona un PDF para visualizar</p>
      </div>
    )
  }

  return (
    <div className="h-[calc(100vh-200px)] sm:h-[calc(100vh-250px)] bg-white rounded-lg shadow-lg overflow-hidden">
      <iframe
        src={`https://drive.google.com/file/d/${fileId}/preview`}
        className="w-full h-full"
        allow="autoplay"
      />
    </div>
  )
}

