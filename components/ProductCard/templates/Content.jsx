import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import Link from "next/link";

const ProductCardContent = ({
  id,
  text,
  img,
  price,
  colors,
  showPrice,
  theme,
  discount,
  resizeCardImage,
  removeTags,
  descLength,
  getTitle,
}) => {
  return (
    <main-content>
      <Link href={`/filter/item/` + id} className="flex justify-center">
        <Card
          className=" min-w-[250px] xs:max-w-[280px] sm:w-[300px] mt-5 shadow-2"
          style={{
            backgroundColor: theme.palette.pane.main,
            color: theme.palette.text.base,
            boxShadow: "0 0 10px 1px #bbbbbb90",
          }}
        >
          <CardHeader className="relative h-60 m-[10px]">
            <img
              src={resizeCardImage(img)}
              alt="img-blur-shadow"
              className="h-full w-full object-contain"
            />
          </CardHeader>
          <CardBody className="text-center">
            <Typography variant="h5" className="mb-2">
              {getTitle()}
            </Typography>
            {descLength > 0 && (
              <Typography>
                <span>
                  {removeTags(text).length > descLength
                    ? removeTags(text).slice(0, descLength) + "..."
                    : removeTags(text)}
                </span>
              </Typography>
            )}
          </CardBody>
          <CardFooter
            divider
            className="flex items-center justify-between py-3"
            style={{ borderColor: theme.palette["flat-button"].main }}
          >
            {showPrice && (
              <div className="flex flex-wrap items-center">
                <Typography variant="small" className="font-bold mr-1">
                  {price > 999999
                    ? "Ksh. " + price / 1000000 + "M"
                    : "Ksh. " + price}
                </Typography>
                {discount > 0 && (
                  <Typography variant="small" className="line-through">
                    &nbsp;
                    {price > 999999
                      ? "Ksh. " + (price + discount) / 1000000 + "M"
                      : "Ksh. " + (price + discount)}
                    &nbsp;
                  </Typography>
                )}
              </div>
            )}
            {colors && colors.length > 0 && (
              <Typography variant="small" color="gray" className="flex gap-1">
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
          </CardFooter>
        </Card>
      </Link>
    </main-content>
  );
};

export default ProductCardContent;
