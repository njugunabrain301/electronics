"use client";
import { useGlobalContext } from "@/Context/context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MySearchField from "../../SearchField/MySearchField";
import { Button } from "@mui/material";

const Opulence = ({ categories, profile }) => {
  const { theme, titleFont } = useGlobalContext();

  let [search, setSearch] = useState("");

  let router = useRouter();
  const applySearch = () => {
    if (search !== "") {
      router.push("/filter/search/" + search);
    }
  };

  let template = "new"; //profile.template;
  return (
    <div
      style={{
        overflow: "hidden",
        backgroundColor: theme.palette.background.primary,
      }}
    >
      <h3 className={"text-center text-3xl mb-3 " + titleFont.className}>
        Continue Shopping
      </h3>
      <div className="px-2 flex justify-center">
        <div className="max-w-[90%] w-[300px] flex justify-center items-center">
          <MySearchField
            label="Search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            onClick={() => applySearch()}
            template={template}
          />
        </div>
      </div>
      <div className="flex items-center justify-center py-8 flex-wrap">
        {categories.map((button, index) => {
          return (
            <div key={index} className="mx-2 mb-3">
              <Link href={"/filter/" + button}>
                <Button
                  variant="outlined"
                  color="flat-button"
                  style={{ borderRadius: "0" }}
                >
                  {button}
                </Button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Opulence;
