"use client";
import { useGlobalContext } from "@/Context/context";
import { Facebook, Google, Instagram, Twitter } from "@mui/icons-material";
import Image from "next/image";
import React from "react";
import xlogo from "@/public/x.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import Timeless from "./Templates/Timeless";
import Opulence from "./Templates/Opulence";

const Footer = ({ profile }) => {
  let template = profile.template;

  return (
    <>
      {template === "Timeless" && <Timeless profile={profile} />}
      {template === "Opulence" && <Opulence profile={profile} />}
    </>
  );
};

export default Footer;
