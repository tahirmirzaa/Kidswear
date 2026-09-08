import { Link } from "react-router-dom";
import Button from "../ui/Button";
import { realPhoto } from "../../lib/images";

export default function HeroBanner() {
  return (
    <section className="relative flex h-[92svh] max-h-[880px] min-h-[440px] items-end overflow-hidden bg-ink">
      <img
        src={realPhoto("1784439199357-8da7b7a2afbf", 1800)}
        alt="Children wearing Pip & Panda's new season collection"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/10" />
      <div className="container-page relative w-full pb-10 pt-8 sm:pb-16">
        <div className="max-w-xl">
          <span className="inline-block border-b border-burgundy/70 pb-1 text-xs font-semibold uppercase tracking-[0.3em] text-butter">
            Autumn–Winter Edit
          </span>
          <h1 className="mt-5 font-serif text-4xl leading-[1.1] text-ivory sm:text-5xl lg:text-6xl xl:text-7xl">
            Dressed for <em className="italic text-butter">wonder</em>, built for play
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-ivory/80">
            Thoughtfully crafted clothing for newborns to fourteen-year-olds, soft on skin,
            strong on style, and made for every little adventure in between.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Link to="/new-arrivals">
              <Button variant="primary" size="lg" className="!bg-ivory !text-ink hover:!bg-butter">
                Shop Now
              </Button>
            </Link>
            <Link
              to="/shop-by-age"
              className="border-b border-ivory/50 pb-1 text-sm font-semibold uppercase tracking-wide text-ivory transition-colors hover:border-ivory hover:text-butter"
            >
              Shop by Age
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
