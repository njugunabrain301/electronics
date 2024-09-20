import React from "react";
import { Alert } from "@material-tailwind/react";

const ErrorContent = () => {
  return (
    <main-content>
      <div className="grid grid-cols-1 h-screen items-center justify-items-center">
        <div className="w-[80%]">
          <Alert color="gray" className="text-xl font-inter font-bold">
            Sorry no products match your filter search ... Clear the filter and
            try again 😀.
          </Alert>
        </div>
      </div>
    </main-content>
  );
};

export default ErrorContent;
