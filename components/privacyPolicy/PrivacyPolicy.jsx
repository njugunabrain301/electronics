"use client";

import { useGlobalContext } from "@/Context/context";
import { getVisitorDetails } from "@/utils/functions";
import PrivacyPolicyContent from "./Content";

function PrivacyPolicy({ profile }) {
  const { titleFont, theme } = useGlobalContext();
  getVisitorDetails();
  return (
    <PrivacyPolicyContent
      profile={profile}
      titleFont={titleFont}
      theme={theme}
    />
  );
}

export default PrivacyPolicy;
