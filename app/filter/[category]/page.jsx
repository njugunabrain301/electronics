import NotFound from "@/app/404";
import FilteredProducts from "@/components/FiltredProducts/FilteredProducts";
import SingleProduct from "@/components/FiltredProducts/SingleProduct";
import { fetchBusinessProfile } from "@/utils/backendAPIs/app";
import {
  fetchProduct,
  fetchProducts,
  fetchWearables,
} from "@/utils/backendAPIs/products";

export const runtime = "edge";

export async function generateMetadata({ params }) {
  let profile = await fetchBusinessProfile();
  profile = profile.data;
  let category = decodeURI(params.category);

  return {
    title: category + " | " + profile.name,
    description: category + ", " + profile.name + ", " + profile.about,
  };
}

export default async function Page({ params }) {
  let category = decodeURI(params.category);

  let products = [];
  let type = category;
  let wearables = [];
  let profile = {};

  let res = await fetchProducts();
  products = res.data;

  products = products.filter((prod) => {
    return prod.categories.find(
      (cat) => cat && cat.toLowerCase() === category.toLowerCase()
    );
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
