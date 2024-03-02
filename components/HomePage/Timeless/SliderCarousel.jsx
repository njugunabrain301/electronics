"use client";
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
  const resizeSliderImageSmall = (img) => {
    img = img.replace(
      "https://storage.googleapis.com/test-bucket001/",
      "https://ik.imagekit.io/d4mmlivtj/goduka/tr:w-600,h-400/"
    );
    return img;
  };

  function removeTags(str) {
    if (str === null || str === "") return false;
    else str = str.toString();

    return str.replace(/(<([^>]+)>)/gi, "");
  }

  const prods = products.map((itm) => itm);

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
                className="hidden w-full h-[100%] rounded-md lg:block"
                alt="..."
              />
              <img
                src={resizeSliderImageSmall(item.img)}
                className="block w-full h-[100%] rounded-md lg:hidden"
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
