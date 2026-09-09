import Breadcrumb from "../components/ui/Breadcrumb";
import { brandStory, productProof } from "../data/content";
import { realPhoto } from "../lib/images";
import { Leaf, ShieldCheck, Wind, Recycle } from "lucide-react";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

const icons: Record<string, React.ReactNode> = {
  leaf: <Leaf size={20} />,
  "shield-check": <ShieldCheck size={20} />,
  wind: <Wind size={20} />,
  recycle: <Recycle size={20} />,
};

export default function AboutUs() {
  useDocumentMeta({
    title: "Our Story | Pip & Panda",
    description: "The story behind Pip & Panda's cotton everyday sets and nightwear for children aged 2-6.",
  });

  return (
    <div>
      <div className="relative flex h-56 items-center justify-center overflow-hidden bg-ink sm:h-72">
        <img src={brandStory.image} alt="Pip & Panda studio" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/55" />
        <h1 className="relative font-serif text-4xl text-ivory sm:text-5xl">About Pip & Panda</h1>
      </div>

      <div className="container-page py-4">
        <Breadcrumb items={[{ label: "About Us" }]} />
      </div>

      <div className="container-page grid grid-cols-1 items-center gap-10 pb-16 lg:grid-cols-2">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-burgundy">{brandStory.eyebrow}</span>
          <h2 className="mt-2 font-serif text-3xl text-ink">{brandStory.title}</h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">{brandStory.body}</p>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            We believe children shouldn't have to choose between clothes that look good and clothes that feel good,
            so we build both into every stitch of our launch range: cotton Everyday Sets and Nightwear for ages 2-6.
          </p>
        </div>
        <div className="aspect-[4/5] overflow-hidden rounded-2xl">
          <img src={realPhoto("1490481651871-ab68de25d43d")} alt="Design studio" className="h-full w-full object-cover" />
        </div>
      </div>

      <div className="bg-sage/30 py-16">
        <div className="container-page">
          <h2 className="text-center font-serif text-3xl text-ink">Why Parents Trust Us</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {productProof.map((item) => (
              <div key={item.id} className="flex flex-col items-center gap-3 rounded-2xl bg-white/70 p-6 text-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-burgundy">{icons[item.icon]}</div>
                <h3 className="text-sm font-semibold text-ink">{item.title}</h3>
                <p className="text-xs leading-relaxed text-ink-soft">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
