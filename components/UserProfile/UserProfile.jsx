"use client";
import { useGlobalContext } from "@/Context/context";
import Opulence from "./templates/Opulence";
import Timeless from "./templates/Timeless";
import { useEffect } from "react";

function UserProfile({ closeModal, template }) {
  const { authUnVerified, verify } = useGlobalContext();
  useEffect(() => {
    verify();
  });
  return (
    <>
      {template === "Opulence" && <Opulence closeModal={closeModal} />}
      {template === "Timeless" && (
        <Timeless closeModal={closeModal} authUnVerified={authUnVerified} />
      )}
    </>
  );
}

export default UserProfile;
