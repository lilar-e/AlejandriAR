'use client'

import { Montserrat } from 'next/font/google'
import PDFList from '@/components/PDFList'
import PDFViewer from '@/components/PDFViewer'
import { Suspense } from 'react'
import { useState, useEffect } from 'react'
import Loading from '@/components/Loading'


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
    category: 'ESI',
    url: 'https://drive.google.com/file/d/1LH7fCb5N54uZ4Re84FNaIKKVe8jKcbw4/view'
  },
  {
    id: 4,
    name: 'El principe feliz y otros cuentos',
    category: 'cuentos',
    url: 'https://drive.google.com/file/d/1SX8AS34dYCk9gwL_Y_ec80ePzjcSVko-/view?usp=drive_link'
  },
  {
    id: 5,
    name: 'La ratita presumida', 
    category: 'cuentos',
    url: 'https://drive.google.com/file/d/1pMppKodoqPLm27FCz38NpmfaocKP7L0e/view?usp=sharing'
  },
  {
    id: 6,
    name: "Cisexismo BA Vacunate 2023",
    category: 'LGBTIQ+',
    url: 'https://drive.google.com/file/d/1eCIhqLS_31UsRYsFJyl25GNaiqpxqjU0/view?usp=drive_link',
  },
  {
    id: 7,
    name: "Cisexismo informacion epidemiologica y salud",
    category: 'LGBTIQ+',
    url: 'https://drive.google.com/file/d/1dGL-LiMliPjh8OCyaM3Pxas6UwES6htH/view?usp=drive_link',
  },
  {
    id: 8,
    name: "Atencion Integral de la Salud de Ninxs y Adolescentes-Trans",
    category: 'LGBTIQ+',
    url: 'https://drive.google.com/file/d/1aucWgAdoxpoJJ90QTfLcGTitu8CCAC-Y/view?usp=drive_link',
  },
  {
    id: 9,
    name: "Guia Salud y Diversidad Sexual.pdf",
    category: 'LGBTIQ+',
    url: 'https://drive.google.com/file/d/1O7fDI0L_6jV29JrU8TFL0MTU9ORjgXRs/view?usp=drive_link',
  },
  {
    id: 10,
    name: "Masculinidades y salud",
    category: 'LGBTIQ+',
    url: 'https://drive.google.com/file/d/1Aj36lZnnBh-nITF8KwRjrgPErVvAQFeK/view?usp=drive_link',
  },
  {
    id: 11,
    name: "Relevamiento-de-espacios-que-acompanan-nineces-y-adolescencias-trans-travestis-nobinarias",
    category: 'LGBTIQ+',
    url: 'https://drive.google.com/file/d/1UWF7ynOp1qZNXhlkpW_NYs4odhLCmc6d/view?usp=drive_link',
  },
  {
    id: 12,
    name: "Estrategias de trabajadoras sexuales contra VIH, SIDA, ITS",
    category: 'ESI',
    url: 'https://drive.google.com/file/d/1vZ-wJSqpnmwKmIlT3ed1DXM_zAAM3SGo/view?usp=drive_link',
  },
  {
    id: 13,
    name: "Guía de abordaje integral ante violencia sexual contra niñeces y adolescencias",
    category: 'ESI',
    url: 'https://drive.google.com/file/d/1y81MenS_DyQXoHtmI0wdFACxAMPhJQkj/view?usp=drive_link'
  },
  {
    id: 14,
    name: "FORMACIÓN EN DETECCIÓN Y ABORDAJE DEL ABUSO SEXUAL Y EL EMBARAZO FORZADO EN LA NIÑEZ Y ADOLESCENCIA",
    category: 'ESI',
    url: 'https://drive.google.com/file/d/1BDAZilQ-__M0ROSwDMu7zTsK12m_gRD6/view?usp=drive_link'
  },
  {
    id: 15,
    name: "Salud mental es cosa de todas y todos",
    category: 'salud mental',
    url: 'https://drive.google.com/file/d/1paemHEMfhnO449zRZgu8ktAvsDFeHcce/view?usp=drive_link'
  },
  {
    id: 16,
    name: "Enf. Psquiatrica y salud mental",
    category: 'salud mental',
    url: 'https://drive.google.com/file/d/1lqmkE-Jk8rqoalIQrsFWDBh13MFT21cL/view?usp=drive_link'
  },
  {
    id: 17,
    name: "Lineamietos para la atencion de la urgencia en salud mental",
    category: 'salud mental',
    url: 'https://drive.google.com/file/d/1Wh9pzAdftd7-gsNASLg2Lnpg9b-V3-i0/view?usp=drive_link'
  },
  {
    id: 18,
    name: "Cuidados de enfermeria en salud mental",
    category: 'salud mental',
    url: 'https://drive.google.com/file/d/1AP_P8-XKqhNTsEnS4TVbbyXt3C7cGtmk/view?usp=drive_link'
  },
  {
    id: 19,
    name: "Guia de tratamientos hormonales para personas trans",
    category: 'ESI',
    url: 'https://drive.google.com/file/d/1krhKmc8KQpEXCx0fOLjA8PpWD5vB05zE/view?usp=drive_link'
  },
  { 
    id: 20, 
    name: "Modelos pedagógicos y formación de profesionales en el área de la salud.pdf", 
    category: 'salud', 
    url: 'https://drive.google.com/file/d/1F5mlkfMHBAZgh8HLjXk5BkaOPQRfwDx8/view?usp=drive_link' 
    }, 
    { 
    id: 21, 
    name: "deROBERTIS Biolog�a celular y molecular.pdf", 
    category: 'enfermeria', 
    url: 'https://drive.google.com/file/d/1DPndpAmetKmxkAxQwjC64EQ8FPitmpkS/view?usp=sharing' 
    }, 
    { 
    id: 22, 
    name: "El papel mediador del docente 2020.pdf", 
    category: 'docencia', 
    url: 'https://drive.google.com/file/d/1Z42snhhkTHp0aGSnFGJSVoOGrVPtM3m_/view?usp=drive_link' 
    },
    { 
    id: 23, 
    name: "FUNCIONES DE LOS HOSPITALES .pdf", 
    category: 'sociologia', 
    url: 'https://drive.google.com/file/d/1RAC6XOM_rkwvORg18CxrP8-tM77fSTuy/view?usp=drive_link' 
    }, 
    { 
    id: 24, 
    name: "Paper Metacognicion 2020.pdf", 
    category: 'https://drive.google.com/file/d/1nzrX5v65mPen_x5yMfv4ddHfv73hRjgr/view?usp=drive_link', 
    url: 'enfermeria' 
    }, 
    { 
    id: 25, 
    name: "Paulo Freire - Pedagogia de la esperanza_ un reencuentro con la pedagog�a del oprimido-Siglo XXI (2014).pdf", 
    category: 'enfermeria', 
    url: 'https://drive.google.com/file/d/1wqPYNDD6sSZT_hyO8TxZuES5GHJFvIuz/view?usp=drive_link' 
    }, 
    { 
    id: 26, 
    name: "Perfilando una alternativa.pdf", 
    category: 'sociologia', 
    url: 'https://drive.google.com/file/d/1zPiH1EDx-kESGrQu0J_KepzlkyaYyUe1/view?usp=drive_link' 
    }, 
    { 
    id: 27, 
    name: "Perspectivas cl�sicas y contempor�neas sobre la estratificaci�n social  Aportes de an�lisis de clase y de la perspectiva de las elites para el estudio de los estratos superiores.pdf", 
    category: 'sociologia', 
    url: 'https://drive.google.com/file/d/1bB0mEAyQtkDNc_TMxvvomz4NYOfVV1nf/view?usp=drive_link' 
    }, 
    { 
    id: 28, 
    name: "Reflexion del papel de la enfermeria a lo largo de la historia..pdf", 
    category: 'enfermeria', 
    url: 'https://drive.google.com/file/d/1DPndpAmetKmxkAxQwjC64EQ8FPitmpkS/view?usp=sharing' 
    }, 
]

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // 3 seconds minimum loading time

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h1 className={`${montserrat.className} text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400`}>
            Alejandria<span className="text-blue-600">R</span>
          </h1>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/4 mb-6 md:mb-0 md:mr-6">
              <p className='subtitulo'>Agradecimientos a todos aquell@s qué contribuyen a compartir archivos PDF <br /> Algunos archivos no tienen vista previa, pero puede verlo en la ventana emergente</p>
              <br />
              <br />
              <strong className='text-xs'><span className='uppercase'>⚠️ ACTUALIZAMOS PERIODICAMENTE DISCULPAS</span>
              <br /><span className='uppercase'>⚠️ Mejor rendimiento desde computadoras</span>
              <br /><a href="https://drive.google.com/file/d/1K8IQtpAnl_ph_LGur1QSqXRpgPRHM5ZD/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className='uppercase linkAyuda'>❗ ¿Quieres colaborar, mira esta guia!</a></strong>
              <br />
              <br />
              <p className='ultimaActualizacion'> Ultima actualización : 10:12am 13/01/2025</p>
              <br />
              <PDFList pdfFiles={pdfFiles} />
            </div>
            <div className="w-full md:w-3/4">
              <PDFViewer />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
