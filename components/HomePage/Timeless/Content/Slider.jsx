import SliderCarousel from "../SliderCarousel";
import Link from "next/link";
import { motion } from "framer-motion";

const SliderContent = ({
  sliderData,
  resizeCardImage,
  carouselLoaded,
  theme,
}) => {
  return (
    <main-content>
      <div
        className="flex justify-center items-center p-2 pt-4 flex-wrap"
        style={{
          backgroundColor: theme.palette.background.primary,
        }}
      >
        <>
          <motion.div
            initial={{ translateY: "100px", opacity: 0 }}
            animate={{ translateY: "0", opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-[97%] sm:w-[97%] md:w-[48%] mb-2 minWidth-[200px] rounded-md"
            style={{
              aspectRatio: "3 / 2",
              overflow: "hidden",
              position: "relative",
              boxShadow: "0 0 10px 5px #aaaaaa30",
            }}
          >
            {!carouselLoaded && (
              <img
                src={sliderData[0].img}
                style={{ position: "absolute", width: "100%", height: "100%" }}
                className="object-contain"
              />
            )}
            <SliderCarousel products={sliderData} className="rounded-md" />
          </motion.div>

          <div className="flex justify-between flex-col sm:w-[100%] md:w-[48%]">
            <div className="w-[100%] flex justify-evenly">
              <motion.div
                className="w-[48%] mb-2 rounded-md overflow-hidden"
                initial={{ translateY: "100px", opacity: 0 }}
                animate={{ translateY: "0", opacity: 1 }}
                transition={{ duration: 1, delay: 0.15 }}
                style={{ boxShadow: "0 0 10px 5px #aaaaaa30" }}
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
                    className="w-full object-contain"
                  />
                </Link>
              </motion.div>
              <motion.div
                className="w-[48%] mb-2 rounded-md overflow-hidden"
                initial={{ translateY: "100px", opacity: 0 }}
                animate={{ translateY: "0", opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                style={{ boxShadow: "0 0 10px 5px #aaaaaa30" }}
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
                    className="w-full object-contain"
                  />
                </Link>
              </motion.div>
            </div>
            <div className="w-[100%] flex justify-evenly">
              <motion.div
                className="w-[48%] mb-2 rounded-md overflow-hidden"
                initial={{ translateY: "100px", opacity: 0 }}
                animate={{ translateY: "0", opacity: 1 }}
                transition={{ duration: 1, delay: 0.45 }}
                style={{ boxShadow: "0 0 10px 5px #aaaaaa30" }}
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
                    className="w-full object-contain"
                  />
                </Link>
              </motion.div>
              <motion.div
                className="w-[48%] mb-2 rounded-md overflow-hidden"
                initial={{ translateY: "100px", opacity: 0 }}
                animate={{ translateY: "0", opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                style={{ boxShadow: "0 0 10px 5px #aaaaaa30" }}
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
                    className="w-full object-contain"
                  />
                </Link>
              </motion.div>
            </div>
          </div>
        </>
      </div>
    </main-content>
  );
};

export default SliderContent;
