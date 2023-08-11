import React, { useEffect, useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import {
  fetchCategories,
  filterProducts,
  filterSearch,
  setSearchFilter,
} from "../../features/slices/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const NavigateButtons = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const categories = useSelector((state) => state.products.categories);

  let [video, setVideo] = useState("");
  let [tags, setTags] = useState([]);
  let profile = useSelector((state) => state.app.profile);
  useEffect(() => {
    if (profile.promotions) {
      let vids = [];
      let tags = [];
      profile.promotions.map((p) => {
        if (p.type === "tag") tags.push(p.content);
        else if (p.type === "video") vids.push(p.content);
        return p;
      });
      setTags(tags);
      if (vids.length > 0) setVideo(vids[0]);
    }
  }, [profile]);
  const theme = useSelector((state) => state.app.theme);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(setSearchFilter(""));
  }, [dispatch]);

  return (
    <div className="bg-skin-primary">
      <div className="px-2 flex justify-center">
        <div className="max-w-[90%] w-[300px] flex justify-center items-center">
          <Input
            label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div>
            {" "}
            <Button
              color={theme["button-flat"]}
              size="md"
              variant="outlined"
              ripple={true}
              className="ml-2 text-skin-base hover:bg-skin-button-flat-hover duration-300 ease-in-out"
              onClick={() => {
                dispatch(filterProducts("search"));
                dispatch(setSearchFilter(search));
                dispatch(filterSearch(search));
                if (search !== "") {
                  navigate("/filteredProducts/search");
                }
              }}
            >
              Search
            </Button>
          </div>{" "}
        </div>
      </div>
      <div className="flex items-center justify-center py-8 flex-wrap">
        {categories.map((button, index) => {
          return (
            <div key={index} className="mx-2 mb-3">
              <Link to={"/filteredProducts/" + button}>
                <Button
                  color={theme["button-flat"]}
                  size="lg"
                  variant="outlined"
                  ripple={true}
                  className="text-skin-base hover:bg-skin-button-flat-hover duration-300 ease-in-out"
                  onClick={() => dispatch(filterProducts(button))}
                >
                  {button}
                </Button>
              </Link>
            </div>
          );
        })}
      </div>
      {tags.length > 0 ? (
        <div className="bg-skin-alt p-2 w-[60%] my-3 mx-auto rounded-md">
          <h3 className="text-skin-inverted text-center text-lg font-inter font-bold tracking-normal leading-none">
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
        <div className="bg-skin-alt p-2 w-[60%] my-3 mx-auto rounded-md">
          <h3 className="text-skin-inverted text-center text-lg font-inter font-bold tracking-normal leading-none">
            {tags[1]}
          </h3>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default NavigateButtons;
