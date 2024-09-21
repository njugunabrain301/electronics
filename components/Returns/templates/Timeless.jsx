"use client";

import { useGlobalContext } from "@/Context/context";
import { requestReturn } from "@/utils/frontendAPIs/policies";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import ReturnsContent from "./Content";

const Timeless = ({ returns, profile }) => {
  const { titleFont } = useGlobalContext();
  const [orderId, setOrderID] = useState();
  const [phone, setPhone] = useState();
  const [reason, setReason] = useState();
  const [error, setError] = useState();
  const [submitting, setSubmitting] = useState();
  const [success, setSuccess] = useState();

  const submitReturnRequest = async () => {
    setError("");
    if (submitting) {
      return;
    }
    if (!orderId) {
      setError("Please provide an order id");
      return;
    }
    if (!phone) {
      setError("Please provide a phone number");
      return;
    }
    if (!/(^\d{10}$)|(^\+\d{12}$)/.test(phone)) {
      setError("Invalid Phone Number. Use 0712345678 or +254712345678");
      return;
    }
    if (!reason) {
      setError("Please describe the reason for return");
      return;
    }
    setSubmitting(true);
    let res = await requestReturn({ orderId, phone, reason });
    if (res.success) {
      setSuccess(true);
    } else {
      setError("Failed to submit request");
    }
    setSubmitting(false);
  };

  return (
    <ReturnsContent
      returns={returns}
      profile={profile}
      titleFont={titleFont}
      orderId={orderId}
      phone={phone}
      setOrderID={setOrderID}
      setPhone={setPhone}
      reason={reason}
      setReason={setReason}
      error={error}
      submitting={submitting}
      submitReturnRequest={submitReturnRequest}
    />
  );
};

export default Timeless;
