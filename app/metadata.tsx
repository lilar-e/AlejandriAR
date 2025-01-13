import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AlejandriAR - Materiales Educativos Esenciales',
  description: 'Accede a materiales educativos como Educación Sexual Integral, guías de enfermería, primeros auxilios, y más.',
  keywords: [
    'Educación Sexual Integral',
    'ESI',
    'Materiales educativos',
    'Enfermería',
    'Primeros Auxilios',
    'PDF educativos',
    'AlejandriAR',
    'LGBT',
    'Ayuda LGBT',
    'GUIA TRANS',
    'Adolescencia trans',
    'Adolescencia lgbt',
    'Recursos y ayuda para LGBT',
    'Recursos para enfermeria',
    'Salud mental',
    'Psiquatria',
    'Como detectar un abuso sexual',
  ],
  authors: [{ name: 'AlejandriAR', url: 'https://alejandriar.vercel.app/' }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'AlejandriAR - Biblioteca de archivos PDF de la Universidad, ESI, Enfermería, Primeros Auxilios, y mucho más.',
    description: 'Encuentra recursos clave como Educación Sexual Integral, guías de enfermería y mucho más información',
    url: 'https://alejandriar.vercel.app/',
    images: [
      {
        url: 'https://tu-dominio.com/imagen-relevante.jpg',
        alt: 'Vista previa de AlejandriAR',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AlejandriAR - Materiales Educativos Esenciales',
    description: 'Descubre materiales educativos importantes como guías de ESI y enfermería en AlejandriAR.',
    images: ['https://tu-dominio.com/imagen-relevante.jpg'],
  },
};