// The [slug] in the folder name makes this a "dynamic route"
// It matches URLs like /blog/my-post-title

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Mock post data - Later we'll fetch from database using the slug
  const post = {
    title: "Building a Custom Blog with AI: Testing Claude Code",
    content: `
      <p>This is my first experiment in testing whether AI coding tools actually live up to the hype.</p>

      <p>I'm building this blog completely from scratch using Claude Code, and documenting the entire process.</p>

      <h2>What I'm Testing</h2>
      <ul>
        <li>Can Claude Code build a full-stack application?</li>
        <li>How much do I need to understand about web development?</li>
        <li>Is this faster than traditional development?</li>
      </ul>

      <h2>The Stack</h2>
      <p>We're using Next.js, TypeScript, Prisma, PostgreSQL, and Tailwind CSS - all completely free hosting.</p>

      <p>More updates coming soon as I build out the CMS features...</p>
    `,
    createdAt: "2026-02-11",
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <a href="/" className="text-blue-600 hover:text-blue-800">
            ← Back to home
          </a>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 py-12">
        {/* Post metadata */}
        <time className="text-sm text-gray-500">
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>

        {/* Title */}
        <h1 className="mt-4 text-5xl font-bold text-gray-900 leading-tight">
          {post.title}
        </h1>

        {/* Content */}
        <div
          className="mt-12 prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}
