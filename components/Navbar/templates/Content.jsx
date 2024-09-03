"use client";
import { Tooltip } from "@material-tailwind/react";
import Auth from "@/components/Auth/Auth";
import MyModal from "../../Modal/MyModal";
import UserProfile from "@/components/UserProfile/UserProfile";
import Link from "next/link";
import * as React from "react";
import Cart from "../../cart/Cart";
import Image from "next/image";
import MySearchField from "@/components/SearchField/MySearchField";
import { getLeadDetails } from "@/utils/functions";
import MiniHeader from "./MiniHeader";
import FullHeader from "./FullHeader";

const Content = ({
  handleCloseProfile,
  handleOpenProfile,
  genLogo,
  applySearch,
  customHandleCloseAuth,
  profile,
  checkoutInfo,
  authUser,
  cart,
  totalPrice,
  totalCount,
  setCart,
  theme,
  titleFont,
  handleOpenCart,
  handleCloseCart,
  openCart,
  openAuth,
  handleOpenAuth,
  miniHeader,
  openProfile,
  name,
  search,
  setSearch,
}) => {
  return (
    <main-content>
      {miniHeader ? (
        <MiniHeader
          handleCloseProfile={handleCloseProfile}
          handleOpenProfile={handleOpenProfile}
          genLogo={genLogo}
          applySearch={applySearch}
          customHandleCloseAuth={customHandleCloseAuth}
          profile={profile}
          checkoutInfo={checkoutInfo}
          authUser={authUser}
          cart={cart}
          totalPrice={totalPrice}
          setCart={setCart}
          theme={theme}
          titleFont={titleFont}
          handleCloseCart={handleCloseCart}
          openCart={openCart}
          openAuth={openAuth}
          handleOpenAuth={handleOpenAuth}
          openProfile={openProfile}
          name={name}
        />
      ) : (
        <FullHeader
          handleCloseProfile={handleCloseProfile}
          handleOpenProfile={handleOpenProfile}
          genLogo={genLogo}
          applySearch={applySearch}
          customHandleCloseAuth={customHandleCloseAuth}
          profile={profile}
          checkoutInfo={checkoutInfo}
          authUser={authUser}
          cart={cart}
          totalPrice={totalPrice}
          totalCount={totalCount}
          setCart={setCart}
          theme={theme}
          titleFont={titleFont}
          handleOpenCart={handleOpenCart}
          handleCloseCart={handleCloseCart}
          openCart={openCart}
          openAuth={openAuth}
          handleOpenAuth={handleOpenAuth}
          openProfile={openProfile}
          name={name}
          search={search}
          setSearch={setSearch}
        />
      )}
    </main-content>
  );
};

export default Content;
