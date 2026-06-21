import { ANCHORS } from "@/app/lib/constants";

const QUESTIONS = [
  "What am I actually building — and does it still feel like mine?",
  "I built the life I was told to want. Why doesn't it feel like enough?",
  "What would I do if I truly stopped caring what others thought of me?",
  "Is this the life I chose, or the one I defaulted into?",
  "What actually makes me feel alive?",
] as const;

export default function Mirror(): React.ReactElement {
  return (
    <section id={ANCHORS.MIRROR} className="py-20 md:py-32 px-6 md:px-12 bg-cream">
      <div className="max-w-[900px] mx-auto">
        <p className="text-[0.7rem] tracking-[0.2em] uppercase text-taupe mb-10">
          You might be asking yourself
        </p>

        <ul>
          {QUESTIONS.map((question, i) => (
            <li
              key={i}
              className="py-[1.8rem] border-b border-taupe/25 font-display text-[clamp(1.2rem,2.2vw,1.55rem)] italic text-navy"
            >
              {question}
            </li>
          ))}
        </ul>

        <p className="mt-12 text-stone text-[1.05rem] leading-[1.8] font-light text-center max-w-[700px] mx-auto">
          These aren't distractions. They're invitations. The clarity you're seeking isn't in another strategy framework or productivity system. It's in finally getting honest with yourself about who you are when all the noise falls away.
        </p>
      </div>
    </section>
  );
}
