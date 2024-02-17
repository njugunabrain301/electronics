"use client";

import { useGlobalContext } from "@/Context/context";
import DOMPurify from "dompurify";

const Opulence = ({ about }) => {
  const { titleFont } = useGlobalContext();

  const cleanHTML = (text) => {
    while (text.includes("\n")) text = text.replace("\n", "<br/>");

    return DOMPurify.sanitize(text);
  };

  return (
    <div className="w-[90%] max-w-[1000px] mx-auto pb-[50px]">
      <h1
        className={
          titleFont.className +
          " text-3xl md:text-5xl text-center pt-[50px] pb-[20px]"
        }
      >
        About Us
      </h1>
      <p
        dangerouslySetInnerHTML={{
          __html: cleanHTML(
            about.aboutDetailed ? about.aboutDetailed : about.about
          ),
        }}
        className="pure-html"
      ></p>
    </div>
  );
};

export default Opulence;
