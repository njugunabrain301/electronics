import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import { fetchBusinessProfile } from "@/utils/backendAPIs/app";
import { fetchCategories } from "@/utils/backendAPIs/products";
import { GlobalContextProvider } from "@/Context/context";
import { getCheckoutInfo } from "@/utils/backendAPIs/cart";
import { getHoliday } from "@/utils/holidays";
import "./App.scss";
import "@/components/styles.css";
import "./globals.css";

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

export default async function RootLayout({ children }) {
  let res = await fetchBusinessProfile();
  let profile = res.data;

  res = await getCheckoutInfo();
  let checkoutinfo = {};

  if (res.success) {
    checkoutinfo.paymentOptions = res.data.paymentOptions;
    checkoutinfo.deliveryLocations = res.data.deliveryLocations;

    checkoutinfo.counties = [];
    checkoutinfo.deliveryLocations.map((loc) => {
      if (!checkoutinfo.counties.includes(loc.county))
        checkoutinfo.counties.push(loc.county);
      return loc;
    });
  }
  const holiday = getHoliday();

  if (profile.holidayTheme) profile.holiday = holiday;
  return (
    <html lang="en">
      <body className={inter.className + " App min-w-[330px] p-0"}>
        <GlobalContextProvider profile={profile}>
          <div className="flex flex-col justify-between min-h-[100vh] items-stretch">
            <div>
              <Navbar profile={profile} checkoutInfo={checkoutinfo} />
              {children}
            </div>
            <Footer profile={profile} />
          </div>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
