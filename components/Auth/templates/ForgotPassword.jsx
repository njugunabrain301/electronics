import React, { useState } from "react";
import { resetPasswordLink } from "@/utils/frontendAPIs/auth";
import { useGlobalContext } from "@/Context/context";
import ForgotPasswordContent from "./Content/ForgotPassword";

function ForgotPassword({ closeModal, toggleForgotPass }) {
  let [error, setError] = useState("");
  let [resetRequested, setResetRequested] = useState(false);
  let [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");

  const handleAction = async () => {
    if (isLoading) {
      return;
    }
    setError("");
    if (email === "") {
      setError("Please provide your email");
      return;
    }

    if (
      !/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(email)
    ) {
      setError("Invalid Email");
      return;
    }
    setIsLoading(true);
    let res = await resetPasswordLink({ email });

    if (res.success) {
      setResetRequested(true);
    } else if (res.message) {
      setError(res.message);
    } else {
      setError("An error occured. Please try again later");
    }
    setIsLoading(false);
  };

  const { theme } = useGlobalContext();
  return (
    <ForgotPasswordContent
      closeModal={closeModal}
      toggleForgotPass={toggleForgotPass}
      handleAction={handleAction}
      theme={theme}
      email={email}
      setEmail={setEmail}
      isLoading={isLoading}
      resetRequested={resetRequested}
      error={error}
      setError={setError}
    />
  );
}

export default ForgotPassword;
