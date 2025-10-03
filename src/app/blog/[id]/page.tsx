
import { blogPosts } from '@/lib/blog-data';
import { notFound } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = blogPosts.find((p) => p.id === parseInt(params.id));

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Button asChild variant="outline" className="mb-8">
        <Link href="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>
      </Button>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={post.avatar} alt={post.author} data-ai-hint="person portrait" />
              <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{post.author}</p>
              <p className="text-sm text-muted-foreground">Published on {post.date}</p>
            </div>
          </div>
          <CardTitle className="font-headline text-4xl">{post.title}</CardTitle>
          <div className="flex gap-2 pt-2 flex-wrap">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none text-lg">
          {post.content.split('\\n\\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
