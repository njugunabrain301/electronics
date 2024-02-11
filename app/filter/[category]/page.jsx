import NotFound from "@/app/404";
import FilteredProducts from "@/components/ProductsList/FilteredProducts";
import WhatsappWidget from "@/components/WhatsappWidget/WhatsappWidget";
import { fetchBusinessProfile } from "@/utils/backendAPIs/app";
import { fetchProducts, fetchWearables } from "@/utils/backendAPIs/products";

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
      <WhatsappWidget text={type} />
    </div>
  );
}
