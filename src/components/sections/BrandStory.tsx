import { Link } from "react-router-dom";
import { brandStory } from "../../data/content";
import Button from "../ui/Button";

export default function BrandStory() {
  return (
    <section className="container-page py-14 sm:py-20">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="aspect-[4/5] overflow-hidden rounded-2xl">
          <img src={brandStory.image} alt="Pip & Panda brand story" className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col items-start gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-burgundy">{brandStory.eyebrow}</span>
          <h2 className="font-serif text-3xl text-ink sm:text-4xl">{brandStory.title}</h2>
          <p className="text-sm leading-relaxed text-ink-soft">{brandStory.body}</p>
          <Link to="/about">
            <Button variant="outline" size="md">
              Read Our Story
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
