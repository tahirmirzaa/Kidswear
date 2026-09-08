import { Link } from "react-router-dom";
import { launchCollections } from "../../data/taxonomy";
import SectionHeading from "../ui/SectionHeading";

export default function CollectionTiles() {
  return (
    <section className="container-page py-14 sm:py-20">
      <SectionHeading eyebrow="Explore" title="Shop the Launch Range" description="Two collections, built to last through everyday wear." />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {launchCollections.map((collection) => (
          <Link
            key={collection.slug}
            to={`/category/${collection.slug}`}
            className="group relative flex aspect-[4/3] items-end overflow-hidden rounded-2xl"
          >
            <img
              src={collection.image}
              alt={collection.label}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
            <div className="relative p-6 text-ivory">
              <h3 className="font-serif text-2xl">{collection.label}</h3>
              <p className="mt-1 text-sm text-ivory/85">{collection.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
