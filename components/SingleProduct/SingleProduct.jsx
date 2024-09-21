"use client";
import { useEffect } from "react";
import Timeless from "./templates/Timeless";
import { getVisitorDetails } from "@/utils/functions";

const SingleProduct = ({
  product,
  profile,
  others,
  categories,
  returns,
  shipping,
  offers,
  unitsSold,
  unitsRefunded,
}) => {
  useEffect(() => {
    getVisitorDetails();
  }, []);

  return (
    <>
      <Timeless
        product={product}
        others={others}
        categories={categories}
        profile={profile}
        returns={returns}
        shipping={shipping}
        offers={offers}
        unitsSold={unitsSold}
        unitsRefunded={unitsRefunded}
      />
    </>
  );
};

export default SingleProduct;
