import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./ProductCard";
import { Button, Input } from "@material-tailwind/react";
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
  fetchProducts,
  fetchWearables,
  filterSearch,
} from "../../features/slices/productsSlice";
import { Helmet } from "react-helmet";

const FilteredProducts = () => {
  const products = useSelector((state) => state.products.filteredProducts);
  const error = useSelector((state) => state.products.error);
  const showPrice = useSelector((state) => state.app.profile.showPrice);
  const filters = useSelector((state) => state.products.filters);
  const { type } = useParams();
  const genderButtons = ["male", "female", "unisex"];
  const dispatch = useDispatch();
  useEffect(() => {
    if (products.length === 0 && filters.length === 0) {
      dispatch(fetchProducts);
    }
  }, [products, dispatch, filters]);

  useEffect(() => {
    dispatch(fetchWearables());
  }, [dispatch]);

  const wearables = useSelector((state) => state.products.wearables);

  let profile = useSelector((state) => state.app.profile);
  const theme = useSelector((state) => state.app.theme);
  const [searchValue, setSearch] = useState("");

  const search = useSelector((state) => state.products.search);
  useEffect(() => {
    dispatch(filterSearch(searchValue));
  }, [searchValue, dispatch]);
  useEffect(() => {
    setSearch(search);
  }, [search]);

  return (
    <div className="bg-skin-primary text-skin-base">
      <Helmet>
        <title>{type + " | " + profile.name}</title>
        <meta name="description" content={type} />
        <meta name="keywords" content={type} />
      </Helmet>
      <div className="xs:pt-4 md:pt-16">
        <div className="xs:pl-6 md:pl-14">
          <h1 className="xs:text-2xl md:text-4xl font-inter font-bold tracking-normal leading-none">
            {type}
          </h1>
          <div className="flex items-center justify-start py-4 flex-wrap">
            <div className="items-center justify-between py-8 hidden md:flex w-[100%]">
              <div className="flex items-center">
                {wearables.includes(type) &&
                  genderButtons.map((item, index) => {
                    return (
                      <div key={index}>
                        <Button
                          color={theme["button-flat"]}
                          size="md"
                          variant="outlined"
                          ripple={true}
                          className={
                            "text-skin-base hover:bg-skin-button-flat-hover duration-300 ease-in-out mr-4 " +
                            (filters.includes(item) ? "text-skin-selected" : "")
                          }
                          onClick={() => dispatch(filterGender(item))}
                        >
                          {item}
                        </Button>
                      </div>
                    );
                  })}
                {showPrice && (
                  <Button
                    color={theme["button-flat"]}
                    size="md"
                    variant="outlined"
                    ripple={true}
                    className={
                      "w-[140px] text-skin-base hover:bg-skin-button-flat-hover duration-300 ease-in-out mr-4 " +
                      (filters.includes("price") ? "text-skin-selected" : "")
                    }
                    onClick={() => dispatch(sortByPrice())}
                  >
                    Sort By Price
                  </Button>
                )}

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
              <div>
                {!wearables.includes(type) && (
                  <Input
                    label="Search"
                    name="search"
                    className="text-skin-base input"
                    color={theme["text-highlight"]}
                    value={searchValue}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                )}
              </div>
              <div className="pr-14">
                <Button
                  color={theme["button-flat"]}
                  size="md"
                  variant="outlined"
                  ripple={true}
                  className="text-skin-base hover:bg-skin-button-flat-hover duration-300 ease-in-out mr-4"
                  onClick={() => {
                    dispatch(filterProducts(type));
                    setSearch("");
                  }}
                >
                  Clear Filter
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between py-4 md:hidden">
              <Menu>
                <MenuHandler>
                  <Button
                    color={theme["button-flat"]}
                    size="lg"
                    variant="outlined"
                    ripple={true}
                    className="rounded-md text-skin-base hover:bg-skin-button-flat-hover duration-300 ease-in-out mr-4 p-2 px-4 "
                  >
                    Filters
                  </Button>
                </MenuHandler>
                <MenuList className="bg-skin-primary">
                  {wearables.includes(type) &&
                    genderButtons.map((item, index) => {
                      return (
                        <MenuItem
                          key={index}
                          onClick={() => dispatch(filterGender(item))}
                          className={
                            filters.includes(item)
                              ? "text-skin-selected bg-skin-primary"
                              : "bg-skin-primary text-skin-base"
                          }
                        >
                          {item.charAt(0).toUpperCase() + "" + item.slice(1)}
                        </MenuItem>
                      );
                    })}
                  {showPrice && (
                    <MenuItem
                      key={10}
                      onClick={() => dispatch(sortByPrice())}
                      className={
                        filters.includes("price")
                          ? "text-skin-selected bg-skin-primary"
                          : "bg-skin-primary text-skin-base"
                      }
                    >
                      Sort By Price
                    </MenuItem>
                  )}
                  <MenuItem
                    key={11}
                    onClick={() => {
                      dispatch(filterProducts(type));
                      setSearch("");
                    }}
                    className={"text-skin-base"}
                  >
                    Clear Filter
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
            {wearables.includes(type) && (
              <div className="xs:w-[150px] md:w-[300px] flex items-center hidden md:flex">
                <span className="pr-2 hidden md:block">Search:</span>
                <Input
                  label="Search"
                  name="search"
                  className="text-skin-base input"
                  color={theme["text-highlight"]}
                  value={searchValue}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </div>
            )}
            <div className="xs:w-[150px] md:w-[300px] flex items-center md:hidden">
              <span className="pr-2 hidden md:block">Search:</span>
              <Input
                label="Search"
                name="search"
                className="text-skin-base input"
                color={theme["text-highlight"]}
                value={searchValue}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        {error ? (
          <Error></Error>
        ) : (
          <div className="flex justify-center py-8 flex-wrap">
            {products
              .filter((product, index) => {
                if (type.toLowerCase() === "search") return true;
                else return product.type === type;
              })
              .map((product, index) => {
                return (
                  <div key={index} className="m-3">
                    <ProductCard
                      id={product._id}
                      name={product.name}
                      text={product.description}
                      img={product.img}
                      price={product.price}
                      colors={product.colors}
                      showPrice={showPrice}
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
