import loading from "@/assets/images/loading.gif";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex p-10 md:p-1 justify-center items-stretch flex-col">
      <div className="w-[90%] md:w-[60%] md:max-w-[500px] lg:max-w-[700px] pt-[100px] md:pt-[0px] mx-auto flex items-center justify-center">
        <Image alt="Loading gif" src={loading} />
      </div>
    </div>
  );
}
