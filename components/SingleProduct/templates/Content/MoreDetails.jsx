"use client";
import React, { useState } from "react";
import { useGlobalContext } from "@/Context/context";
import Image from "next/image";
import DOMPurify from "dompurify";

const MoreDetailsContent = ({
  product,
  theme,
  resizeProdImageSmall,
  cleanHTML,
  pkg,
  active,
  setActive,
}) => {
  return (
    <main-content>
      <div
        id="more-details"
        className="p-4 pb-8 flex-wrap md:flex-nowrap w-[98%] mx-auto max-w-7xl"
      >
        <div className="flex mb-4">
          <p
            className="text-sm md:text-lg px-2 md:px-3 mr-2 text-center cursor-pointer"
            style={{
              borderBottom:
                active === 1
                  ? "solid 2px " + theme.palette.highlight.main
                  : "solid 1px",
              color: active === 1 ? theme.palette.highlight.main : "inherit",
              fontWeight: active === 1 ? "bold" : "normal",
            }}
            onClick={() => setActive(1)}
          >
            DESCRIPTION
          </p>
          {pkg !== "starter" && product.specs && product.specs.length > 0 && (
            <p
              className="text-sm md:text-lg px-2 md:px-3 mr-2 cursor-pointer"
              style={{
                borderBottom:
                  active === 2
                    ? "solid 2px " + theme.palette.highlight.main
                    : "solid 1px",
                color: active === 2 ? theme.palette.highlight.main : "inherit",
                fontWeight: active === 2 ? "bold" : "normal",
              }}
              onClick={() => setActive(2)}
            >
              SPECS
            </p>
          )}
          {pkg !== "starter" && product.faqs && product.faqs.length > 0 && (
            <p
              className="text-sm md:text-lg px-2 md:px-3 mr-2 cursor-pointer"
              style={{
                borderBottom:
                  active === 3
                    ? "solid 2px " + theme.palette.highlight.main
                    : "solid 1px",
                color: active === 3 ? theme.palette.highlight.main : "inherit",
                fontWeight: active === 3 ? "bold" : "normal",
              }}
              onClick={() => setActive(3)}
            >
              FAQs
            </p>
          )}
          {pkg !== "starter" &&
            product.reviews &&
            product.reviews.length > 0 && (
              <p
                className="text-sm md:text-lg px-2 md:px-3 cursor-pointer"
                style={{
                  borderBottom:
                    active === 4
                      ? "solid 2px " + theme.palette.highlight.main
                      : "solid 1px",
                  color:
                    active === 4 ? theme.palette.highlight.main : "inherit",
                  fontWeight: active === 4 ? "bold" : "normal",
                }}
                onClick={() => setActive(4)}
              >
                REVIEWS
              </p>
            )}
        </div>
        {active === 1 && (
          <div>
            {product.videoLink && (
              <iframe
                style={{ aspectRatio: "3/2", marginBottom: "20px" }}
                width="100%"
                src={product.videoLink}
              ></iframe>
            )}
            <p
              className="font-inter tracking-normal leading-8 pb-4"
              dangerouslySetInnerHTML={{
                __html: cleanHTML(product.description),
              }}
            ></p>
          </div>
        )}
        {active === 2 && (
          <div>
            <div className="text-l font-inter tracking-normal leading-8 pb-4 rounded-md">
              {product.specs.map((spec, idx) => {
                return (
                  <div
                    key={idx}
                    className=" p-2 my-2"
                    style={{
                      backgroundColor:
                        idx % 2 === 0
                          ? theme["theme-type"] === "light"
                            ? "#00000010"
                            : "#ffffff10"
                          : "transparent",
                    }}
                  >
                    <b>{spec.name + ": "}</b>
                    <span>{spec.detail}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {active === 3 && (
          <div>
            <div className="text-l font-inter tracking-normal leading-8 pb-4 rounded-md">
              {product.faqs.map((faq, idx) => {
                let qsn = faq.question.trim();
                qsn = qsn.endsWith("?") ? qsn : qsn + "? ";
                return (
                  <div
                    key={idx}
                    className=" p-2 my-2"
                    style={{
                      borderBottom:
                        "solid 1px " +
                        (theme["theme-type"] === "light"
                          ? "#00000010"
                          : "#ffffff10"),
                    }}
                  >
                    <b className="pr-[10px]">{qsn}</b>
                    <span>{faq.answer}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {active === 4 && (
          <div>
            {product.reviews.map((review, idx) => {
              let stars = [];
              for (var i = 0; i < review.rating; i++) stars.push(" ⭐ ");
              return (
                <div key={idx} className=" p-2 my-2">
                  <div>
                    {review.name}
                    <span>{stars.map((s, idx) => s)}</span>
                  </div>
                  <span>{review.comment}</span>
                  <div className="leading-8">
                    {review.media.map((media, idx) => {
                      console.log(media);
                      if (media.type === "video") {
                      } else if (media.type === "image") {
                        return (
                          <div>
                            <Image
                              width={200}
                              height={200}
                              alt={product.name + " client review picture"}
                              src={resizeProdImageSmall(media.link)}
                            />
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main-content>
  );
};

export default MoreDetailsContent;
