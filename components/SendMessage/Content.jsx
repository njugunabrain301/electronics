"use client";
import { useGlobalContext } from "@/Context/context";
import { inquire } from "@/utils/frontendAPIs/app";
import { Button } from "@material-tailwind/react";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { useState } from "react";

export default function SendMessageContent({
  message,
  sent,
  sendNotice,
  theme,
}) {
  return (
    <main-content>
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
    </main-content>
  );
}
