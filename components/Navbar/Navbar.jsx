"use client";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import * as React from "react";
import { visit } from "@/utils/frontendAPIs/app";
import Script from "next/script";
import Opulence from "./templates/Opulence";
import Timeless from "./templates/Timeless";
import { gtag } from "@/utils/gtag";

const Navbar = ({ profile, checkoutInfo }) => {
  let cookies = new Cookies();

  useEffect(() => {
    //update visits
    if (!cookies.get("visit-" + process.env.NEXT_PUBLIC_STORE_ID)) {
      var d = new Date();
      d.setTime(d.getTime() + 12 * 60 * 60 * 1000);
      cookies.set("visit" + process.env.NEXT_PUBLIC_STORE_ID, "x", {
        expires: d,
      });
      visit();
    }

    const ga4Tag = profile.ga4Tag
      ? profile.ga4Tag
      : profile.url.includes("go-duka.com")
      ? "G-TD28Z490EX"
      : "empty";
    gtag("js", new Date());
    gtag("config", ga4Tag);
  }, []);

  const template = profile.template;

  return (
    <>
      {/* <!-- Google Tag Manager --> */}
      <Script
        id="Google-Tag-Manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-ML67SF2Z');
`,
        }}
      />

      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-ML67SF2Z"
          height="0"
          width="0"
          // style="display:none;visibility:hidden"
          className="hidden"
        ></iframe>
      </noscript>
      {/* <!-- End Google Tag Manager (noscript) --> */}

      {template === "Opulence" && (
        <Opulence profile={profile} checkoutInfo={checkoutInfo} />
      )}
      {template === "Timeless" && (
        <Timeless profile={profile} checkoutInfo={checkoutInfo} />
      )}
    </>
  );
};

export default Navbar;
