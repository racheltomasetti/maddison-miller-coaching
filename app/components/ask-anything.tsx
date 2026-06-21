"use client";

import { useState } from "react";

export default function AskAnything(): React.ReactElement {
  const [question, setQuestion] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submittedQuestion, setSubmittedQuestion] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const trimmed = question.trim();
    if (!trimmed) return;
    setSubmittedQuestion(trimmed);
    setSubmitted(true);
  };

  return (
    <section className="bg-mist py-32 px-6 md:px-12">
      <div className="max-w-[700px] mx-auto text-center">
        <p className="text-[0.7rem] tracking-[0.2em] uppercase text-dust mb-4">
          Not sure where to start?
        </p>
        <h2 className="font-display font-light italic text-[clamp(1.8rem,3vw,2.5rem)] text-navy leading-[1.2] mb-10">
          Bring the question or the feeling you can&rsquo;t quite name.
        </h2>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <textarea
              aria-label="Your question"
              placeholder="What's on your mind?"
              rows={4}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full bg-cream/80 border border-taupe rounded-[2px] p-5 font-display italic text-[1.05rem] text-navy placeholder:text-taupe/60 resize-none focus:outline-none focus:border-dust transition-colors"
            />
            <button
              type="submit"
              className="self-center bg-navy text-cream py-3 px-10 rounded-[2px] text-[0.72rem] tracking-[0.1em] uppercase hover:opacity-80 transition-opacity"
            >
              Send
            </button>
          </form>
        ) : (
          <div className="animate-fade-up">
            <p className="font-display text-[1.3rem] italic text-navy leading-[1.5]">
              &ldquo;{submittedQuestion}&rdquo;
            </p>
            <p className="mt-6 text-dust text-[1.2rem]">✦</p>
            <p className="mt-6 font-display italic text-[1.15rem] text-navy">
              The answer you&rsquo;re looking for is already within you.
            </p>
            <p className="mt-4 text-stone text-[1.05rem] leading-[1.8] font-light">
              A discovery call is where we unlock it together.
            </p>
            <a
              href="#"
              className="mt-8 inline-block bg-navy text-cream py-3 px-10 rounded-[2px] text-[0.72rem] tracking-[0.1em] uppercase hover:opacity-80 transition-opacity"
            >
              Book a Discovery Call
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
