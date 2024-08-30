import React from "react";
import Opulence from "./templates/Opulence";
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
  template,
  discount,
}) => {
  return (
    <>
      {template === "Opulence" && (
        <Opulence
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
        />
      )}
      {template === "Timeless" && (
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
      )}
    </>
  );
};

export default ProductCard;
