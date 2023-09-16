import emptyStore from "@/assets/images/desert.gif";
import Image from "next/image";
import SendMessage from "./SendMessage";

export default function Empty() {
  console.log("empty component");
  return (
    <div className="flex p-10 md:p-1 justify-center items-stretch flex-col">
      <p className="text-center p-2">No items in stock 🥲</p>
      <div className="w-[90%] md:w-[60%] md:max-w-[500px] lg:max-w-[700px] pt-[100px] md:pt-[0px] mx-auto flex items-center justify-center">
        <Image alt="Desert gif" src={emptyStore} />
      </div>
      <SendMessage
        message={"Remind us to stock up"}
        type={"empty"}
        className="p-2 md:p-1"
      />
    </div>
  );
}
