import React, { useEffect } from "react";
import { Carousel, initTE } from "tw-elements";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { singleProduct } from "../../features/slices/productsSlice";

const Slider = () => {
  let sliderData = useSelector((state) => state.products.sliderData);
  let isSliderLoaded = useSelector((state) => state.products.isSliderLoaded);

  useEffect(() => {
    setTimeout(() => {
      initTE({ Carousel });
    }, 1000);
  }, [sliderData]);

  useEffect(() => {
    let count = 6;
    let interval = setInterval(() => {
      count--;
      if (count < 0) count = 6;
      if (count === 0) document.getElementById("next-carousel").click();
    }, 1000);

    let view = () => {
      count = 9;
    };
    setTimeout(() => {
      document.getElementById("next-carousel").addEventListener("click", view);
      document.getElementById("prev-carousel").addEventListener("click", view);
    }, 2000);

    return () => {
      clearInterval(interval);
      if (document.getElementById("next-carousel"))
        document
          .getElementById("next-carousel")
          .removeEventListener("click", view);
      if (document.getElementById("prev-carousel"))
        document
          .getElementById("prev-carousel")
          .removeEventListener("click", view);
    };
  }, []);
  const dispatch = useDispatch();

  return (
    <div className="flex justify-center items-center m-2 mt-4 flex-wrap">
      {isSliderLoaded ? (
        <>
          <div
            id="carouselExampleCaptions"
            className="relative sm:w-[100%] md:w-[48%] mb-2 minWidth-[200px]"
            data-te-carousel-init
            data-te-carousel-slide
          >
            <div
              className="absolute bottom-0 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
              data-te-carousel-indicators
            >
              {sliderData.map((item, index) => {
                return index === 0 ? (
                  <button
                    type="button"
                    data-te-target="#carouselExampleCaptions"
                    data-te-slide-to={"" + index}
                    data-te-carousel-active
                    className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
                    aria-current="true"
                    key={index}
                  ></button>
                ) : (
                  <button
                    type="button"
                    data-te-target="#carouselExampleCaptions"
                    data-te-slide-to={"" + index}
                    className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
                    aria-label="Slide 2"
                    key={index}
                  ></button>
                );
              })}
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
                      to={`/filteredProducts/${item.type}/` + item._id}
                      className="flex justify-center align-center bg-gray-300"
                      style={{ aspectRatio: "3/2" }}
                      onClick={() => dispatch(singleProduct(item._id))}
                    >
                      <img
                        src={item.img}
                        className="block w-full h-[100%]"
                        alt="..."
                      />
                    </Link>
                    <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
                      <h5 className="text-xl">{item.name}</h5>
                      <p>{item.description.slice(0, 40) + "..."}</p>
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
                      to={`/filteredProducts/${item.type}/` + item._id}
                      className="flex justify-center bg-gray-300"
                      style={{ aspectRatio: "3/2" }}
                      onClick={() => dispatch(singleProduct(item._id))}
                    >
                      <img src={item.img} className="block w-full" alt="..." />
                    </Link>
                    <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
                      <h5 className="text-xl">{item.name}</h5>
                      <p>{item.description.slice(0, 40) + "..."}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              className="slider-btn absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
              type="button"
              data-te-target="#carouselExampleCaptions"
              data-te-slide="prev"
              id="prev-carousel"
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
              className="slider-btn absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
              type="button"
              data-te-target="#carouselExampleCaptions"
              data-te-slide="next"
              id="next-carousel"
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
              <div className="w-[48%] mb-2 rounded-md overflow-hidden bg-gray-300">
                <Link
                  to={
                    "/filteredProducts/" +
                    sliderData[sliderData.length > 4 ? 4 : 0].type +
                    "/" +
                    sliderData[sliderData.length > 4 ? 4 : 0]._id
                  }
                  className="flex justify-center"
                  onClick={() =>
                    dispatch(
                      singleProduct(
                        sliderData[sliderData.length > 4 ? 4 : 0]._id
                      )
                    )
                  }
                >
                  <img
                    src={sliderData[sliderData.length > 4 ? 4 : 0].img}
                    alt="..."
                    style={{ aspectRatio: "3/2" }}
                    className="w-full"
                  />
                </Link>
              </div>
              <div className="w-[48%] mb-2 rounded-md overflow-hidden bg-gray-300">
                <Link
                  to={
                    "/filteredProducts/" +
                    sliderData[sliderData.length > 5 ? 5 : 1].type +
                    "/" +
                    sliderData[sliderData.length > 5 ? 5 : 1]._id
                  }
                  className="flex justify-center"
                  onClick={() =>
                    dispatch(
                      singleProduct(
                        sliderData[sliderData.length > 5 ? 5 : 1]._id
                      )
                    )
                  }
                >
                  <img
                    src={sliderData[sliderData.length > 5 ? 5 : 1].img}
                    alt="..."
                    style={{ aspectRatio: "3/2" }}
                    className="w-full"
                  />
                </Link>
              </div>
            </div>
            <div className="w-[100%] flex justify-evenly">
              <div className="w-[48%] mb-2 rounded-md overflow-hidden bg-gray-300">
                <Link
                  to={
                    "/filteredProducts/" +
                    sliderData[sliderData.length > 6 ? 6 : 2].type +
                    "/" +
                    sliderData[sliderData.length > 6 ? 6 : 2]._id
                  }
                  className="flex justify-center"
                  onClick={() =>
                    dispatch(
                      singleProduct(
                        sliderData[sliderData.length > 6 ? 6 : 2]._id
                      )
                    )
                  }
                >
                  <img
                    src={sliderData[sliderData.length > 6 ? 6 : 2].img}
                    alt="..."
                    style={{ aspectRatio: "3/2" }}
                    className="w-full"
                  />
                </Link>
              </div>
              <div className="w-[48%] mb-2 rounded-md overflow-hidden bg-gray-300">
                <Link
                  to={
                    "/filteredProducts/" +
                    sliderData[sliderData.length > 7 ? 7 : 3].type +
                    "/" +
                    sliderData[sliderData.length > 7 ? 7 : 3]._id
                  }
                  className="flex justify-center"
                  onClick={() =>
                    dispatch(
                      singleProduct(
                        sliderData[sliderData.length > 7 ? 7 : 3]._id
                      )
                    )
                  }
                >
                  <img
                    src={sliderData[sliderData.length > 7 ? 7 : 3].img}
                    alt="..."
                    style={{ aspectRatio: "3/2" }}
                    className="w-full"
                  />
                </Link>
              </div>
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
