"use client";
import { useGlobalContext } from "@/Context/context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MySearchField from "./MySearchField";
import { Button } from "@mui/material";

const NavigateButtons = ({ categories, profile, minified }) => {
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
  const { theme } = useGlobalContext();

  let [search, setSearch] = useState("");

  let router = useRouter();
  const applySearch = () => {
    if (search !== "") {
      router.push("/filter/search/" + search);
    }
  };

  let displayNum = 10;

  return (
    <div
      style={{
        overflow: "hidden",
        backgroundColor: theme.palette.background.primary,
      }}
    >
      <div className="px-2 flex justify-center">
        <div className="max-w-[90%] w-[300px] flex justify-center items-center">
          <MySearchField
            label="Search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            onClick={() => applySearch()}
          />
        </div>
      </div>
      <div className="flex items-center justify-center py-8 flex-wrap">
        {categories.map((button, index) => {
          if (!minified && index > displayNum) return;
          return (
            <div key={index} className="mx-2 mb-3">
              <Link href={"/filter/" + button}>
                <Button variant="outlined" color="flat-button">
                  {button}
                </Button>
              </Link>
            </div>
          );
        })}
        {categories.length > displayNum && !minified && (
          <div className="mx-2 mb-3">
            <Link href={"#more-categories"}>
              <Button variant="outlined" color="flat-button">
                More...
              </Button>
            </Link>
          </div>
        )}
      </div>
      {!minified && (
        <>
          {tags.length > 0 ? (
            <div
              className="p-2 w-[60%] my-3 mx-auto rounded-md"
              style={{
                backgroundColor: theme.palette.background.inverted,
                color: theme.palette.text.inverted,
              }}
            >
              <h3 className="text-center text-lg font-inter font-bold tracking-normal leading-none">
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
              className="p-2 w-[60%] my-3 mx-auto rounded-md"
              style={{
                backgroundColor: theme.palette.background.inverted,
                color: theme.palette.text.inverted,
              }}
            >
              <h3 className=" text-center text-lg font-inter font-bold tracking-normal leading-none">
                {tags[1]}
              </h3>
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};

export default NavigateButtons;
