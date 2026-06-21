import { ANCHORS } from "@/app/lib/constants";

const POSTS = [
  {
    tag: "On Leadership",
    title: "The AND you've been told you can't have",
    excerpt:
      "We learned early to put limitations on what's possible. A job that pays well AND feels meaningful. Success AND ease. What if those were never in opposition?",
    date: "Coming soon",
  },
  {
    tag: "On Identity",
    title: "What is your life well lived?",
    excerpt:
      "Imagine waking up tomorrow and the thing you've been working toward is simply there. What does that feel like? Not what does it look like — how does it feel?",
    date: "Coming soon",
  },
  {
    tag: "On Fear",
    title: "The opposite of fear isn't courage — it's love",
    excerpt:
      "The leaders who make the biggest shifts aren't fearless. They're finally connected to something bigger than their fear.",
    date: "Coming soon",
  },
] as const;

export default function Journal(): React.ReactElement {
  return (
    <section id={ANCHORS.JOURNAL} className="bg-warm py-32 px-6 md:px-12">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[0.7rem] tracking-[0.2em] uppercase text-taupe mb-4">
              Journal
            </p>
            <h2 className="font-display font-light text-[clamp(2rem,3.5vw,2.8rem)] text-navy leading-[1.2]">
              Thoughts from<br />
              <span className="italic text-dust">the work.</span>
            </h2>
          </div>
          <a
            href="#"
            className="text-[0.72rem] tracking-[0.12em] uppercase text-stone hover:text-navy transition-colors mb-2"
          >
            View all
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-taupe/10">
          {POSTS.map((post, i) => (
            <article
              key={i}
              className="bg-cream hover:bg-white focus-within:bg-white transition-colors p-10 cursor-default"
              tabIndex={0}
            >
              <p className="text-[0.65rem] tracking-[0.2em] uppercase text-taupe mb-4">
                {post.tag}
              </p>
              <h3 className="font-display text-[1.3rem] font-light text-navy leading-[1.3] mb-4">
                {post.title}
              </h3>
              <p className="text-stone text-[0.95rem] leading-[1.7] font-light mb-6">
                {post.excerpt}
              </p>
              <p className="text-[0.65rem] tracking-[0.15em] uppercase text-taupe/70">
                {post.date}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
