"use client";
import React, { useEffect, useState } from "react";
import { Tooltip, Typography, Option } from "@material-tailwind/react";

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
import ProductSection from "@/components/HomePage/Timeless/ProductSection/ProductSection";
import NavigateButtons from "@/components/NavigateButtons/NavigateButtons";
import mpesa from "@/assets/images/lipanampesa.png";
import Link from "next/link";
import Carousel from "react-material-ui-carousel";
import { Check, PowerOffOutlined } from "@mui/icons-material";

const Timeless = ({
  product,
  others,
  categories,
  profile,
  shipping,
  returns,
  offers,
  unitsSold,
  unitsRefunded,
}) => {
  const [selectedImage, setSelectedImage] = useState(product.img);
  const { handleOpenAuth, setCart } = useGlobalContext();
  let authUser = localStorage.getItem("user") ? true : false;

  const showPrice = profile.showPrice;

  const { theme, addToLocalCart } = useGlobalContext();
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
  // useEffect(() => {
  //   if (
  //     selectedImage.includes("https://storage.googleapis.com/test-bucket001/")
  //   ) {
  //     let img = selectedImage.replace(
  //       "https://storage.googleapis.com/test-bucket001/",
  //       "https://ik.imagekit.io/d4mmlivtj/goduka/tr:w-600/"
  //     );
  //     setSelectedImage(img);
  //   }
  // }, [selectedImage]);

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
  const [active, setActive] = useState(1);

  return (
    <div
      className=""
      style={{
        backgroundColor: theme.palette.background.primary,
        color: theme.palette.text.base,
      }}
    >
      <p className="text-sm md:text-base ml-2 mt-2">
        <Link className="font-bold" href={"/"}>
          Home
        </Link>{" "}
        &gt;&gt;{" "}
        <Link href={"/filter/" + product.category} className="font-bold">
          {product.category}
        </Link>{" "}
        &gt;&gt;{" "}
        <Link href={"/filter/" + product.subcategory} className="font-bold">
          {product.subcategory}
        </Link>
      </p>
      {product && (
        <div className="flex justify-center items-center p-4 pb-8 flex-wrap md:flex-nowrap w-[98%] mx-auto max-w-7xl">
          <div className="flex justify-center items-center m-0 md:m-0 flex-col max-w-[100%] min-w-[50%]">
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
                  src={product.img}
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
                        src={im.img}
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
                    {shipping.accept
                      ? shipping.guaranteeCourier
                        ? "Guaranteed damage-free delivery."
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
                <p className="text-l font-inter tracking-normal leading-none pb-4">
                  {unitsSold +
                    (unitsSold === 1 ? " unit sold " : " units sold ") +
                    unitsRefunded +
                    (unitsRefunded === 1 ? " refunded " : " refunded ")}
                </p>
              )}
              {product.USPs.length > 0 ? (
                <div>
                  {product.USPs.map((usp, idx) => {
                    return (
                      <p key={idx + "-" + usp}>
                        <Check /> {" " + usp}
                      </p>
                    );
                  })}
                  <p>
                    <a
                      href="#more-details"
                      className=""
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
              <div className="flex justify-between items-center mt-3 flex-wrap">
                {showPrice && (
                  <Typography className="font-bold">
                    Ksh.&nbsp;{product.price}
                  </Typography>
                )}
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
              <div className="flex justify-between items-center mt-3">
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
                        price: product.price,
                        amount: 1,
                        totalPrice: product.price,
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
        </div>
      )}
      <div
        id="more-details"
        className="p-4 pb-8 flex-wrap md:flex-nowrap w-[98%] mx-auto max-w-7xl"
      >
        <div className="flex mb-4">
          <p
            className="text-sm md:text-lg px-3 mr-2 text-center cursor-pointer"
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
              className="text-sm md:text-lg px-3 mr-2 cursor-pointer"
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
              className="text-sm md:text-lg px-3 mr-2 cursor-pointer"
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
                className="text-sm md:text-lg px-3 mr-2 cursor-pointer"
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
            <p
              className="font-inter tracking-normal leading-none pb-4"
              dangerouslySetInnerHTML={{
                __html: cleanHTML(product.description),
              }}
            ></p>
          </div>
        )}
        {active === 2 && (
          <div>
            <div className="text-l font-inter tracking-normal leading-none pb-4 rounded-md">
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
            <p className="text-l font-inter tracking-normal leading-none pb-4 rounded-md">
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
                    <b>{qsn}</b>
                    <span>{faq.answer}</span>
                  </div>
                );
              })}
            </p>
          </div>
        )}
        {active === 4 && (
          <div>
            <p className="text-l font-inter tracking-normal leading-none pb-4">
              REVIEWS
            </p>
          </div>
        )}
      </div>
      <div>
        <ProductSection
          products={others}
          showPrice={showPrice}
          title="Related Products"
        />
      </div>
      <div>
        <NavigateButtons
          categories={categories}
          profile={profile}
          minified={true}
        />
      </div>
    </div>
  );
};

export default Timeless;
