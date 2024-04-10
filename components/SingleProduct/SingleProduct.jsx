"use client";
import Opulence from "./templates/Opulence/Opulence";
import Timeless from "./templates/Timeless/Timeless";
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
  let template = profile.template;
  getVisitorDetails();
  return (
    <>
      {template === "Opulence" && (
        <Opulence
          product={product}
          profile={profile}
          others={others}
          categories={categories}
          returns={returns}
          shipping={shipping}
          unitsSold={unitsSold}
          unitsRefunded={unitsRefunded}
        />
      )}
      {template === "Timeless" && (
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
      )}
    </>
  );
};

export default SingleProduct;
