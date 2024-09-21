"use client";
import React, { useState } from "react";
import { useGlobalContext } from "@/Context/context";
import Image from "next/image";
import DOMPurify from "dompurify";
import MoreDetailsContent from "./Content/MoreDetails";

const MoreDetails = ({ product, profile }) => {
  const { theme } = useGlobalContext();
  const resizeProdImageSmall = (img) => {
    img = img.replace(
      "https://storage.googleapis.com/test-bucket001/",
      "https://ik.imagekit.io/d4mmlivtj/goduka/tr:w-600/"
    );
    return img;
  };

  const cleanHTML = (text) => {
    while (text.includes("\n")) text = text.replace("\n", "<br/>");

    return DOMPurify.sanitize(text);
  };

  let pkg = profile.package.toLowerCase();
  const [active, setActive] = useState(1);

  return (
    <MoreDetailsContent
      product={product}
      theme={theme}
      resizeProdImageSmall={resizeProdImageSmall}
      cleanHTML={cleanHTML}
      pkg={pkg}
      active={active}
      setActive={setActive}
    />
  );
};

export default MoreDetails;
