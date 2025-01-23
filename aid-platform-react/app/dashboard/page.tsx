'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Heart, Share2, MessageCircle, HandHeart, HeartHandshake, Gift, Users, Calendar } from 'lucide-react'
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

const posts = [
  {
    id: 1,
    center: {
      name: "Community Food Bank",
      avatar: "/placeholder.svg?height=40&width=40"
    },
    content: "🎉 Call for Volunteers: Join us this Saturday for our monthly food distribution event! We need 20 volunteers to help pack and distribute food packages to 200 families.",
    image: "/placeholder.svg?height=400&width=400",
    likes: 234,
    comments: 18,
    timestamp: "2 hours ago"
  },
  {
    id: 2,
    center: {
      name: "Education Aid Center",
      avatar: "/placeholder.svg?height=40&width=40"
    },
    content: "Thrilled to announce we completed the needs for Lincoln Elementary School! 📚 200 students will receive new backpacks and supplies. Thank you to all our donors!",
    image: "/placeholder.svg?height=400&width=400",
    likes: 156,
    comments: 23,
    timestamp: "5 hours ago"
  },
  {
    id: 3,
    center: {
      name: "Medical Aid Center",
      avatar: "/placeholder.svg?height=40&width=40"
    },
    content: "Call for donations: We're collecting medical supplies for our upcoming free health camp. Every contribution helps! Contact us to learn more.",
    image: "/placeholder.svg?height=400&width=400",
    likes: 89,
    comments: 12,
    timestamp: "1 day ago"
  },
  {
    id: 4,
    center: {
      name: "Community Center",
      avatar: "/placeholder.svg?height=40&width=40"
    },
    content: "Today's Update: Our team distributed winter coats to 50 families in need. Special thanks to our dedicated volunteers! #CommunityService",
    image: "/placeholder.svg?height=400&width=400",
    likes: 145,
    comments: 28,
    timestamp: "1 day ago"
  }
]

export default function Dashboard() {
  const [likedPosts, setLikedPosts] = useState<number[]>([])

  const handleLike = (postId: number) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    )
  }

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
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              {/* Post Header */}
              <CardHeader className="p-4 flex flex-row items-center space-y-0">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={post.center.avatar} />
                  <AvatarFallback>{post.center.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 ml-4">
                  <div className="font-semibold">{post.center.name}</div>
                  <div className="text-sm text-muted-foreground">{post.timestamp}</div>
                </div>
              </CardHeader>

              {/* Post Image */}
              <div className="relative aspect-square">
                <img
                  src={post.image}
                  alt="Post content"
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Post Actions */}
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center space-x-4">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleLike(post.id)}
                    className={likedPosts.includes(post.id) ? "text-red-500" : ""}
                  >
                    <Heart className="h-5 w-5" fill={likedPosts.includes(post.id) ? "currentColor" : "none"} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MessageCircle className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>

                {/* Likes Count */}
                <div className="font-semibold text-sm">
                  {post.likes + (likedPosts.includes(post.id) ? 1 : 0)} likes
                </div>

                {/* Post Content */}
                <div className="space-y-1">
                  <p className="text-sm">
                    <span className="font-semibold">{post.center.name}</span>{" "}
                    {post.content}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    View all {post.comments} comments
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

