import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

const secretKey = process.env.SECRET_KEY

if (!secretKey) {
  throw new Error("SECRET_KEY is not defined")
}

export async function POST(request: Request) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ success: false, error: "Token no proporcionado" }, { status: 400 })
    }

    try {
      const decodedToken = jwt.verify(token, secretKey)
      return NextResponse.json({ success: true, user: decodedToken })
    } catch (error) {
      console.error("Error al verificar el token:", error)
      return NextResponse.json({ success: false, error: "Token inválido" }, { status: 401 })
    }
  } catch (error) {
    console.error("Error en la ruta de verificación de token:", error)
    return NextResponse.json({ success: false, error: "Error interno del servidor" }, { status: 500 })
  }
}

