"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface ConstellationNode {
  x: number;
  y: number;
  label: string;
  description: string;
}

const NODES: ConstellationNode[] = [
  { x: 0.5,  y: 0.06, label: "Your Vision",   description: "What lights you on fire" },
  { x: 0.2,  y: 0.4,  label: "Your Values",   description: "What you will not compromise" },
  { x: 0.8,  y: 0.4,  label: "Your Gifts",    description: "What only you can offer" },
  { x: 0.5,  y: 0.82, label: "Your Purpose",  description: "Where it all converges" },
];

const EDGES: [number, number][] = [[0, 1], [0, 2], [1, 3], [2, 3]];

const CANVAS_W = 480;
const CANVAS_H = 360;
const HIT_RADIUS = 28;
const TOTAL_STEPS = EDGES.length + NODES.length;
const ANIM_DURATION = 1800;

function getCoords(node: ConstellationNode): { x: number; y: number } {
  return { x: node.x * CANVAS_W, y: node.y * CANVAS_H };
}

export default function ConstellationMethod(): React.ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const activeNodeRef = useRef<number | null>(null);
  const progressRef = useRef(0);
  const animDoneRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  const draw = useCallback((progress: number, highlighted: number | null): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

    // Draw edges
    EDGES.forEach(([a, b], i) => {
      if (progress <= i) return;
      const segP = Math.min(progress - i, 1);
      const from = getCoords(NODES[a]);
      const to = getCoords(NODES[b]);
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(from.x + (to.x - from.x) * segP, from.y + (to.y - from.y) * segP);
      ctx.strokeStyle = "rgba(201,212,220,0.6)";
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Draw nodes
    NODES.forEach((node, i) => {
      if (progress <= EDGES.length + i) return;
      const { x, y } = getCoords(node);
      const isActive = highlighted === i;

      ctx.beginPath();
      ctx.arc(x, y, isActive ? 10 : 7, 0, Math.PI * 2);
      ctx.fillStyle = isActive ? "rgba(143,163,177,0.9)" : "rgba(143,163,177,0.5)";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(250,250,247,0.9)";
      ctx.fill();
    });
  }, []);

  useEffect(() => {
    let start: number | null = null;

    const animate = (ts: number): void => {
      if (!start) start = ts;
      const progress = Math.min(((ts - start) / ANIM_DURATION) * TOTAL_STEPS, TOTAL_STEPS);
      progressRef.current = progress;
      draw(progress, activeNodeRef.current);
      if (progress < TOTAL_STEPS) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        animDoneRef.current = true;
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [draw]);

  useEffect(() => {
    activeNodeRef.current = activeNode;
    if (animDoneRef.current) {
      draw(progressRef.current, activeNode);
    }
  }, [activeNode, draw]);

  const getHoveredNode = useCallback((clientX: number, clientY: number): number | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const scaleX = CANVAS_W / rect.width;
    const scaleY = CANVAS_H / rect.height;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;
    for (let i = 0; i < NODES.length; i++) {
      const { x: nx, y: ny } = getCoords(NODES[i]);
      if (Math.sqrt((x - nx) ** 2 + (y - ny) ** 2) <= HIT_RADIUS) return i;
    }
    return null;
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>): void => {
      setActiveNode(getHoveredNode(e.clientX, e.clientY));
    },
    [getHoveredNode]
  );

  const handleMouseLeave = useCallback((): void => setActiveNode(null), []);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>): void => {
      const t = e.touches[0];
      setActiveNode(getHoveredNode(t.clientX, t.clientY));
    },
    [getHoveredNode]
  );

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLCanvasElement>): void => {
    if (!["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(e.key)) return;
    e.preventDefault();
    setActiveNode((prev) => (prev === null ? 0 : (prev + 1) % NODES.length));
  }, []);

  return (
    <section className="bg-warm py-32 px-6 md:px-12">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">

        {/* Left — Canvas */}
        <div>
          <canvas
            ref={canvasRef}
            width={CANVAS_W}
            height={CANVAS_H}
            className="w-full h-auto"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="application"
            aria-label="Interactive constellation showing Your Vision, Your Values, Your Gifts, and Your Purpose"
          />
          <div className="mt-4 text-center min-h-[3.5rem]">
            {activeNode !== null ? (
              <>
                <p className="font-display text-[1.1rem] italic text-navy">
                  {NODES[activeNode].label}
                </p>
                <p className="text-[0.85rem] text-stone mt-1">
                  {NODES[activeNode].description}
                </p>
              </>
            ) : (
              <p className="text-[0.7rem] tracking-[0.15em] uppercase text-taupe/70 pt-3">
                <span className="md:hidden">Click</span>
                <span className="hidden md:inline">Hover</span>
                {" "}the constellation to explore
              </p>
            )}
          </div>
        </div>

        {/* Right — Copy */}
        <div>
          <p className="text-[0.7rem] tracking-[0.2em] uppercase text-taupe mb-4">
            The method
          </p>
          <h2 className="font-display font-light text-[clamp(2rem,3.5vw,2.8rem)] text-navy leading-[1.2] mb-8">
            You already know<br />
            <span className="italic text-dust">who you are.</span>
          </h2>
          <div className="space-y-6 text-stone text-[1.05rem] leading-[1.8] font-light">
            <p>
              Somewhere between what the world expected of you and the stories you learned to tell yourself, you drifted from yourself. But the signal never went dark. It is still there.
            </p>
            <p>
              My work is not about teaching you who to be. It is about clearing away everything that convinced you otherwise — and helping you reconnect to yourself. All of it. The parts you have been performing around, the parts you buried, the parts that have been waiting.
            </p>
            <p>
              When you know yourself at that level, the strategy becomes obvious. The decisions get clearer. And everyone around you feels it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
