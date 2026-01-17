"use client";

import { cloneElement } from "react";

/**
 * Marquee Component - Smooth scrolling marquee animation
 * @param {React.ReactNode} children - Content to scroll
 * @param {boolean} reverse - Reverse scroll direction
 * @param {string} speed - Animation speed: 'slow', 'normal', 'fast'
 * @param {boolean} pauseOnHover - Pause animation on hover
 * @param {string} className - Additional CSS classes
 */
export default function Marquee({
  children,
  reverse = false,
  speed = "normal",
  pauseOnHover = true,
  className = "",
  ...props
}) {
  const speedClass = {
    slow: "marquee-slow",
    normal: "",
    fast: "marquee-fast",
  }[speed];

  const marqueeClass = [
    "marquee",
    reverse && "marquee-reverse",
    speedClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={marqueeClass} {...props}>
      <div className="marquee-content">{children}</div>
      <div className="marquee-content" aria-hidden="true">
        {children}
      </div>
    </div>
  );
}
