"use client";
import { useGlobalContext } from "@/Context/context";
import { Facebook, Google, Instagram, Twitter } from "@mui/icons-material";
import Image from "next/image";
import React from "react";
import xlogo from "@/public/x.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";

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

  return (
    <div
      style={{
        backgroundColor: theme.palette.background.primary,
        color: theme.palette.text.base,
      }}
    >
      <div className="flex items-center justify-center">
        <hr
          className="h-px w-4/5 opacity-50 outline-none border-none"
          style={{ backgroundColor: theme.palette["flat-button"].main }}
        />
      </div>
      <div className="flex items-center justify-around pt-4">
        <div>
          {logo ? (
            <div className="flex align-center m-2 px-[5px] ">
              <img
                className="max-w-[100px] md-max-w-initial md:max-h-16 w-full max-h-10 lg:h-20"
                src={logo}
                alt="store"
              />
            </div>
          ) : (
            <div className="rounded-md">{genLogo()}</div>
          )}
        </div>
        <div className="flex items-center">
          {profile.google && profile.google !== "undefined" ? (
            <span>
              <a href={profile.google}>
                <Google />
              </a>
              &nbsp;
            </span>
          ) : (
            ""
          )}
          {profile.facebook && profile.facebook !== "undefined" ? (
            <span>
              <a href={profile.facebook}>
                <Facebook />
              </a>
              &nbsp;
            </span>
          ) : (
            ""
          )}
          {profile.twitter && profile.twitter !== "undefined" ? (
            <span className="flex items-center">
              <a href={profile.twitter}>
                <FontAwesomeIcon icon={faXTwitter} />
              </a>
              &nbsp;
            </span>
          ) : (
            ""
          )}
          {profile.instagram && profile.instagram !== "undefined" ? (
            <span>
              <a href={profile.instagram}>
                <Instagram />
              </a>
              &nbsp;
            </span>
          ) : (
            ""
          )}
          &nbsp;&nbsp;
          <p className=" text-sm font-inter no-underline normal-case xs:pl-1">
            &copy; {year} by <a href="https://www.bunika.co.ke">Bunika</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Timeless;
