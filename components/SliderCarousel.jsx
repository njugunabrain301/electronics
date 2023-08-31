"use client";
import Link from "next/link";
import Carousel from "react-material-ui-carousel";
// import { Carousel, initTE } from "tw-elements";

function SliderCarousel({ products }) {
  const selectItem = (item) => {
    // dispatch(singleProduct(item._id))
  };

  const resizeSliderImage = (img) => {
    img = img.replace(
      "https://storage.googleapis.com/test-bucket001/",
      "https://ik.imagekit.io/d4mmlivtj/goduka/tr:w-900,h-600/"
    );
    return img;
  };

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
            className="flex justify-center items-center relative h-[10%] w-full rounded-md"
            key={index}
          >
            <Link
              href={`/filter/${item.type}/` + item._id}
              className="flex justify-center align-center bg-gray-300 rounded-md"
              style={{ aspectRatio: "3/2" }}
              onClick={() => selectItem(item._id)}
            >
              <img
                src={resizeSliderImage(item.img)}
                className="block w-full h-[100%] rounded-md"
                alt="..."
              />
            </Link>
            <div className="absolute inset-x-[15%] bg-gray bottom-5 hidden py-5 text-center text-white md:block">
              <h5 className="text-xl">{item.name}</h5>
              <p>{item.description.slice(0, 40) + "..."}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default SliderCarousel;
