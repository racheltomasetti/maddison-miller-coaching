import { ANCHORS } from "@/app/lib/constants";

function MoonIcon(): React.ReactElement {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M27.5 19.5A13 13 0 0 1 12.5 4.5a13 13 0 0 0 0 23 13 13 0 0 0 15-8z"
        fill="#8FA3B1"
        opacity="0.35"
      />
    </svg>
  );
}

export default function Hero(): React.ReactElement {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-24 px-8 bg-[linear-gradient(160deg,#F5F0E8_0%,#FAFAF7_50%,#EEF2F5_100%)] overflow-hidden">

      <div className="animate-fade-up [animation-delay:0s] mb-6">
        <MoonIcon />
      </div>

      <p className="animate-fade-up [animation-delay:0.1s] text-[0.7rem] tracking-[0.2em] uppercase text-taupe mb-6 text-center">
        Leadership · Clarity · Alignment
      </p>

      <h1 className="animate-fade-up [animation-delay:0.2s] font-display font-light text-[clamp(2rem,8vw,3.5rem)] text-center leading-[1.15] mb-6 max-w-[900px]">
        <span className="block whitespace-normal sm:whitespace-nowrap">
          The clearest strategy you will ever have
        </span>
        <span className="block italic text-dust">
          is knowing who you truly are.
        </span>
      </h1>

      <p className="animate-fade-up [animation-delay:0.35s] max-w-[520px] text-stone text-[1.05rem] leading-[1.8] font-light text-center mb-10">
        For those ready to move from scattered momentum to soul-aligned vision — without abandoning what they've built.
      </p>

      <div className="animate-fade-up [animation-delay:0.5s] flex flex-wrap gap-4 justify-center">
        <a
          href={`#${ANCHORS.WORK_WITH_ME}`}
          className="bg-navy text-cream py-3 px-8 rounded-[2px] text-[0.72rem] tracking-[0.1em] uppercase hover:opacity-80 transition-opacity"
        >
          Work With Me
        </a>
        <a
          href={`#${ANCHORS.ABOUT}`}
          className="border border-taupe/50 text-stone py-3 px-8 rounded-[2px] text-[0.72rem] tracking-[0.1em] uppercase hover:text-navy hover:border-taupe transition-colors"
        >
          Learn More
        </a>
      </div>

    </section>
  );
}
