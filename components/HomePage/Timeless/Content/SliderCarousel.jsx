"use client";
import Link from "next/link";
import Carousel from "react-material-ui-carousel";

function SliderCarouselContent({
  resizeSliderImage,
  resizeSliderImageSmall,
  removeTags,
  prods,
}) {
  return (
    <main-content>
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
              className="flex justify-center align-center rounded-md"
              style={{ aspectRatio: "3/2" }}
            >
              <img
                src={resizeSliderImage(item.img)}
                className={
                  "hidden w-full h-[100%] rounded-md lg:block object-contain img-" +
                  index
                }
                alt="..."
              />
              <img
                src={resizeSliderImageSmall(item.img)}
                className={
                  "block w-full h-[100%] rounded-md lg:hidden object-contain img-" +
                  index
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
    </main-content>
  );
}

export default SliderCarouselContent;
