import { Link } from "react-router-dom";
import { launchSizes } from "../../data/taxonomy";
import SectionHeading from "../ui/SectionHeading";

export default function ShopBySize() {
  return (
    <section className="container-page py-14 sm:py-20">
      <SectionHeading eyebrow="Growing Up" title="Shop by Size" description="Our launch range covers ages 2-6. Find their perfect fit." />
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
        {launchSizes.map((size) => (
          <Link key={size.slug} to={`/shop-by-age/${size.slug}`} className="group flex flex-col items-center gap-3 text-center">
            <div className="aspect-square w-full overflow-hidden rounded-full bg-ivory-dark">
              <img
                src={size.image}
                alt={size.label}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <p className="font-serif text-xl text-ink transition-colors group-hover:text-burgundy">{size.label}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
