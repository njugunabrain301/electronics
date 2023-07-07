import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { singleProduct } from "../../features/slices/productsSlice";

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
}) => {
  const dispatch = useDispatch();

  return (
    <Link
      to={`/filteredProducts/${type}/` + id}
      className="flex justify-center"
    >
      <Card
        className="sm:w-[300px] xs:w-[280px] md:w-[320px] relative"
        onClick={() => dispatch(singleProduct(id))}
      >
        {/* <Typography
          variant="h4"
          className="mb-2 absolute -rotate-45 top-12 right-8 z-10 text-red-700"
        >
          SALE%
        </Typography> */}
        <CardHeader floated={false} className="">
          {onOffer}
          <img src={img} alt={name} style={{ aspectRatio: "3/2" }} />
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h4" color="blue-gray" className="mb-2">
            {name}
          </Typography>
          <Typography color="gray" className="font-medium" textGradient>
            {text.length > 110 ? text.slice(0, 110) + "..." : text}
          </Typography>
          <div className="flex justify-between items-center pt-4">
            {showPrice && (
              <Typography color="gray" className="font-medium" textGradient>
                Ksh. <span className="text-gray-400 text-base">{price}</span>
              </Typography>
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
