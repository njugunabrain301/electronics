"use client";
import React from "react";
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
