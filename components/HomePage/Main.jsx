"use client";
import Timeless from "./Timeless/Main";
import { getVisitorDetails } from "@/utils/functions";
import { useEffect } from "react";

const Main = ({ products, slider, promoted, profile, categories }) => {
  useEffect(() => {
    getVisitorDetails("Home Page");
  }, []);

  return (
    <div>
      <Timeless
        products={products}
        slider={slider}
        promoted={promoted}
        profile={profile}
        categories={categories}
      />
    </div>
  );
};

export default Main;
