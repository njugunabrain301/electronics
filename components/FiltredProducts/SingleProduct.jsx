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

const SingleProduct = ({ product, showPrice }) => {
  const [selectedImage, setSelectedImage] = useState(product.img);
  const { handleOpenAuth, setCart } = useGlobalContext();
  let authUser = localStorage.getItem("user") ? true : false;

  const { theme } = useGlobalContext();

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
    let res = await addToCart(item);
    if (res.success) {
      setCart(res.data);
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

  return (
    <div
      className=""
      style={{
        backgroundColor: theme.palette.background.primary,
        color: theme.palette.text.base,
      }}
    >
      {product && (
        <div className="flex justify-center items-center p-4 pb-8 flex-wrap md:flex-nowrap">
          <div className="flex justify-center items-center m-0 md:m-0 flex-col max-w-[100%]">
            <Image
              className="max-h-600px rounded-lg max-w-[100%] md:max-w-[80%]"
              src={selectedImage}
              alt={product.name}
              width={500}
              height={500}
              placeholder="blur"
              blurDataURL={blurCardImage(selectedImage)}
            />
            <div className="w-full flex justify-between md:justify-center items-center py-2 md:p-2">
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
          <div className="min-w-[300px]">
            <div className="max-w-lg">
              <div className="pb-4">
                <h5 className="text-2xl font-inter font-bold tracking-normal leading-none">
                  {product.subcategory === "Vehicles" &&
                  product.extras &&
                  product.extras.make &&
                  product.extras.model ? (
                    <div>
                      <p>{product.extras.make + " " + product.extras.model}</p>
                    </div>
                  ) : (
                    <span>{product.name}</span>
                  )}
                </h5>
                <p
                  className="text-sm"
                  style={{ color: theme.palette.text.alt }}
                >
                  {product.category === product.subcategory
                    ? product.category
                    : product.category + ": " + product.subcategory}
                </p>
              </div>
              {product.offer && (
                <p className="text-orange-700 text-xl font-inter font-bold tracking-normal leading-none pb-4">
                  {product.offer}% OFF
                </p>
              )}
              <p
                className="text-l font-inter tracking-normal leading-none pb-4"
                dangerouslySetInnerHTML={{
                  __html: cleanHTML(product.description),
                }}
              ></p>
              <div className="pb-4">
                {product.sizes && product.sizes.length > 0 && (
                  <FormControl className="w-full">
                    <InputLabel id="size-label">Pick a size</InputLabel>
                    <Select
                      labelId="size-label"
                      id="size"
                      name="size"
                      label="Pick a size"
                      value={size}
                      disabled={productSize === "-"}
                      onChange={(e) => setSize(e.target.value)}
                      color={"input"}
                      className="my-select text-sm rounded-lg block w-full p-2.5"
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
              {showPrice && (
                <Typography className="font-bold">
                  Ksh.&nbsp;{product.price}
                </Typography>
              )}
              <div className="flex justify-between items-center mt-3">
                <Tooltip content="Add to Cart" placement="bottom">
                  <Button
                    color={"cart-btn"}
                    onClick={() =>
                      authUser
                        ? myAddToCart({
                            _id: product._id,
                            name: product.name,
                            img: product.img,
                            text: product.description,
                            size: size,
                            color: color,
                            price: product.price,
                            amount: 1,
                            totalPrice: product.price,
                          })
                        : handleOpenAuth()
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
