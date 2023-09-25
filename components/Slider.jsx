"use client";
import { useEffect, useState } from "react";
import SliderCarousel from "./SliderCarousel";
import Link from "next/link";
import { motion } from "framer-motion";

const Slider = ({ slider }) => {
  let sliderData = slider;
  let isSliderLoaded = true;

  const resizeCardImage = (img) => {
    img = img.replace(
      "https://storage.googleapis.com/test-bucket001/",
      "https://ik.imagekit.io/d4mmlivtj/goduka/tr:w-600,h-400/"
    );
    return img;
  };

  const [carouselLoaded, setCarouselLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setCarouselLoaded(true);
    }, 1000);
  });

  return (
    <div className="flex justify-center items-center m-2 mt-4 flex-wrap ">
      {isSliderLoaded ? (
        <>
          <motion.div
            initial={{ translateY: "50px", opacity: 0 }}
            animate={{ translateY: "0", opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-[97%] sm:w-[97%] md:w-[48%] mb-2 minWidth-[200px] rounded-md"
            style={{
              aspectRatio: "3 / 2",
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

          <div className="flex justify-between flex-col sm:w-[100%] md:w-[48%]">
            <div className="w-[100%] flex justify-evenly">
              <motion.div
                className="w-[48%] mb-2 rounded-md overflow-hidden bg-gray-300"
                initial={{ translateY: "50px", opacity: 0 }}
                animate={{ translateY: "0", opacity: 1 }}
                transition={{ duration: 1, delay: 0.15 }}
              >
                <Link
                  href={
                    "/filter/item/" +
                    sliderData[sliderData.length > 4 ? 4 : 0]._id
                  }
                  className="flex justify-center"
                >
                  <img
                    src={resizeCardImage(
                      sliderData[sliderData.length > 4 ? 4 : 0].img
                    )}
                    alt="..."
                    style={{ aspectRatio: "3/2" }}
                    className="w-full"
                  />
                </Link>
              </motion.div>
              <motion.div
                className="w-[48%] mb-2 rounded-md overflow-hidden bg-gray-300"
                initial={{ translateY: "50px", opacity: 0 }}
                animate={{ translateY: "0", opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <Link
                  href={
                    "/filter/item/" +
                    sliderData[sliderData.length > 5 ? 5 : 1]._id
                  }
                  className="flex justify-center"
                >
                  <img
                    src={resizeCardImage(
                      sliderData[sliderData.length > 5 ? 5 : 1].img
                    )}
                    alt="..."
                    style={{ aspectRatio: "3/2" }}
                    className="w-full"
                  />
                </Link>
              </motion.div>
            </div>
            <div className="w-[100%] flex justify-evenly">
              <motion.div
                className="w-[48%] mb-2 rounded-md overflow-hidden bg-gray-300"
                initial={{ translateY: "50px", opacity: 0 }}
                animate={{ translateY: "0", opacity: 1 }}
                transition={{ duration: 1, delay: 0.45 }}
              >
                <Link
                  href={
                    "/filter/item/" +
                    sliderData[sliderData.length > 6 ? 6 : 2]._id
                  }
                  className="flex justify-center"
                >
                  <img
                    src={resizeCardImage(
                      sliderData[sliderData.length > 6 ? 6 : 2].img
                    )}
                    alt="..."
                    style={{ aspectRatio: "3/2" }}
                    className="w-full"
                  />
                </Link>
              </motion.div>
              <motion.div
                className="w-[48%] mb-2 rounded-md overflow-hidden bg-gray-300"
                initial={{ translateY: "50px", opacity: 0 }}
                animate={{ translateY: "0", opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <Link
                  href={
                    "/filter/item/" +
                    sliderData[sliderData.length > 7 ? 7 : 3]._id
                  }
                  className="flex justify-center"
                >
                  <img
                    src={resizeCardImage(
                      sliderData[sliderData.length > 7 ? 7 : 3].img
                    )}
                    alt="..."
                    style={{ aspectRatio: "3/2" }}
                    className="w-full"
                  />
                </Link>
              </motion.div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            id="carouselExampleCaptions"
            className="relative sm:w-[100%] md:w-[48%] mb-2 bg-gray minWidth-[200px]"
          >
            <div className="relative h-full w-full overflow-hidden after:clear-both after:block after:content-[''] rounded-md overflow-hidden"></div>
          </div>
          <div className="flex justify-between flex-col sm:w-[100%] md:w-[48%]">
            <div className="w-[100%] flex justify-evenly">
              <div className="w-[48%] mb-2 rounded-md bg-gray-600 overflow-hidden"></div>
              <div className="w-[48%] mb-2 rounded-md overflow-hidden"></div>
            </div>
            <div className="w-[100%] flex justify-evenly">
              <div className="w-[48%] mb-2 rounded-md overflow-hidden"></div>
              <div className="w-[48%] mb-2 rounded-md overflow-hidden"></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Slider;
