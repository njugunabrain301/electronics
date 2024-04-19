import Navbar from "@/components/Navbar/Navbar";
import { Inter, Cormorant_Garamond, Montserrat } from "next/font/google";
import Footer from "@/components/Footer/Footer";
import { fetchBusinessProfile } from "@/utils/backendAPIs/app";
import { fetchCategories } from "@/utils/backendAPIs/products";
import { GlobalContextProvider } from "@/Context/context";
import { getCheckoutInfo } from "@/utils/backendAPIs/cart";
import { getHoliday } from "@/utils/holidays";
import "./App.scss";
import "@/components/styles.css";
import "./globals.css";
import Expired from "@/components/Expired/Expired";
import Script from "next/script";

export async function generateMetadata() {
  let profile = await fetchBusinessProfile();
  let categories = await fetchCategories();
  categories = categories.data;
  profile = profile.data;

  let icon = profile.icon
    ? profile.icon.replace(
        "https://storage.googleapis.com/test-bucket001/",
        "https://ik.imagekit.io/d4mmlivtj/goduka/tr:w-150,h-100/"
      )
    : "https://storage.googleapis.com/test-bucket001/shop.png";
  let metadata = {
    title: profile.name,
    description: profile.about,
    manifest: "/manifest.json",
    keywords: categories,
    openGraph: {
      title: profile.name,
      description: profile.about,
      siteName: profile.name,
      images: [
        {
          url: icon,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      title: profile.name,
      description: profile.about,
      images: [
        {
          url: icon,
        },
      ],
      card: "summary_large_image",
    },
    other: {
      "google-site-verification": profile.googleMerchantTag,
    },
  };
  if (icon) {
    metadata.icons = {
      icon: icon,
      apple: icon,
    };
  }
  return metadata;
}

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });
const garamond = Cormorant_Garamond({ subsets: ["latin"], weight: "400" });

export default async function RootLayout({ children }) {
  let res = await fetchBusinessProfile();
  let profile = res.data;
  let bodyFont = montserrat;
  let titleFont = garamond;
  let subtitleFont = garamond;
  if (profile.template === "Timeless") {
    bodyFont = inter;
    titleFont = inter;
    subtitleFont = inter;
  }

  res = await getCheckoutInfo();
  let checkoutinfo = { ...res.data };

  if (res.success) {
    checkoutinfo.paymentOptions = res.data.paymentOptions;
    checkoutinfo.deliveryLocations = res.data.deliveryLocations;

    checkoutinfo.counties = [];
    let added = [];
    checkoutinfo.deliveryLocations.map((loc) => {
      if (!added.includes(loc.county)) checkoutinfo.counties.push(loc.county);
      if (loc.payOnDelivery) {
        let idx = checkoutinfo.counties.indexOf(loc.county);
        checkoutinfo.counties[idx] = loc.county + "*";
      }
      added.push(loc.county);
      return loc;
    });
  }
  const holiday = getHoliday();

  if (profile.holidayTheme) profile.holiday = holiday;
  return (
    <html lang="en">
      <body className={bodyFont.className + " App min-w-[330px] p-0"}>
        <GlobalContextProvider
          profile={profile}
          titleFont={titleFont}
          bodyFont={bodyFont}
          subtitleFont={subtitleFont}
          checkoutInfo={checkoutinfo}
        >
          <div className="flex flex-col justify-between min-h-[100vh] items-stretch">
            <div>
              <Navbar profile={profile} checkoutInfo={checkoutinfo} />
              {profile.active ? children : <Expired />}
            </div>
            <Footer profile={profile} />
          </div>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
