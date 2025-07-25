"use client";
import { useGlobalContext } from "@/Context/context";
import whatsapp from "@/public/whatsapp.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { getLeadDetails } from "@/utils/functions";
import WhatsappWidgetContent from "./Content";

export default function WhatsappWidget({ text }) {
  let { profile, isVisible } = useGlobalContext();

  const controls = useAnimation();

  const sendToWhatsapp = () => {
    getLeadDetails("whatsapp");
    let number = profile.phone;
    if (number[0] === "0") {
      number = "+254" + number.slice(1);
    }
    var url =
      "https://wa.me/" + number + "?text=" + "Subject : " + text + "%0a%0a";
    window.open(url, "_blank").focus();
  };

  const url = usePathname();
  const prodPage = url.includes("/item/");
  useEffect(() => {
    if (isVisible) {
      controls.start({ bottom: 68 }); // Change bottom value to slide div upwards
    } else {
      // controls.start({ bottom: -100 }); // Change bottom value to slide div downwards
    }
  }, [isVisible, controls]);

  return (
    <WhatsappWidgetContent
      controls={controls}
      sendToWhatsapp={sendToWhatsapp}
      prodPage={prodPage}
    />
  );
}
