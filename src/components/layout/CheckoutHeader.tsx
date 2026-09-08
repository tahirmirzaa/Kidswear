import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function CheckoutHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ivory/95 backdrop-blur-sm">
      <div className="container-page flex h-16 items-center justify-between gap-4 sm:h-20">
        <Link to="/" className="flex items-center whitespace-nowrap">
          <img src="/brand/panda-in-p.png" alt="Pip & Panda" className="h-9 w-auto sm:h-11" />
        </Link>
        <Link to="/bag" className="flex items-center gap-1.5 text-sm font-medium text-ink hover:text-burgundy">
          <ArrowLeft size={16} />
          Back to Bag
        </Link>
      </div>
    </header>
  );
}
