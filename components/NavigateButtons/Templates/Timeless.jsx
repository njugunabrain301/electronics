"use client";
import { useGlobalContext } from "@/Context/context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MySearchField from "../../SearchField/MySearchField";
import { Button } from "@mui/material";
import NavigateButtonsContent from "./Content";

const Timeless = ({ categories, profile, minified }) => {
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
  const [searching, setSearching] = useState(false);
  const applySearch = () => {
    if (search !== "") {
      setSearching(true);
      router.push("/filter/search/" + search);
    } else {
      setSearching(false);
    }
  };
  let template = profile.template;
  let displayNum = 10;

  return (
    <NavigateButtonsContent
      categories={categories}
      minified={minified}
      video={video}
      tags={tags}
      theme={theme}
      search={search}
      setSearch={setSearch}
      searching={searching}
      applySearch={applySearch}
      template={template}
      displayNum={displayNum}
    />
  );
};

export default Timeless;
