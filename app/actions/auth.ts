'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { kv } from '@vercel/kv'
import crypto from 'crypto'

export async function login(formData: { password: string }) {
  const { password } = formData
  
  try {
    // Verificar si ya existe una contraseña
    const storedPassword = await kv.get('admin_password')
    
    if (!storedPassword) {
      // Si no existe, establecer la contraseña inicial
      await kv.set('admin_password', password)
    } else if (password !== storedPassword) {
      return { error: 'Contraseña incorrecta' }
    }
    
    // Crear una sesión
    const sessionId = crypto.randomUUID()
    await kv.set(`session:${sessionId}`, true)
    
    cookies().set('session', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60
    })
    
    redirect('/admin')
  } catch (error) {
    console.error('Error al iniciar sesión:', error)
    return { error: 'Error al iniciar sesión' }
  }
}

export async function logout() {
  cookies().delete('session')
  redirect('/')
}