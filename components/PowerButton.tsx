"use client";
import { useState, useEffect } from "react";

type PowerState = "on" | "turning-off" | "off" | "turning-on";

export default function PowerButton() {
  const [power, setPower] = useState<PowerState>("on");

  useEffect(() => {
    document.documentElement.setAttribute("data-power", power);
  }, [power]);

  function handleClick() {
    if (power === "on") {
      setPower("turning-off");
      setTimeout(() => setPower("off"), 420);
    } else if (power === "off") {
      setPower("turning-on");
      setTimeout(() => setPower("on"), 640);
    }
  }

  return (
    <div
      className="tv-power-btn"
      onClick={handleClick}
      role="button"
      aria-label="Toggle power"
      style={{ cursor: "pointer" }}
    />
  );
}
