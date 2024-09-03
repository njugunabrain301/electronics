"use client";
import { useGlobalContext } from "@/Context/context";
import Timeless from "./templates/Timeless";
import { useEffect } from "react";

function UserProfile({ closeModal }) {
  const { authUnVerified, verify } = useGlobalContext();
  useEffect(() => {
    verify();
  });
  return (
    <>
      <Timeless closeModal={closeModal} authUnVerified={authUnVerified} />
    </>
  );
}

export default UserProfile;
