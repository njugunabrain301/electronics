"use client";
import { getVisitorDetails } from "@/utils/functions";
import Opulence from "./templates/Opulence";
import Timeless from "./templates/Timeless";
import { useEffect } from "react";

function Orders({ template }) {
  useEffect(() => {
    getVisitorDetails();
  }, []);
  getVisitorDetails();
  return (
    <>
      {template === "Opulence" && <Opulence />}
      {template === "Timeless" && <Timeless />}
    </>
  );
}

export default Orders;
