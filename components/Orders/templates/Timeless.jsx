"use client";
import { useGlobalContext } from "@/Context/context";
import MyModal from "@/components/Modal/MyModal";
import Reviews from "@/components/Reviews/Reviews";
import { downloadURL, fetchOrders } from "@/utils/frontendAPIs/orders";
import { DialogBody, Typography, Tooltip } from "@material-tailwind/react";
import { Download } from "@mui/icons-material";
import { Button } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import OrderContent from "./Content";

function Timeless() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [downloading, setDownloading] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [sent, setSent] = useState([]);
  let loadOrders = async () => {
    let res = await fetchOrders();

    if (res.success) {
      setOrders(res.data);
      setIsLoaded(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const { theme } = useGlobalContext();

  const downloadReceiptH = async (oid) => {
    if (downloading === oid) return;
    setDownloading(oid);
    let url = downloadURL + "/" + oid;
    let bid = process.env.NEXT_PUBLIC_STORE_ID;
    const mtoken = localStorage.getItem("token");

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/pdf",
        business: bid,
        Authorization: `Bearer ${mtoken}`,
      },
      mode: "cors",
      next: { revalidate: 0 },
    })
      .then((response) => response.blob())
      .then((blob) => {
        const blobURL = window.URL.createObjectURL(new Blob([blob]));
        const fileName = "Receipt.pdf";
        const aTag = document.createElement("a");
        aTag.href = blobURL;
        aTag.setAttribute("download", fileName);
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
        setDownloading("");
      })
      .catch((err) => {
        console.log("");
        setDownloading("");
      });
  };

  const [openReview, setOpenReview] = useState("");

  return (
    <OrderContent
      orders={orders}
      isLoading={isLoading}
      downloading={downloading}
      isLoaded={isLoaded}
      sent={sent}
      setSent={setSent}
      theme={theme}
      downloadReceiptH={downloadReceiptH}
      openReview={openReview}
      setOpenReview={setOpenReview}
    />
  );
}

export default Timeless;
