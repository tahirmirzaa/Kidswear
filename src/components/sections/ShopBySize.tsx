import { Link } from "react-router-dom";
import { launchSizes } from "../../data/taxonomy";
import SectionHeading from "../ui/SectionHeading";

export default function ShopBySize() {
  return (
    <section className="container-page py-14 sm:py-20">
      <SectionHeading eyebrow="Growing Up" title="Shop by Size" description="Our launch range covers ages 2-6. Find their perfect fit." />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {launchSizes.map((size) => (
          <Link
            key={size.slug}
            to={`/shop-by-age/${size.slug}`}
            className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-line py-8 text-center transition-colors hover:border-ink"
          >
            <p className="font-serif text-2xl text-ink">{size.label}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
