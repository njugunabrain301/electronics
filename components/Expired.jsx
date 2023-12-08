import expired from "@/assets/images/warning.gif";
import Image from "next/image";
import SendMessage from "./SendMessage";

export default function Expired() {
  return (
    <div className="flex p-3 md:p-1 justify-center items-stretch flex-col">
      <p className="text-center p-2">Under Maintenance 😑</p>
      <div className="w-[70%] min-w-[200px] pt-[10px] mx-auto flex items-center justify-center">
        <Image alt="Expired gif" src={expired} />
      </div>
      <SendMessage
        message={"Remind us to renew"}
        type={"empty"}
        className="p-2 md:p-1"
      />
    </div>
  );
}
