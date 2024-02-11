"use client";
import { useGlobalContext } from "@/Context/context";
import {
  Facebook,
  Google,
  Instagram,
  LocationOn,
  Twitter,
} from "@mui/icons-material";
import Image from "next/image";
import React from "react";
import xlogo from "@/public/x.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";

const Opulence = ({ profile }) => {
  const year = new Date().getFullYear();
  const businessName = profile.name;
  const logo = profile.icon || "";

  const { theme } = useGlobalContext();

  return (
    <div
      style={{
        color: theme.palette.background.primary,
        backgroundColor: theme.palette.text.base,
      }}
    >
      <div className="w-[98%] mx-auto max-w-7xl">
        <div className="flex items-center justify-center">
          <hr
            className="h-px w-4/5 opacity-50 outline-none border-none"
            style={{ backgroundColor: theme.palette["flat-button"].main }}
          />
        </div>
        <div className="flex justify-center items-center w-full pt-3">
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
        </div>
        <div className="flex justify-between items-start p-4">
          <div>
            {logo ? (
              <div className="flex mt-2 mb-2 px-[5px] ">
                <img
                  className="max-w-[100px] md-max-w-initial md:max-h-16 w-full max-h-10 lg:h-20"
                  src={logo}
                  alt="store"
                />
              </div>
            ) : (
              <div>{businessName}</div>
            )}
            <br />
            <p className=" text-sm font-inter no-underline normal-case xs:pl-1">
              &copy; {year} by <a href="https://www.bunika.co.ke">Bunika</a>
            </p>
          </div>
          <div>
            <LocationOn /> {profile.location}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Opulence;
