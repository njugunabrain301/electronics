"use client";
import { useGlobalContext } from "@/Context/context";
import whatsapp from "@/public/whatsapp.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
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

  const url = usePathname();
  const prodPage = url.includes("/item/");

  return (
    <Image
      height={50}
      width={50}
      alt="Whatsapp Icon"
      className={
        prodPage
          ? "w-[50px] h-[50px] fixed right-3 bottom-[68px] cursor-pointer"
          : "w-[50px] h-[50px] fixed right-5 bottom-5 cursor-pointer"
      }
      src={whatsapp}
      onClick={sendToWhatsapp}
    />
  );
}
