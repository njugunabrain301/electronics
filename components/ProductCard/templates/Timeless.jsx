import React from "react";
import ProductCardContent from "./Content";

const Timeless = ({
  id,
  name,
  text,
  img,
  price,
  colors,
  showPrice,
  extras,
  subcategory,
  theme,
  discount,
}) => {
  const resizeCardImage = (img) => {
    img = img.replace(
      "https://storage.googleapis.com/test-bucket001/",
      "https://ik.imagekit.io/d4mmlivtj/goduka/tr:w-400/"
      //"https://ik.imagekit.io/d4mmlivtj/goduka/tr:w-400,h-267/" //resize
    );
    return img;
  };

  function removeTags(str) {
    if (str === null || str === "") return "";
    else str = str.toString();

    return str.replace(/(<([^>]+)>)/gi, "");
  }
  let length = name.length;
  let descLength = name.length < 150 ? 200 - length : 0;
  const getTitle = () => {
    let title =
      subcategory === "Vehicles" && extras && extras.make && extras.model
        ? extras.make + " " + extras.model
        : name;
    if (title.length > 100) title = title.slice(0, 100) + "...";
    return title;
  };

  return (
    <ProductCardContent
      id={id}
      text={text}
      img={img}
      price={price}
      colors={colors}
      showPrice={showPrice}
      theme={theme}
      discount={discount}
      resizeCardImage={resizeCardImage}
      removeTags={removeTags}
      descLength={descLength}
      getTitle={getTitle}
    />
  );
};

export default Timeless;
