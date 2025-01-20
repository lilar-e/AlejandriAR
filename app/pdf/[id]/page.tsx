import { getPdfs } from "@/lib/getPdfs"

interface Params {
  id: string
}

interface PDF {
  url: string
  name: string
  category: string
}

export async function generateStaticParams(): Promise<Params[]> {
  const pdfs: PDF[] = await getPdfs()
  return pdfs.map((pdf) => ({
    id: pdf.name,
  }))
}

export default function PDFPage({ params }: { params: Params }) {
  // ... rest of the component
}

