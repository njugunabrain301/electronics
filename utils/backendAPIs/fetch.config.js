import { bid } from "@/utils/store";

let production = process.env.REACT_APP_PRODUCTION;
const baseURL =
  production === "true"
    ? "https://bunika.cyclic.app/user/zidika"
    : "http://localhost:3001/user/zidika";

const backupUrl1 = "https://bunika-api.onrender.com/user/zidika";

export const fetchData = async (url) => {
  //   console.log(
  //     "Fetching data from server using fetch ---------------------------",
  //     bid,
  //     url,
  //     baseURL,
  //     production
  //   );
  try {
    const response = await fetch(baseURL + url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        business: bid,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok. Trying again...");
    }

    const data = await response.json();
    // console.log("-----------------------------------------");
    // console.log(data, baseURL, url, bid);
    // console.log("-----------------------------------------");
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
