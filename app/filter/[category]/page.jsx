import NotFound from "@/app/404";
import FilteredProducts from "@/components/FiltredProducts/FilteredProducts";
import SingleProduct from "@/components/FiltredProducts/SingleProduct";
import { fetchBusinessProfile } from "@/utils/backendAPIs/app";
import {
  fetchProduct,
  fetchProducts,
  fetchWearables,
} from "@/utils/backendAPIs/products";

export const revalidate = 0;
export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";

export const runtime = "edge";

export async function generateMetadata({ params }) {
  let profile = await fetchBusinessProfile();
  profile = profile.data;
  let category = decodeURIComponent(params.category);

  return {
    title: category + " | " + profile.name,
    description: category + ", " + profile.name + ", " + profile.about,
    openGraph: {
      title: category + " | " + profile.name,
      description: category + ", " + profile.name + ", " + profile.about,
      url: profile.url + "/filter/" + category,
      type: "website",
    },
    twitter: {
      title: category + " | " + profile.name,
      description: category + ", " + profile.name + ", " + profile.about,
      card: "summary_large_image",
    },
  };
}

export default async function Page({ params }) {
  let category = decodeURIComponent(params.category);

  let products = [];
  let type = category;
  let wearables = [];
  let profile = {};

  let res = await fetchProducts();
  products = res.data;

  products = products.filter((prod) => {
    return prod.category === category || prod.subcategory === category;
  });

  res = await fetchWearables();
  wearables = res.data;

  res = await fetchBusinessProfile();
  profile = res.data;

  return (
    <div>
      <FilteredProducts
        productList={products}
        type={type}
        wearables={wearables}
        profile={profile}
        params={params}
      ></FilteredProducts>
    </div>
  );
}
