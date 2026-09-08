import { Link } from "react-router-dom";
import { mainNav } from "../../data/taxonomy";

export default function NavMenu() {
  return (
    <nav className="hidden lg:block">
      <ul className="flex items-center gap-2.5 whitespace-nowrap xl:gap-6">
        {mainNav.map((item) => (
          <li key={item.label}>
            <Link
              to={item.to}
              className="whitespace-nowrap text-xs font-semibold uppercase tracking-normal text-ink transition-colors hover:text-burgundy xl:tracking-wide"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
