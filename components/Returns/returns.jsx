"use client";
import { getVisitorDetails } from "@/utils/functions";
import Timeless from "./templates/Timeless";
import { useEffect } from "react";

const Returns = ({ returns, profile }) => {
  useEffect(() => {
    getVisitorDetails();
  }, []);

  return (
    <>
      <Timeless returns={returns} profile={profile} />
    </>
  );
};

export default Returns;
