"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// Helper function to generate a random string
function generateRandomString(length: number) {
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("")
}

export async function login(formData: { password: string }) {
  const { password } = formData

  try {
    const storedPassword = process.env.ADMIN_PASSWORD

    if (password !== storedPassword) {
      return { error: "Contraseña incorrecta" }
    }

    const sessionId = generateRandomString(32)
    cookies().set("session", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60,
    })

    redirect("/admin")
  } catch (error) {
    console.error("Error al iniciar sesión:", error)
    return { error: "Error al iniciar sesión" }
  }
}

export async function logout() {
  cookies().delete("session")
  redirect("/")
}

export async function checkAuth() {
  const session = cookies().get("session")
  return !!session
}

