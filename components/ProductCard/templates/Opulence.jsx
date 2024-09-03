"use client";
import React from "react";
import { CardBody, Typography } from "@material-tailwind/react";
import Link from "next/link";
import { useGlobalContext } from "@/Context/context";

const Opulence = ({
  id,
  img,
  name,
  price,
  colors,

  showPrice,
  extras,
  subcategory,
}) => {
  const resizeCardImage = (img) => {
    img = img.replace(
      "https://storage.googleapis.com/test-bucket001/",
      "https://ik.imagekit.io/d4mmlivtj/goduka/tr:w-600,h-400/"
    );
    return img;
  };

  // function removeTags(str) {
  //   if (str === null || str === "") return false;
  //   else str = str.toString();

  //   return str.replace(/(<([^>]+)>)/gi, "");
  // }

  const { theme } = useGlobalContext();
  return (
    <div className="flex justify-center grow">
      <Link href={`/filter/item/` + id}>
        <div
          className="w-[140px] sm:w-[200px] md:w-[320px] relative bg-skin-pane text-skin-base shadow-md"
          style={{
            backgroundColor: theme.palette.pane.main,
            color: theme.palette.text.base,
          }}
        >
          {/* <Typography
          variant="h4"
          className="mb-2 absolute -rotate-45 top-12 right-8 z-10 text-red-700"
        >
          SALE%
        </Typography> */}
          <div>
            {/* {onOffer} */}
            <img
              src={resizeCardImage(img)}
              alt={name}
              style={{ aspectRatio: "3/2" }}
            />
          </div>
          <CardBody className="text-center p-2 md:p-4 ">
            <h2 className="text-sm sm:text-lg md:mb-2 font-bold">
              {subcategory === "Vehicles" &&
              extras &&
              extras.make &&
              extras.model
                ? extras.make + " " + extras.model
                : name}
            </h2>
            <Typography className="hidden sm:block text-sm">
              <span>{subcategory}</span>
            </Typography>
            <div className="flex justify-between items-center pt-1 sm:pt-2 md:pt-4">
              {showPrice && (
                <Typography className="font-medium">
                  <span
                    className="text-sm md:text-base"
                    style={{ color: theme.palette.text.alt }}
                  >
                    {price > 999999
                      ? "Ksh. " + price / 1000000 + "M"
                      : "Ksh. " + price}
                  </span>
                </Typography>
              )}
              {colors && colors.length > 0 && (
                <Typography variant="small" className="flex gap-1">
                  {colors?.map((color, index) => {
                    return (
                      <i
                        className="fas fa-map-marker-alt fa-sm mt-[3px] rounded-full p-2 mr-4 "
                        key={index}
                        style={{ backgroundColor: color }}
                      ></i>
                    );
                  })}
                </Typography>
              )}
            </div>
          </CardBody>
          {/* <CardFooter className="flex justify-center gap-7 pt-2">
          <Tooltip content="Add to Cart" placement="bottom">
            <Button
              onClick={() =>
                dispatch(
                  addToCart({
                    id: id,
                    img: img,
                    text: text,
                    amount: 1,
                    price: price,
                    totalPrice: totalPrice,
                    name: name,
                    size: defaultSize,
                    color: defaultColor,
                  })
                )
              }
              size="lg"
              color="gray"
              variant="outlined"
              ripple={true}
            >
              Add to Cart
            </Button>
          </Tooltip>
        </CardFooter> */}
        </div>
      </Link>
    </div>
  );
};

export default Opulence;
