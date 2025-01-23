'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'

export default function ResetPassword() {
  const [email, setEmail] = useState('')
  const { toast } = useToast()

  const handleResetPassword = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8080/api/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
        }),
      })

      const contentType = response.headers.get('Content-Type') || ''
      const isJson = contentType.includes('application/json')
      const data = isJson ? await response.json() : { message: await response.text() }

      if (response.ok) {
        toast({
          title: 'Success!',
          description: data.message || 'A reset link has been sent to your email address.',
        })
      } else {
        toast({
          title: 'Error',
          description: data.message || 'Failed to send the reset email. Please try again.',
        })
      }
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again later.',
      })
    }
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Reset Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}