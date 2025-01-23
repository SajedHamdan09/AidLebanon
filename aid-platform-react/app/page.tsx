'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { HandHeart, HeartHandshake, Gift, Users, Calendar, Heart } from 'lucide-react'
import Link from 'next/link'

const actionCards = [
  {
    title: "Apply for Volunteering",
    description: "Join our volunteer network and make a difference",
    icon: HandHeart,
    link: "/volunteer",
    color: "bg-blue-100 text-blue-600"
  },
  {
    title: "Request Aid",
    description: "Submit requests for assistance",
    icon: HeartHandshake,
    link: "/request-aid",
    color: "bg-green-100 text-green-600"
  },
  {
    title: "Submit Donation",
    description: "Support our cause through donations",
    icon: Gift,
    link: "/donate",
    color: "bg-purple-100 text-purple-600"
  },
  {
    title: "Active Volunteers",
    description: "Currently active volunteers: 150",
    icon: Users,
    link: "/volunteers",
    color: "bg-orange-100 text-orange-600"
  },
  {
    title: "Ongoing Projects",
    description: "Current aid projects: 12",
    icon: Calendar,
    link: "/projects",
    color: "bg-pink-100 text-pink-600"
  },
  {
    title: "Total Impact",
    description: "People helped this month: 1,200",
    icon: Heart,
    link: "/impact",
    color: "bg-indigo-100 text-indigo-600"
  }
]

export default function Dashboard() {
  const [blogPosts, setBlogPosts] = useState<any[]>([])

  useEffect(() => {
    // Fetch blog posts from the API
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('http://localhost:8080/blogpost/all')
        if (!response.ok) throw new Error('Failed to fetch blog posts')
        const data = await response.json()
        setBlogPosts(data)
      } catch (error) {
        console.error('Error fetching blog posts:', error)
      }
    }
    fetchBlogPosts()
  }, [])

  return (
    <div className="container mx-auto py-6 space-y-8">
      {/* Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {actionCards.map((card, index) => (
          <Link href={card.link} key={index}>
            <Card className="h-full hover:shadow-lg transition-all cursor-pointer">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className={`inline-flex p-3 rounded-full ${card.color}`}>
                    <card.icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-xl">{card.title}</h3>
                    <p className="text-sm text-muted-foreground">{card.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Blog/News Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Latest Updates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogPosts.map((post) => (
            <Card key={post.postId} className="overflow-hidden">
              {/* Post Header */}
              <CardHeader className="p-4 flex flex-row items-center space-y-0">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>{post.aidCenter.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 ml-4">
                  <div className="font-semibold">{post.aidCenter.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(post.postDate).toDateString()}
                  </div>
                </div>
              </CardHeader>

              {/* Post Image */}
              <div className="relative aspect-square">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Post Content */}
              <CardContent className="p-4 space-y-4">
                <div className="font-semibold text-lg">{post.title}</div>
                <div className="space-y-1">
                  <p className="text-sm">
                    <span className="font-semibold">{post.aidCenter.name}</span>{" "}
                    {post.content}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
