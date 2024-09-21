import Link from "next/link";
import MySearchField from "../../SearchField/MySearchField";
import { Button } from "@mui/material";

const NavigateButtonsContent = ({
  categories,
  minified,
  video,
  tags,
  theme,
  search,
  setSearch,
  searching,
  applySearch,
  template,
  displayNum,
}) => {
  return (
    <main-content>
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
              template={template}
              searching={searching}
            />
          </div>
        </div>
        <div className="flex items-center justify-center py-8 flex-wrap">
          {categories.map((button, index) => {
            if (!minified && index > displayNum) return;
            return (
              <div key={index} className="mx-2 mb-3">
                <Link href={"/filter/" + encodeURIComponent(button)}>
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
    </main-content>
  );
};

export default NavigateButtonsContent;
