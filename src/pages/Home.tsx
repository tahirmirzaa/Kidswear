import HeroBanner from "../components/sections/HeroBanner";
import FeaturedProducts from "../components/sections/FeaturedProducts";
import CollectionTiles from "../components/sections/CollectionTiles";
import ProductProof from "../components/sections/ProductProof";
import ShopBySize from "../components/sections/ShopBySize";
import BrandStory from "../components/sections/BrandStory";
import LaunchSignup from "../components/sections/LaunchSignup";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

export default function Home() {
  useDocumentMeta({
    title: "Pip & Panda | Everyday Sets & Nightwear for Ages 2-6",
    description: "Explore everyday sets and nightwear for children aged 2-6 at Pip & Panda. Preview the first collection and sign up for launch updates.",
  });

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
