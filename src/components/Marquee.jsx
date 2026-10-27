const ITEMS = [
  "WEB DEVELOPMENT",
  "MOBILE APPS",
  "CLOUD ARCHITECTURE",
  "AI / MACHINE LEARNING",
  "DEVOPS & SRE",
  "UI / UX ENGINEERING",
  "BLOCKCHAIN",
  "REAL-TIME SYSTEMS",
];

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="relative w-full overflow-hidden border-y border-white/10 bg-black py-5">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center font-heading font-bold text-2xl md:text-4xl text-white/80 mx-8">
            {item}
            <span className="mx-8 text-white/20">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}