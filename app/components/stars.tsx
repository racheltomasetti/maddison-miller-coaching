"use client";

import { useEffect, useState } from "react";

interface StarDot {
  top: string;
  left: string;
  size: string;
  opacity: number;
  duration: string;
  delay: string;
}

interface StarsProps {
  count?: number;
}

export default function Stars({ count = 24 }: StarsProps): React.ReactElement {
  const [dots, setDots] = useState<StarDot[]>([]);

  useEffect(() => {
    const generated: StarDot[] = Array.from({ length: count }, () => {
      const size = `${Math.random() * 2 + 1}px`;
      return {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size,
        opacity: Math.random() * 0.3 + 0.1,
        duration: `${(Math.random() * 3 + 2).toFixed(1)}s`,
        delay: `${(Math.random() * 4).toFixed(1)}s`,
      };
    });
    setDots(generated);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {dots.map((dot, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-fog"
          style={{
            top: dot.top,
            left: dot.left,
            width: dot.size,
            height: dot.size,
            opacity: dot.opacity,
            animation: `starPulse ${dot.duration} ease-in-out infinite alternate`,
            animationDelay: dot.delay,
          }}
        />
      ))}
    </div>
  );
}
