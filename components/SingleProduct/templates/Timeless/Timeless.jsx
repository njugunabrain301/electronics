"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/Context/context";
import Image from "next/image";
import DOMPurify from "dompurify";
import ProductSection from "@/components/HomePage/Timeless/ProductSection/ProductSection";
import NavigateButtons from "@/components/NavigateButtons/NavigateButtons";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { gtag } from "@/utils/gtag";
import Counter from "./Counter";
import Product from "./Product";
import MoreDetails from "./MoreDetails";

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
  const [searchParams] = useSearchParams();

  gtag("event", "view_item", {
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
        item_variant: searchParams ? searchParams[0] : "",
        price: product.price,
        quantity: 1,
      },
    ],
  });

  const showPrice = profile.showPrice;

  const {
    theme,
    addToLocalCart,
    checkoutInfo,
    openCart,
    handleOpenCart,
    handleCloseCart,
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

  const currentUrl = window.location.href;
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
        <Product
          product={product}
          profile={profile}
          shipping={shipping}
          returns={returns}
          offers={offers}
          unitsSold={unitsSold}
          unitsRefunded={unitsRefunded}
        />
      )}
      {/* More Details */}
      <MoreDetails product={product} profile={profile} />
      {/* Articles */}
      <div className="p-4 pb-8 flex flex-wrap w-[98%] mx-auto max-w-7xl justify-between">
        {product.articles.map((article, idx) => {
          if (article.type === "article") {
            return (
              <div className="w-full md:w-[45%] md:flex flex-wrap my-3">
                {article.content.title && (
                  <h2 className="text-2xl md:text-3xl font-bold w-full text-center">
                    {article.content.title}
                  </h2>
                )}
                {article.content.image && (
                  <label className="text-center mx-auto">
                    <Image
                      src={resizeProdImageSmall(article.content.image)}
                      alt={article.content.title + " image"}
                      width={300}
                      height={200}
                      className="lg:w-[300px] mx-auto"
                    />
                  </label>
                )}
                {article.content.content && (
                  <p className="m-3">{article.content.content}</p>
                )}
              </div>
            );
          } else if (article.type === "list") {
            return (
              <div className="w-full md:w-[45%] my-3">
                {article.content.title && (
                  <h2 className="text-2xl md:text-3xl font-bold w-full text-center">
                    {article.content.title}
                  </h2>
                )}
                {article.content.intro && <p>{article.content.intro}</p>}
                <ul className="list-disc ml-4">
                  {article.content.items.map((item, idx) => {
                    return <li key={idx + "-" + item}>{item}</li>;
                  })}
                </ul>
              </div>
            );
          } else if (article.type === "counter") {
            return (
              <div className="flex justify-evenly flex-wrap items-center w-full md:w-[45%] my-3">
                {article.content.values.map((value, idx) => {
                  return (
                    <Counter
                      key={idx + "-" + value.title + "-" + value.value}
                      value={value.value}
                      title={value.title}
                    />
                  );
                })}
              </div>
            );
          }
        })}
      </div>
      {/* Product Again */}
      {product && (
        <Product
          product={product}
          profile={profile}
          shipping={shipping}
          returns={returns}
          offers={offers}
          unitsSold={unitsSold}
          unitsRefunded={unitsRefunded}
        />
      )}
      <MoreDetails product={product} profile={profile} />
      {/* Related Products */}
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
