import { ANCHORS } from "@/app/lib/constants";

export default function About(): React.ReactElement {
  return (
    <section id={ANCHORS.ABOUT} className="bg-cream py-32 px-6 md:px-12">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">

        {/* Photo placeholder */}
        <div className="aspect-[3/4] bg-gradient-to-b from-warm to-mist border border-taupe/20 rounded-[2px] flex items-center justify-center">
          <span
            className="font-display text-[3.5rem] text-taupe opacity-60 select-none"
            aria-hidden="true"
          >
            MM
          </span>
        </div>

        {/* Copy */}
        <div>
          <p className="text-[0.7rem] tracking-[0.2em] uppercase text-taupe mb-4">
            About
          </p>
          <h2 className="font-display font-light text-[clamp(2rem,3.5vw,2.8rem)] text-navy mb-6">
            Maddison Miller
          </h2>
          <p className="font-display italic text-[1.15rem] text-navy mb-8 leading-[1.6]">
            I believe the work starts with the leader — and ripples outward from there.
          </p>
          <div className="space-y-5 text-stone text-[1.05rem] leading-[1.8] font-light">
            <p>
              I work with executives, founders, and people who sense there is more than the path they defaulted into — whether you are building something of your own or still inside a corporate world that no longer feels like yours.
            </p>
            <p>
              When you reconnect to what actually lights you up, something shifts. Not just for you. The people around you feel it. Your team, your family, every room you walk into. A leader showing up coherent and authentic does not stay contained. It spreads.
            </p>
            <p>
              My role is to help you hear yourself again. Underneath the conditioning, the fear of what people think, the stories about who you are supposed to be. You already have the wisdom. I create the space for you to access it.
            </p>
            <p>
              There is nothing quite like watching someone realize the life they have been reaching for is not out of reach. It is yours to create.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
