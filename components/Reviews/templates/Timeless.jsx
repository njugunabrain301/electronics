"use client";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/Context/context";
import { downloadURL, sendReview } from "@/utils/frontendAPIs/orders";
import { reviewPOSInvoice } from "@/utils/frontendAPIs/app";
import ReviewsContent from "./Content";

function Timeless({ closeModal, item, sent, setSent, pos, invoice }) {
  let [error, setError] = useState("");

  const [comment, setComment] = useState("");
  const [stars, setStars] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [numFiles, setNumFiles] = useState(0);
  const handleFileChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
      setNumFiles(newFiles.length);
      console.log(selectedFiles, e.target.files);
    }
  };

  useEffect(() => {
    // console.log(selectedFiles);
    setNumFiles(selectedFiles.length);
  }, [selectedFiles]);

  const sendReviewHandler = async (iid) => {
    setError("");
    if (submitting) return;
    if (stars <= 0) {
      setError("Please select a rating");
      return;
    }

    let formData = new FormData();
    formData.append("media", selectedFiles);
    formData.append("comment", comment);
    formData.append("stars", stars);
    if (pos) {
      formData.append("iid", invoice._id);
    } else {
      formData.append("iid", item.pid);
      formData.append("oid", item.oid);
    }

    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    setSubmitting(true);
    let res = {};

    if (pos) {
      res = await reviewPOSInvoice(formData);
    } else res = await sendReview(formData);
    if (res.success) {
      if (pos) {
        setSent(true);
      } else setSent([...sent, item._id + item.oid]);
      setSelectedFiles([]);
    } else {
      setError(
        "Unable to submit the review. Kindly refresh the page and try again"
      );
    }
    setSubmitting(false);
  };

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

  const { theme } = useGlobalContext();

  return (
    <ReviewsContent
      closeModal={closeModal}
      item={item}
      sent={sent}
      pos={pos}
      invoice={invoice}
      error={error}
      comment={comment}
      setComment={setComment}
      stars={stars}
      setStars={setStars}
      submitting={submitting}
      numFiles={numFiles}
      handleFileChange={handleFileChange}
      sendReviewHandler={sendReviewHandler}
      downloadReceipt={downloadReceipt}
      theme={theme}
    />
  );
}

export default Timeless;
