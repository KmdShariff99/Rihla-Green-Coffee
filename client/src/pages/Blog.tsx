import { blogPosts } from "@shared/schema";
import { BlogCard } from "@/components/BlogCard";

export default function Blog() {
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <div className="min-h-screen pt-20">
      <section className="py-12 md:py-16 bg-background" data-testid="section-blog-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-blog-headline">
            Industry Insights
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Learn about Indian coffee grades, export standards, processing methods, and market insights.
          </p>
        </div>
      </section>

      <section className="py-8 md:py-12 bg-background" data-testid="section-blog-featured">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogCard post={featuredPost} featured />
        </div>
      </section>

      <section className="py-12 md:py-16 bg-card" data-testid="section-blog-list">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-foreground mb-8">
            More Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
