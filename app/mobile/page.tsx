export default function MobilePage() {
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
      <div style={{ textAlign: "center", padding: "0 2rem" }}>
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
              fontSize: "clamp(2rem, 10vw, 4rem)",
              fontWeight: 400,
            }}
          >
            Put your phone
          </span>
          <span
            style={{
              display: "block",
              fontSize: "clamp(3rem, 18vw, 8rem)",
              fontWeight: 700,
              letterSpacing: "0.12em",
              marginTop: "-0.5rem",
              marginLeft: "0.12em",
            }}
          >
            down
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
          Try this on desktop
        </p>
      </div>
    </div>
  );
}
