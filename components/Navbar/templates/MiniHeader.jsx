"use client";
import { Tooltip } from "@material-tailwind/react";
import Auth from "@/components/Auth/Auth";
import MyModal from "../../Modal/MyModal";
import UserProfile from "@/components/UserProfile/UserProfile";
import Link from "next/link";
import * as React from "react";
import Cart from "../../cart/Cart";
import { getLeadDetails } from "@/utils/functions";

const MiniHeader = ({
  handleCloseProfile,
  handleOpenProfile,
  genLogo,
  customHandleCloseAuth,
  profile,
  checkoutInfo,
  authUser,
  cart,
  totalPrice,
  setCart,
  theme,
  titleFont,
  handleCloseCart,
  openCart,
  openAuth,
  handleOpenAuth,
  openProfile,
  name,
}) => {
  return (
    <main-content>
      <div
        className={
          "p-1 sm:p-2 md:p-4 w-full flex items-center justify-between mx-auto relative"
        }
        style={{
          backgroundColor: theme.palette.background.inverted,
          color: theme.palette.text.inverted,
        }}
      >
        <div className="  text-base font-medium">
          <div className="flex items-center">
            <Link href="/" className="display: flex mr-2 items-center">
              {profile.name.length <= 15 && (
                <div>
                  {profile.icon ? (
                    <div className="flex align-center m-2 px-[5px] ">
                      <img
                        className="max-w-[100px] md-max-w-initial md:max-h-16 w-full max-h-10 lg:h-20"
                        src={profile.icon}
                        alt="store"
                      />
                    </div>
                  ) : (
                    <div className="rounded-md">{genLogo()}</div>
                  )}
                </div>
              )}

              <h1 className={" text-2xl font-bold  " + titleFont.className}>
                {profile.name}
              </h1>
            </Link>
          </div>
        </div>

        <div className="flex justify-end cursor-pointer pl-2 md:pl-4 ">
          <p className="  text-base font-medium flex justify-center text-center">
            <a
              href={"mailto: " + profile.email}
              className="flex"
              onClick={() => getLeadDetails("email_link")}
            >
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
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>

              {profile.holiday ? (
                <span className="hidden lg:block">
                  &nbsp;&nbsp; {profile.email}
                </span>
              ) : (
                <span className="hidden md:block">
                  &nbsp;&nbsp; {profile.email}
                </span>
              )}
            </a>

            <a
              href={"tel: " + profile.phone}
              className="flex ml-4"
              onClick={() => getLeadDetails("phone_link")}
            >
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
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>
              <span className="hidden md:block">
                &nbsp;&nbsp; {profile.phone}
              </span>
            </a>
          </p>
          {authUser ? (
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
          ) : (
            <div onClick={handleOpenAuth}>
              <p className="flex items-center text-base font-medium tracking-normal leading-none text-center pl-2">
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
                {/* <span className=" md:hidden text-sm">&nbsp; Log In</span> */}
              </p>
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
              single={false}
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
    </main-content>
  );
};

export default MiniHeader;
