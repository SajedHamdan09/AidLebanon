'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, TrendingUp, Users, Utensils, Backpack, Home } from 'lucide-react'

const impactData = {
  totalPeopleHelped: 15000,
  totalVolunteers: 500,
  totalDonations: 250000,
  mealsServed: 50000,
  educationSupplies: 10000,
  housingAssistance: 1000,
}

const timelineData = [
  { month: "Jan", peopleHelped: 1000 },
  { month: "Feb", peopleHelped: 1200 },
  { month: "Mar", peopleHelped: 1500 },
  { month: "Apr", peopleHelped: 1800 },
  { month: "May", peopleHelped: 2000 },
  { month: "Jun", peopleHelped: 2500 },
  { month: "Jul", peopleHelped: 3000 },
  { month: "Aug", peopleHelped: 3500 },
  { month: "Sep", peopleHelped: 4000 },
  { month: "Oct", peopleHelped: 4500 },
  { month: "Nov", peopleHelped: 5000 },
  { month: "Dec", peopleHelped: 5500 },
]

export default function TotalImpact() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Heart className="h-6 w-6" />
            Total Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Users className="h-12 w-12 text-primary mb-2" />
                <h3 className="text-2xl font-bold">{impactData.totalPeopleHelped.toLocaleString()}</h3>
                <p className="text-muted-foreground">People Helped</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Heart className="h-12 w-12 text-primary mb-2" />
                <h3 className="text-2xl font-bold">{impactData.totalVolunteers.toLocaleString()}</h3>
                <p className="text-muted-foreground">Total Volunteers</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <TrendingUp className="h-12 w-12 text-primary mb-2" />
                <h3 className="text-2xl font-bold">${impactData.totalDonations.toLocaleString()}</h3>
                <p className="text-muted-foreground">Total Donations</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Impact Breakdown</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Utensils className="h-5 w-5 text-primary" />
                  <span>Meals Served</span>
                </div>
                <Badge variant="secondary">{impactData.mealsServed.toLocaleString()}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Backpack className="h-5 w-5 text-primary" />
                  <span>Education Supplies Distributed</span>
                </div>
                <Badge variant="secondary">{impactData.educationSupplies.toLocaleString()}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-primary" />
                  <span>Housing Assistance Provided</span>
                </div>
                <Badge variant="secondary">{impactData.housingAssistance.toLocaleString()}</Badge>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Impact Timeline</h3>
            <div className="flex items-center mb-4">
              <span className="mr-2">View by:</span>
              <Select defaultValue="month">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="quarter">Quarter</SelectItem>
                  <SelectItem value="year">Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="h-64 w-full">
              {/* Here you would typically use a charting library like recharts or Chart.js */}
              <div className="flex items-end justify-between h-full">
                {timelineData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="bg-primary w-8 rounded-t-md" 
                      style={{ height: `${(data.peopleHelped / 5500) * 100}%` }}
                    ></div>
                    <span className="text-xs mt-1">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Button>Download Full Impact Report</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

