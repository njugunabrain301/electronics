"use client";

let isLoaded = false;
let ga4Id = "";

export const loadGA4Script = (tagID, name, event, data) => {
  ga4Id = tagID;
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
    isLoaded = true;
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
  // Create gtag Script
  var gtagScript = document.createElement("script");
  gtagScript.type = "text/javascript";
  gtagScript.setAttribute(
    "src",
    "https://www.googletagmanager.com/gtag/js?id=" + ga4Id
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
    gtag("config", ga4Id);
    gtag(name, event, data);
  };
};

export const gtag = (name, event, data) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(arguments);
};
