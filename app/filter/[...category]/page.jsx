import NotFound from "@/app/404";
import FilteredProducts from "@/components/FiltredProducts/FilteredProducts";
import SingleProduct from "@/components/FiltredProducts/SingleProduct";
import { fetchBusinessProfile } from "@/utils/backendAPIs/app";
import {
  fetchProduct,
  fetchProducts,
  fetchWearables,
} from "@/utils/backendAPIs/products";
import React from "react";

export const runtime = "edge";

export async function generateMetadata({ params }) {
  let profile = await fetchBusinessProfile();
  profile = profile.data;
  let category = params.category[0];
  let searchParam = "";
  let singleProduct = false;
  if (category === "search") {
    searchParam = params.category[1];
    if (params.category.length > 2) {
      singleProduct = params.category[2];
    }
  } else if (params.category.length > 1) {
    singleProduct = params.category[1];
  }
  let product = {};
  if (singleProduct) {
    let res = await fetchProduct({ pid: singleProduct });
    product = res.data;
    return {
      title: product.name + " | " + profile.name,
      description: product.description,
    };
  } else {
    if (category === "search") category = searchParam;
    return {
      title: category + " | " + profile.name,
      description: category + ", " + profile.name + ", " + profile.about,
    };
  }
}

export default async function Page({ params }) {
  let category = decodeURI(params.category[0]);
  let searchParam = "";
  let singleProduct = false;
  if (category === "search") {
    searchParam = decodeURI(params.category[1]);
    if (params.category.length > 2) {
      singleProduct = decodeURI(params.category[2]);
    }
  } else if (params.category.length > 1) {
    singleProduct = decodeURI(params.category[1]);
  }
  console.log(params, singleProduct, category);

  let products = [];
  let type = category;
  let wearables = [];
  let profile = {};
  let product = {};

  if (singleProduct) {
    let res = await fetchProduct({ pid: singleProduct });
    product = res.data;
    console.log(res, singleProduct, category);
  } else {
    let res = await fetchProducts();
    products = res.data;
    if (category === "search") {
      products = products.filter(
        (prod) =>
          prod.type.toLowerCase().includes(searchParam.toLowerCase()) ||
          prod.name.toLowerCase().includes(searchParam.toLowerCase())
      );
    } else {
      products = products.filter(
        (prod) => prod.type.toLowerCase() === category.toLowerCase()
      );
    }
    res = await fetchWearables();
    wearables = res.data;
  }
  let res = await fetchBusinessProfile();
  profile = res.data;

  if (singleProduct && product === null) {
    return (
      <NotFound
        message={"The product you are looking for could not be found"}
      />
    );
  } else if (products.length === 0) {
    if (category === "search") category = "Search:" + searchParam;
    <NotFound
      message={
        "There are no products matching your search term '" + category + ""
      }
    />;
  }

  return (
    <div>
      {singleProduct ? (
        <>
          <SingleProduct
            product={product}
            showPrice={profile.showPrice}
            selectedTheme={profile.theme}
          ></SingleProduct>
        </>
      ) : (
        <>
          <FilteredProducts
            productList={products}
            type={type}
            wearables={wearables}
            profile={profile}
            searchParam={searchParam}
          ></FilteredProducts>
        </>
      )}
    </div>
  );
}
