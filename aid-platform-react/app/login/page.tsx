'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/components/ui/use-toast'
import { UploadIcon as FileUpload } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const [isUploading, setIsUploading] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null) // State to track login errors
  const { toast } = useToast()
  const router = useRouter()

  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    const username = (document.getElementById('username') as HTMLInputElement).value
    const password = (document.getElementById('user-password') as HTMLInputElement).value

    try {
      const response = await fetch('http://localhost:8080/user/all')
      if (!response.ok) throw new Error('Failed to fetch user data')

      const users = await response.json()
      const user = users.find(
        (u: any) => u.name === username && u.password === password
      )

      if (user) {
        toast({
          title: 'Login Successful',
          description: `Welcome, ${user.name}`,
          variant: 'default',
        })
        setLoginError(null) // Clear any previous error
        router.push('/') // Redirect to the main page
      } else {
        setLoginError('Invalid username or password. Please try again.') // Set the error message
      }
    } catch (error) {
      setLoginError('An error occurred while processing your login. Please try again.')
      console.error(error)
    }
  }

  const handleCenterLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    const email = (document.getElementById('center-email') as HTMLInputElement).value
    const centerName = (document.getElementById('center-name') as HTMLInputElement).value
    const password = (document.getElementById('center-password') as HTMLInputElement).value

    try {
      const response = await fetch('http://localhost:8080/aidcenter/all')
      if (!response.ok) throw new Error('Failed to fetch aid center data')

      const centers = await response.json()
      const center = centers.find(
        (c: any) =>
          c.contactInfo === email &&
          c.name === centerName &&
          c.password === password
      )

      if (center) {
        toast({
          title: 'Login Successful',
          description: `Welcome, ${center.name}`,
          variant: 'default',
        })
        setLoginError(null) // Clear any previous error
        router.push('/') // Redirect to the main page
      } else {
        setLoginError('Invalid email, center name, or password. Please try again.') // Set the error message
      }
    } catch (error) {
      setLoginError('An error occurred while processing your login. Please try again.')
      console.error(error)
    }
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <Tabs defaultValue="user" className="w-full max-w-4xl">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="user">Login as a User</TabsTrigger>
          <TabsTrigger value="center">Login as a Center</TabsTrigger>
        </TabsList>
        <TabsContent value="user">
          <Card>
            <CardHeader>
              <CardTitle>User Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUserLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-password">Password</Label>
                  <Input id="user-password" type="password" required />
                </div>
                {loginError && ( // Render error message if `loginError` is set
                  <p className="text-sm text-red-500">{loginError}</p>
                )}
                <Link href="/reset-password" className="text-sm text-blue-500 hover:underline">Forgot Password?</Link>
                <Button type="submit" className="w-full">Login</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="center">
          <Card>
            <CardHeader>
              <CardTitle>Center Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCenterLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="center-email">Email</Label>
                  <Input id="center-email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="center-name">Center Name</Label>
                  <Input id="center-name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="center-password">Password</Label>
                  <Input id="center-password" type="password" required />
                </div>
                {loginError && ( // Render error message if `loginError` is set
                  <p className="text-sm text-red-500">{loginError}</p>
                )}
                <div className="space-y-2">
                  <Label htmlFor="collaborators">Center's Collaborator Emails</Label>
                  <Input id="collaborators" placeholder="Enter emails separated by commas" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="license">Upload License (PDF)</Label>
                  <div className="flex items-center gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      disabled={isUploading}
                      onClick={() => {
                        setIsUploading(true)
                        setTimeout(() => setIsUploading(false), 2000)
                      }}
                    >
                      <FileUpload className="w-4 h-4 mr-2" />
                      {isUploading ? 'Uploading...' : 'Upload PDF'}
                    </Button>
                  </div>
                </div>
                <div className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
                  Your registration will be reviewed by an admin. You will receive an email once approved.
                </div>
                <Link href="/reset-password" className="text-sm text-blue-500 hover:underline">Forgot Password?</Link>
                <Button type="submit" className="w-full">Submit Registration</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
