'use client'

import { useState } from 'react'
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

const centers = [
  { id: 1, name: 'Center 1', logo: '/placeholder.svg?height=50&width=50' },
  { id: 2, name: 'Center 2', logo: '/placeholder.svg?height=50&width=50' },
  { id: 3, name: 'Center 3', logo: '/placeholder.svg?height=50&width=50' },
  { id: 4, name: 'Center 4', logo: '/placeholder.svg?height=50&width=50' },
]

export default function Donate() {
  const [selectedCenter, setSelectedCenter] = useState<number | null>(null)
  const { toast } = useToast()

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
            {centers.map((center) => (
              <Card 
                key={center.id}
                className={`cursor-pointer transition-colors ${
                  selectedCenter === center.id ? 'border-primary' : ''
                }`}
                onClick={() => setSelectedCenter(center.id)}
              >
                <CardContent className="flex items-center gap-4 p-4">
                  <img
                    src={center.logo}
                    alt={`${center.name} logo`}
                    className="w-12 h-12 rounded-full"
                  />
                  <span className="font-medium">{center.name}</span>
                </CardContent>
              </Card>
            ))}
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

