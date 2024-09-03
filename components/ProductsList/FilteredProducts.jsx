"use client";
import { getVisitorDetails } from "@/utils/functions";
import Opulence from "./templates/Opulence";
import Timeless from "./templates/Timeless";
import { useEffect } from "react";

const FilteredProducts = ({
  productList,
  type,
  wearables,
  profile,
  searchParam,
}) => {
  const template = profile.template;
  useEffect(() => {
    getVisitorDetails();
  }, []);

  return (
    <>
      {template === "Opulence" && (
        <Opulence
          productList={productList}
          type={type}
          wearables={wearables}
          searchParam={searchParam}
          profile={profile}
          template={template}
        />
      )}
      {template === "Timeless" && (
        <Timeless
          productList={productList}
          type={type}
          wearables={wearables}
          searchParam={searchParam}
          profile={profile}
          template={template}
        />
      )}
    </>
  );
};

export default FilteredProducts;
