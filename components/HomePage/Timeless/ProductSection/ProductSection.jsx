"use client";
import { useGlobalContext } from "@/Context/context";
import ProductSectionItem from "./ProductSectionItem";

const ProductSection = ({ products, showPrice, title }) => {
  let storeData = products;
  const { theme, titleFont } = useGlobalContext();
  return (
    <div
      className=""
      style={{
        backgroundColor: theme.palette.background.primary,
      }}
    >
      {title && (
        <h3 className={"text-center text-3xl my-3 " + titleFont.className}>
          {title}
        </h3>
      )}
      <div className="flex justify-evenly flex-wrap items-center py-8 mx-auto max-w-7xl">
        {storeData.map((product, index) => {
          return (
            <div key={index} className="mb-3 mx-2">
              <ProductSectionItem
                id={product._id}
                name={product.name}
                img={product.img}
                text={product.description}
                price={product.price}
                totalPrice={product.totalPrice}
                colors={product.colors}
                size={product.size}
                type={product.type}
                showPrice={showPrice}
                extras={product.extras}
                subcategory={product.subcategory}
              ></ProductSectionItem>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductSection;
