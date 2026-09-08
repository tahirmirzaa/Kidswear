import { Leaf, ShieldCheck, Wind, Recycle } from "lucide-react";
import { productProof } from "../../data/content";
import SectionHeading from "../ui/SectionHeading";
import HorizontalScroller from "../ui/HorizontalScroller";

const icons: Record<string, React.ReactNode> = {
  leaf: <Leaf size={22} />,
  "shield-check": <ShieldCheck size={22} />,
  wind: <Wind size={22} />,
  recycle: <Recycle size={22} />,
};

export default function ProductProof() {
  return (
    <section className="bg-sage/40 py-14 sm:py-20">
      <div className="container-page">
        <SectionHeading
          align="center"
          eyebrow="Fabric and Fit"
          title="What's Actually in Every Piece"
          description="Real construction details from our launch range, not marketing claims."
        />
        <HorizontalScroller>
          {productProof.map((item) => (
            <div
              key={item.id}
              className="flex w-[70%] flex-none flex-col items-center gap-3 rounded-2xl bg-white/70 p-6 text-center sm:w-[42%] lg:w-1/4"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-burgundy">
                {icons[item.icon]}
              </div>
              <h3 className="text-sm font-semibold text-ink">{item.title}</h3>
              <p className="text-xs leading-relaxed text-ink-soft">{item.description}</p>
            </div>
          ))}
        </HorizontalScroller>
      </div>
    </section>
  );
}
