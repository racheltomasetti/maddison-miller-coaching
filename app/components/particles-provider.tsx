"use client";

import { ParticlesProvider } from "@tsparticles/react";
import { loadShadowEffect } from "@tsparticles/effect-shadow";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

async function initParticles(engine: Engine): Promise<void> {
  await loadSlim(engine);
  await loadShadowEffect(engine);
}

export default function AppParticlesProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <ParticlesProvider init={initParticles}>{children}</ParticlesProvider>
  );
}
