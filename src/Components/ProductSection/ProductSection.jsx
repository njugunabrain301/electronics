import React from "react";
// import { storeData } from "../../assets/data/kitchenWareData";
import ProductSectionItem from "./ProductSectionItem";
import { useSelector } from "react-redux";

const ProductSection = () => {
  let storeData = useSelector((state) => state.products.promoted);
  return (
    <div>
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
                color={product.color}
                size={product.size}
                type={product.type}
              ></ProductSectionItem>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductSection;
