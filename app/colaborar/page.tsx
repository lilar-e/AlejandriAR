'use client'

import { Montserrat } from 'next/font/google'
import CollaborateForm from '@/components/CollaborateForm'
import Loading from '@/components/Loading'
import { useState, useEffect } from 'react'

const montserrat = Montserrat({ subsets: ['latin'] })

export default function Collaborate() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800) // 3 seconds minimum loading time

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h1 className={`${montserrat.className} text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400`}>
            Colaborar
          </h1>
          <p className="mb-6 text-gray-600">
            ¿Tienes algún recurso que quieras compartir? ¡Nos encantaría saber de ti! Completa el formulario a continuación para enviarnos un correo electrónico. <br />
            <strong className='text-center'>¡No almacenamos ningun archivo PDF, Solo compartimos enlaces!</strong>
          </p>
          <CollaborateForm />
        </>
      )}
    </div>
  )
}

