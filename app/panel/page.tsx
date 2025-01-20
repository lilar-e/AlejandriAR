"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/use-toast"

interface PDF {
  url: string
  name: string
  category: string
}

export default function AdminPage() {
  const router = useRouter()
  const [url, setUrl] = useState("")
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [categories, setCategories] = useState<string[]>([])
  const [isPending, setIsPending] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token")
      if (!token) {
        console.log("No token found, redirecting to login")
        router.push("/login")
        return
      }

      try {
        const response = await fetch("/api/verify-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ token }),
        })

        if (!response.ok) {
          throw new Error("Token verification failed")
        }

        const data = await response.json()
        if (!data.success) {
          throw new Error(data.error || "Token inválido")
        }

        console.log("Token verified successfully")
      } catch (error) {
        console.error("Error al verificar el token:", error)
        localStorage.removeItem("token")
        router.push("/login")
      }
    }

    verifyToken()
  }, [router])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://lilar-e.github.io/libraryJSON/data.json")
        if (!response.ok) {
          throw new Error("Failed to fetch data")
        }
        const data: PDF[] = await response.json()
        const uniqueCategories = Array.from(new Set(data.map((item) => item.category)))
        setCategories(uniqueCategories)
      } catch (error) {
        console.error("Error fetching categories:", error)
        toast({
          title: "Error",
          description: "No se pudieron cargar las categorías",
          variant: "destructive",
        })
      }
    }

    fetchCategories()
  }, [toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsPending(true)

    try {
      const response = await fetch("https://lilar-e.github.io/libraryJSON/data.json")
      const currentData = await response.json()
      console.log("Datos actuales:", currentData)
      // Aquí puedes agregar la lógica para actualizar los datos
      toast({
        title: "Éxito",
        description: "Datos obtenidos correctamente",
      })
    } catch (error) {
      console.error("Error al obtener los datos:", error)
      toast({
        title: "Error",
        description: "No se pudieron obtener los datos actuales",
        variant: "destructive",
      })
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Administración</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input type="text" placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)} required />
              <Input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} required />
              <Select value={category} onValueChange={(value) => setCategory(value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Guardando..." : "Guardar"}
            </Button>
          </form>
          <Button
            onClick={() => {
              localStorage.removeItem("token")
              router.push("/login")
            }}
            className="w-full mt-4"
          >
            Cerrar Sesión
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

