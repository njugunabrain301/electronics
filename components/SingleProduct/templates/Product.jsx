"use client";
import React, { useEffect, useState } from "react";
import { Tooltip, Typography } from "@material-tailwind/react";

import { colorComponent } from "@/utils/Utils";
import { useGlobalContext } from "@/Context/context";
import { addToCart } from "@/utils/frontendAPIs/cart";
import Image from "next/image";
import ShareIcon from "@mui/icons-material/Share";
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
import { motion, useAnimation } from "framer-motion";
import { pushEvent } from "@/utils/gtag";
import ProductContent from "./Content/Product";

export default function Product({
  product,
  profile,
  shipping,
  returns,
  offers,
  unitsSold,
  unitsRefunded,
  currOption,
  setCurrOption,
  selectedPrice,
  setSelectedPrice,
  discount,
  sticky,
}) {
  const searchParams = useSearchParams();
  const [selectedImage, setSelectedImage] = useState(product.img);
  const { setCart, cart, verify } = useGlobalContext();
  let authUser = localStorage.getItem("user") ? true : false;

  const showPrice = profile.showPrice;

  const {
    theme,
    addToLocalCart,
    checkoutInfo,
    isVisible,
    setIsVisible,
    handleOpenCart,
    totalCount,
  } = useGlobalContext();
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

    event = {
      event: "add_to_cart",
      currency: "KES",
      value: item.price,
      item: { id: item._id, price: item.price, name: item.name },
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
    };
    dataLayer.push(event);
    pushEvent("event", "add_to_cart", event);

    setAdding(true);

    await verify();
    authUser = localStorage.getItem("user") ? true : false;
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
    // let btn = document.getElementById("share_btn");
    // btn.addEventListener("click", (event) => {
    //   if (navigator.share) {
    //     navigator
    //       .share({
    //         text: product.name,
    //         url: currentUrl,
    //       })
    //       .then(() => {})
    //       .catch((err) => {});
    //   } else {
    //     let urlText = document.getElementById("urlText");

    //     urlText.select();
    //     urlText.setSelectionRange(0, 99999);

    //     // Copy the text inside the text field
    //     navigator.clipboard.writeText(urlText.value);
    //     setCopied(true);
    //   }
    // });

    //load first price option if available
    if (product.priceOptions.length > 0) {
      let variant = searchParams.get("variant");
      let defaultOption = product.priceOptions[0];
      if (variant) {
        let optId = variant;
        product.priceOptions.map((opt) => {
          if (opt._id === optId) {
            setCurrOption(opt);
          }
          if (opt.default) {
            defaultOption = opt;
          }
        });
      } else {
        product.priceOptions.map((opt) => {
          if (opt.default) {
            defaultOption = opt;
          }
        });
        setCurrOption(defaultOption);
      }
    }
  }, []);

  const shareLink = () => {
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

  const buyNow = async () => {
    await verify();
    authUser = localStorage.getItem("user") ? true : false;
    let dataLayer = window.dataLayer || [];
    let event = {
      event: "buy-now",
      item: {
        id: product._id,
        price: selectedPrice,
        name: product.name + currOption.option,
      },
    };
    dataLayer.push(event);
    event = {
      currency: "KES",
      event: "add_to_cart",
      item: {
        id: product._id,
        price: selectedPrice,
        name: product.name + currOption.option,
      },
      value: selectedPrice,
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

          price: selectedPrice,
          quantity: 1,
        },
      ],
    };
    dataLayer.push(event);
    pushEvent("event", "add_to_cart", event);
    handleOpenBuyNow();
  };

  useEffect(() => {
    if (currOption.option && currOption.price) {
      setSelectedPrice(currOption.price - discount);
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
    <ProductContent
      product={product}
      profile={profile}
      shipping={shipping}
      returns={returns}
      unitsSold={unitsSold}
      unitsRefunded={unitsRefunded}
      currOption={currOption}
      setCurrOption={setCurrOption}
      selectedPrice={selectedPrice}
      sticky={sticky}
      selectedImage={selectedImage}
      setSelectedImage={setSelectedImage}
      setCart={setCart}
      showPrice={showPrice}
      theme={theme}
      checkoutInfo={checkoutInfo}
      handleOpenCart={handleOpenCart}
      totalCount={totalCount}
      resizeProdImageLarge={resizeProdImageLarge}
      resizeProdImageSmall={resizeProdImageSmall}
      productSize={productSize}
      productColor={productColor}
      size={size}
      setSize={setSize}
      color={color}
      setColor={setColor}
      blurCardImage={blurCardImage}
      adding={adding}
      added={added}
      myAddToCart={myAddToCart}
      currentUrl={currentUrl}
      copied={copied}
      shareLink={shareLink}
      removeTags={removeTags}
      moffers={moffers}
      pkg={pkg}
      openBuyNow={openBuyNow}
      handleCloseBuyNow={handleCloseBuyNow}
      buyNow={buyNow}
      controls={controls}
    />
  );
}
