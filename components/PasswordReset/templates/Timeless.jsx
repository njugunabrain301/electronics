"use client";
import { useState } from "react";
import { resetPassword } from "@/utils/frontendAPIs/auth";
import { useGlobalContext } from "@/Context/context";
import PasswordResetContent from "./Content";

function Timeless({ token }) {
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let handleReset = async () => {
    if (isLoading) return;
    setError("");
    if (password.length < 6) {
      setError("Password needs to be a minimum of 6 characters");
      return;
    }
    if (password !== cpassword) {
      setError("Passwords do not match!");
      return;
    }
    setIsLoading(true);

    let res = await resetPassword({ password, token });
    if (res.success) {
      setDone(true);
    } else if (res.message) {
      setError(res.message);
    } else {
      setError("An error occured. Please try again after some time");
    }
    setIsLoading(false);
  };

  const { theme } = useGlobalContext();
  return (
    <PasswordResetContent
      password={password}
      setPassword={setPassword}
      cpassword={cpassword}
      setCPassword={setCPassword}
      error={error}
      setError={setError}
      done={done}
      isLoading={isLoading}
      handleReset={handleReset}
      theme={theme}
    />
  );
}

export default Timeless;
