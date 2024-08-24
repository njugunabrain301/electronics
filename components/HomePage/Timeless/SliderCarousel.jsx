"use client";
import { getBackgroundColor } from "@/utils/Utils";
import Link from "next/link";
import { useEffect } from "react";
import Carousel from "react-material-ui-carousel";

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
    <div>
      <Carousel
        animation="slide"
        navButtonsAlwaysVisible={true}
        duration={1000}
        indicators={false}
      >
        {prods.map((item, index) => (
          <div
            className="flex justify-center items-center relative h-[10%] w-full rounded-md"
            key={index}
          >
            <Link
              href={`/filter/item/` + item._id}
              className="flex justify-center align-center bg-gray-300 rounded-md"
              style={{ aspectRatio: "3/2" }}
            >
              <img
                src={resizeSliderImage(item.img)}
                className={
                  "hidden w-full h-[100%] rounded-md lg:block img-" + index
                }
                alt="..."
              />
              <img
                src={resizeSliderImageSmall(item.img)}
                className={
                  "block w-full h-[100%] rounded-md lg:hidden img-" + index
                }
                alt="..."
              />
            </Link>
            <div className=" absolute inset-x-[15%] bg-gray-600 bg-opacity-50 bottom-5 hidden p-1 rounded-md text-center text-white md:block">
              <h5 className="text-xl hidden lg:block">{item.name}</h5>
              <h5 className="text-xl lg:hidden ">
                {item.name.length > 40
                  ? item.name.slice(0, 40) + "..."
                  : item.name}
              </h5>
              <p>{removeTags(item.description).slice(0, 40) + "..."}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default SliderCarousel;
