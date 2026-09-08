import { Link } from "react-router-dom";
import Button from "../ui/Button";
import { realPhoto } from "../../lib/images";

export default function HeroBanner() {
  return (
    <section className="relative flex h-[92svh] max-h-[880px] min-h-[440px] items-end overflow-hidden bg-ink">
      <img
        src={realPhoto("1516890896652-41ca1a35787c", 1800)}
        alt="Child in cotton everyday wear from Pip & Panda's launch range"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/10" />
      <div className="container-page relative w-full pb-10 pt-8 sm:pb-16">
        <div className="max-w-xl">
          <span className="inline-block border-b border-burgundy/70 pb-1 text-xs font-semibold uppercase tracking-[0.3em] text-butter">
            Coming Soon
          </span>
          <h1 className="mt-5 font-serif text-4xl leading-[1.1] text-ivory sm:text-5xl lg:text-6xl xl:text-7xl">
            Little outfits. <em className="italic text-butter">Big</em> everyday adventures.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-ivory/80">
            Discover everyday sets and nightwear for ages 2-6.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Link to="/category/everyday-sets">
              <Button variant="primary" size="lg" className="!bg-ivory !text-ink hover:!bg-butter">
                Explore the Collection
              </Button>
            </Link>
            <a
              href="#notify-me"
              className="border-b border-ivory/50 pb-1 text-sm font-semibold uppercase tracking-wide text-ivory transition-colors hover:border-ivory hover:text-butter"
            >
              Notify Me at Launch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
