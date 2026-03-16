import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg)",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1
          style={{
            margin: 0,
            lineHeight: 1.05,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "var(--fg)",
          }}
        >
          <span
            style={{
              display: "block",
              fontSize: "clamp(3rem, 8vw, 7rem)",
              fontWeight: 400,
            }}
          >
            Test the
          </span>
          <span
            style={{
              display: "block",
              fontSize: "15rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              marginTop: "-0.5rem",
              marginLeft: "0.12em",
            }}
          >
            Hype
          </span>
        </h1>

        <p
          style={{
            marginTop: "2rem",
            fontSize: "1.1rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "#c8c0b0",
          }}
        >
          My Journey With AI
        </p>

        {session && (
          <a
            href="/admin"
            style={{
              display: "inline-block",
              marginTop: "1.5rem",
              fontSize: "0.75rem",
              color: "#fff",
              background: "#5b2d8e",
              border: "1px solid #5b2d8e",
              padding: "6px 16px",
              textDecoration: "none",
            }}
          >
            admin
          </a>
        )}
      </div>
    </div>
  );
}
