import NotFound from "@/app/404";
import SingleProduct from "@/components/FiltredProducts/SingleProduct";
import WhatsappWidget from "@/components/WhatsappWidget";
import { fetchBusinessProfile } from "@/utils/backendAPIs/app";
import { fetchProduct } from "@/utils/backendAPIs/products";

export const revalidate = 0;
export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  let id = decodeURI(params.id);

  let profile = {};
  let product = {};

  let res = await fetchProduct({ pid: id });
  product = res.data;

  res = await fetchBusinessProfile();
  profile = res.data;

  if (product === null) {
    return {
      title: "Not Found | " + profile.name,
      description: profile.name + ", " + profile.about,
    };
  } else {
    return {
      title: product.name + " | " + profile.name,
      description: product.description,
      openGraph: {
        title: profile.name,
        description: product.description,
        url: profile.url + "/filter/item/" + product._id,
        images: [
          {
            url: product.img,
          },
        ],
        locale: "en_US",
        type: "website",
      },
      twitter: {
        title: product.name + " | " + profile.name,
        description: product.description,
        images: [
          {
            url: product.img,
          },
        ],
        card: "summary_large_image",
      },
    };
  }
}

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
      <WhatsappWidget text={product.name} />
    </div>
  );
}

export const runtime = "edge";
