"use client";
import { useEffect, useState } from "react";
import SliderCarousel from "./SliderCarousel";
import Link from "next/link";
import { motion } from "framer-motion";
import { useGlobalContext } from "@/Context/context";

const Slider = ({ slider, categories }) => {
  let sliderData = slider;

  const resizeCardImage = (img) => {
    img = img.replace(
      "https://storage.googleapis.com/test-bucket001/",
      "https://ik.imagekit.io/d4mmlivtj/goduka/tr:w-600,h-400/"
    );
    return img;
  };

  const [carouselLoaded, setCarouselLoaded] = useState(false);
  // let exists = (name, dataLayer) => {
  //   let exists = false;
  //   dataLayer.map((e) => {
  //     if (e.event === name) {
  //       exists = true;
  //     }
  //     return e;
  //   });
  //   return exists;
  // };
  useEffect(() => {
    // let dataLayer = window.dataLayer || [];
    // let event = { event: "my-event" };
    // if (!exists(event.event, dataLayer)) dataLayer.push(event);
    setTimeout(() => {
      setCarouselLoaded(true);
    }, 1000);
  });

  const { theme, titleFont } = useGlobalContext();
  return (
    <div
      className="flex justify-between py-2 pt-4 flex-wrap w-[98%] mx-auto max-w-7xl relative md:overflow-hidden "
      style={{
        backgroundColor: theme.palette.background.primary,
        aspectRatio: "16 / 9",
      }}
    >
      <div
        className="justify-between hidden grow md:block md:w-[23%] mr-2 h-[100%] overflow-auto md:h-[94.2%] lg:h-[92.7%] xl:h-[92%]"
        style={{
          backgroundColor: theme.palette.background.inverted,
          color: theme.palette.text.inverted,
          scrollbarWidth: "thin", // "auto" or "thin"
          scrollbarColor: theme.palette.background.primary + " transparent",

          // Firefox
          MozScrollbarWidth: "thin", // "auto" or "thin"
          MozScrollbarColor: theme.palette.background.primary + " transparent",
        }}
      >
        <h3 className={"text-3xl lg:text-4xl p-3 " + titleFont.className}>
          Categories
        </h3>
        <div style={{ height: "100%" }}>
          {categories.map((c, idx) => {
            return (
              <div
                key={idx}
                className="w-[95%] m-2 py-2 text-sm lg:text-md border-t"
                style={{ borderColor: theme.palette.background.primary }}
              >
                <Link href={"/filter/" + c} className="w-full py-3">
                  {c}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <motion.div
        initial={{ translateX: "100px", opacity: 0 }}
        animate={{ translateX: "0", opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-[100%] sm:w-[100%] md:w-[75%] minWidth-[200px]"
        style={{
          overflow: "hidden",
          position: "relative",
        }}
      >
        {!carouselLoaded && (
          <img
            src={sliderData[0].img}
            style={{ position: "absolute", width: "100%", height: "100%" }}
          />
        )}
        <SliderCarousel products={sliderData} className="rounded-md" />
      </motion.div>
    </div>
  );
};

export default Slider;
