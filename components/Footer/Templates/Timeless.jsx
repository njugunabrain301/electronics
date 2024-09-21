"use client";
import { useGlobalContext } from "@/Context/context";
import React from "react";
import { usePathname } from "next/navigation";
import FooterContent from "./Content";

const Timeless = ({ profile }) => {
  const year = new Date().getFullYear();
  const businessName = profile.name || "Welcome Back";
  const logo = profile.icon || "";

  const genLogo = () => {
    let name = "";
    for (var i = 0; i < businessName.length; i++) {
      let c = businessName.charAt(i);
      if (c.search(/[^a-zA-Z]+/) === -1) {
        name += c;
      } else if (c === " ") {
        name += c;
      }
    }
    while (name.includes("  ")) name = name.replace("  ", " ");
    let names = name.split(" ");
    let char1 = name.charAt(0).toUpperCase();
    let char2 = name.charAt(1).toLowerCase();
    let logo;
    if (names.length > 1) {
      char2 = names[1].charAt(0).toUpperCase();
    }
    logo = (
      <div className="flex align-center bg-black m-2 px-[5px] rounded-md">
        <span
          className="font-inter"
          style={{ fontSize: "27pt", fontWeight: "900", color: "white" }}
        >
          {char1}
        </span>
        <div className="flex flex-col justify-center">
          <span
            className="text-l font-inter"
            style={{
              borderBottom: "solid 6px white",
              fontWeight: "900",
              fontSize: "20pt",
              color: "white",
              lineHeight: "25px",
            }}
          >
            {char2}
          </span>
        </div>
      </div>
    );

    return logo;
  };

  const { theme } = useGlobalContext();
  const url = usePathname();
  const prodPage = url.includes("/item/");
  return (
    <FooterContent
      profile={profile}
      year={year}
      logo={logo}
      genLogo={genLogo}
      theme={theme}
      prodPage={prodPage}
    />
  );
};

export default Timeless;
