import ProductCard from "../../ProductCard/ProductCard";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import NotFound from "@/app/404";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import MySearchField from "../../SearchField/MySearchField";

const ProductListContent = ({
  type,
  wearables,
  profile,
  searchParam,
  showPrice,
  filters,
  genderButtons,
  theme,
  searchValue,
  setSearch,
  products,
  toggleFilter,
  clearFilters,
}) => {
  return (
    <main-content>
      <div
        className=""
        style={{
          backgroundColor: theme.palette.background.primary,
          color: theme.palette.text.base,
        }}
      >
        <div className="pt-4 md:pt-8">
          <div className="pl-6 md:pl-14">
            <h1 className="text-2xl md:text-4xl font-inter font-bold tracking-normal leading-none">
              {type.toLowerCase() === "search"
                ? "Search: " + searchParam
                : type}
            </h1>
            <div className="flex items-center justify-start py-4 flex-wrap">
              <div className="items-center justify-between py-8 hidden md:flex w-[100%]">
                <div className="flex items-center">
                  {wearables.includes(type) &&
                    genderButtons.map((item, index) => {
                      return (
                        <div key={index} className={"mr-2 "}>
                          <Button
                            color={"flat-button"}
                            variant="outlined"
                            onClick={() => toggleFilter(item)}
                            sx={{
                              color: filters.includes(item)
                                ? theme.palette.highlight.main
                                : "",
                            }}
                          >
                            {item}
                          </Button>
                        </div>
                      );
                    })}
                  {showPrice && (
                    <Button
                      color={"flat-button"}
                      variant="outlined"
                      className={
                        " mr-4 " +
                        (filters.includes("sort") ? "text-skin-selected" : "")
                      }
                      sx={{
                        color: filters.includes("sort")
                          ? theme.palette.highlight.main
                          : "",
                      }}
                      onClick={() => toggleFilter("sort")}
                    >
                      Sort By Price
                    </Button>
                  )}
                </div>
                <div>
                  {!wearables.includes(type) && (
                    <MySearchField
                      label={"Search"}
                      value={searchValue}
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                    />
                  )}
                </div>
                <div className="pr-14">
                  <Button
                    color={"flat-button"}
                    variant="outlined"
                    className="mr-4"
                    onClick={() => {
                      clearFilters();
                    }}
                  >
                    Clear Filter
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between py-4 md:hidden mr-4">
                <Menu>
                  <MenuHandler>
                    <Button color={"flat-button"} variant="outlined">
                      Filters
                    </Button>
                  </MenuHandler>
                  <MenuList
                    style={{ backgroundColor: theme.palette.pane.main }}
                  >
                    {wearables.includes(type) &&
                      genderButtons.map((item, index) => {
                        return (
                          <MenuItem
                            key={index}
                            onClick={() => toggleFilter(item)}
                            style={{
                              color: filters.includes(item)
                                ? theme.palette.highlight.main
                                : theme.palette.text.base,
                            }}
                          >
                            {item.charAt(0).toUpperCase() + "" + item.slice(1)}
                          </MenuItem>
                        );
                      })}
                    {showPrice && (
                      <MenuItem
                        key={10}
                        onClick={() => toggleFilter("sort")}
                        style={{
                          color: filters.includes("sort")
                            ? theme.palette.highlight.main
                            : theme.palette.text.base,
                        }}
                      >
                        Sort By Price
                      </MenuItem>
                    )}
                    <MenuItem
                      key={11}
                      onClick={() => {
                        clearFilters();
                      }}
                      className={"text-skin-base"}
                    >
                      Clear Filter
                    </MenuItem>
                  </MenuList>
                </Menu>
              </div>
              {wearables.includes(type) && (
                <div className="xs:w-[150px] md:w-[300px] flex items-center hidden md:flex">
                  <MySearchField
                    label={"Search"}
                    value={searchValue}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                </div>
              )}
              <div className="xs:w-[150px] md:w-[300px] flex items-center md:hidden">
                <MySearchField
                  label={"Search"}
                  value={searchValue}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          {products.length === 0 ? (
            <NotFound message={"There are no matching products"} />
          ) : (
            <div className="flex justify-center py-8 flex-wrap">
              {products.map((product, index) => {
                let price = product.price;
                let discount = 0;
                if (profile.package === "Business") {
                  if (product.priceOptions && product.priceOptions.length > 0) {
                    price = product.priceOptions[0].price;
                    product.priceOptions.map((p) => {
                      if (p.default) {
                        price = p.price;
                      }
                    });
                  }
                  if (product.coupons && product.coupons.length > 0) {
                    product.coupons.map((c) => {
                      if (c.default) discount = c.discount;
                    });
                  }
                }

                return (
                  <motion.div
                    key={index}
                    className="m-3"
                    initial={{ translateY: "50px", opacity: 0 }}
                    animate={{ translateY: "0", opacity: 1 }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  >
                    <ProductCard
                      id={product._id}
                      name={product.name}
                      text={product.description}
                      img={product.img}
                      price={price - discount}
                      colors={product.colors}
                      showPrice={showPrice}
                      extras={product.extras}
                      subcategory={product.subcategory}
                      theme={theme}
                      discount={discount}
                    ></ProductCard>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main-content>
  );
};

export default ProductListContent;
