"use client";
import React, { useEffect, useState } from "react";
import {
  Tooltip,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";

import { Themes } from "@/utils/Themes/Themes";
import { colorComponent } from "@/utils/Utils";
import { useGlobalContext } from "@/Context/context";
import { addToCart } from "@/utils/frontendAPIs/cart";
import Image from "next/image";
import ShareIcon from "@mui/icons-material/Share";
import DOMPurify from "dompurify";

const SingleProduct = ({ product, showPrice, selectedTheme }) => {
  const [selectedImage, setSelectedImage] = useState(product.img);
  const { handleOpenAuth, setCart } = useGlobalContext();
  let authUser = localStorage.getItem("user") ? true : false;

  let theme = {};
  if (selectedTheme !== "") {
    theme = Themes[selectedTheme.toLowerCase()];
  } else {
    theme = Themes["classic"];
  }

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

  const myAddToCart = async (item) => {
    let dataLayer = window.dataLayer || [];
    let event = {
      event: "add-to-cart",
      item: { id: item._id, price: item.price, name: item.name },
    };
    dataLayer.push(event);
    let res = await addToCart(item);
    if (res.success) {
      setCart(res.data);
    }
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
    <div className="bg-skin-primary text-skin-base">
      {product && (
        <div className="flex justify-center items-center p-4 pb-8 flex-wrap">
          <div className="flex justify-center items-center m-4 flex-col">
            <Image
              className="max-h-600px rounded-lg max-w-[80%] sm:max-w-[500px]"
              src={selectedImage}
              alt={product.name}
              width={500}
              height={500}
              placeholder="blur"
              blurDataURL={blurCardImage(selectedImage)}
            />
            <div className="w-full flex justify-center sm:justify-start items-center p-2">
              <div
                className="w-[120px] max-w-[20%] ml-2"
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
                <p className="text-skin-alt text-sm">
                  {product.category + ": " + product.subcategory}
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
                  <div>
                    <Select
                      id="size"
                      name="size"
                      label="Pick a size"
                      value={size}
                      disabled={productSize === "-"}
                      onChange={(e) => setSize(e)}
                      color={theme["button-base"]}
                      className="my-select bg-skin-primary text-skin-base text-sm rounded-lg block w-full p-2.5"
                    >
                      {product.sizes.map((item, index) => {
                        return (
                          <Option key={index} value={item}>
                            {item}
                          </Option>
                        );
                      })}
                    </Select>
                  </div>
                )}
              </div>

              <div className="pb-4">
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <Select
                      id="color"
                      name="color"
                      label="Pick a color"
                      disabled={productColor === "-"}
                      onChange={(e) => {
                        setColor(e);
                      }}
                      value={color}
                      color={theme["button-base"]}
                      className="my-select bg-skin-primary text-skin-base text-sm rounded-lg block w-full p-2.5"
                    >
                      {product.colors.map((color, index) => {
                        return (
                          <Option
                            selected={true}
                            key={index}
                            value={color}
                            className="flex align-center"
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
                          </Option>
                        );
                      })}
                    </Select>
                  </div>
                )}
              </div>
              {showPrice && (
                <Typography className="font-bold text-skin-base">
                  Ksh.&nbsp;{product.price}
                </Typography>
              )}
              <div className="flex justify-between items-center">
                <Tooltip content="Add to Cart" placement="bottom">
                  <Button
                    className="bg-skin-alt text-skin-inverted"
                    size="lg"
                    color={theme["text-highlight"]}
                    ripple={true}
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
                  >
                    Add to Cart
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
