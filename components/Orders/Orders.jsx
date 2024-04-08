"use client";
import { getVisitorDetails } from "@/utils/functions";
import Opulence from "./templates/Opulence";
import Timeless from "./templates/Timeless";

function Orders({ template }) {
  getVisitorDetails();
  return (
    <>
      {template === "Opulence" && <Opulence />}
      {template === "Timeless" && <Timeless />}
    </>
  );
}

export default Orders;
