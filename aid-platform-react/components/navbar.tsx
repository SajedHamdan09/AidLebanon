'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()
  const isLoginPage = pathname === '/login'

  return (
    <nav className="border-b bg-background">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <Link href="/" className="font-semibold text-lg mr-6">
          Aid Platform
        </Link>
        
        {!isLoginPage && (
          <>
            <div className="flex-1 flex items-center">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search centers..." className="pl-8" />
              </div>
            </div>
            <div className="ml-auto flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/profile">Profile</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </nav>
  )
}

