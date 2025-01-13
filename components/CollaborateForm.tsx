'use client'

import { useState } from 'react'

export default function CollaborateForm() {
  const [status, setStatus] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch('https://formspree.io/f/mannvjad', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json'
        }
      })

      if (response.ok) {
        setStatus('¡Gracias por tu mensaje! Te responderemos pronto.')
        form.reset()
      } else {
        setStatus('Oops! Hubo un problema al enviar el formulario. Por favor, inténtalo de nuevo.')
      }
    } catch (error) {
      setStatus('Oops! Hubo un problema al enviar el formulario. Por favor, inténtalo de nuevo.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-2 font-medium text-gray-700">Nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="email" className="block mb-2 font-medium text-gray-700">Correo Electrónico</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="message" className="block mb-2 font-medium text-gray-700">Mensaje</label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Enviar
      </button>
      {status && <p className="mt-4 text-center text-green-600">{status}</p>}
    </form>
  )
}

