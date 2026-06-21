import Stars from "@/app/components/stars";

export default function Footer(): React.ReactElement {
  return (
    <footer className="relative bg-navy overflow-hidden py-16 px-6 md:px-12">
      <Stars count={20} />
      <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8 md:gap-0">

        {/* Left */}
        <div className="md:w-[260px]">
          <p className="font-display text-cream font-light text-[1.3rem]">
            Maddison Miller
          </p>
          <p className="text-[0.65rem] tracking-[0.2em] uppercase text-dust mt-1">
            Leadership · Clarity · Alignment
          </p>
        </div>

        {/* Center */}
        <div className="flex-1 md:text-center">
          <p className="font-display italic text-cream/60 text-[1.05rem] font-light">
            All in service of your life, well lived.
          </p>
        </div>

        {/* Right */}
        <div className="md:w-[260px] md:text-right">
          <p className="text-[0.65rem] tracking-[0.15em] uppercase text-dust">
            &copy; 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
