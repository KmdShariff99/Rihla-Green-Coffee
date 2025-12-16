import { useParams, Link } from "wouter";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@shared/schema";
import { BlogCard } from "@/components/BlogCard";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);
  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  if (!post) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center" data-testid="blog-not-found">
        <div className="text-center px-4">
          <h1 className="text-2xl font-semibold text-foreground mb-4">
            Article Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            The article you're looking for doesn't exist.
          </p>
          <Link href="/blog">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const renderContent = (content: string) => {
    return content.split("\n\n").map((paragraph, index) => {
      if (paragraph.startsWith("## ")) {
        return (
          <h2
            key={index}
            className="text-xl font-semibold text-foreground mt-8 mb-4"
          >
            {paragraph.replace("## ", "")}
          </h2>
        );
      }
      if (paragraph.startsWith("### ")) {
        return (
          <h3
            key={index}
            className="text-lg font-semibold text-foreground mt-6 mb-3"
          >
            {paragraph.replace("### ", "")}
          </h3>
        );
      }
      if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
        return (
          <p key={index} className="font-semibold text-foreground mt-4 mb-2">
            {paragraph.replace(/\*\*/g, "")}
          </p>
        );
      }
      if (paragraph.startsWith("| ")) {
        const rows = paragraph.split("\n").filter((row) => !row.startsWith("|---"));
        const headers = rows[0]?.split("|").filter(Boolean).map((h) => h.trim());
        const data = rows.slice(1).map((row) =>
          row.split("|").filter(Boolean).map((cell) => cell.trim())
        );
        return (
          <div key={index} className="overflow-x-auto my-6">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border">
                  {headers?.map((header, i) => (
                    <th
                      key={i}
                      className="text-left py-2 px-4 font-semibold text-foreground"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-b border-border">
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="py-2 px-4 text-muted-foreground"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      if (paragraph.startsWith("- ")) {
        const items = paragraph.split("\n");
        return (
          <ul key={index} className="list-disc list-inside space-y-2 my-4 ml-4">
            {items.map((item, i) => (
              <li key={i} className="text-muted-foreground">
                {item.replace("- ", "")}
              </li>
            ))}
          </ul>
        );
      }
      return (
        <p key={index} className="text-muted-foreground leading-relaxed my-4">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen pt-20">
      <article className="py-12 md:py-16 bg-background" data-testid="blog-article">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
            data-testid="link-back-to-blog"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge size="sm">{post.category}</Badge>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight" data-testid="text-article-title">
              {post.title}
            </h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.publishedAt}>{formattedDate}</time>
            </div>
          </header>

          <div className="prose prose-lg dark:prose-invert max-w-none" data-testid="article-content">
            {renderContent(post.content)}
          </div>

          <footer className="mt-12 pt-8 border-t border-border">
            <div className="bg-card rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-2">
                Need More Information?
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Contact us to discuss your green coffee requirements or learn more about our products.
              </p>
              <Link href="/contact" data-testid="link-article-contact">
                <Button>
                  Get in Touch
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </footer>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="py-12 md:py-16 bg-card" data-testid="section-related-posts">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-semibold text-foreground mb-8">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
