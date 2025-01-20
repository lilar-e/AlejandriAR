import { getPdfs } from '@/lib/getPdfs';

export async function generateStaticParams() {
  const pdfs = await getPdfs();
  return pdfs.map((pdf: any) => ({
    id: pdf.id.toString(),
  }));
}

async function PdfPage({ params }: any) {
  const pdfs = await getPdfs();
  const pdf = pdfs.find((p: any) => p.id.toString() === params.id);
  // ... rest of PdfPage component ...
}

//Example usage (Illustrative):
async function test(){
    const params = {id: "123"};
    const pdfs = await getPdfs();
    console.log(pdfs);
    const pdfPageResult = await PdfPage({params});
    console.log(pdfPageResult);
}

test();

