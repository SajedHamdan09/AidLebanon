'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HandHeart, Search } from 'lucide-react'

const volunteers = [
  { id: 1, name: "Alice Johnson", avatar: "/placeholder.svg?height=50&width=50", hours: 120, skills: ["Medical", "Counseling"], status: "Active" },
  { id: 2, name: "Bob Smith", avatar: "/placeholder.svg?height=50&width=50", hours: 85, skills: ["Logistics", "Driving"], status: "Active" },
  { id: 3, name: "Carol Williams", avatar: "/placeholder.svg?height=50&width=50", hours: 200, skills: ["Teaching", "Childcare"], status: "On Leave" },
  { id: 4, name: "David Brown", avatar: "/placeholder.svg?height=50&width=50", hours: 150, skills: ["Construction", "Plumbing"], status: "Active" },
  { id: 5, name: "Eva Martinez", avatar: "/placeholder.svg?height=50&width=50", hours: 95, skills: ["Translation", "Administration"], status: "Active" },
]

export default function ActiveVolunteers() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterSkill, setFilterSkill] = useState("All")

  const filteredVolunteers = volunteers.filter(volunteer => 
    volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterSkill === "All" || volunteer.skills.includes(filterSkill))
  )

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <HandHeart className="h-6 w-6" />
            Active Volunteers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Label htmlFor="search">Search Volunteers</Label>
              <div className="relative">
                <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by name..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full md:w-[200px]">
              <Label htmlFor="skill-filter">Filter by Skill</Label>
              <Select value={filterSkill} onValueChange={setFilterSkill}>
                <SelectTrigger id="skill-filter">
                  <SelectValue placeholder="Select skill" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Skills</SelectItem>
                  <SelectItem value="Medical">Medical</SelectItem>
                  <SelectItem value="Counseling">Counseling</SelectItem>
                  <SelectItem value="Logistics">Logistics</SelectItem>
                  <SelectItem value="Driving">Driving</SelectItem>
                  <SelectItem value="Teaching">Teaching</SelectItem>
                  <SelectItem value="Childcare">Childcare</SelectItem>
                  <SelectItem value="Construction">Construction</SelectItem>
                  <SelectItem value="Plumbing">Plumbing</SelectItem>
                  <SelectItem value="Translation">Translation</SelectItem>
                  <SelectItem value="Administration">Administration</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredVolunteers.map((volunteer) => (
              <Card key={volunteer.id}>
                <CardContent className="flex items-center gap-4 p-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={volunteer.avatar} alt={volunteer.name} />
                    <AvatarFallback>{volunteer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <h3 className="font-semibold">{volunteer.name}</h3>
                    <div className="text-sm text-muted-foreground">
                      {volunteer.hours} hours volunteered
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {volunteer.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  <Badge variant={volunteer.status === "Active" ? "default" : "secondary"}>
                    {volunteer.status}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredVolunteers.length === 0 && (
            <div className="text-center py-10 text-muted-foreground">
              No volunteers found matching your criteria.
            </div>
          )}

          <div className="mt-6 text-center">
            <Button>Load More Volunteers</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

