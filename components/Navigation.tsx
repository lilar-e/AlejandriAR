'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="mb-6">
      <ul className="flex space-x-4">
        <li>
          <Link href="/" className={`text-blue-600 hover:text-blue-800 ${pathname === '/' ? 'font-bold' : ''}`}>
            Inicio
          </Link>
        </li>
        <li>
          <Link href="/colaborar" className={`text-blue-600 hover:text-blue-800 ${pathname === '/colaborar' ? 'font-bold' : ''}`}>
            Colaborar
          </Link>
        </li>
      </ul>
    </nav>
  )
}

