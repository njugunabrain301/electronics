import Cookies from "universal-cookie";
import { lead, visit, visitor } from "./frontendAPIs/app";

export const getLeadDetails = async (type) => {
  const cookies = new Cookies();
  const lastActionTimestamp = cookies.get(type);
  const currentTime = Date.now();

  if (
    lastActionTimestamp &&
    currentTime - lastActionTimestamp < 12 * 60 * 60 * 1000
  ) {
    return;
  }

  cookies.set(type, currentTime, { path: "/", maxAge: 12 * 60 * 60 });

  let currentUrl = window.location.href;
  let fields = currentUrl.split("/");

  let subject = "home";

  if (fields.includes("filter")) {
    subject = fields[fields.length - 1];
  }

  await lead({ type, subject });
};

export const getVisitorDetails = async (page) => {
  let currentUrl = window.location.href;
  let fields = currentUrl.split("/");
  if (!page) page = fields[fields.length - 1];

  let type = "v-" + page;

  const cookies = new Cookies();
  const lastActionTimestamp = cookies.get(type);
  let cookieId = cookies.get("cid");

  const currentTime = Date.now();
  if (!cookieId) {
    cookieId = Date.now() + Math.random().toString(36).substring(2, 8);
    cookies.set("cid", cookieId, { path: "/", maxAge: 12 * 60 * 60 });
  }

  if (
    lastActionTimestamp &&
    currentTime - lastActionTimestamp < 12 * 60 * 60 * 1000
  ) {
    return;
  }

  console.log("sending visitor");
  //   var d = new Date();
  //       d.setTime(d.getTime() + 12 * 60 * 60 * 1000);
  //       cookies.set("visit" + process.env.NEXT_PUBLIC_STORE_ID, "x", {
  //         expires: d,
  //       });
  cookies.set(type, currentTime, { path: "/", maxAge: 12 * 60 * 60 });

  await visit({ page, visitorId: cookieId });
};
