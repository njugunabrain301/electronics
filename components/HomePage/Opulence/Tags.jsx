"use client";
import { useGlobalContext } from "@/Context/context";
import React from "react";

export default function Tags({ profile }) {
  let video = "";
  let tags = [];

  if (profile.promotions) {
    let vids = [];
    profile.promotions.map((p) => {
      if (p.type === "tag") tags.push(p.content);
      else if (p.type === "video") vids.push(p.content);
      return p;
    });
    if (vids.length > 0) video = vids[0];
  }
  const { theme, titleFont } = useGlobalContext();
  return (
    <div>
      <>
        {tags.length > 0 ? (
          <div
            className="p-2 w-[60%] my-3 mx-auto"
            style={{
              backgroundColor: theme.palette.background.inverted,
              color: theme.palette.text.inverted,
            }}
          >
            <h3
              className={
                "text-center text-lg font-bold tracking-normal leading-none " +
                titleFont.className
              }
            >
              {tags[0]}
            </h3>
          </div>
        ) : (
          <></>
        )}

        <div>
          {video && (
            <iframe
              title="Youtube video"
              style={{
                maxWidth: "800px",
                margin: "20px auto",
                width: "90%",
                aspectRatio: "3/2",
                borderRadius: "10px",
              }}
              src={video}
            ></iframe>
          )}
        </div>

        {tags.length > 1 ? (
          <div
            className="p-2 w-[60%] my-3 mx-auto"
            style={{
              backgroundColor: theme.palette.background.inverted,
              color: theme.palette.text.inverted,
            }}
          >
            <h3
              className={
                "text-center text-lg font-bold tracking-normal leading-none " +
                titleFont.className
              }
            >
              {tags[1]}
            </h3>
          </div>
        ) : (
          <></>
        )}
      </>
    </div>
  );
}
