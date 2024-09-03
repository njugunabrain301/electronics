import React from "react";
import Timeless from "./templates/Timeless";

const ProductCard = ({
  id,
  name,
  text,
  img,
  price,
  colors,
  sizes,
  showPrice,
  type,
  extras,
  subcategory,
  theme,
  discount,
}) => {
  return (
    <>
      <Timeless
        id={id}
        name={name}
        text={text}
        img={img}
        price={price}
        colors={colors}
        sizes={sizes}
        showPrice={showPrice}
        type={type}
        extras={extras}
        subcategory={subcategory}
        theme={theme}
        discount={discount}
      />
    </>
  );
};

export default ProductCard;
