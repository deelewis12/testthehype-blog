import { prisma } from "@/lib/prisma";
import TVDials from "@/components/TVDials";
import PowerButton from "@/components/PowerButton";

export default async function TVLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    select: { slug: true },
  });

  const channels = [
    { href: "/" },
    ...posts.map((p) => ({ href: `/blog/${p.slug}` })),
  ];

  return (
    <div className="tv-room">
      <div className="tv-set">
        <div className="tv-body">

          {/* Screen side — dark wooden bezel + oval CRT */}
          <div className="tv-chrome-bezel">
            <div className="tv-screen">
              <div className="tv-scanlines" aria-hidden="true" />
              <div className="tv-vignette" aria-hidden="true" />
              <div className="tv-screen-content">
                {children}
              </div>
            </div>
          </div>

          {/* Controls side — wood toned */}
          <div className="tv-controls-panel">

            {/* Power button — client component, toggles CRT animation */}
            <PowerButton />

            <TVDials channels={channels} />

            {/* 2 indicator dots — power (red/on) + secondary */}
            <div className="tv-indicator-dots">
              <div className="tv-indicator-dot power" />
              <div className="tv-indicator-dot" />
            </div>

            {/* Speaker grille — pattern via CSS repeating-linear-gradient */}
            <div className="tv-speaker-grille" />

          </div>

        </div>
      </div>
    </div>
  );
}
