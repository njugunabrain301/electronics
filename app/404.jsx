import Link from "next/link";
import React from "react";

export default function NotFound({ message }) {
  if (!message) {
    message = "The page you are looking for could not be found";
  }
  return (
    <div className="flex justify-center items-center p-5">
      <div className="max-w-[500px] w-[90%] text-center">
        <p>{message}</p>
        <p>
          <Link href={"/#more"} className="text-blue-700 cursor-pointer">
            Browse more categories{" "}
          </Link>
        </p>
      </div>
    </div>
  );
}
