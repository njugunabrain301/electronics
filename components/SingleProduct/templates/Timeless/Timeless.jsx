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

  const { theme, bodyFont } = useGlobalContext();
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

  const cleanHTML = (text) => {
    while (text.includes("\n")) text = text.replace("\n", "<br/>");

    return DOMPurify.sanitize(text);
  };

  return (
    <div
      className={"" + bodyFont.className}
      style={{
        backgroundColor: theme.palette.background.primary,
        color: theme.palette.text.base,
      }}
    >
      {/* Articles */}
      {product.articles.length > 0 && (
        <div className="pb-8 flex flex-wrap w-full mx-auto max-w-7xl justify-between ">
          {product.articles.map((article, idx) => {
            if (article.type === "article") {
              return (
                <div
                  className="w-[98%] md:w-[46%] mx-auto my-5"
                  key={idx + "_" + article._id}
                >
                  <div className="w-full md:flex flex-wrap my-4">
                    {article.content.title && (
                      <h3 className="text-2xl md:text-3xl font-bold w-full text-center">
                        {article.content.title}
                      </h3>
                    )}
                    {article.content.image && (
                      <label className="text-center mx-auto w-full">
                        <Image
                          src={resizeProdImageSmall(article.content.image)}
                          alt={article.content.title + " image"}
                          width={300}
                          height={200}
                          className="w-full mx-auto aspect-video object-cover my-[40px]"
                        />
                      </label>
                    )}
                    {article.content.content && (
                      <p
                        className="my-3 px-3 leading-8"
                        dangerouslySetInnerHTML={{
                          __html: cleanHTML(article.content.content),
                        }}
                      ></p>
                    )}
                  </div>
                </div>
              );
            } else if (article.type === "list") {
              return (
                <div
                  className="w-[96%] md:w-[46%] mx-auto my-5"
                  key={idx + "_" + article._id}
                >
                  <div className="w-full my-3">
                    {article.content.title && (
                      <h2 className="text-2xl md:text-3xl font-bold w-full text-center my-3">
                        {article.content.title}
                      </h2>
                    )}
                    {article.content.intro && (
                      <p className="leading-8 mb-3">{article.content.intro}</p>
                    )}
                    <ul className="list-disc ml-7 leading-8">
                      {article.content.items.map((item, idx) => {
                        return (
                          <li
                            key={idx + "-" + item}
                            dangerouslySetInnerHTML={{
                              __html: cleanHTML(item),
                            }}
                          ></li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            } else if (article.type === "counter") {
              return (
                <div
                  className="w-[98%] md:w-[46%] mx-auto my-5 flex justify-center flex-wrap items-center w-full"
                  key={idx + "_" + article._id}
                >
                  <div className="flex justify-evenly flex-wrap items-center w-full">
                    {article.content.values.map((value, idx) => {
                      return (
                        <Counter
                          key={idx + "-" + value.title + "-" + value.value}
                          value={value.value}
                          title={value.title}
                          prefix={value.prefix ? value.prefix : ""}
                          suffix={value.suffix ? value.suffix : ""}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            } else if (article.type === "title") {
              let imageUrl = article.content.image
                ? resizeProdImageSmall(article.content.image)
                : "";
              return (
                <div
                  className="w-full relative text-center mb-3 py-10 px-5"
                  style={{
                    backgroundImage: article.content.image
                      ? "url('" + imageUrl + "')"
                      : "",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {article.content.image && (
                    <div
                      style={{
                        content: "",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                      }}
                    ></div>
                  )}
                  <div
                    style={{
                      position: "relative",
                      textAlign: "center",
                      color: article.content.image
                        ? theme.palette.text.inverted
                        : theme.palette.text.base,
                    }}
                  >
                    {article.content.title && (
                      <h1 className="text-3xl md:text-3xl font-bold w-full text-center">
                        {article.content.title}
                      </h1>
                    )}

                    {article.content.subtitle && (
                      <h2 className="m-3 text-center text-2xl">
                        {article.content.subtitle}
                      </h2>
                    )}
                  </div>
                </div>
              );
            }
          })}
        </div>
      )}
      {/* Breadcrumbs */}
      <p className="text-sm md:text-base mt-2 w-[98%] mx-auto max-w-7xl">
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
      {/* More Details Again */}
      {product && <MoreDetails product={product} profile={profile} />}
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
