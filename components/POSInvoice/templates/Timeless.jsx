"use client";
import { useState } from "react";
import { useGlobalContext } from "@/Context/context";
import { payPOSInvoice } from "@/utils/frontendAPIs/app";
import { downloadURL } from "@/utils/frontendAPIs/orders";
import POSInvoiceContent from "./Content";

function Timeless({ invoice, payOptions, profile }) {
  const [paymentMode, setPaymentMode] = useState(payOptions[0].type);
  const [paymentCode, setPaymentCode] = useState("");
  const [error, setError] = useState("");
  const [paid, setPaid] = useState(invoice.status === "PAID");
  const [reviewed, setReviewed] = useState(invoice.review.submitted);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState(payOptions[0]);

  let handlePay = async () => {
    if (isPaying) return;
    setError("");
    if (!paymentCode && paymentMode !== "Lipa Na MPesa") {
      setError("Please provide the payment code");
      return;
    }

    setIsPaying(true);

    let res = await payPOSInvoice({
      iid: invoice._id,
      paymentCode,
      paymentMode,
    });
    if (res.success) {
      setPaid(true);
    } else if (res.message) {
      setError(res.message);
    } else {
      setError("An error occured. Please try again after some time");
    }
    setIsPaying(false);
  };

  const { theme } = useGlobalContext();

  const [downloading, setDownloading] = useState(false);
  const downloadReceipt = async () => {
    let iid = invoice._id;
    if (downloading) return;
    setDownloading(true);
    let url = downloadURL + "/pos/" + iid;
    let bid = process.env.NEXT_PUBLIC_STORE_ID;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/pdf",
        business: bid,
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

  return (
    <POSInvoiceContent
      invoice={invoice}
      payOptions={payOptions}
      profile={profile}
      paymentMode={paymentMode}
      setPaymentMode={setPaymentMode}
      paymentCode={paymentCode}
      setPaymentCode={setPaymentCode}
      error={error}
      paid={paid}
      reviewed={reviewed}
      setReviewed={setReviewed}
      isPaying={isPaying}
      paymentInfo={paymentInfo}
      setPaymentInfo={setPaymentInfo}
      handlePay={handlePay}
      theme={theme}
      downloadReceipt={downloadReceipt}
    />
  );
}

export default Timeless;
