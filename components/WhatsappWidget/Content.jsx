"use client";
import whatsapp from "@/public/whatsapp.png";
import Image from "next/image";
import { motion } from "framer-motion";

export default function WhatsappWidgetContent({
  controls,
  sendToWhatsapp,
  prodPage,
}) {
  return (
    <main-content>
      <motion.div
        className={
          prodPage
            ? "w-[50px] h-[50px] fixed right-3 cursor-pointer"
            : "w-[50px] h-[50px] fixed right-5 cursor-pointer"
        }
        initial={{ bottom: 10 }}
        animate={controls}
        transition={{ duration: 0.5 }}
      >
        <Image
          height={50}
          width={50}
          alt="Whatsapp Icon"
          src={whatsapp}
          onClick={sendToWhatsapp}
        />
      </motion.div>
    </main-content>
  );
}
