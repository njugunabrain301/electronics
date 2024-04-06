"use client";
import { useGlobalContext } from "@/Context/context";
import { inquire } from "@/utils/frontendAPIs/app";
import { Button } from "@material-tailwind/react";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { useState } from "react";

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
    <div
      className="flex flex-wrap items-center justify-center text-center"
      style={{ color: theme.palette.text.base }}
    >
      {!sent ? (
        <>
          {message}
          <Button onClick={() => sendNotice()} className="rounded-full m-2">
            <TipsAndUpdatesIcon className="w-[30px] h-[30px] " />
          </Button>
        </>
      ) : (
        "Received. We'll get up and running as soon as possible"
      )}
    </div>
  );
}
