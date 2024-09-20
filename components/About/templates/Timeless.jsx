"use client";

import { useGlobalContext } from "@/Context/context";
import DOMPurify from "dompurify";
import Content from "./Content";

const Timeless = ({ about }) => {
  const { titleFont } = useGlobalContext();

  const cleanHTML = (text) => {
    while (text.includes("\n")) text = text.replace("\n", "<br/>");

    return DOMPurify.sanitize(text);
  };

  return <Content about={about} cleanHTML={cleanHTML} titleFont={titleFont} />;
};

export default Timeless;
