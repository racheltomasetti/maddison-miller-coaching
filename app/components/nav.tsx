"use client";

import { useEffect, useState } from "react";
import { ANCHORS } from "@/app/lib/constants";

export default function Nav(): React.ReactElement {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-[400ms] ${
        scrolled
          ? "bg-cream/[0.88] backdrop-blur-[12px] border-b border-taupe/20"
          : ""
      }`}
    >
      <a
        href="#"
        className="font-display text-[1.1rem] tracking-[0.02em] text-navy"
      >
        Maddison Miller
      </a>

      <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
        <a
          href={`#${ANCHORS.WORK_WITH_ME}`}
          className="text-[0.72rem] tracking-[0.12em] uppercase text-stone hover:text-navy transition-colors"
        >
          Work With Me
        </a>
        <a
          href={`#${ANCHORS.ABOUT}`}
          className="text-[0.72rem] tracking-[0.12em] uppercase text-stone hover:text-navy transition-colors"
        >
          About
        </a>
        <a
          href={`#${ANCHORS.JOURNAL}`}
          className="text-[0.72rem] tracking-[0.12em] uppercase text-stone hover:text-navy transition-colors"
        >
          Journal
        </a>
      </nav>

      <a
        href={`#${ANCHORS.WORK_WITH_ME}`}
        className="border border-navy/30 py-2 px-[1.2rem] rounded-[2px] text-[0.72rem] tracking-[0.12em] uppercase text-navy hover:bg-navy hover:text-cream transition-colors"
      >
        Book a Call
      </a>
    </header>
  );
}
