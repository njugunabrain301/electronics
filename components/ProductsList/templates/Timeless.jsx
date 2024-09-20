"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../../ProductCard/ProductCard";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import NotFound from "@/app/404";
import { motion } from "framer-motion";
import { useGlobalContext } from "@/Context/context";
import { Button } from "@mui/material";
import MySearchField from "../../SearchField/MySearchField";
import ProductListContent from "./Content";

const Timeless = ({ productList, type, wearables, profile, searchParam }) => {
  const showPrice = profile.showPrice;
  let event = {
    event: "view_item_list",
    item_list_name: type + " " + searchParam,
    items: productList.map((item, idx) => {
      return {
        item_id: item._id,
        item_name: item.name,
        affiliation: profile.name,
        coupon: "",
        discount: 0,
        index: idx,
        item_brand: item.brand,
        item_category: item.category,
        item_category2: item.subcategory,
        item_variant: "",
        price: item.price,
        quantity: 1,
      };
    }),
  };
  let dataLayer = [];
  useEffect(() => {
    dataLayer = window.dataLayer || [];
    dataLayer.push(event);
  }, []);

  const [filters, setFilters] = useState([]);

  const genderButtons = ["male", "female", "unisex"];

  let { theme } = useGlobalContext();

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
          (product.category &&
            product.category
              .toLowerCase()
              .includes(searchValue.toLowerCase())) ||
          (product.subcategory &&
            product.subcategory
              .toLowerCase()
              .includes(searchValue.toLowerCase())) ||
          (product.extras &&
            product.extras.make &&
            product.extras.make
              .toLowerCase()
              .includes(searchValue.toLowerCase())) ||
          (product.extras &&
            product.extras.model &&
            product.extras.model
              .toLowerCase()
              .includes(searchValue.toLowerCase()))
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
    <ProductListContent
      type={type}
      wearables={wearables}
      profile={profile}
      searchParam={searchParam}
      showPrice={showPrice}
      filters={filters}
      genderButtons={genderButtons}
      theme={theme}
      searchValue={searchValue}
      setSearch={setSearch}
      products={products}
      toggleFilter={toggleFilter}
      clearFilters={clearFilters}
    />
  );
};

export default Timeless;
