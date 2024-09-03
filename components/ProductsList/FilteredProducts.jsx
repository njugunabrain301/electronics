"use client";
import { getVisitorDetails } from "@/utils/functions";
import Timeless from "./templates/Timeless";
import { useEffect } from "react";

const FilteredProducts = ({
  productList,
  type,
  wearables,
  profile,
  searchParam,
}) => {
  useEffect(() => {
    getVisitorDetails();
  }, []);

  return (
    <>
      <Timeless
        productList={productList}
        type={type}
        wearables={wearables}
        searchParam={searchParam}
        profile={profile}
      />
    </>
  );
};

export default FilteredProducts;
