import React, { useEffect, useState } from "react";
import Cart from "../Cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "@material-tailwind/react";
import Auth from "../Auth/Auth";
import MyModal from "../MyModal/MyModal";
import UserProfile from "../UserProfile/UserProfile";
import { Link } from "react-router-dom";
import { fetchBusinessProfile } from "../../features/slices/appSlice";

const Navbar = ({ handleAuth, setOpenAuth }) => {
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const user = useSelector((state) => state.user.user);
  const authUser = useSelector((state) => state.user.authUser);

  const closeCartModal = (e) => {
    setOpenCart(false);
    document.getElementById("close-cartModal").click();
  };
  const [openCart, setOpenCart] = useState(false);
  const handleOpenCart = () => {
    if (!openCart) setOpenCart(true);
    if (!openCart) document.getElementById("cartModalBtn").click();
  };

  const closeAuthModal = (e) => {
    setOpenAuth(false);
    document.getElementById("close-authModal").click();
  };

  const closeProfileModal = (e) => {
    setOpenProfile(false);
    document.getElementById("close-profileModal").click();
  };
  const [openProfile, setOpenProfile] = useState(false);
  const handleProfile = () => {
    if (!openProfile) setOpenProfile(true);
    if (!openProfile) document.getElementById("profileModalBtn").click();
  };

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
  const dispatch = useDispatch();
  let profile = useSelector((state) => state.app.profile);
  useEffect(() => {
    if (!profile.name) {
      dispatch(fetchBusinessProfile());
    }
  }, [profile, dispatch]);

  const { name } = user;
  const businessName = profile.name || "Wb";
  const logo = profile.icon || "";

  return (
    <>
      <div className="bg-black p-4 w-full flex justify-center items-center ">
        <p className="text-white font-inter text-2xl font-bold  ">
          {profile.name}
        </p>
      </div>
      <div className="flex justify-around items-center">
        <div>
          {logo ? (
            <div className="flex align-center bg-black m-2 px-[5px] rounded-md">
              <img
                className=" xs:max-w-[100px] md-max-w-initial md:max-h-24 w-full max-h-20 lg:h-28"
                src={logo}
                alt="store"
              />
            </div>
          ) : (
            genLogo()
          )}
        </div>
        <div className="flex flex-row items-center">
          <div
            className="flex flex-row items-center cursor-pointer"
            onClick={handleOpenCart}
          >
            {totalAmount > 0 ? (
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
                <span className="rounded-full bg-blue-300 text-white px-1 font-inter text-xs mr-1 absolute mt-[-30px] ml-[15px]">
                  {totalAmount}
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

            <p className=" font-inter text-base font-medium tracking-normal leading-none text-center ">
              <span className="hidden md:inline-block">Shopping Cart</span>
              <span className=" md:hidden text-sm">&nbsp;Cart</span>
            </p>

            <button
              type="button"
              className=""
              data-te-toggle="modal"
              data-te-target="#cartModal"
              data-te-ripple-init
              data-te-ripple-color="light"
              id="cartModalBtn"
              style={{ display: "none" }}
            ></button>

            <MyModal id="cartModal" setOpen={setOpenCart} className="w-[500px]">
              <Cart closeModal={closeCartModal} open={openCart}></Cart>
            </MyModal>
          </div>
          <div className="flex flex-row items-center cursor-pointer xs:pl-2 md:pl-4">
            {authUser ? (
              <>
                <Link to="/orders">
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

                    <p className=" font-inter text-medium font-medium tracking-normal leading-none text-center ">
                      <span className="hidden md:inline-block">
                        &nbsp;My Orders
                      </span>
                      <span className=" md:hidden text-sm">&nbsp;Orders</span>
                    </p>
                  </div>
                </Link>
                <button
                  type="button"
                  className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  data-te-toggle="modal"
                  data-te-target="#profileModal"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  id="profileModalBtn"
                  style={{ display: "none" }}
                ></button>

                <MyModal id="profileModal" setOpen={setOpenProfile}>
                  <UserProfile closeModal={closeProfileModal} />
                </MyModal>
                <div onClick={handleProfile}>
                  <Tooltip content="My Profile" placement="bottom">
                    <p className="font-inter text-md font-medium tracking-normal leading-none flex items-center">
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
              <div onClick={handleAuth}>
                <p className="flex items-center font-inter text-base font-medium tracking-normal leading-none text-center ">
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
                <div>
                  <button
                    type="button"
                    className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    data-te-toggle="modal"
                    data-te-target="#authModal"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    id="authModalBtn"
                    style={{ display: "none" }}
                  ></button>
                </div>
              </div>
            )}
            <MyModal id="authModal" setOpen={setOpenAuth}>
              <Auth closeModal={closeAuthModal} />
            </MyModal>
          </div>
        </div>
      </div>
      <div className="bg-black p-4 w-full flex items-center justify-between mx-auto">
        <p className="text-white font-inter text-base font-medium ">
          <Link to="/" className="display: flex">
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
            <span className="hidden md:block">&nbsp;&nbsp; Home</span>
          </Link>
        </p>
        <p className="text-white font-inter text-base font-medium flex">
          <a href="tel: +254717563148" className="flex">
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

            <span className="hidden md:block">
              &nbsp;&nbsp; {profile.email}
            </span>
          </a>

          <a href="tel: +254717563148" className="flex ml-4">
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
      </div>
    </>
  );
};

export default Navbar;
