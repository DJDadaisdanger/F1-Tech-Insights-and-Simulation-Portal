import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare, ThumbsUp } from "lucide-react"

const communityPosts = [
  {
    id: 1,
    author: "Enzo F.",
    avatar: "https://picsum.photos/seed/enzo/40/40",
    title: "Aggressive 1-Stop Strategy for Monza",
    content: "With low tire degradation at Monza, an aggressive one-stop strategy starting on Softs and switching to Hards around lap 25 could be optimal. This requires a strong qualifying position to maintain track position.",
    tags: ["Strategy", "Monza"],
    upvotes: 128,
    comments: 14,
  },
  {
    id: 2,
    author: "Adrian N.",
    avatar: "https://picsum.photos/seed/adrian/40/40",
    title: "High Downforce Setup for Monaco",
    content: "Maximizing downforce is key for Monaco's tight corners. A new rear wing design I'm proposing increases surface area without significantly impacting drag on the short straights. See attached schematics.",
    tags: ["Engineering", "Setups"],
    upvotes: 256,
    comments: 32,
  },
  {
    id: 3,
    author: "Hannah S.",
    avatar: "https://picsum.photos/seed/hannah/40/40",
    title: "Tire Management in Hot Conditions at Bahrain",
    content: "The key to Bahrain is managing rear tire temperatures. A differential setup that allows for more rotation on corner entry can help, but it requires precise driver input to avoid snap oversteer.",
    tags: ["Tires", "Driving Style"],
    upvotes: 97,
    comments: 8,
  },
];


export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {communityPosts.map((post) => (
        <Card key={post.id} className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={post.avatar} alt={post.author} data-ai-hint="person portrait" />
                <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="font-headline text-lg">{post.title}</CardTitle>
                <CardDescription>by {post.author}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-muted-foreground text-sm">{post.content}</p>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <ThumbsUp className="w-4 h-4" />
                {post.upvotes}
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                {post.comments}
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
