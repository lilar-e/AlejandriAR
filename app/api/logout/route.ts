import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
    // Eliminar la cookie de sesión
    cookies().delete('session');

    // Redirigir al usuario a la página de inicio de sesión
    return NextResponse.redirect('/');
}