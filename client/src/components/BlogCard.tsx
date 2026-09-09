import { Link } from "wouter";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@shared/schema";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (featured) {
    return (
      <Card className="overflow-hidden hover-elevate" data-testid={`card-blog-featured-${post.id}`}>
        <div className="grid md:grid-cols-2 gap-0">
          <div className="aspect-[16/9] md:aspect-auto bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <div className="text-6xl opacity-20 font-bold text-primary">
              RG
            </div>
          </div>
          <div className="p-6 md:p-8 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-3">
              <Badge size="sm">{post.category}</Badge>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3 leading-tight">
              {post.title}
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formattedDate}
              </span>
              <Link
                href={`/blog/${post.slug}`}
                className="text-sm font-medium text-primary flex items-center gap-1 hover:gap-2 transition-all"
                data-testid={`link-blog-read-${post.id}`}
              >
                Read Article
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col h-full hover-elevate" data-testid={`card-blog-${post.id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3 mb-2">
          <Badge size="sm">{post.category}</Badge>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </span>
        </div>
        <h3 className="font-semibold text-foreground leading-tight">
          {post.title}
        </h3>
      </CardHeader>
      <CardContent className="flex-1 pb-3">
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>
      </CardContent>
      <CardFooter className="pt-0 flex items-center justify-between gap-4">
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {formattedDate}
        </span>
        <Link
          href={`/blog/${post.slug}`}
          className="text-sm font-medium text-primary flex items-center gap-1 hover:gap-2 transition-all"
          data-testid={`link-blog-read-${post.id}`}
        >
          Read
          <ArrowRight className="w-4 h-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}
