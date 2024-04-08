"use client";

import { useGlobalContext } from "@/Context/context";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { Facebook, Google, Instagram } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { sendMessage } from "@/utils/frontendAPIs/app";
import { getLeadDetails } from "@/utils/functions";

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
    <div className="w-[90%] max-w-[1000px] mx-auto pb-[50px]">
      <h1
        className={
          titleFont.className +
          " text-3xl md:text-5xl text-center pt-[50px] pb-[20px]"
        }
      >
        Contact Us
      </h1>
      <div className="flex justify-center w-[100%] flex-wrap">
        <div className="w-[100%] md:w-[48%]">
          <div className="w-fit mx-auto flex flex-col my-[20px] items-center">
            <h2 className="text-3xl text-center">Send Us a Message</h2>
            <TextField
              label={"Name"}
              size="small"
              value={name}
              className="w-[340px]"
              style={{ margin: "10px 0" }}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label={"Phone / Email"}
              size="small"
              value={mcontact}
              className="w-[340px]"
              style={{ margin: "10px 0" }}
              onChange={(e) => setContact(e.target.value)}
            />

            <TextField
              label={"Message"}
              multiline
              size="small"
              value={message}
              className="w-[340px]"
              style={{ margin: "10px 0" }}
              onChange={(e) => setMessage(e.target.value)}
            />
            {success ? (
              "Message received. We will get back to you as soon as possible"
            ) : (
              <Button variant="contained" onClick={submitMessage}>
                {submitting ? "Submitting..." : "Submit"}
              </Button>
            )}
            {error && (
              <p
                style={{ backgroundColor: "indianred", color: "white" }}
                className="text-center p-2 my-2 rounded-md"
              >
                {error}
              </p>
            )}
          </div>
        </div>
        <div className="w-[100%] md:w-[48%]">
          <div className="w-fit mx-auto flex flex-col my-[20px] items-start">
            <h2 className="text-3xl text-center w-full">Reach Us</h2>
            <p>Business Name: {contact.name}</p>
            <p>Phone : {contact.phone}</p>
            <p>Email : {contact.email}</p>
            <p>Location : {contact.location}</p>
            <p className="pt-[10px] font-bold">Business Hours</p>
            <p>{contact.workingHours}</p>
            <h3 className="pt-[10px] font-bold">Socials</h3>
            <div className="flex items-center flex-wrap sm:flex-no-wrap">
              {contact.google && contact.google !== "undefined" ? (
                <span>
                  <a href={contact.google}>
                    <Google className="!h-[30px] !w-[30px]" />
                  </a>
                  &nbsp;
                </span>
              ) : (
                ""
              )}
              {contact.facebook && contact.facebook !== "undefined" ? (
                <span>
                  <a href={contact.facebook}>
                    <Facebook className="!h-[30px] !w-[30px]" />
                  </a>
                  &nbsp;
                </span>
              ) : (
                ""
              )}
              {contact.twitter && contact.twitter !== "undefined" ? (
                <span className="flex items-center justify-center">
                  <a href={contact.twitter}>
                    <FontAwesomeIcon
                      icon={faXTwitter}
                      className="!h-[25px] !w-[25px]"
                    />
                  </a>
                  &nbsp;
                </span>
              ) : (
                ""
              )}
              {contact.instagram && contact.instagram !== "undefined" ? (
                <span>
                  <a href={contact.instagram}>
                    <Instagram className="!h-[30px] !w-[30px]" />
                  </a>
                  &nbsp;
                </span>
              ) : (
                ""
              )}
            </div>
            <p className="pt-2">
              Feel free to contact us anytime during our business hours, we do
              our best to respond within {responseAmt + " " + responseUnit}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeless;
