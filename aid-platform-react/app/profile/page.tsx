'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar, Gift, HandHeart, Settings, LogOut, MapPin, Mail, Phone } from 'lucide-react'

const historyActions = [
  {
    type: 'volunteer',
    title: 'Volunteered at Food Distribution',
    date: '2023-12-01',
    center: 'Community Food Bank',
    status: 'Completed',
    icon: HandHeart
  },
  {
    type: 'donation',
    title: 'Donated Winter Clothes',
    date: '2023-11-28',
    center: 'Clothing Aid Center',
    status: 'Completed',
    icon: Gift
  },
  {
    type: 'request',
    title: 'Requested Medical Supplies',
    date: '2023-11-25',
    center: 'Medical Aid Center',
    status: 'Pending',
    icon: Calendar
  }
]

export default function Profile() {
  const [activeTab, setActiveTab] = useState('history')

  return (
    <div className="container mx-auto py-6 space-y-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-4xl">👤</span>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-grow space-y-4">
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                <h1 className="text-2xl font-bold">John Doe</h1>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button variant="outline" size="sm">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 md:gap-8">
                <div className="text-center">
                  <div className="font-semibold">15</div>
                  <div className="text-sm text-muted-foreground">Volunteer Hours</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">8</div>
                  <div className="text-sm text-muted-foreground">Donations Made</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">3</div>
                  <div className="text-sm text-muted-foreground">Aid Requests</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  New York, USA
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  john.doe@example.com
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  +1 (555) 123-4567
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>
        
        <TabsContent value="history" className="space-y-4">
          {historyActions.map((action, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-full p-2">
                    <action.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{action.title}</h3>
                        <p className="text-sm text-muted-foreground">{action.center}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm">{action.date}</div>
                        <div className={`text-xs ${
                          action.status === 'Completed' ? 'text-green-500' : 'text-yellow-500'
                        }`}>
                          {action.status}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="following">
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              You are following 5 aid centers
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="saved">
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              You have 2 saved opportunities
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

