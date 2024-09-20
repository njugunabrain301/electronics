"use client";
import { useGlobalContext } from "@/Context/context";
import { inquire } from "@/utils/frontendAPIs/app";
import { Button } from "@material-tailwind/react";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { useState } from "react";
import SendMessageContent from "./Content";

export default function SendMessage({ message, type }) {
  let [sent, setSent] = useState(false);
  let sendNotice = async () => {
    setSent(true);
    let lastSent = localStorage.getItem("lastSent", new Date().toString());
    let send = false;
    if (lastSent) {
      let now = new Date();
      let then = new Date(lastSent);
      var diff = (now.getTime() - then.getTime()) / 1000;
      diff /= 60 * 60;
      send = diff > 12;
    } else {
      send = true;
    }
    if (send) {
      let res = await inquire();

      if (res.success) {
        localStorage.setItem("lastSent", new Date().toString());
      }
    }
  };
  const { theme } = useGlobalContext();
  return (
    <SendMessageContent
      message={message}
      sent={sent}
      sendNotice={sendNotice}
      theme={theme}
    />
  );
}
