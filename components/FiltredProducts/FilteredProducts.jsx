"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Button, Input } from "@material-tailwind/react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import Error from "@/components/Error";
import { Themes } from "@/utils/Themes/Themes";

const FilteredProducts = ({
  productList,
  type,
  wearables,
  profile,
  searchParam,
  params,
}) => {
  console.log(
    "pList",
    productList,
    "type",
    type,
    "wearables",
    wearables,
    "profile",
    profile,
    "searchParam",
    searchParam,
    "params",
    params
  );
  const [error, setError] = useState("");
  const showPrice = profile.showPrice;
  const [filters, setFilters] = useState([]);

  const genderButtons = ["male", "female", "unisex"];

  let theme = Themes[profile.theme.toLowerCase()];

  const [searchValue, setSearch] = useState("");
  const [products, setProducts] = useState(productList);

  useEffect(() => {
    let filtered = productList.filter((product) => {
      let res = true;
      filters.map((filter) => {
        if (
          filter.toLowerCase() === "male" &&
          product.gender.toLowerCase() !== "male" &&
          product.gender.toLowerCase() !== "unisex"
        )
          res = false;
        if (
          filter.toLowerCase() === "female" &&
          product.gender.toLowerCase() !== "female" &&
          product.gender.toLowerCase() !== "unisex"
        )
          res = false;
        if (
          filter.toLowerCase() === "unisex" &&
          product.gender.toLowerCase() !== "unisex"
        )
          res = false;
      });
      if (
        searchValue &&
        !(
          product.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          product.type.toLowerCase().includes(searchValue.toLowerCase())
        )
      )
        res = false;

      return res;
    });
    if (filters.includes("sort")) {
      filtered = filtered.sort((a, b) => (a.price > b.price ? -1 : 1));
    }
    setProducts(filtered);
  }, [filters, searchValue]);

  const toggleFilter = (val) => {
    if (!filters.includes(val)) setFilters([...filters, val]);
    else {
      let nf = filters.filter((filter) => filter !== val);
      setFilters(nf);
    }
  };
  const clearFilters = () => {
    setFilters([]);
    setSearch("");
  };

  return (
    <div className="bg-skin-primary text-skin-base">
      <div className="pt-4 md:pt-8">
        <div className="pl-6 md:pl-14">
          <h1 className="text-2xl md:text-4xl font-inter font-bold tracking-normal leading-none">
            {type.toLowerCase() === "search" ? "Search: " + searchParam : type}
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
                          onClick={() => toggleFilter(item)}
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
                      (filters.includes("sort") ? "text-skin-selected" : "")
                    }
                    onClick={() => toggleFilter("sort")}
                  >
                    Sort By Price
                  </Button>
                )}
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
                    clearFilters();
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
                          onClick={() => toggleFilter(item)}
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
                      onClick={() => toggleFilter("sort")}
                      className={
                        filters.includes("sort")
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
                      clearFilters();
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
            {products.map((product, index) => {
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
