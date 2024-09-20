"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/Context/context";
import { useSearchParams } from "next/navigation";
import "react-multi-carousel/lib/styles.css";
import { pushEvent } from "@/utils/gtag";
import SingleProductContent from "./Content/Timeless";
import DOMPurify from "dompurify";

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
  const searchParams = useSearchParams();
  const variant = searchParams.get("variant");
  const source = searchParams.get("source");
  const lp = searchParams.get("lp");
  let coupon = searchParams.get("coupon");

  let event = {
    event: "view_item",
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
        item_variant: variant ? variant : "",
        price: product.price,
        quantity: 1,
      },
    ],
  };
  let dataLayer = [];
  useEffect(() => {
    dataLayer = window.dataLayer || [];
    dataLayer.push(event);
  }, []);

  const showPrice = profile.showPrice;

  const { theme, bodyFont, setMiniHeader, verify, setCart, checkoutInfo } =
    useGlobalContext();
  const resizeProdImageSmall = (img) => {
    img = img.replace(
      "https://storage.googleapis.com/test-bucket001/",
      "https://ik.imagekit.io/d4mmlivtj/goduka/tr:w-600/"
    );
    return img;
  };

  const [currOption, setCurrOption] = useState({});

  const cleanHTML = (text) => {
    while (text.includes("\n")) text = text.replace("\n", "<br/>");

    return DOMPurify.sanitize(text);
  };

  //Cart Modal
  const [openBuyNow, setOpenBuyNow] = useState(false);
  const handleOpenBuyNow = () => {
    setOpenBuyNow(true);
  };
  const handleCloseBuyNow = () => {
    setOpenBuyNow(false);
  };

  let articleCount = 0;

  // Carousel Config
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 767, min: 464 },
      items: 2,
    },
  };

  let articles = [];
  // setMiniHeader(true);
  if (lp) {
    product.landingPages.map((l) => {
      if (l.name === lp) {
        articles = l.articles;
        setMiniHeader(l.miniHeader);
      }
    });
  } else {
    product.landingPages.map((lp) => {
      if (lp.default || lp.name === "default") {
        articles = lp.articles;
        setMiniHeader(lp.miniHeader);
      }
    });
  }

  //Package
  let pkg = profile.package.toLowerCase();
  let discount = 0;

  if (coupon && product.coupons) {
    product.coupons.map((c) => {
      if (c._id === coupon) {
        discount = c.discount;
        coupon = c;
      }
    });
  }

  if (discount === 0 && product.coupons) {
    product.coupons.map((c) => {
      if (c.default) {
        discount = c.discount;
        coupon = c;
      }
    });
  }

  const [selectedPrice, setSelectedPrice] = useState(product.price - discount);

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

  const buyNow = async () => {
    await verify();
    // let authUser = localStorage.getItem("user") ? true : false;
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
          item_variant:
            productColor + " " + productSize + " " + currOption.option,

          price: selectedPrice,
          quantity: 1,
        },
      ],
    };
    dataLayer.push(event);
    pushEvent("event", "add_to_cart", event);
    handleOpenBuyNow();
  };
  return (
    <SingleProductContent
      product={product}
      others={others}
      categories={categories}
      profile={profile}
      shipping={shipping}
      returns={returns}
      offers={offers}
      unitsSold={unitsSold}
      unitsRefunded={unitsRefunded}
      source={source}
      coupon={coupon}
      showPrice={showPrice}
      theme={theme}
      bodyFont={bodyFont}
      setCart={setCart}
      checkoutInfo={checkoutInfo}
      resizeProdImageSmall={resizeProdImageSmall}
      currOption={currOption}
      setCurrOption={setCurrOption}
      cleanHTML={cleanHTML}
      openBuyNow={openBuyNow}
      setOpenBuyNow={setOpenBuyNow}
      handleOpenBuyNow={handleOpenBuyNow}
      handleCloseBuyNow={handleCloseBuyNow}
      articleCount={articleCount}
      responsive={responsive}
      articles={articles}
      pkg={pkg}
      discount={discount}
      selectedPrice={selectedPrice}
      setSelectedPrice={setSelectedPrice}
      productSize={productSize}
      productColor={productColor}
      buyNow={buyNow}
    />
  );
};

export default Timeless;
