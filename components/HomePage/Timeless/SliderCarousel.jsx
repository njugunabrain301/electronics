"use client";
import Link from "next/link";
import Carousel from "react-material-ui-carousel";
import SliderCarouselContent from "./Content/SliderCarousel";

function SliderCarousel({ products }) {
  const resizeSliderImage = (img) => {
    img = img.replace(
      "https://storage.googleapis.com/test-bucket001/",
      "https://ik.imagekit.io/d4mmlivtj/goduka/tr:w-900/"
      // "https://ik.imagekit.io/d4mmlivtj/goduka/tr:w-900,h-600/" //resizing image
    );
    return img;
  };
  const resizeSliderImageSmall = (img) => {
    img = img.replace(
      "https://storage.googleapis.com/test-bucket001/",
      "https://ik.imagekit.io/d4mmlivtj/goduka/tr:w-600/"
      // "https://ik.imagekit.io/d4mmlivtj/goduka/tr:w-600,h-400/" //resizing image
    );
    return img;
  };

  function removeTags(str) {
    if (str === null || str === "") return false;
    else str = str.toString();

    return str.replace(/(<([^>]+)>)/gi, "");
  }

  const prods = products.map((itm) => itm);

  //TO DO:
  //Code to determine whether image will be contained or covered depending on background
  // useEffect(() => {
  //   async function setBackgroundColors() {
  //     for (const image of prods.map(itm > itm.img)) {
  //       const color = await getBackgroundColor(image.url);
  //       console.log(color);
  //       const div = document.getElementById(image.id);

  //       if (div) {
  //         div.style.backgroundColor = color;
  //       }
  //     }
  //   }

  //   setBackgroundColors();
  // }, []);

  return (
    <SliderCarouselContent
      resizeSliderImage={resizeSliderImage}
      resizeSliderImageSmall={resizeSliderImageSmall}
      removeTags={removeTags}
      prods={prods}
    />
  );
}

export default SliderCarousel;
