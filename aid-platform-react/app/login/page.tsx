'use client'

import { useState } from 'react'
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
  const { toast } = useToast()

  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Login Attempted",
      description: "This would connect to your authentication service",
    })
  }

  const handleCenterLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Center Registration Submitted",
      description: "Your application will be reviewed by an admin",
    })
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
                  <Label htmlFor="user-email">Email</Label>
                  <Input id="user-email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-password">Password</Label>
                  <Input id="user-password" type="password" required />
                </div>
                <Link href="/reset-password" className="text-sm text-blue-500 hover:underline">Forgot Password?</Link>
                <Button type="submit" className="w-full">Login</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="center">
          <Card>
            <CardHeader>
              <CardTitle>Center Registration</CardTitle>
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
                      {isUploading ? "Uploading..." : "Upload PDF"}
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

