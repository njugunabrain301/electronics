"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import Link from "next/link";
import { useGlobalContext } from "@/Context/context";

const ProductSectionItem = ({
  id,
  img,
  name,
  text,
  price,
  colors,
  type,
  onOffer,
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

  function removeTags(str) {
    if (str === null || str === "") return false;
    else str = str.toString();

    return str.replace(/(<([^>]+)>)/gi, "");
  }

  let length = name.length;
  let descLength = name.length < 150 ? 200 - length : 0;
  const getTitle = () => {
    let title =
      subcategory === "Vehicles" && extras && extras.make && extras.model
        ? extras.make + " " + extras.model
        : name;
    if (title.length > 100) title = title.slice(0, 100) + "...";
    return title;
  };

  const { theme } = useGlobalContext();
  return (
    <Link href={`/filter/item/` + id} className="flex justify-center">
      <Card
        className="sm:w-[300px] xs:w-[280px] md:w-[320px] relative bg-skin-pane text-skin-base"
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
        <CardHeader floated={false} className="rounded-lg">
          {/* {onOffer} */}
          <img
            src={resizeCardImage(img)}
            alt={name}
            style={{ aspectRatio: "3/2" }}
          />
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h4" className="mb-2">
            {getTitle()}
          </Typography>
          {descLength > 0 && (
            <Typography className="text-md">
              <span>
                {removeTags(text).length > descLength
                  ? removeTags(text).slice(0, descLength) + "..."
                  : removeTags(text)}
              </span>
            </Typography>
          )}
          <div className="flex justify-between items-center pt-4">
            {showPrice && (
              <Typography className="font-medium">
                <span
                  className="text-base"
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
                      className="fas fa-map-marker-alt fa-sm mt-[3px] rounded-full p-2 mr-1 "
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
      </Card>
    </Link>
  );
};

export default ProductSectionItem;
