"use client";
import { getVisitorDetails } from "@/utils/functions";
import Timeless from "./templates/Timeless";
import { useEffect } from "react";

const Shipping = ({ shipping, profile, deliveryLocations }) => {
  useEffect(() => {
    getVisitorDetails();
  }, []);

  return (
    <>
      <Timeless
        shipping={shipping}
        profile={profile}
        deliveryLocations={deliveryLocations}
      />
    </>
  );
};

export default Shipping;
