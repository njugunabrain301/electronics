"use client";
import { useGlobalContext } from "@/Context/context";
import ProductSectionContent from "./Content/ProductSection";

const ProductSection = ({ products, showPrice, title, profile }) => {
  let storeData = products;
  const { theme, titleFont } = useGlobalContext();
  return (
    <ProductSectionContent
      showPrice={showPrice}
      title={title}
      profile={profile}
      storeData={storeData}
      theme={theme}
      titleFont={titleFont}
    />
  );
};

export default ProductSection;
