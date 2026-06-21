import Stars from "@/app/components/stars";

export default function QuoteBreak(): React.ReactElement {
  return (
    <section className="relative bg-navy py-28 md:py-[7rem] px-5 md:px-12 overflow-hidden text-center">
      <Stars count={12} />
      <div className="relative z-10 max-w-[900px] mx-auto">
        <blockquote className="font-display font-light italic text-warm leading-[1.4] text-[clamp(0.8rem,calc((100vw-2.5rem)/21),1.35rem)] md:text-[clamp(1.4rem,2.5vw,2.6rem)]">
          <span className="block whitespace-nowrap md:whitespace-normal">
            &ldquo;The most courageous act is still to think for yourself.
          </span>
          <span className="block">Aloud.&rdquo;</span>
        </blockquote>
        <p className="mt-6 text-[0.65rem] tracking-[0.15em] uppercase text-dust">
          Coco Chanel
        </p>
      </div>
    </section>
  );
}
