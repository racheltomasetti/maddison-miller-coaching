"use client";

import { useId, useMemo } from "react";
import Particles from "@tsparticles/react";
import type { ISourceOptions } from "@tsparticles/engine";
import { PARTICLE_GOLD } from "@/app/lib/constants";

interface StarsProps {
  count?: number;
}

export default function Stars({ count = 15 }: StarsProps): React.ReactElement {
  const id = useId().replace(/:/g, "");

  const options = useMemo<ISourceOptions>(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: "transparent" } },
      interactivity: { events: {} },
      fpsLimit: 60,
      particles: {
        number: { value: count },
        paint: {
          color: { value: PARTICLE_GOLD },
          fill: { enable: true },
        },
        shape: { type: "circle" },
        opacity: {
          value: { min: 0.1, max: 0.7 },
          animation: { enable: true, speed: 0.4, sync: false },
        },
        size: {
          value: { min: 2, max: 4 },
        },
        effect: {
          type: "shadow",
          options: {
            shadow: {
              color: { value: PARTICLE_GOLD },
              blur: 12,
            },
          },
        },
        move: {
          enable: true,
          speed: 0.45,
          direction: "none",
          random: true,
          straight: false,
          outModes: { default: "out" },
        },
      },
      responsive: [
        {
          maxWidth: 768,
          options: {
            particles: { size: { value: { min: 1, max: 2.5 } } },
          },
        },
      ],
      detectRetina: true,
    }),
    [count],
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <Particles
        id={id}
        className="absolute inset-0 h-full w-full"
        options={options}
      />
    </div>
  );
}
