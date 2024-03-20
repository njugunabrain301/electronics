"use client";
import React, { useEffect, useState } from "react";
import { Tooltip, Typography } from "@material-tailwind/react";

import { colorComponent } from "@/utils/Utils";
import { useGlobalContext } from "@/Context/context";
import { addToCart } from "@/utils/frontendAPIs/cart";
import Image from "next/image";
import ShareIcon from "@mui/icons-material/Share";
import DOMPurify from "dompurify";
import addedImg from "@/public/added.gif";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import mpesa from "@/assets/images/lipanampesa.png";
import Link from "next/link";
import Carousel from "react-material-ui-carousel";
import { Check } from "@mui/icons-material";
import MyModal from "@/components/Modal/MyModal";
import Cart from "@/components/cart/Cart";
import { useSearchParams } from "next/navigation";
import { gtag } from "@/utils/gtag";
import { motion, useAnimation } from "framer-motion";

export default function Product({
  product,
  profile,
  shipping,
  returns,
  offers,
  unitsSold,
  unitsRefunded,
}) {
  const [searchParams] = useSearchParams();
  const [selectedImage, setSelectedImage] = useState(product.img);
  const { setCart, cart } = useGlobalContext();

  const showPrice = profile.showPrice;

  const { theme, addToLocalCart, checkoutInfo, isVisible, setIsVisible } =
    useGlobalContext();
  const resizeProdImageSmall = (img) => {
    img = img.replace(
      "https://storage.googleapis.com/test-bucket001/",
      "https://ik.imagekit.io/d4mmlivtj/goduka/tr:w-600/"
    );
    return img;
  };
  const resizeProdImageLarge = (img) => {
    img = img.replace(
      "https://storage.googleapis.com/test-bucket001/",
      "https://ik.imagekit.io/d4mmlivtj/goduka/tr:w-900/"
    );
    return img;
  };

  const productSize = product
    ? product.sizes && product.sizes.length > 0
      ? product.sizes[0]
      : "-"
    : "-";

  const productColor = product
    ? product.colors && product.colors.length > 0
      ? product.colors[0]
      : "-"
    : "-";
  const [size, setSize] = useState(productSize);
  const [color, setColor] = useState(productColor);

  useEffect(() => {
    colorComponent("my-select");
  });

  const blurCardImage = (img) => {
    img = img.replace(
      "https://storage.googleapis.com/test-bucket001/",
      "https://ik.imagekit.io/d4mmlivtj/goduka/tr:bl-100/"
    );
    return img;
  };
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const myAddToCart = async (item) => {
    if (adding) return;
    let dataLayer = window.dataLayer || [];
    let event = {
      event: "add-to-cart",
      item: { id: item._id, price: item.price, name: item.name },
    };
    dataLayer.push(event);

    gtag("event", "add_to_cart", {
      currency: "KES",
      value: item.price,
      items: [
        {
          item_id: item._id,
          item_name: item.name,
          affiliation: profile.name,
          coupon: "",
          discount: 0,
          index: 0,
          item_brand: product.brand,
          item_category: product.category,
          item_category2: product.subcategory,
          item_variant: item.color + " " + item.size + " " + currOption.option,

          price: item.price,
          quantity: 1,
        },
      ],
    });

    setAdding(true);

    if (authUser) {
      let res = await addToCart(item);
      if (res.success) {
        setCart(res.data);
        setAdded(true);
        setTimeout(() => {
          setAdded(false);
        }, 2500);
      }
    } else {
      addToLocalCart(item);
      setAdded(true);
      setTimeout(() => {
        setAdded(false);
      }, 2500);
    }

    setAdding(false);
  };
  const currentUrl = window.location.href;
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let btn = document.getElementById("share_btn");
    btn.addEventListener("click", (event) => {
      if (navigator.share) {
        navigator
          .share({
            text: product.name,
            url: currentUrl,
          })
          .then(() => {})
          .catch((err) => {});
      } else {
        let urlText = document.getElementById("urlText");

        urlText.select();
        urlText.setSelectionRange(0, 99999);

        // Copy the text inside the text field
        navigator.clipboard.writeText(urlText.value);
        setCopied(true);
      }
    });

    //load first price option if available
    if (product.priceOptions.length > 0) {
      if (searchParams && searchParams.length > 0) {
        let optId = searchParams[0];
        product.priceOptions.map((opt) => {
          if (opt._id === optId) {
            setCurrOption(opt);
          }
        });
      } else setCurrOption(product.priceOptions[0]);
    }
  }, []);

  const cleanHTML = (text) => {
    while (text.includes("\n")) text = text.replace("\n", "<br/>");

    return DOMPurify.sanitize(text);
  };

  function removeTags(str) {
    if (str === null || str === "") return false;
    else str = str.toString();

    return str.replace(/(<([^>]+)>)/gi, "");
  }
  const moffers = [...offers];
  let pkg = profile.package.toLowerCase();

  //Cart Modal
  const [openBuyNow, setOpenBuyNow] = useState(false);
  const handleOpenBuyNow = () => {
    setOpenBuyNow(true);
  };
  const handleCloseBuyNow = () => {
    setOpenBuyNow(false);
  };

  const buyNow = () => {
    let dataLayer = window.dataLayer || [];
    let event = {
      event: "buy-now",
      item: {
        id: product._id,
        price: selectedPrice,
        name: product.name + currOption.option,
      },
    };
    gtag("event", "add_to_cart", {
      currency: "KES",
      value: product.price,
      items: [
        {
          item_id: product._id,
          item_name: product.name,
          affiliation: profile.name,
          coupon: "",
          discount: 0,
          index: 0,
          item_brand: product.brand,
          item_category: product.category,
          item_category2: product.subcategory,
          item_variant: color + " " + size + " " + currOption.option,

          price: product.price,
          quantity: 1,
        },
      ],
    });
    dataLayer.push(event);
    handleOpenBuyNow();
  };

  const [currOption, setCurrOption] = useState({});
  const [selectedPrice, setSelectedPrice] = useState(product.price);
  useEffect(() => {
    if (currOption.option && currOption.price) {
      setSelectedPrice(currOption.price);
    }
  }, [currOption]);

  const controls = useAnimation();

  useEffect(() => {
    setIsVisible(false);
    const handleScroll = () => {
      const slideUpDiv = document.getElementById("priceDiv");
      const slideUpDivOffset = slideUpDiv.getBoundingClientRect().top;
      const slideUpDivHeight = slideUpDiv.offsetHeight;
      const windowHeight = window.innerHeight;

      if (slideUpDivOffset < windowHeight - slideUpDivHeight / 2) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      controls.start({ bottom: 0 }); // Change bottom value to slide div upwards
    } else {
      // controls.start({ bottom: -100 }); // Change bottom value to slide div downwards
    }
  }, [isVisible, controls]);

  return (
    <div
      className="flex justify-center items-center p-4 pb-8 flex-wrap md:flex-nowrap w-[98%] mx-auto max-w-7xl"
      id="priceDiv"
    >
      <div className="flex justify-center items-center m-0 md:m-0 flex-col w-[100%] min-w-[50%]">
        <Image
          className="max-h-600px rounded-lg w-[100%] max-w-[1500px] hidden lg:block"
          src={resizeProdImageLarge(selectedImage)}
          alt={product.name}
          width={500}
          height={500}
          placeholder="blur"
          blurDataURL={blurCardImage(selectedImage)}
        />
        <Image
          className="max-h-600px rounded-lg w-[100%] max-w-[1500px] lg:hidden"
          src={resizeProdImageSmall(selectedImage)}
          alt={product.name}
          width={500}
          height={500}
          placeholder="blur"
          blurDataURL={blurCardImage(selectedImage)}
        />
        <div className="w-full flex justify-start items-center py-2 md:p-2">
          <div
            className="w-[120px] max-w-[20%] m-1"
            style={{ aspectRatio: "3/2" }}
          >
            <Image
              src={resizeProdImageSmall(product.img)}
              style={{ width: "100%", aspectRatio: "3/2" }}
              className="rounded-md cursor-pointer"
              onClick={() => setSelectedImage(product.img)}
              width={500}
              height={500}
              sizes="(max-width: 400px) 100%"
              placeholder="blur"
              blurDataURL={blurCardImage(product.img)}
              alt="Main Product Image"
            />
          </div>
          {product &&
            product.images &&
            product.images.map((im, index) => {
              return (
                <div
                  key={index}
                  className="w-[120px] max-w-[20%] ml-2"
                  style={{ aspectRatio: "3/2" }}
                >
                  <Image
                    src={resizeProdImageSmall(im.img)}
                    style={{ width: "100%", aspectRatio: "3/2" }}
                    className="rounded-md cursor-pointer"
                    onClick={() => setSelectedImage(im.img)}
                    width={500}
                    height={500}
                    sizes="(max-width: 400px) 100%"
                    placeholder="blur"
                    blurDataURL={blurCardImage(im.img)}
                    alt="Alternate Product Image"
                  />
                </div>
              );
            })}
        </div>
      </div>
      <div className="min-w-[300px] p-2 w-[100%]">
        <div className="">
          <div className="pb-4">
            <h1 className="text-2xl font-inter font-bold tracking-normal leading-none">
              {product.subcategory === "Vehicles" &&
              product.extras &&
              product.extras.make &&
              product.extras.model ? (
                <>{product.extras.make + " " + product.extras.model}</>
              ) : (
                <>
                  {product.brand
                    ? product.name.includes(product.brand)
                      ? product.name
                      : product.brand + " | " + product.name
                    : product.name}
                </>
              )}
            </h1>
            {/* <p
                  className="text-sm"
                  style={{ color: theme.palette.text.alt }}
                >
                  {product.category === product.subcategory
                    ? product.category
                    : product.category + ": " + product.subcategory}
                </p> */}
            <div
              className="flex flex-wrap"
              style={{ color: theme.palette.text.alt }}
            >
              {product.condition && (
                <p className="text-sm border-r pr-3 mr-3">
                  {product.condition.toLowerCase() === "new"
                    ? "Brand New"
                    : product.condition}
                </p>
              )}

              {returns.accept && (
                <p className="flex text-sm border-r pr-3 mr-3">
                  We accept returns
                </p>
              )}

              <p className="text-sm">
                {profile.goDelivery.enabled
                  ? "Pay On Delivery"
                  : shipping.accept
                  ? shipping.guaranteeCourier
                    ? "Damage-free delivery."
                    : "Shipping Available"
                  : "In-store pickup"}
              </p>
            </div>
          </div>
          {product.offer && (
            <p className="text-orange-700 text-sm font-inter font-bold tracking-normal leading-none pb-4">
              {product.offer}% OFF
            </p>
          )}
          {unitsSold > 0 && (
            <p className="text-l font-inter tracking-normal leading-none pb-4 text-sm md:text-base">
              {unitsSold +
                (unitsSold === 1 ? " unit sold " : " units sold ") +
                unitsRefunded +
                (unitsRefunded === 1 ? " refunded " : " refunded ")}
            </p>
          )}
          {product.USPs.length > 0 && pkg !== "starter" ? (
            <div>
              {product.USPs.map((usp, idx) => {
                return (
                  <p key={idx + "-" + usp} className="text-sm md:text-base">
                    <Check /> {" " + usp}
                  </p>
                );
              })}
              <p>
                <a
                  href="#more-details"
                  className="text-sm md:text-base"
                  style={{ color: theme.palette.text.alt }}
                >
                  {" "}
                  See Product Description
                </a>
              </p>
            </div>
          ) : (
            <p className="text-l font-inter tracking-normal leading-none pb-4">
              {removeTags(product.description).slice(0, 150)}
              {product.description.length > 150 && (
                <a
                  href="#more-details"
                  className=""
                  style={{ color: theme.palette.text.alt }}
                >
                  {" "}
                  ...more details
                </a>
              )}
            </p>
          )}
          <div className="pb-4">
            {product.sizes && product.sizes.length > 0 && (
              <>
                <FormControl className="w-full">
                  <InputLabel id="color-label">Pick a size</InputLabel>
                  <Select
                    labelId="size-label"
                    id="size"
                    name="size"
                    size="small"
                    label="Pick a size"
                    onChange={(e) => setSize(e.target.value)}
                    value={size}
                    disabled={productSize === "-"}
                    color={"input"}
                    className="my-select text-sm rounded-lg block w-full"
                    sx={{
                      backgroundColor: theme.palette.pane.main,
                      color: theme.palette.text.base,
                    }}
                    MenuProps={{
                      sx: {
                        "& ul": {
                          backgroundColor: theme.palette.pane.main,
                        },
                      },
                    }}
                  >
                    {product.sizes.map((item, index) => {
                      return (
                        <MenuItem
                          key={index}
                          value={item}
                          sx={{
                            backgroundColor: theme.palette.pane.main,
                            color: theme.palette.text.base,
                          }}
                        >
                          {item}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </>
            )}
          </div>
          <div className="pb-4">
            {product.colors && product.colors.length > 0 && (
              <FormControl className="w-full">
                <InputLabel id="color-label">Pick a color</InputLabel>
                <Select
                  labelId="color-label"
                  id="color"
                  name="color"
                  size="small"
                  label="Pick a color"
                  disabled={productColor === "-"}
                  onChange={(e) => {
                    setColor(e.target.value);
                  }}
                  value={color}
                  color={"input"}
                  className="my-select text-sm rounded-lg block w-full"
                  sx={{
                    backgroundColor: theme.palette.pane.main,
                    color: theme.palette.text.base,
                  }}
                  MenuProps={{
                    sx: {
                      "& ul": {
                        backgroundColor: theme.palette.pane.main,
                      },
                    },
                  }}
                >
                  {product.colors.map((color, index) => {
                    return (
                      <MenuItem
                        selected={true}
                        key={index}
                        value={color}
                        className="flex align-center"
                        sx={{
                          backgroundColor: theme.palette.pane.main,
                          color: theme.palette.text.base,
                        }}
                      >
                        <span
                          style={{
                            display: "inline-block",
                            width: "30px",
                            height: "20px",
                            backgroundColor: color,
                            borderRadius: "3px",
                          }}
                        ></span>
                        <span>
                          &nbsp;
                          {color}
                        </span>
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            )}
          </div>
          {product.priceOptions.length > 0 && (
            <div className="pb-4 flex flex-wrap">
              {product.priceOptions.map((option, index) => {
                return (
                  <div
                    key={index}
                    className="border p-1 px-2 m-2 rounded-sm cursor-pointer"
                    style={{
                      borderWidth: currOption._id === option._id ? "4px" : "",
                      borderColor:
                        currOption._id === option._id
                          ? theme.palette.highlight.main
                          : "",
                      color:
                        currOption._id === option._id
                          ? theme.palette.highlight.main
                          : "",
                    }}
                    onClick={() => setCurrOption(option)}
                  >
                    {option.option}
                  </div>
                );
              })}
            </div>
          )}
          {moffers && (
            <div
              style={{
                backgroundColor: theme.palette.panel.main,
                borderColor: theme.palette.panel.border,
                color: theme.palette.text.base,
              }}
              className="px-3 rounded-md"
            >
              <Carousel
                animation="slide"
                navButtonsAlwaysVisible={false}
                duration={1000}
                indicators={false}
                navButtonsProps={{
                  style: {
                    backgroundColor: "transparent",

                    color: "inherit",
                  },
                }}
              >
                {moffers.map((offer, index) => (
                  <p className="text-center" key={index}>
                    {offer}
                  </p>
                ))}
              </Carousel>
            </div>
          )}
          <p className="italic">
            {product.inStock ? "In Stock" : "Out of Stock"}
          </p>
          {/* Price and checkout normal */}
          <div className="flex justify-between items-center mt-3 flex-wrap ">
            {showPrice && (
              <Typography className="font-bold hidden md:block">
                Ksh.&nbsp;{selectedPrice}
              </Typography>
            )}
            <span
              id="share_btn"
              className="py-2 rounded-full hover:underline cursor-pointer md:hidden"
            >
              <ShareIcon className="pr-2" />
              Share
            </span>
            <div className="text-sm">
              {" "}
              <Link href="/returns" className="underline">
                Returns
              </Link>{" "}
              &{" "}
              <Link href={"/shipping"} className="underline">
                Shipping
              </Link>{" "}
              Policy
            </div>
          </div>
          <div className="flex justify-between items-center mt-3 hidden md:flex">
            <div>
              {pkg === "starter" ? (
                <>
                  <Tooltip content="Add to Cart" placement="bottom">
                    <Button
                      color={"cart-btn"}
                      disabled={!product.inStock}
                      onClick={() =>
                        myAddToCart({
                          _id: product._id,
                          name: product.name,
                          img: product.img,
                          text: product.description,
                          description: product.description,
                          size: size,
                          color: color,
                          brand: product.brand,
                          price: selectedPrice,
                          selectedOption: currOption.option,
                          amount: 1,
                          totalPrice: selectedPrice,
                          handlingTime: product.handlingTime,
                        })
                      }
                      id="add-btn"
                      variant="contained"
                    >
                      {adding ? (
                        "Adding..."
                      ) : added ? (
                        <span className="flex items-center">
                          <Image
                            className="w-[20px] rounded-full"
                            src={addedImg}
                            alt="Added gif"
                            id="gif_added"
                          />
                          &nbsp; Added
                        </span>
                      ) : (
                        "Add to Cart"
                      )}
                    </Button>
                  </Tooltip>
                </>
              ) : (
                <>
                  <span className="mr-[7px]">
                    <Button
                      color={"cart-btn"}
                      disabled={!product.inStock}
                      onClick={() => buyNow()}
                      variant="contained"
                    >
                      Buy Now
                    </Button>
                  </span>
                  <Tooltip content="Add to Cart" placement="bottom">
                    <Button
                      color={"cart-btn"}
                      disabled={!product.inStock}
                      onClick={() =>
                        myAddToCart({
                          _id: product._id,
                          name: product.name,
                          img: product.img,
                          text: product.description,
                          description: product.description,
                          size: size,
                          color: color,
                          price: selectedPrice,
                          brand: product.brand,
                          selectedOption: currOption.option,
                          amount: 1,
                          totalPrice: selectedPrice,
                          handlingTime: product.handlingTime,
                        })
                      }
                      style={{
                        border: "solid 1px",
                        marginRight: "15px !important",
                      }}
                      id="add-btn"
                      variant="outlined"
                    >
                      {adding ? (
                        "Adding..."
                      ) : added ? (
                        <span className="flex items-center">
                          <Image
                            className="w-[20px] rounded-full"
                            src={addedImg}
                            alt="Added gif"
                            id="gif_added"
                          />
                          &nbsp; Added
                        </span>
                      ) : (
                        "Add to Cart"
                      )}
                    </Button>
                  </Tooltip>
                </>
              )}
            </div>
            <div>
              <input
                id="urlText"
                value={currentUrl}
                style={{ display: "none" }}
                onChange={() => {
                  console.log("");
                }}
              />

              <span
                id="share_btn"
                className="p-2 px-3 rounded-full hover:underline cursor-pointer"
              >
                <ShareIcon className="pr-2" />
                Share
              </span>
            </div>
          </div>

          <div className="flex justify-end">
            {copied && (
              <span className="pr-2 text-xs">Link successfully copied</span>
            )}
          </div>
          <div className="mt-[15px] flex">
            We accept payments using
            <Image
              src={mpesa}
              alt="MPesa Logo"
              className="object-fit h-[25px] w-[150px] pl-[10px]"
            />
          </div>
        </div>
      </div>
      {/* Buy Now Modal */}
      <MyModal open={openBuyNow} onClose={handleCloseBuyNow}>
        <Cart
          closeModal={handleCloseBuyNow}
          totalPrice={selectedPrice}
          setCart={setCart}
          cart={[
            {
              _id: product._id,
              name: product.name,
              img: product.img,
              text: product.description,
              description: product.description,
              selectedOption: currOption.option,
              size: size,
              color: color,
              price: selectedPrice,
              amount: 1,
              totalPrice: selectedPrice,
              handlingTime: product.handlingTime,
            },
          ]}
          showPrice={profile.showPrice}
          checkoutInfo={checkoutInfo}
          selectedTheme={profile.theme.toLowerCase()}
          template={profile.template}
          single={true}
        ></Cart>
      </MyModal>
      {/* Price and checkout fixed */}
      <motion.div
        className="fixed w-[100%] px-2 py-3 border-t-[2px] z-[200]"
        style={{
          backgroundColor: theme.palette.background.primary,
          borderColor: theme.palette.text.alt,
        }}
        initial={{ bottom: -100 }}
        animate={controls}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center">
          <div className="flex">
            {cart.length > 0 ? (
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
                <span
                  className="rounded-full px-1  text-xs mr-1 absolute mt-[-30px] ml-[15px]"
                  style={{
                    backgroundColor: theme.palette.card.main,
                    color: theme.palette.text.inverted,
                  }}
                >
                  {cart.length}
                </span>
              </span>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            )}
            <div className="ml-3">
              {showPrice && (
                <Typography className="font-bold">
                  Ksh.&nbsp;{selectedPrice}
                </Typography>
              )}
            </div>
          </div>
          <div>
            {pkg === "starter" ? (
              <>
                <Tooltip content="Add to Cart" placement="bottom">
                  <Button
                    color={"cart-btn"}
                    disabled={!product.inStock}
                    size="small"
                    onClick={() =>
                      myAddToCart({
                        _id: product._id,
                        name: product.name,
                        img: product.img,
                        text: product.description,
                        description: product.description,
                        size: size,
                        color: color,
                        brand: product.brand,
                        price: selectedPrice,
                        selectedOption: currOption.option,
                        amount: 1,
                        totalPrice: selectedPrice,
                        handlingTime: product.handlingTime,
                      })
                    }
                    id="add-btn"
                    variant="contained"
                  >
                    {adding ? (
                      "Adding..."
                    ) : added ? (
                      <span className="flex items-center">
                        <Image
                          className="w-[20px] rounded-full"
                          src={addedImg}
                          alt="Added gif"
                          id="gif_added"
                        />
                        &nbsp; Added
                      </span>
                    ) : (
                      "Add to Cart"
                    )}
                  </Button>
                </Tooltip>
              </>
            ) : (
              <>
                <Tooltip content="Add to Cart" placement="bottom">
                  <Button
                    color={"cart-btn"}
                    disabled={!product.inStock}
                    onClick={() =>
                      myAddToCart({
                        _id: product._id,
                        name: product.name,
                        img: product.img,
                        text: product.description,
                        description: product.description,
                        size: size,
                        color: color,
                        price: selectedPrice,
                        brand: product.brand,
                        selectedOption: currOption.option,
                        amount: 1,
                        totalPrice: selectedPrice,
                        handlingTime: product.handlingTime,
                      })
                    }
                    style={{
                      border: "solid 1px",
                      marginRight: "15px !important",
                    }}
                    id="add-btn"
                    variant="outlined"
                  >
                    {adding ? (
                      "Adding..."
                    ) : added ? (
                      <span className="flex items-center">
                        <Image
                          className="w-[20px] rounded-full"
                          src={addedImg}
                          alt="Added gif"
                          id="gif_added"
                        />
                        &nbsp; Added
                      </span>
                    ) : (
                      "Add to Cart"
                    )}
                  </Button>
                </Tooltip>
                <span className="ml-[7px]">
                  <Button
                    color={"cart-btn"}
                    disabled={!product.inStock}
                    onClick={() => buyNow()}
                    variant="contained"
                  >
                    Buy Now
                  </Button>
                </span>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
