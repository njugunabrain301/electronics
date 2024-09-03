"use client";
import Timeless from "./Timeless/Main";
import Opulence from "./Opulence/Main";
import { getVisitorDetails } from "@/utils/functions";
import { useEffect } from "react";

const Main = ({ products, slider, promoted, profile, categories }) => {
  const template = profile.template;
  useEffect(() => {
    getVisitorDetails("Home Page");
  }, []);

  return (
    <div>
      {template === "Timeless" && (
        <Timeless
          products={products}
          slider={slider}
          promoted={promoted}
          profile={profile}
          categories={categories}
        />
      )}
      {template === "new" && (
        <Opulence
          products={products}
          slider={slider}
          promoted={promoted}
          profile={profile}
          categories={categories}
        />
      )}
    </div>
  );
};

export default Main;
