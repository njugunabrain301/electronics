"use client";
import { getVisitorDetails } from "@/utils/functions";
import Timeless from "./templates/Timeless";
import { useEffect } from "react";

function Orders() {
  useEffect(() => {
    getVisitorDetails();
  }, []);

  return (
    <>
      <Timeless />
    </>
  );
}

export default Orders;
