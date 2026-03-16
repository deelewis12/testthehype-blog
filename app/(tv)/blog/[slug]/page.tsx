import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await auth();

  const post = await prisma.post.findUnique({
    where: { slug, published: true },
  });

  if (!post) notFound();

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--fg)" }}>
      <header style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <a
            href="/"
            className="text-xs"
            style={{ color: "var(--fg-dim)" }}
          >
            ← home
          </a>
          {session && (
            <a
              href={`/admin/posts/${post.id}/edit`}
              className="text-xs px-2 py-1"
              style={{
                color: "var(--fg-dim)",
                border: "1px solid var(--border)",
              }}
            >
              [edit]
            </a>
          )}
        </div>
      </header>

      <article className="max-w-2xl mx-auto px-6 py-12">
        <time className="text-xs" style={{ color: "#c8c0b0", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          {new Date(post.publishedAt ?? post.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </time>

        <h1
          className="mt-3 font-bold leading-tight"
          style={{
            color: "var(--fg)",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            lineHeight: 1.05,
          }}
        >
          {post.title}
        </h1>

        <div
          className="mt-10 prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}
