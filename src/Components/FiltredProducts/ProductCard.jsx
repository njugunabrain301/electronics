import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { singleProduct } from "../../features/slices/productsSlice";
import { Link, useParams } from "react-router-dom";

const ProductCard = ({
  id,
  name,
  text,
  img,
  price,
  colors,
  sizes,
  showPrice,
}) => {
  const dispatch = useDispatch();
  const { type } = useParams();

  return (
    <Link
      to={`/filteredProducts/${type}/` + id}
      className="flex justify-center"
    >
      <Card
        className=" min-w-[250px] xs:max-w-[280px] sm:w-[300px] mt-5"
        onClick={() => dispatch(singleProduct(id))}
      >
        <CardHeader color="blue" className="relative h-60">
          <img src={img} alt="img-blur-shadow" className="h-full w-full" />
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h5" className="mb-2">
            {name}
          </Typography>
          <Typography>
            {text.length > 100 ? text.slice(0, 80) + "..." : text}
          </Typography>
        </CardBody>
        <CardFooter divider className="flex items-center justify-between py-3">
          {showPrice && (
            <Typography variant="small">{"Ksh. " + price}</Typography>
          )}
          {colors && colors.length > 0 && (
            <Typography variant="small" color="gray" className="flex gap-1">
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
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
