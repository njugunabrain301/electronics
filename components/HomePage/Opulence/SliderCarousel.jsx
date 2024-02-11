"use client";
import { useGlobalContext } from "@/Context/context";
import Link from "next/link";
import Carousel from "react-material-ui-carousel";

function SliderCarousel({ products }) {
  const resizeSliderImage = (img) => {
    img = img.replace(
      "https://storage.googleapis.com/test-bucket001/",
      "https://ik.imagekit.io/d4mmlivtj/goduka/tr:w-900,h-600/"
    );
    return img;
  };

  function removeTags(str) {
    if (str === null || str === "") return false;
    else str = str.toString();

    return str.replace(/(<([^>]+)>)/gi, "");
  }
  let { titleFont } = useGlobalContext();
  return (
    <div>
      <Carousel
        animation="slide"
        navButtonsAlwaysVisible={true}
        duration={1000}
        indicators={false}
      >
        {products.map((item, index) => (
          <div
            className="flex justify-center items-center relative h-[10%] w-full"
            key={index}
          >
            <img
              src={resizeSliderImage(item.img)}
              className="block w-[100%] h-[100%] object-cover"
              alt="..."
            />

            <div className=" absolute w-full h-full bg-gray-600 bg-opacity-70 p-1 text-white flex justify-center items-center">
              <div className="w-[50%] md:w-[40%] p-3 flex flex-col justify-between h-[90%] sm:h-fit">
                <div>
                  <h2
                    className={
                      "text-3xl md:text-4xl lg:text-5xl " + titleFont.className
                    }
                  >
                    {item.name}
                  </h2>
                  <p className="md:hidden text-sm sm:text-md md:text-3xl block">
                    {item.name.length <= 12
                      ? removeTags(item.description).slice(0, 80) + "..."
                      : item.name.length <= 24
                      ? removeTags(item.description).slice(0, 60) + "..."
                      : item.name.length <= 36
                      ? removeTags(item.description).slice(0, 30) + "..."
                      : "..."}
                  </p>
                  <p className="hidden md:block text-sm sm:text-md md:text-xl block">
                    {removeTags(item.description).slice(0, 100) + "..."}
                  </p>
                </div>
                <Link href={`/filter/item/` + item._id} className="w-full">
                  <button className="text-sm border border-white p-1 md:p-2 lg:p-3 mt-4 w-full hover:bg-white hover:text-black">
                    Buy Now
                  </button>
                </Link>
              </div>
              <div className="w-[40%] p-3">
                <img
                  src={item.img}
                  className="block w-[100%]  object-cover"
                  alt="..."
                />
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default SliderCarousel;
