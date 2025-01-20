import { NextResponse } from "next/server"
import { ADMIN_PASSWORD } from "@/lib/config"
import jwt from "jsonwebtoken"

const secretKey = process.env.SECRET_KEY

if (!secretKey) {
  throw new Error("SECRET_KEY is not defined")
}

export async function POST(request: Request) {
  try {
    console.log("Solicitud recibida")
    const { password } = await request.json()
    console.log("Contraseña recibida:", password)

    if (!password) {
      console.log("Contraseña no proporcionada")
      return NextResponse.json({ success: false, error: "Contraseña no proporcionada" }, { status: 400 })
    }

    if (password === ADMIN_PASSWORD) {
      console.log("Contraseña correcta")
      const token = jwt.sign({ role: "admin" }, secretKey, { expiresIn: "1h" })
      return NextResponse.json({ success: true, token })
    } else {
      console.log("Contraseña incorrecta")
      return NextResponse.json({ success: false, error: "Contraseña incorrecta" }, { status: 401 })
    }
  } catch (error) {
    console.error("Error al procesar la solicitud de login:", error)
    return NextResponse.json({ success: false, error: `Error interno del servidor: ${error.message}` }, { status: 500 })
  }
}

