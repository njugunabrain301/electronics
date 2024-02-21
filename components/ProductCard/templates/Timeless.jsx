import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import Link from "next/link";

const Timeless = ({
  id,
  name,
  text,
  img,
  price,
  colors,
  sizes,
  showPrice,
  type,
  extras,
  subcategory,
  theme,
}) => {
  const resizeCardImage = (img) => {
    img = img.replace(
      "https://storage.googleapis.com/test-bucket001/",
      "https://ik.imagekit.io/d4mmlivtj/goduka/tr:w-600,h-400/"
    );
    return img;
  };

  function removeTags(str) {
    if (str === null || str === "") return "";
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
  return (
    <Link href={`/filter/item/` + id} className="flex justify-center">
      <Card
        className=" min-w-[250px] xs:max-w-[280px] sm:w-[300px] mt-5"
        style={{
          backgroundColor: theme.palette.pane.main,
          color: theme.palette.text.base,
        }}
      >
        <CardHeader className="relative h-60">
          <img
            src={resizeCardImage(img)}
            alt="img-blur-shadow"
            className="h-full w-full"
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
            <Typography variant="small">
              {price > 999999
                ? "Ksh. " + price / 1000000 + "M"
                : "Ksh. " + price}
            </Typography>
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
  );
};

export default Timeless;
