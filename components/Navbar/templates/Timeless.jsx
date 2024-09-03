"use client";
import { useEffect, useState } from "react";
import { Tooltip } from "@material-tailwind/react";
import Auth from "@/components/Auth/Auth";
import MyModal from "../../Modal/MyModal";
import UserProfile from "@/components/UserProfile/UserProfile";
import Link from "next/link";
import * as React from "react";
import Cart from "../../cart/Cart";
import { useGlobalContext } from "@/Context/context";
import Image from "next/image";
import MySearchField from "@/components/SearchField/MySearchField";
import { useRouter } from "next/navigation";
import { getLeadDetails } from "@/utils/functions";
import Content from "./Content";

const Timeless = ({ profile, checkoutInfo, authUnVerified }) => {
  const [user, setUser] = useState({});
  const [authUser, setAuth] = useState(false);
  let {
    cart,
    totalPrice,
    totalCount,
    setCart,
    theme,
    titleFont,
    handleOpenCart,
    handleCloseCart,
    openCart,
  } = useGlobalContext();

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
  }, []);

  let clearLogin = () => {
    setAuth(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser({});
    localStorage.removeItem("cart");
    setCart([]);
  };

  useEffect(() => {
    if (authUnVerified) clearLogin();
  }, [authUnVerified]);

  //Auth Modal
  let { openAuth, handleOpenAuth, handleCloseAuth, miniHeader } =
    useGlobalContext();
  let customHandleCloseAuth = () => {
    updateLogin();
    handleCloseAuth();
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
            className="text-l "
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

  let [search, setSearch] = useState("");
  let router = useRouter();
  const [searching, setSearching] = useState(false);
  const applySearch = () => {
    if (search !== "") {
      setSearching(true);
      router.push("/filter/search/" + search);
    } else {
      setSearching(false);
    }
  };

  return (
    <Content
    // handleCloseProfile={handleCloseProfile}
    // handleOpenProfile={handleOpenProfile}
    // genLogo={genLogo}
    // applySearch={applySearch}
    // customHandleCloseAuth={customHandleCloseAuth}
    // profile={profile}
    // checkoutInfo={checkoutInfo}
    // authUnVerified={authUnVerified}
    // user={user}
    // setUser={setUser}
    // authUser={authUser}
    // setAuth={setAuth}
    // cart={cart}
    // totalPrice={totalPrice}
    // totalCount={totalCount}
    // setCart={setCart}
    // theme={theme}
    // titleFont={titleFont}
    // handleOpenCart={handleOpenCart}
    // handleCloseCart={handleCloseCart}
    // openCart={openCart}
    // openAuth={openAuth}
    // handleOpenAuth={handleOpenAuth}
    // handleCloseAuth={handleCloseAuth}
    // miniHeader={miniHeader}
    // openProfile={openProfile}
    // setOpenProfile={setOpenProfile}
    // name={name}
    // businessName={businessName}
    // logo={logo}
    // search={search}
    // setSearch={setSearch}
    // searching={searching}
    // setSearching={setSearching}
    // website={profile.website}
    />
  );
};

export default Timeless;
