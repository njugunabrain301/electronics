"use client";
import { useGlobalContext } from "@/Context/context";
import whatsapp from "@/public/whatsapp.png";
import Image from "next/image";
import React from "react";

export default function WhatsappWidget({ text }) {
  let { profile } = useGlobalContext();
  const sendToWhatsapp = () => {
    let number = profile.phone;
    if (number[0] === "0") {
      number = "+254" + number.slice(1);
    }
    var url =
      "https://wa.me/" + number + "?text=" + "Subject : " + text + "%0a%0a";
    window.open(url, "_blank").focus();
  };
  return (
    <Image
      height={50}
      width={50}
      alt="Whatsapp Icon"
      className="w-[50px] h-[50px] fixed right-5 bottom-5 cursor-pointer"
      src={whatsapp}
      onClick={sendToWhatsapp}
    />
  );
}
