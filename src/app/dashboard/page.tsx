
'use client';
import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    author: "Enzo F.",
    avatar: "https://picsum.photos/seed/enzo/40/40",
    title: "Aggressive 1-Stop Strategy for Monza",
    content: "With low tire degradation at Monza, an aggressive one-stop strategy starting on Softs and switching to Hards around lap 25 could be optimal. This requires a strong qualifying position to maintain track position.",
    tags: ["Strategy", "Monza"],
    date: "Sep 5, 2023",
  },
  {
    id: 2,
    author: "Adrian N.",
    avatar: "https://picsum.photos/seed/adrian/40/40",
    title: "High Downforce Setup for Monaco",
    content: "Maximizing downforce is key for Monaco's tight corners. A new rear wing design I'm proposing increases surface area without significantly impacting drag on the short straights. See attached schematics.",
    tags: ["Engineering", "Setups"],
    date: "May 22, 2023",
  },
  {
    id: 3,
    author: "Hannah S.",
    avatar: "https://picsum.photos/seed/hannah/40/40",
    title: "Tire Management in Hot Conditions at Bahrain",
    content: "The key to Bahrain is managing rear tire temperatures. A differential setup that allows for more rotation on corner entry can help, but it requires precise driver input to avoid snap oversteer.",
    tags: ["Tires", "Driving Style"],
    date: "Mar 12, 2023",
  },
  {
    id: 4,
    author: "Carlos V.",
    avatar: "https://picsum.photos/seed/carlos/40/40",
    title: "Understanding Ground Effect in the New Era",
    content: "The 2022 regulations brought back ground effect aerodynamics, fundamentally changing how cars generate downforce. This article dives into the Venturi tunnels and how teams are exploiting them.",
    tags: ["Aerodynamics", "Regulations"],
    date: "Oct 15, 2023",
  },
  {
    id: 5,
    author: "Lando N.",
    avatar: "https://picsum.photos/seed/lando/40/40",
    title: "The Art of Late Braking at Spa",
    content: "Spa-Francorchamps' heavy braking zones like La Source and Les Combes are prime overtaking opportunities. We analyze telemetry data to see how the top drivers gain tenths under braking.",
    tags: ["Driving Style", "Spa"],
    date: "Aug 28, 2023",
  },
  {
    id: 6,
    author: "Yuki T.",
    avatar: "https://picsum.photos/seed/yuki/40/40",
    title: "Engine Modes and Energy Recovery (ERS)",
    content: "A deep dive into the complex world of F1 power units. We explain the different engine modes ('quali mode', race mode) and how ERS deployment is strategized over a lap.",
    tags: ["Power Unit", "ERS"],
    date: "Jul 19, 2023",
  },
   {
    id: 7,
    author: "Alex A.",
    avatar: "https://picsum.photos/seed/alex/40/40",
    title: "Simulating a Wet Race at Silverstone",
    content: "Wet weather races are the great equalizer. Using our simulation tools, we explore the crossover point between Intermediate and Full Wet tires at a damp Silverstone circuit.",
    tags: ["Simulation", "Tires", "Silverstone"],
    date: "Nov 2, 2023",
  },
  {
    id: 8,
    author: "Grace L.",
    avatar: "https://picsum.photos/seed/grace/40/40",
    title: "The Evolution of the F1 Steering Wheel",
    content: "From simple wheels to complex data hubs, the F1 steering wheel is a technological marvel. We trace its evolution and break down all the buttons, rotaries, and switches.",
    tags: ["Technology", "History"],
    date: "Oct 28, 2023",
  },
  {
    id: 9,
    author: "Daniel R.",
    avatar: "https://picsum.photos/seed/daniel/40/40",
    title: "Porpoising: The Aerodynamic Challenge of 2022",
    content: "The high-frequency bouncing seen in the 2022 season, known as 'porpoising', was a major headache for teams. This post explains the physics behind it and the solutions engineers devised.",
    tags: ["Aerodynamics", "Engineering"],
    date: "Sep 21, 2023",
  },
];


export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input 
          placeholder="Search blog posts..."
          className="pl-10 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={post.avatar} alt={post.author} data-ai-hint="person portrait" />
                  <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="font-headline text-lg">{post.title}</CardTitle>
                  <CardDescription>{post.author} on {post.date}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground text-sm line-clamp-3">{post.content}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="flex gap-2 flex-wrap">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
