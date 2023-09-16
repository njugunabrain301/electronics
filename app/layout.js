import Navbar from "@/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import { fetchBusinessProfile } from "@/utils/backendAPIs/app";
import "./App.css";
import "@/components/styles.css";
import { fetchCategories } from "@/utils/backendAPIs/products";
import { GlobalContextProvider } from "@/Context/context";
import { getCheckoutInfo } from "@/utils/backendAPIs/cart";

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
    : "";
  let metadata = {
    title: profile.name,
    description: profile.about,
    keywords: categories,
    openGraph: {
      title: profile.name,
      description: profile.about,
      url: profile.url,
      siteName: profile.name,
      images: [
        {
          url: profile.logo,
          width: 800,
          height: 600,
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
  if (icon) {
    metadata.icons = {
      icon: icon,
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

  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalContextProvider>
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
