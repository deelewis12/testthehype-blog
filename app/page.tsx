export default function Home() {
  // Mock blog posts - Later we'll fetch these from the database
  const posts = [
    {
      id: "1",
      title: "Building a Custom Blog with AI: Testing Claude Code",
      excerpt: "My first experiment testing whether AI coding tools live up to the hype - building this very blog from scratch.",
      slug: "building-blog-with-ai",
      createdAt: "2026-02-11",
    },
    {
      id: "2",
      title: "Can AI Really Replace Developers? A Realistic Perspective",
      excerpt: "Exploring the capabilities and limitations of AI coding assistants through hands-on experience.",
      slug: "can-ai-replace-developers",
      createdAt: "2026-02-10",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-gray-900">Test The Hype</h1>
          <p className="mt-2 text-gray-600">
            All words are my own, all code is Claude.
          </p>
        </div>
      </header>

      {/* Main Content - Blog Feed */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-12">
          {posts.map((post) => (
            <article key={post.id} className="border-b border-gray-200 pb-12">
              {/* Post Date */}
              <time className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>

              {/* Post Title */}
              <h2 className="mt-2 text-3xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
                <a href={`/blog/${post.slug}`}>{post.title}</a>
              </h2>

              {/* Post Excerpt */}
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                {post.excerpt}
              </p>

              {/* Read More Link */}
              <a
                href={`/blog/${post.slug}`}
                className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium"
              >
                Read more →
              </a>
            </article>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-24">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <p className="text-sm text-gray-500">
            © 2026 Test The Hype. Testing AI hype, one project at a time.
          </p>
        </div>
      </footer>
    </div>
  );
}
