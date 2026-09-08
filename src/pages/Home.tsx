import HeroBanner from "../components/sections/HeroBanner";
import FeaturedProducts from "../components/sections/FeaturedProducts";
import CollectionTiles from "../components/sections/CollectionTiles";
import ProductProof from "../components/sections/ProductProof";
import ShopBySize from "../components/sections/ShopBySize";
import BrandStory from "../components/sections/BrandStory";
import LaunchSignup from "../components/sections/LaunchSignup";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <FeaturedProducts />
      <CollectionTiles />
      <ProductProof />
      <ShopBySize />
      <BrandStory />
      <LaunchSignup />
    </>
  );
}
