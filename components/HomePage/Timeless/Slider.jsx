"use client";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/Context/context";
import SliderContent from "./Content/Slider";

const Slider = ({ slider }) => {
  let sliderData = slider;

  const resizeCardImage = (img) => {
    img = img.replace(
      "https://storage.googleapis.com/test-bucket001/",
      "https://ik.imagekit.io/d4mmlivtj/goduka/tr:w-600/"
      // "https://ik.imagekit.io/d4mmlivtj/goduka/tr:w-600,h-400/" //resize
    );
    return img;
  };

  const [carouselLoaded, setCarouselLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setCarouselLoaded(true);
    }, 1000);

    //TODO:
    //determine fit by mage background color
    // async function fetchColor() {
    //   const color = await getBackgroundColor(
    //     "https://example.com/path_to_image.jpg"
    //   );
    //   console.log(color);
    // }

    // fetchColor();
  }, []);

  const { theme } = useGlobalContext();
  return (
    <SliderContent
      sliderData={sliderData}
      resizeCardImage={resizeCardImage}
      carouselLoaded={carouselLoaded}
      theme={theme}
    />
  );
};

export default Slider;
