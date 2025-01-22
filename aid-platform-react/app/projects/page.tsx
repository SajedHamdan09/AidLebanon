'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Calendar, Search } from 'lucide-react'

const projects = [
  { id: 1, name: "School Supplies Drive", category: "Education", progress: 75, volunteers: 20, deadline: "2023-12-31" },
  { id: 2, name: "Community Garden", category: "Environment", progress: 40, volunteers: 15, deadline: "2024-03-15" },
  { id: 3, name: "Elderly Care Program", category: "Healthcare", progress: 60, volunteers: 30, deadline: "2024-01-31" },
  { id: 4, name: "Youth Mentorship", category: "Social Services", progress: 25, volunteers: 25, deadline: "2024-06-30" },
  { id: 5, name: "Homeless Shelter Renovation", category: "Construction", progress: 90, volunteers: 40, deadline: "2023-12-15" },
]

export default function OngoingProjects() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("All")

  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterCategory === "All" || project.category === filterCategory)
  )

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Calendar className="h-6 w-6" />
            Ongoing Projects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Label htmlFor="search">Search Projects</Label>
              <div className="relative">
                <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by project name..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full md:w-[200px]">
              <Label htmlFor="category-filter">Filter by Category</Label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger id="category-filter">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Categories</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Environment">Environment</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Social Services">Social Services</SelectItem>
                  <SelectItem value="Construction">Construction</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredProjects.map((project) => (
              <Card key={project.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg">{project.name}</h3>
                      <Badge>{project.category}</Badge>
                    </div>
                    <div className="space-y-1 text-sm text-right">
                      <div>{project.volunteers} volunteers</div>
                      <div>Deadline: {project.deadline}</div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="w-full" />
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" className="w-full">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-10 text-muted-foreground">
              No projects found matching your criteria.
            </div>
          )}

          <div className="mt-6 text-center">
            <Button>Load More Projects</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

