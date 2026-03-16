"use client";
import { useEffect, useRef, useState } from "react";

const BAR_COUNT = 12;

function getBarColor(index: number, litCount: number): string {
  if (index >= litCount) return "rgba(201,162,39,0.18)";
  if (index >= 11) return "#cc3300";
  if (index >= 8) return "#e08020";
  return "var(--fg)";
}

export default function VolumeOverlay() {
  const [volume, setVolume] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function handleVolumeChange(e: Event) {
      const v = (e as CustomEvent<{ volume: number }>).detail.volume;
      setVolume(v);
      setVisible(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setVisible(false), 2000);
    }

    window.addEventListener("volume-change", handleVolumeChange);
    return () => {
      window.removeEventListener("volume-change", handleVolumeChange);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div
      className="tv-volume-overlay"
      data-visible={visible ? "true" : "false"}
      aria-hidden="true"
    >
      <div className="tv-volume-bars">
        {Array.from({ length: BAR_COUNT }, (_, i) => (
          <div
            key={i}
            className="tv-volume-bar"
            data-lit={i < volume ? "true" : "false"}
            style={{ background: getBarColor(i, volume) }}
          />
        ))}
      </div>
      <span className="tv-volume-label">VOL {volume}</span>
    </div>
  );
}
