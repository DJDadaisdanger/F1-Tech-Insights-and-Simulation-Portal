
'use client';
import { useState } from "react";
import Link from "next/link";
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
import { blogPosts } from "@/lib/blog-data";

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
          <Link href={`/blog/${post.id}`} key={post.id} className="flex">
            <Card className="flex flex-col w-full hover:border-primary transition-colors duration-300 transform hover:-translate-y-1">
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
          </Link>
        ))}
      </div>
    </div>
  )
}
