import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  const businessName = "Welcome Back";
  const logo = "";

  const genLogo = () => {
    let names = businessName.split(" ");
    let char1 = businessName.charAt(0).toUpperCase();
    let char2 = businessName.charAt(1).toLowerCase();
    let logo;
    if (names.length > 1) {
      char2 = names[1].charAt(0).toUpperCase();
    }
    logo = (
      <div className="flex align-center bg-black m-2 px-[5px] rounded-md">
        <span
          className="font-inter"
          style={{ fontSize: "27pt", fontWeight: "900", color: "white" }}
        >
          {char1}
        </span>
        <div className="flex flex-col justify-center">
          <span
            className="text-l font-inter"
            style={{
              borderBottom: "solid 6px white",
              fontWeight: "900",
              fontSize: "20pt",
              color: "white",
              lineHeight: "25px",
            }}
          >
            {char2}
          </span>
        </div>
      </div>
    );

    return logo;
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <hr className="h-px w-4/5 bg-gray-400 opacity-50 outline-none border-none" />
      </div>
      <div className="flex items-center justify-around pt-4">
        <div>
          {logo ? (
            <img
              className="md:h-28 w-full h-20 lg:h-28"
              src={logo}
              alt="store"
            />
          ) : (
            genLogo()
          )}
        </div>
        <div>
          <p className="text-black text-sm font-inter no-underline normal-case xs:pl-1">
            Copyright {year} by Bunika
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
