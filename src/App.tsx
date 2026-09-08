import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import AgePage, { ShopByAgeIndex } from "./pages/AgePage";
import OccasionPage from "./pages/OccasionPage";
import NewArrivalsPage from "./pages/NewArrivalsPage";
import SalePage from "./pages/SalePage";
import BestSellersPage from "./pages/BestSellersPage";
import SearchResults from "./pages/SearchResults";
import ProductDetail from "./pages/ProductDetail";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderTracking from "./pages/OrderTracking";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Account from "./pages/Account";
import Addresses from "./pages/Addresses";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import FAQs from "./pages/FAQs";
import ShippingReturns from "./pages/ShippingReturns";
import SizeGuide from "./pages/SizeGuide";
import { PrivacyPolicy, Terms } from "./pages/StaticPolicy";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/new-arrivals" element={<NewArrivalsPage />} />
        <Route path="/sale" element={<SalePage />} />
        <Route path="/best-sellers" element={<BestSellersPage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/shop-by-age" element={<ShopByAgeIndex />} />
        <Route path="/shop-by-age/:slug" element={<AgePage />} />
        <Route path="/occasion/:slug" element={<OccasionPage />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/bag" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
        <Route path="/orders/track" element={<OrderTracking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/account" element={<Account />} />
        <Route path="/addresses" element={<Addresses />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/shipping-returns" element={<ShippingReturns />} />
        <Route path="/size-guide" element={<SizeGuide />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
