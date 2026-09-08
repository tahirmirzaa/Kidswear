import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import AnnouncementBar from "./AnnouncementBar";
import Header from "./Header";
import CheckoutHeader from "./CheckoutHeader";
import Footer from "./Footer";

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar />
      {pathname === "/checkout" ? <CheckoutHeader /> : <Header />}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
