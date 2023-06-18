import React, { useEffect } from "react";
import { sliderData } from "../../assets/data/kitchenWareData";
import { Carousel, initTE } from "tw-elements";
import { Link } from "react-router-dom";

const Slider = () => {
  useEffect(() => {
    initTE({ Carousel });
  }, []);

  return (
    <div className="flex justify-center items-center m-2 mt-4 flex-wrap">
      <div
        id="carouselExampleCaptions"
        className="relative sm:w-[100%] md:w-[48%] mb-2"
        data-te-carousel-init
        data-te-carousel-slide
      >
        <div
          className="absolute bottom-0 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
          data-te-carousel-indicators
        >
          {sliderData.map((item, index) => (
            <button
              type="button"
              data-te-target="#carouselExampleCaptions"
              data-te-slide-to={"" + index}
              data-te-carousel-active
              className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
              aria-current="true"
              aria-label="Slide 1"
              key={index}
            ></button>
          ))}
        </div>

        <div className="relative h-full w-full overflow-hidden after:clear-both after:block after:content-[''] rounded-md overflow-hidden">
          {sliderData.map((item, index) => {
            return index === 0 ? (
              <div
                className="flex justify-center items-center relative float-left -mr-[100%] h-full w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                data-te-carousel-active
                data-te-carousel-item
                style={{ backfaceVisibility: "hidden" }}
                key={index}
              >
                <Link
                  to={`/filteredProducts/${item.type}/` + item.id}
                  className="flex justify-center"
                >
                  <img
                    src={item.img}
                    className="block w-full h-[100%]"
                    alt="..."
                  />
                </Link>
                <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
                  <h5 className="text-xl">{item.name}</h5>
                  <p>{item.text.slice(0, 40) + "..."}</p>
                </div>
              </div>
            ) : (
              <div
                className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                data-te-carousel-item
                style={{ backfaceVisibility: "hidden" }}
                key={index}
              >
                <Link
                  to={`/filteredProducts/${item.type}/` + item.id}
                  className="flex justify-center"
                >
                  <img src={item.img} className="block w-full" alt="..." />
                </Link>
                <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
                  <h5 className="text-xl">{item.name}</h5>
                  <p>{item.text.slice(0, 40) + "..."}</p>
                </div>
              </div>
            );
          })}
        </div>

        <button
          className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
          type="button"
          data-te-target="#carouselExampleCaptions"
          data-te-slide="prev"
        >
          <span className="inline-block h-8 w-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6 bg-black p-1 rounded-full"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </span>
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Previous
          </span>
        </button>

        <button
          className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
          type="button"
          data-te-target="#carouselExampleCaptions"
          data-te-slide="next"
        >
          <span className="inline-block h-8 w-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6 bg-black p-1 rounded-full"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </span>
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Next
          </span>
        </button>
      </div>
      <div className="flex justify-between flex-col sm:w-[100%] md:w-[48%]">
        <div className="w-[100%] flex justify-evenly">
          <div className="w-[48%] mb-2 rounded-md overflow-hidden">
            <Link
              to={
                `/filteredProducts/${
                  sliderData[sliderData.length > 4 ? 4 : 0].type
                }/` + sliderData[sliderData.length > 4 ? 4 : 0].id
              }
              className="flex justify-center"
            >
              <img
                src={sliderData[sliderData.length > 4 ? 4 : 0].img}
                alt="..."
                className="w-full"
              />
            </Link>
          </div>
          <div className="w-[48%] mb-2 rounded-md overflow-hidden">
            <Link
              to={
                `/filteredProducts/${
                  sliderData[sliderData.length > 4 ? 4 : 0].type
                }/` + sliderData[sliderData.length > 4 ? 4 : 0].id
              }
              className="flex justify-center"
            >
              <img
                src={sliderData[sliderData.length > 5 ? 5 : 1].img}
                alt="..."
                className="w-full"
              />
            </Link>
          </div>
        </div>
        <div className="w-[100%] flex justify-evenly">
          <div className="w-[48%] mb-2 rounded-md overflow-hidden">
            <Link
              to={
                `/filteredProducts/${
                  sliderData[sliderData.length > 4 ? 4 : 0].type
                }/` + sliderData[sliderData.length > 4 ? 4 : 0].id
              }
              className="flex justify-center"
            >
              <img
                src={sliderData[sliderData.length > 6 ? 6 : 2].img}
                alt="..."
                className="w-full"
              />
            </Link>
          </div>
          <div className="w-[48%] mb-2 rounded-md overflow-hidden">
            <Link
              to={
                `/filteredProducts/${
                  sliderData[sliderData.length > 4 ? 4 : 0].type
                }/` + sliderData[sliderData.length > 4 ? 4 : 0].id
              }
              className="flex justify-center"
            >
              <img
                src={sliderData[sliderData.length > 7 ? 7 : 3].img}
                alt="..."
                className="w-full"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
