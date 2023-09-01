import NotFound from "@/app/404";
import SingleProduct from "@/components/FiltredProducts/SingleProduct";
import { fetchBusinessProfile } from "@/utils/backendAPIs/app";
import { fetchProduct } from "@/utils/backendAPIs/products";

export default async function Page({ params }) {
  let id = decodeURI(params.id);

  let profile = {};
  let product = {};

  let res = await fetchProduct({ pid: id });
  product = res.data;

  res = await fetchBusinessProfile();
  profile = res.data;

  if (product === null) {
    return (
      <NotFound
        message={"The product you are looking for could not be found"}
      />
    );
  }

  return (
    <div>
      <SingleProduct
        product={product}
        showPrice={profile.showPrice}
        selectedTheme={profile.theme}
      ></SingleProduct>
    </div>
  );
}

export const runtime = "edge";
