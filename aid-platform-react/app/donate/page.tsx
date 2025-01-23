'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useToast } from '@/components/ui/use-toast'

interface Center {
  centerId: number
  name: string
  location: string
  contactInfo: string
}

export default function Donate() {
  const [centers, setCenters] = useState<Center[]>([])
  const [selectedCenter, setSelectedCenter] = useState<number | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Fetch aid centers from API
    fetch('http://localhost:8080/aidcenter/all')
      .then((response) => response.json())
      .then((data) => {
        setCenters(data)
      })
      .catch((error) => {
        console.error('Error fetching aid centers:', error)
        toast({
          title: 'Error',
          description: 'Failed to load aid centers.',
          variant: 'destructive',
        })
      })
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Donation Submitted",
      description: "Thank you for your donation!",
    })
  }

  return (
    <div className="container mx-auto py-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Select a Center</h2>
          <div className="grid gap-4">
            {centers.length > 0 ? (
              centers.map((center) => (
                <Card
                  key={center.centerId}
                  className={`cursor-pointer transition-colors ${
                    selectedCenter === center.centerId ? 'border-primary' : ''
                  }`}
                  onClick={() => setSelectedCenter(center.centerId)}
                >
                  <CardContent className="flex items-center gap-4 p-4">
                    <img
                      src="/placeholder.svg?height=50&width=50"
                      alt={`${center.name} logo`}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <span className="font-medium">{center.name}</span>
                      <p className="text-sm text-gray-500">{center.location}</p>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-gray-500">Loading centers...</p>
            )}
          </div>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="donation-type">Type of Donation</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select donation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="money">Money</SelectItem>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="clothes">Clothes</SelectItem>
                      <SelectItem value="other">Other Products</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Preferred Contact Method</Label>
                  <RadioGroup defaultValue="email">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="email" id="email" />
                      <Label htmlFor="email">Email</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="phone" id="phone" />
                      <Label htmlFor="phone">Phone</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Information</Label>
                  <Input id="contact" placeholder="Enter email or phone number" />
                </div>

                <Button type="submit" className="w-full">
                  Submit Donation
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
