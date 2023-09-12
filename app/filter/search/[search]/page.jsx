import FilteredProducts from "@/components/FiltredProducts/FilteredProducts";
import { fetchBusinessProfile } from "@/utils/backendAPIs/app";
import { fetchProducts, fetchWearables } from "@/utils/backendAPIs/products";

export const revalidate = 0;
export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  let profile = await fetchBusinessProfile();
  profile = profile.data;
  let search = decodeURI(params.search);

  return {
    title: "Search: " + search + " | " + profile.name,
    description: search + ", " + profile.name + ", " + profile.about,
  };
}

export default async function Page({ params }) {
  let searchParam = decodeURI(params.search);

  let products = [];
  let wearables = [];
  let profile = {};

  let res = await fetchProducts();
  products = res.data;
  products = products.filter(
    (prod) =>
      (prod.category &&
        prod.category.toLowerCase().includes(searchParam.toLowerCase())) ||
      (prod.subcategory &&
        prod.subcategory.toLowerCase().includes(searchParam.toLowerCase())) ||
      (prod.extras &&
        prod.extras.make &&
        prod.extras.make.toLowerCase().includes(searchParam.toLowerCase())) ||
      (prod.extras &&
        prod.extras.model &&
        prod.extras.model.toLowerCase().includes(searchParam.toLowerCase())) ||
      prod.name.toLowerCase().includes(searchParam.toLowerCase())
  );

  res = await fetchWearables();
  wearables = res.data;

  res = await fetchBusinessProfile();
  profile = res.data;

  return (
    <div>
      <FilteredProducts
        productList={products}
        type={"Search: " + searchParam}
        wearables={wearables}
        profile={profile}
        searchParam={searchParam}
        params={params}
      ></FilteredProducts>
    </div>
  );
}

export const runtime = "edge";
