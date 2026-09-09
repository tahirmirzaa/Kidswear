import Drawer from "../ui/Drawer";
import FilterSidebar from "./FilterSidebar";
import Button from "../ui/Button";
import type { FilterState } from "../../hooks/useProductFilters";

interface MobileFilterDrawerProps {
  open: boolean;
  onClose: () => void;
  resultCount: number;
  filters: FilterState;
  toggleValue: (key: keyof FilterState, value: string) => void;
  setMaxPrice: (value: number) => void;
  resetFilters: () => void;
  activeCount: number;
}

export default function MobileFilterDrawer(props: MobileFilterDrawerProps) {
  const { open, onClose, resultCount, ...filterProps } = props;
  return (
    <Drawer open={open} onClose={onClose} title="Filters" side="bottom">
      <div className="max-h-[65vh] overflow-y-auto px-5">
        <FilterSidebar {...filterProps} />
      </div>
      <div className="border-t border-line p-4">
        <Button variant="primary" fullWidth onClick={onClose}>
          Show {resultCount} Results
        </Button>
      </div>
    </Drawer>
  );
}
