'use client'

import { useSearchParams } from 'next/navigation'

export default function PDFViewer() {
  const searchParams = useSearchParams()
  const fileId = searchParams.get('fileId')

  if (!fileId) {
    return (
      <div className="h-full flex items-center justify-center bg-white rounded-lg shadow-lg">
        <p className="text-gray-500">Selecciona un PDF para visualizar</p>
      </div>
    )
  }

  return (
    <div className="h-full bg-white rounded-lg shadow-lg overflow-hidden">
      <iframe
        src={`https://drive.google.com/file/d/${fileId}/preview`}
        className="w-full h-full min-h-[calc(100vh-3rem)]"
        allow="autoplay"
      />
    </div>
  )
}

