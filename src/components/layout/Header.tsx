import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, User, Heart, ShoppingBag } from "lucide-react";
import IconButton from "../ui/IconButton";
import MobileMenu from "./MobileMenu";
import SearchOverlay from "./SearchOverlay";
import NavMenu from "./NavMenu";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalCount } = useCart();
  const { productIds } = useWishlist();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ivory/95 backdrop-blur-sm">
      <div className="container-page flex h-16 items-center justify-between gap-4 sm:h-20">
        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <IconButton icon={<Menu size={20} />} label="Open menu" onClick={() => setMenuOpen(true)} className="lg:hidden" />
          <Link to="/" className="flex items-center whitespace-nowrap">
            <img src="/brand/wordmark.png" alt="Pip & Panda" className="h-9 w-auto sm:h-11" />
          </Link>
        </div>

        <div className="no-scrollbar flex min-w-0 flex-1 justify-center overflow-x-auto">
          <NavMenu />
        </div>

        <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
          <IconButton icon={<Search size={19} />} label="Search" onClick={() => setSearchOpen(true)} />
          <Link to="/account">
            <IconButton icon={<User size={19} />} label="Account" />
          </Link>
          <Link to="/wishlist" className="relative">
            <IconButton icon={<Heart size={19} />} label="Wishlist" />
            {productIds.length > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-burgundy text-[10px] font-semibold text-ivory">
                {productIds.length}
              </span>
            )}
          </Link>
          <Link to="/bag" className="relative">
            <IconButton icon={<ShoppingBag size={19} />} label="Shopping Bag" />
            {totalCount > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-burgundy text-[10px] font-semibold text-ivory">
                {totalCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </header>
  );
}
