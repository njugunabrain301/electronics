"use client";
import { useEffect, useState } from "react";
import { Tooltip } from "@material-tailwind/react";
import Auth from "@/components/Auth/Auth";
import MyModal from "../../Modal/MyModal";
import UserProfile from "@/components/UserProfile/UserProfile";
import Link from "next/link";
import Cookies from "universal-cookie";
import * as React from "react";
import Cart from "../../cart/Cart";
import { useGlobalContext } from "@/Context/context";
import { visit } from "@/utils/frontendAPIs/app";
import Image from "next/image";

const Opulence = ({ profile, checkoutInfo }) => {
  const [user, setUser] = useState({});
  const [authUser, setAuth] = useState(false);
  let cookies = new Cookies();
  let { cart, totalPrice, totalCount, setCart, theme } = useGlobalContext();

  let updateLogin = () => {
    let userProfile = localStorage.getItem("user");
    if (userProfile) {
      userProfile = JSON.parse(userProfile);
      if (
        !authUser ||
        user.name != userProfile.name ||
        user.phone !== userProfile.phone ||
        user.email !== userProfile.email
      ) {
        setUser(userProfile);
        setAuth(true);
        if (cart.length === 0) {
          let ct = localStorage.getItem("cart");
          if (ct) setCart(JSON.parse(ct));
        }
      }
    } else {
      if (authUser) {
        setAuth(false);
        setUser({});
        localStorage.removeItem("cart");
        setCart([]);
      }
    }
  };

  useEffect(() => {
    updateLogin();
    //update visits
    if (!cookies.get("visit-" + process.env.NEXT_PUBLIC_STORE_ID)) {
      var d = new Date();
      d.setTime(d.getTime() + 12 * 60 * 60 * 1000);
      cookies.set("visit" + process.env.NEXT_PUBLIC_STORE_ID, "x", {
        expires: d,
      });
      visit();
    }
  }, []);

  //Auth Modal
  let { openAuth, handleOpenAuth, handleCloseAuth, titleFont } =
    useGlobalContext();
  let customHandleCloseAuth = () => {
    updateLogin();
    handleCloseAuth();
  };

  //Cart Modal
  const [openCart, setOpenCart] = useState(false);
  const handleOpenCart = () => {
    setOpenCart(true);
  };
  const handleCloseCart = () => {
    setOpenCart(false);
  };

  //Profile Modal
  const [openProfile, setOpenProfile] = useState(false);
  const handleCloseProfile = (e) => {
    updateLogin();
    setOpenProfile(false);
  };
  const handleOpenProfile = () => {
    setOpenProfile(true);
  };

  const genLogo = () => {
    let name = "";
    for (var i = 0; i < businessName.length; i++) {
      let c = businessName.charAt(i);
      if (c.search(/[^a-zA-Z]+/) === -1) {
        name += c;
      } else if (c === " ") {
        name += c;
      }
    }
    while (name.includes("  ")) name = name.replace("  ", " ");
    let names = name.split(" ");
    let char1 = name.charAt(0).toUpperCase();
    let char2 = name.charAt(1).toLowerCase();
    let logo;
    if (names.length > 1) {
      char2 = names[1].charAt(0).toUpperCase();
    }
    logo = (
      <div className="flex align-center bg-black m-2 px-[5px] rounded-md">
        <span
          className=""
          style={{ fontSize: "27pt", fontWeight: "900", color: "white" }}
        >
          {char1}
        </span>
        <div className="flex flex-col justify-center">
          <span
            className="text-l"
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

  const { name } = user;
  const businessName = profile.name || "Wb";
  const logo = profile.icon || "";
  const template = "new"; //profile.template;

  return (
    <div className="w-[98%] mx-auto max-w-7xl">
      <div className={"p-4 w-full flex justify-center items-center relative"}>
        {profile.holiday && (
          <Image
            src={profile.holiday.sideBanner}
            alt={profile.holiday.name}
            className="absolute h-[95%] object-contain left-[2px] md:left-[10px] w-fit"
          />
        )}

        <p className=" text-base font-medium flex">
          <a href={"mailto: " + profile.email} className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-4 sm:w-6 sm:h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>

            <span className="text-sm md:text-base">
              &nbsp;&nbsp;{profile.email}
            </span>
          </a>

          <a
            href={"tel: " + profile.phone}
            className="flex ml-2 sm:ml-4 items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-4 sm:w-6 sm:h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
            </svg>
            <span className="text-sm md:text-base ml-[-10px] sm:ml-[0]">
              &nbsp;&nbsp;{profile.phone}
            </span>
          </a>
        </p>

        {profile.holiday && (
          <Image
            src={profile.holiday.sideBanner}
            alt={profile.holiday.name}
            className="absolute h-[95%] object-contain right-[2px] md:right-[10px] w-fit"
          />
        )}
      </div>

      <div
        className={"flex justify-between items-center "}
        style={{
          backgroundColor: theme.palette.background.primary,
          color: theme.palette.text.base,
        }}
      >
        <p className=" text-base font-medium w-[25%] text-left">
          <Link href="/" className="display: flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            <span className="block">&nbsp;&nbsp; Home</span>
          </Link>
        </p>
        <h1
          className={
            "hidden md:block text-3xl md:text-4xl lg:text-7xl font-medium w-[48%] text-center " +
            titleFont.className
          }
        >
          {profile.name}
        </h1>
        <div className="flex flex-row justify-end items-center md:w-[25%] ">
          <div
            className="flex flex-row items-center cursor-pointer"
            onClick={handleOpenCart}
          >
            {totalCount > 0 ? (
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
                <span
                  className="rounded-full px-1 text-xs mr-1 absolute mt-[-30px] ml-[15px]"
                  style={{
                    backgroundColor: theme.palette.card.main,
                    color: theme.palette.text.inverted,
                  }}
                >
                  {totalCount}
                </span>
              </span>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            )}

            <p className=" text-base font-medium tracking-normal leading-none text-center ">
              <span className=" text-sm md:text-base">&nbsp;Cart</span>
            </p>
          </div>
          <div className="flex flex-row items-center cursor-pointer pl-2 md:pl-4">
            {authUser ? (
              <>
                <Link href="/orders">
                  <div className="flex items-center pr-[10px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                      />
                    </svg>

                    <p className=" text-medium font-medium tracking-normal leading-none text-center ">
                      <span className="hidden lg:inline-block">
                        &nbsp;My&nbsp;Orders
                      </span>
                      <span className=" lg:hidden text-sm md:text-base">
                        &nbsp;Orders
                      </span>
                    </p>
                  </div>
                </Link>

                <div onClick={handleOpenProfile}>
                  <Tooltip content="My Profile" placement="bottom">
                    <p className=" text-md font-medium tracking-normal leading-none flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                      </svg>{" "}
                      <span className="hidden md:inline-block">
                        &nbsp;
                        {name.charAt("0").toUpperCase() +
                          name.split(" ")[0].slice(1)}
                      </span>
                      <span className=" md:hidden text-sm">
                        &nbsp;
                        {name.charAt("0").toUpperCase() +
                          name.split(" ")[0].slice(1)}
                      </span>
                    </p>
                  </Tooltip>
                </div>
              </>
            ) : (
              <div onClick={handleOpenAuth}>
                <p className="flex items-center text-base font-medium tracking-normal leading-none text-center ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                    />
                  </svg>
                  <span className="hidden md:inline-block">&nbsp; Log In</span>
                  <span className=" md:hidden text-sm">&nbsp; Log In</span>
                </p>
                <div></div>
              </div>
            )}

            <MyModal open={openAuth} onClose={customHandleCloseAuth}>
              <Auth
                closeModal={customHandleCloseAuth}
                selectedTheme={profile.theme.toLowerCase()}
                template={profile.template}
              />
            </MyModal>
            <MyModal open={openCart} onClose={handleCloseCart}>
              <Cart
                closeModal={handleCloseCart}
                totalPrice={totalPrice}
                setCart={setCart}
                cart={cart}
                showPrice={profile.showPrice}
                checkoutInfo={checkoutInfo}
                selectedTheme={profile.theme.toLowerCase()}
                template={profile.template}
              ></Cart>
            </MyModal>
            <MyModal open={openProfile} onClose={handleCloseProfile}>
              <UserProfile
                closeModal={handleCloseProfile}
                selectedTheme={profile.theme.toLowerCase()}
                template={profile.template}
              />
            </MyModal>
          </div>
        </div>
      </div>
      <div
        className={
          "w-full flex flex-col items-center justify-between mx-auto relative"
        }
      >
        <h1
          className={
            "text-4xl md:hidden font-medium w-[100%] text-center " +
            titleFont.className
          }
        >
          {profile.name}
        </h1>
        {profile.holiday && (
          <Image
            src={profile.holiday.centerBanner}
            alt={profile.holiday.name}
            className="absolute h-[100%] object-contain left-[50%] translate-x-[-50%] w-fit my-4"
          />
        )}
      </div>
    </div>
  );
};

export default Opulence;
