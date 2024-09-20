"use client";

import { useGlobalContext } from "@/Context/context";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { Facebook, Google, Instagram } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { sendMessage } from "@/utils/frontendAPIs/app";
import { getLeadDetails } from "@/utils/functions";
import ContactContent from "./Content";

const Timeless = ({ contact }) => {
  const { titleFont } = useGlobalContext();
  const [name, setName] = useState("");
  const [mcontact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const submitMessage = async () => {
    setError("");
    if (submitting) {
      return;
    }
    if (!name) {
      setError("Please provide your name");
      return;
    }
    if (!mcontact) {
      setError("Please provide an email or phone number");
      return;
    }
    if (
      !/(^\d{10}$)|(^\+\d{12}$)/.test(mcontact) &&
      !/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(mcontact)
    ) {
      setError(
        "Invalid contact. Use 0712345678 or +254712345678 or a valid email"
      );
      return;
    }
    if (!message) {
      setError("Please provide a message");
      return;
    }
    getLeadDetails("contact_form");
    setSubmitting(true);
    let res = await sendMessage({ name, contact: mcontact, message });
    if (res.success) {
      setSuccess(true);
    } else {
      setError("Failed to submit request");
    }
    setSubmitting(false);
  };
  const responseAmt = contact.responseTime.amount;
  let responseUnit = contact.responseTime.unit;
  responseUnit =
    responseAmt == 1
      ? responseUnit.slice(0, responseUnit.length - 1)
      : responseUnit;

  return (
    <ContactContent
      contact={contact}
      titleFont={titleFont}
      name={name}
      setName={setName}
      mcontact={mcontact}
      setContact={setContact}
      message={message}
      setMessage={setMessage}
      error={error}
      submitting={submitting}
      success={success}
      submitMessage={submitMessage}
      responseAmt={responseAmt}
      responseUnit={responseUnit}
    />
  );
};

export default Timeless;
