import Nav from "@/app/components/nav";
import Hero from "@/app/components/hero";
import Mirror from "@/app/components/mirror";
import ConstellationMethod from "@/app/components/constellation-method";
import QuoteBreak from "@/app/components/quote-break";
import WorkWithMe from "@/app/components/work-with-me";
import AskAnything from "@/app/components/ask-anything";
import About from "@/app/components/about";
import Journal from "@/app/components/journal";
import Footer from "@/app/components/footer";

export default function Home(): React.ReactElement {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Mirror />
        <ConstellationMethod />
        <QuoteBreak />
        <WorkWithMe />
        <AskAnything />
        <About />
        <Journal />
      </main>
      <Footer />
    </>
  );
}
