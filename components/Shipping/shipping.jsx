"use client";
import { getVisitorDetails } from "@/utils/functions";
import Opulence from "./templates/Opulence";
import Timeless from "./templates/Timeless";

const Shipping = ({ shipping, profile, deliveryLocations }) => {
  let template = profile.template;
  getVisitorDetails();
  return (
    <>
      {template === "Opulence" && (
        <Opulence
          shipping={shipping}
          profile={profile}
          deliveryLocations={deliveryLocations}
        />
      )}
      {template === "Timeless" && (
        <Timeless
          shipping={shipping}
          profile={profile}
          deliveryLocations={deliveryLocations}
        />
      )}
    </>
  );
};

export default Shipping;
