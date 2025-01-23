'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<'guest' | 'user' | 'admin' | 'aidCenter'>('guest')
  const router = useRouter()

  const handleLogin = () => {
    setIsLoggedIn(true)
    setUserRole('user') // This would normally be set based on the user's actual role
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserRole('guest')
    router.push('/')
  }

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">Aid Platform</Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/search">Search</Link></li>
            {isLoggedIn ? (
              <>
                <li><Link href="/profile">Profile</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </>
            ) : (
              <>
                <li><Link href="/login">Login</Link></li>
                <li><Link href="/register">Register</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

