"use client";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useGlobalContext } from "@/Context/context";
import ProductSectionItem from "./ProductSection/ProductSectionItem";

const ProductCarousel = ({ products, showPrice, title }) => {
  let storeData = products;
  const { theme, titleFont } = useGlobalContext();
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  return (
    <div
      className=""
      style={{
        backgroundColor: theme.palette.background.primary,
      }}
    >
      <div className="py-8 mx-auto max-w-7xl text-center">
        <h3 className={"text-3xl my-3 " + titleFont.className}>{title}</h3>
        <Carousel
          responsive={responsive}
          swipeable={false}
          draggable={true}
          showDots={false}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={2500}
          keyBoardControl={true}
          // customTransition="all .5"
          transitionDuration={500}
          animation="slide"
        >
          {storeData.map((product, index) => {
            return (
              <div key={index} className="">
                <ProductSectionItem
                  id={product._id}
                  name={product.name}
                  img={product.img}
                  text={product.description}
                  price={product.price}
                  totalPrice={product.totalPrice}
                  color={product.color}
                  size={product.size}
                  type={product.type}
                  showPrice={showPrice}
                  extras={product.extras}
                  subcategory={product.subcategory}
                ></ProductSectionItem>
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default ProductCarousel;
