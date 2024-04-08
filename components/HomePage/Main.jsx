"use client";
import Timeless from "./Timeless/Main";
import Opulence from "./Opulence/Main";
import { getVisitorDetails } from "@/utils/functions";

const Main = ({ products, slider, promoted, profile, categories }) => {
  const template = profile.template;
  getVisitorDetails("Home Page");
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
