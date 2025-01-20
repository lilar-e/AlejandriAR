'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function EditJsonPage() {
  const [jsonContent, setJsonContent] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Verificar autenticación
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/check-auth')
        if (!response.ok) {
          router.push('/login')
          return
        }
        loadJson()
      } catch (err) {
        setError('Authentication check failed')
        setIsLoading(false)
      }
    }
    checkAuth()
  }, [router])

  // Cargar JSON solo si está autenticado
  const loadJson = async () => {
    try {
      const response = await fetch('https://lilar-e.github.io/libraryJSON/data.json')
      if (!response.ok) throw new Error('Failed to fetch JSON')
      const data = await response.text()
      setJsonContent(data)
    } catch (err) {
      setError('Failed to load JSON content')
    } finally {
      setIsLoading(false)
    }
  }

  // Manejar actualización del JSON
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/update-json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: jsonContent }),
      })
      if (!response.ok) throw new Error('Failed to update JSON')
      alert('JSON updated successfully')
    } catch (err) {
      setError('Failed to update JSON')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) return <div className="p-6">Loading...</div>
  if (error) return <div className="p-6 text-red-500">{error}</div>

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Edit JSON</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={jsonContent}
          onChange={(e) => setJsonContent(e.target.value)}
          className="w-full h-64 p-2 border rounded"
        />
        <button 
          type="submit" 
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-blue-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Updating...' : 'Update JSON'}
        </button>
      </form>
    </div>
  )
}
