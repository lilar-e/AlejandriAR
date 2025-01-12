import { Montserrat } from 'next/font/google'
import PDFList from '@/components/PDFList'
import PDFViewer from '@/components/PDFViewer'

const montserrat = Montserrat({ subsets: ['latin'] })

const pdfFiles = [
  {
    id: 1,
    name: 'NANDA 2021-2023',
    category: 'enfermeria',
    url: 'https://drive.google.com/file/d/1sNpMm71VOjM3_z9CtZxjEhKP4h4FZvvD/view'
  },
  {
    id: 2,
    name: 'Primeros Auxilios',
    category: 'enfermeria',
    url: 'https://drive.google.com/file/d/1fOdEeACX_1Jvk1wHayvwr85ZsHA1gMZc/view'
  },
  {
    id: 3,
    name: 'Salud sexual y reproductiva',
    category: 'esi',
    url: 'https://drive.google.com/file/d/1LH7fCb5N54uZ4Re84FNaIKKVe8jKcbw4/view'
  }
]

export default function Home() {
  return (
    <main className="flex min-h-screen bg-gray-100">
      <div className="w-1/4 p-6 bg-white shadow-lg min-h-screen">
        <h1 className={`${montserrat.className} text-4xl font-bold mb-6 text-gray-800`}>
          Alejandri<span className='gradient-text'>AR</span>
        </h1>
        <PDFList pdfFiles={pdfFiles} />
      </div>
      <div className="w-3/4 p-6">
        <PDFViewer />
      </div>
    </main>
)}

