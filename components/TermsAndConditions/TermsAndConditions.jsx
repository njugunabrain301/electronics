"use client";

import { useGlobalContext } from "@/Context/context";
import { getVisitorDetails } from "@/utils/functions";
import TermsAndConditionsContent from "./Content";

function TermsAndConditions({ profile }) {
  const { titleFont, theme } = useGlobalContext();
  getVisitorDetails();
  return (
    <TermsAndConditionsContent
      profile={profile}
      titleFont={titleFont}
      theme={theme}
    />
  );
}

export default TermsAndConditions;
