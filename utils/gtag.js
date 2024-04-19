"use client";

let isLoaded = false;

const loadGA4Script = (tagID, name, event, data) => {
  // Create gtag Script
  var gtagScript = document.createElement("script");
  gtagScript.type = "text/javascript";
  gtagScript.setAttribute(
    "src",
    "https://www.googletagmanager.com/gtag/js?id=" + tagID
  );
  document.head.appendChild(gtagScript);

  //Make sure gtag script above is loaded

  gtagScript.onload = function () {
    // isLoaded = true
    // Add gtag config
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", tagID);
    gtag(name, event, data);
  };
};

export const pushEvent = (name, event, data) => {
  // window.dataLayer = window.dataLayer || [];
  // window.dataLayer.push(arguments);

  loadGA4Script("", name, event, data);
};
