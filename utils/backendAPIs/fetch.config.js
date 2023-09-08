import { bid } from "@/utils/store";

let production = process.env.REACT_APP_PRODUCTION;
const baseURL =
  production === "true"
    ? "https://bunika.cyclic.app/user/zidika"
    : "http://localhost:3001/user/zidika";

const backupUrl1 = "https://bunika-api.onrender.com/user/zidika";

export const fetchData = async (url) => {
  try {
    const response = await fetch(baseURL + url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        business: bid,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok. Trying again...");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    try {
      const response = await fetch(backupUrl1 + "" + url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          business: bid,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return { status: false, error };
    }
  }
};

export const runtime = "edge";
