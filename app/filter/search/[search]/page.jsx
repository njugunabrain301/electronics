import NotFound from "@/app/404";
import FilteredProducts from "@/components/FiltredProducts/FilteredProducts";
import { fetchBusinessProfile } from "@/utils/backendAPIs/app";
import { fetchProducts, fetchWearables } from "@/utils/backendAPIs/products";

export default async function Page({ params }) {
  let searchParam = decodeURI(params.search);

  let products = [];
  let wearables = [];
  let profile = {};

  let res = await fetchProducts();
  products = res.data;
  products = products.filter(
    (prod) =>
      prod.type.toLowerCase().includes(searchParam.toLowerCase()) ||
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
