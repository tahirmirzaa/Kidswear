import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import type { Product } from "../../types";
import Breadcrumb from "../ui/Breadcrumb";
import FilterSidebar from "./FilterSidebar";
import MobileFilterDrawer from "./MobileFilterDrawer";
import SortDropdown from "./SortDropdown";
import ProductGrid from "./ProductGrid";
import QuickViewModal from "./QuickViewModal";
import EmptyState from "../ui/EmptyState";
import Button from "../ui/Button";
import { useProductFilters } from "../../hooks/useProductFilters";
import { PackageSearch } from "lucide-react";

interface ProductListingProps {
  title: string;
  description?: string;
  bannerImage?: string;
  breadcrumbLabel: string;
  products: Product[];
}

const PAGE_SIZE = 8;

export default function ProductListing({ title, description, bannerImage, breadcrumbLabel, products }: ProductListingProps) {
  const { filters, toggleValue, setMaxPrice, resetFilters, activeCount, sort, setSort, filtered } =
    useProductFilters(products);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visibleProducts = filtered.slice(0, visibleCount);

  return (
    <div>
      <div className="relative flex h-56 items-center justify-center overflow-hidden bg-ink sm:h-72">
        {bannerImage && <img src={bannerImage} alt={title} className="absolute inset-0 h-full w-full object-cover" />}
        <div className="absolute inset-0 bg-ink/55" />
        <div className="relative text-center">
          <h1 className="font-serif text-4xl text-ivory sm:text-5xl">{title}</h1>
          {description && <p className="mt-2 max-w-md text-sm text-ivory/80">{description}</p>}
        </div>
      </div>

      <div className="container-page py-3">
        <Breadcrumb items={[{ label: breadcrumbLabel }]} />
      </div>

      <div className="container-page grid grid-cols-1 gap-8 pb-16 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <FilterSidebar
            filters={filters}
            toggleValue={toggleValue}
            setMaxPrice={setMaxPrice}
            resetFilters={resetFilters}
            activeCount={activeCount}
          />
        </aside>

        <div>
          <div className="mb-5 flex items-center justify-between border-b border-line pb-4">
            <p className="text-sm text-ink-soft">
              <span className="font-semibold text-ink">{filtered.length}</span> Products
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-xs font-medium text-ink lg:hidden"
              >
                <SlidersHorizontal size={14} />
                Filters {activeCount > 0 && `(${activeCount})`}
              </button>
              <SortDropdown value={sort} onChange={setSort} />
            </div>
          </div>

          {visibleProducts.length === 0 ? (
            <EmptyState
              icon={<PackageSearch size={32} />}
              title="No products match these filters"
              description="Try adjusting or clearing some filters to see more results."
            />
          ) : (
            <>
              <ProductGrid products={visibleProducts} onQuickView={setQuickViewProduct} />
              {visibleCount < filtered.length && (
                <div className="mt-10 flex justify-center">
                  <Button variant="outline" onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}>
                    Load More
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <MobileFilterDrawer
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        resultCount={filtered.length}
        filters={filters}
        toggleValue={toggleValue}
        setMaxPrice={setMaxPrice}
        resetFilters={resetFilters}
        activeCount={activeCount}
      />
      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}
