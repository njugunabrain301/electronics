"use client";
import { inquire } from "@/utils/frontendAPIs/app";
import { Button } from "@material-tailwind/react";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { useState } from "react";

export default function SendMessage({ message, type }) {
  console.log("sendMessage component");
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
      console.log("diff", diff);
    } else {
      send = true;
    }
    if (send) {
      let res = await inquire();
    }
  };
  return (
    <div className="flex flex-wrap items-center justify-center text-center">
      {!sent ? (
        <>
          {message}
          <Button onClick={() => sendNotice()} className="rounded-full m-2">
            <TipsAndUpdatesIcon className="w-[50px] h-[50px]" />
          </Button>
        </>
      ) : (
        "Received. We'll get up and running as soon as possible"
      )}
    </div>
  );
}
