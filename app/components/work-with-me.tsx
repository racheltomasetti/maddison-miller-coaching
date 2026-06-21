import { ANCHORS } from "@/app/lib/constants";

const SERVICES = [
  {
    eyebrow: "One on One",
    title: "Private Engagement",
    description:
      "For the leader or founder ready to do the deep work. A private coaching partnership built around clarifying your vision, dissolving what keeps you from it, and finding the path that is truly yours.",
  },
  {
    eyebrow: "Organizations",
    title: "Corporate Programs",
    description:
      "When one leader transforms, it ripples outward. Tailored programs for companies scaling culture, building leadership presence, and moving teams from compliance to coherence.",
  },
  {
    eyebrow: "Cohort",
    title: "Group Immersive",
    description:
      "For founders and leaders who want community alongside depth. A curated cohort built around honest conversation, shared accountability, and the kind of growth that accelerates when you are not building alone.",
  },
] as const;

export default function WorkWithMe(): React.ReactElement {
  return (
    <section id={ANCHORS.WORK_WITH_ME} className="bg-cream py-32 px-6 md:px-12">
      <div className="max-w-[1100px] mx-auto">
        <p className="text-[0.7rem] tracking-[0.2em] uppercase text-taupe mb-4">
          Work With Me
        </p>
        <h2 className="font-display font-light text-[clamp(2rem,3.5vw,2.8rem)] text-navy leading-[1.2] mb-12">
          Where the work<br />
          <span className="italic text-dust">begins.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-taupe/30">
          {SERVICES.map((service, i) => (
            <div
              key={i}
              className={`p-8 md:p-12 hover:bg-warm transition-colors border-b border-taupe/30 md:border-b-0 ${
                i < SERVICES.length - 1 ? "md:border-r md:border-taupe/30" : ""
              }`}
            >
              <p className="text-[0.7rem] tracking-[0.2em] uppercase text-fog mb-4">
                {service.eyebrow}
              </p>
              <h3 className="font-display text-[1.6rem] font-light text-navy mb-4">
                {service.title}
              </h3>
              <p className="text-stone text-[1.05rem] leading-[1.8] font-light">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-px bg-warm p-8 md:p-12 flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
          <div className="flex-1">
            <h3 className="font-display text-[1.6rem] font-light italic text-navy mb-2">
              Ready to find your fit?
            </h3>
            <p className="text-stone text-[1.05rem] leading-[1.8] font-light">
              Book a complimentary discovery call. We'll figure out what works for you.
            </p>
          </div>
          <a
            href="#"
            className="bg-navy text-cream py-3 px-8 rounded-[2px] text-[0.72rem] tracking-[0.1em] uppercase hover:opacity-80 transition-opacity whitespace-nowrap"
          >
            Book a Discovery Call
          </a>
        </div>
      </div>
    </section>
  );
}
