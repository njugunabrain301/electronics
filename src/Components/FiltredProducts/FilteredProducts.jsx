import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./ProductCard";
import { Button } from "@material-tailwind/react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import Error from "../Error/Error";
import {
  filterProducts,
  filterGender,
  sortByPrice,
  filterByColor,
  filterBySize,
} from "../../features/slices/productsSlice";

const FilteredProducts = () => {
  const products = useSelector((state) => state.products.filteredProducts);
  const error = useSelector((state) => state.products.error);
  const { type } = useParams();
  const genderButtons = ["male", "female"];
  const colorButtons = [
    "red",
    "green",
    "purple",
    "yellow",
    "orange",
    "blue",
    "black",
    "brown",
  ];
  const sizeButtons = ["S", "M", "L", "XL"];
  const dispatch = useDispatch();

  return (
    <div className="">
      <div className="xs:pt-4 md:pt-16">
        <div className="xs:pl-6 md:pl-14">
          <h1 className="text-gray-600 xs:text-2xl md:text-4xl font-inter font-bold tracking-normal leading-none">
            {type}
          </h1>
          <div className="items-center justify-between py-8 hidden md:flex">
            <div className="flex items-center">
              {genderButtons.map((item, index) => {
                return (
                  <div key={index}>
                    <Button
                      color="gray"
                      size="lg"
                      variant="outlined"
                      ripple={true}
                      className="text-black hover:bg-gray-300 duration-300 ease-in-out mr-4"
                      onClick={() => dispatch(filterGender(item))}
                    >
                      {item}
                    </Button>
                  </div>
                );
              })}
              <Button
                color="gray"
                size="lg"
                variant="outlined"
                ripple={true}
                className="text-black hover:bg-gray-300 duration-300 ease-in-out mr-4"
                onClick={() => dispatch(sortByPrice())}
              >
                Sort By Price
              </Button>
              {/* <Menu>
                <MenuHandler>
                  <Button
                    color="gray"
                    size="lg"
                    variant="outlined"
                    ripple={true}
                    className="text-black hover:bg-gray-300 duration-300 ease-in-out mr-4"
                  >
                    Select a color
                  </Button>
                </MenuHandler>
                <MenuList>
                  {colorButtons.map((item, index) => {
                    return (
                      <MenuItem
                        style={{ color: item }}
                        key={index}
                        onClick={() => dispatch(filterByColor(item))}
                      >
                        {item}
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </Menu> */}
              {/* <Menu>
                <MenuHandler>
                  <Button
                    disabled={type === "Bags" || type === "Shoes"}
                    color="gray"
                    size="lg"
                    variant="outlined"
                    ripple={true}
                    className="text-black hover:bg-gray-300 duration-300 ease-in-out mr-4"
                  >
                    Select a size
                  </Button>
                </MenuHandler>
                <MenuList>
                  {sizeButtons.map((item, index) => {
                    return (
                      <MenuItem
                        key={index}
                        onClick={() => dispatch(filterBySize(item))}
                      >
                        {item}
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </Menu> */}
            </div>
            <div className="pr-14">
              <Button
                color="gray"
                size="lg"
                variant="outlined"
                ripple={true}
                className="text-black hover:bg-gray-300 duration-300 ease-in-out mr-4"
                onClick={() => dispatch(filterProducts(type))}
              >
                Clear Filter
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between py-4 md:hidden">
            <Menu>
              <MenuHandler>
                <Button
                  disabled={type === "Bags" || type === "Shoes"}
                  color="gray"
                  size="lg"
                  variant="outlined"
                  ripple={true}
                  className="text-black hover:bg-gray-300 duration-300 ease-in-out mr-4 p-2 px-4"
                >
                  Filter
                </Button>
              </MenuHandler>
              <MenuList>
                {genderButtons.map((item, index) => {
                  return (
                    <MenuItem
                      key={index}
                      onClick={() => dispatch(filterGender(item))}
                    >
                      {item.charAt(0).toUpperCase() + "" + item.slice(1)}
                    </MenuItem>
                  );
                })}
                <MenuItem key={10} onClick={() => dispatch(sortByPrice())}>
                  Sort By Price
                </MenuItem>
                <MenuItem
                  key={11}
                  onClick={() => dispatch(filterProducts(type))}
                >
                  Clear Filter
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
        {error ? (
          <Error></Error>
        ) : (
          <div className="flex justify-center py-8 flex-wrap">
            {products
              .filter((product) => product.type === type)
              .map((product, index) => {
                return (
                  <div key={index} className="m-3">
                    <ProductCard
                      id={product.id}
                      name={product.name}
                      text={product.text}
                      img={product.img}
                      price={product.price}
                      colors={product.color}
                    ></ProductCard>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilteredProducts;
