"use client";
import { usePathname, useRouter } from "next/navigation";

type Channel = { href: string };

const CH_LABELS = ["12","1","2","3","4","5","6","7","8","9","10","11"];
const TICK_COUNT = 16;

function NumberDial({
  rotation,
  onClick,
  channelIndex,
}: {
  rotation: number;
  onClick: () => void;
  channelIndex: number;
}) {
  const size = 224;
  const cx = 112;
  const cy = 112;
  const frameR = 110;  // wooden cutout ring (panel material)
  const outerR = 96;   // black ring — numbers live here
  const silverR = 66;
  const numR = 83;
  const barW = 12;
  const barH = (silverR - 6) * 2;

  return (
    <button
      onClick={onClick}
      title={`Channel ${channelIndex + 1} — click to advance`}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
        display: "block",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ display: "block", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.9))" }}
      >
        <defs>
          {/* Inset shadow: dark top-left fading to transparent — simulates recessed cutout */}
          <linearGradient id="recessShadow" x1="15%" y1="15%" x2="85%" y2="85%">
            <stop offset="0%"   stopColor="rgba(0,0,0,0.85)" />
            <stop offset="45%"  stopColor="rgba(0,0,0,0.35)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.0)" />
          </linearGradient>
          <radialGradient id="silverGrad" cx="35%" cy="28%">
            <stop offset="0%"   stopColor="#e8e8e8" />
            <stop offset="30%"  stopColor="#c8c8c8" />
            <stop offset="70%"  stopColor="#888" />
            <stop offset="100%" stopColor="#505050" />
          </radialGradient>
          <linearGradient id="barGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#1a1a1a" />
            <stop offset="20%"  stopColor="#707070" />
            <stop offset="42%"  stopColor="#f4f4f4" />
            <stop offset="50%"  stopColor="#ffffff" />
            <stop offset="58%"  stopColor="#d0d0d0" />
            <stop offset="80%"  stopColor="#606060" />
            <stop offset="100%" stopColor="#1a1a1a" />
          </linearGradient>
        </defs>

        {/* Wooden frame ring — panel material, same color as controls panel */}
        <circle cx={cx} cy={cy} r={frameR} fill="#1e0d04" />
        {/* Inset shadow overlay — darkens inner rim top-left to simulate depth */}
        <circle cx={cx} cy={cy} r={frameR} fill="url(#recessShadow)" />

        {/* Black outer ring — numbers live here */}
        <circle cx={cx} cy={cy} r={outerR} fill="#111" />

        {/* Channel numbers */}
        {CH_LABELS.map((label, i) => {
          const angle = ((i * (360 / CH_LABELS.length)) - 90) * (Math.PI / 180);
          const x = cx + numR * Math.cos(angle);
          const y = cy + numR * Math.sin(angle);
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#e0e0e0"
              fontSize="13"
              fontWeight="bold"
              fontFamily="ui-monospace, monospace"
            >
              {label}
            </text>
          );
        })}

        {/* Inner silver face */}
        <circle cx={cx} cy={cy} r={silverR} fill="url(#silverGrad)" />

        {/* Raised indicator bar */}
        <g
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: `${cx}px ${cy}px`,
            transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <rect
            x={cx - barW / 2}
            y={cy - barH / 2}
            width={barW}
            height={barH}
            rx={3}
            fill="url(#barGrad)"
          />
        </g>
      </svg>
    </button>
  );
}

function TickDial() {
  const size = 224;
  const cx = 112;
  const cy = 112;
  const frameR = 110;
  const outerR = 96;
  const silverR = 66;
  const barW = 12;
  const barH = (silverR - 6) * 2;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ display: "block", filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.9))" }}
    >
      <defs>
        <linearGradient id="recessShadow2" x1="15%" y1="15%" x2="85%" y2="85%">
          <stop offset="0%"   stopColor="rgba(0,0,0,0.85)" />
          <stop offset="45%"  stopColor="rgba(0,0,0,0.35)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.0)" />
        </linearGradient>
        <radialGradient id="silverGrad2" cx="35%" cy="28%">
          <stop offset="0%"   stopColor="#e8e8e8" />
          <stop offset="30%"  stopColor="#c8c8c8" />
          <stop offset="70%"  stopColor="#888" />
          <stop offset="100%" stopColor="#505050" />
        </radialGradient>
        <linearGradient id="barGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#1a1a1a" />
          <stop offset="20%"  stopColor="#707070" />
          <stop offset="42%"  stopColor="#f4f4f4" />
          <stop offset="50%"  stopColor="#ffffff" />
          <stop offset="58%"  stopColor="#d0d0d0" />
          <stop offset="80%"  stopColor="#606060" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </linearGradient>
      </defs>

      {/* Wooden frame ring */}
      <circle cx={cx} cy={cy} r={frameR} fill="#1e0d04" />
      {/* Inset shadow overlay */}
      <circle cx={cx} cy={cy} r={frameR} fill="url(#recessShadow2)" />

      {/* Black outer ring — ticks live here */}
      <circle cx={cx} cy={cy} r={outerR} fill="#111" />

      {/* Tick marks */}
      {Array.from({ length: TICK_COUNT }).map((_, i) => {
        const angle = ((i * (360 / TICK_COUNT)) - 90) * (Math.PI / 180);
        const isMajor = i % 4 === 0;
        const tickOuter = outerR - 3;
        const tickInner = outerR - (isMajor ? 22 : 12);
        return (
          <line
            key={i}
            x1={cx + tickInner * Math.cos(angle)}
            y1={cy + tickInner * Math.sin(angle)}
            x2={cx + tickOuter * Math.cos(angle)}
            y2={cy + tickOuter * Math.sin(angle)}
            stroke={isMajor ? "#e0e0e0" : "#999"}
            strokeWidth={isMajor ? 3 : 1.5}
            strokeLinecap="round"
          />
        );
      })}

      {/* Inner silver face */}
      <circle cx={cx} cy={cy} r={silverR} fill="url(#silverGrad2)" />

      {/* Raised indicator bar — fixed */}
      <g style={{ transform: "rotate(-20deg)", transformOrigin: `${cx}px ${cy}px` }}>
        <rect
          x={cx - barW / 2}
          y={cy - barH / 2}
          width={barW}
          height={barH}
          rx={3}
          fill="url(#barGrad2)"
        />
      </g>
    </svg>
  );
}

export default function TVDials({ channels }: { channels: Channel[] }) {
  const pathname = usePathname();
  const router = useRouter();

  const currentIndex = channels.findIndex((c) => c.href === pathname);
  const activeIndex = currentIndex === -1 ? 0 : currentIndex;

  // "1" sits 30° clockwise from north; each channel advances one position (30°)
  const rotation = 30 + activeIndex * 30;

  function handleClick() {
    const nextIndex = (activeIndex + 1) % channels.length;
    router.push(channels[nextIndex].href);
  }

  return (
    <div className="tv-dial-section">
      <div className="tv-dial-wrap">
        <NumberDial rotation={rotation} onClick={handleClick} channelIndex={activeIndex} />
        <span className="tv-dial-label">CH {String(activeIndex + 1).padStart(2, "0")}</span>
      </div>

      <div className="tv-dial-wrap">
        <TickDial />
        <span className="tv-dial-label">VOL</span>
      </div>
    </div>
  );
}
