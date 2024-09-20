import React, { useState } from "react";
import { Card, CardHeader, Checkbox } from "@material-tailwind/react";
import { register } from "@/utils/frontendAPIs/auth";
import Link from "next/link";
import { useGlobalContext } from "@/Context/context";
import { Button, TextField, Typography } from "@mui/material";
import RegisterContent from "./Content/Register";

function Register({ closeModal, toggleLogin }) {
  let error = "";
  let [mError, setMerror] = useState("");
  let [isRegistering, setIsRegistering] = useState(false);

  const intitalState = {
    email: "",
    password: "",
    name: "",
    phone: "",
    agreed: false,
    closeModal: closeModal,
  };

  const [values, setValues] = useState(intitalState);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleAction = async () => {
    if (isRegistering) return;
    setMerror("");
    if (
      values.name === "" ||
      values.email === "" ||
      values.phone === "" ||
      values.password === ""
    ) {
      setMerror("Fill in all required fields");
      return;
    }

    if (!/(^\d{10}$)|(^\+\d{12}$)/.test(values.phone)) {
      setMerror("Invalid Phone Number. Use 0712345678 or +254712345678");
      return;
    }
    if (
      !/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(
        values.email
      )
    ) {
      setMerror("Invalid Email");
      return;
    }
    if (values.password.toLowerCase() === "anonymous") {
      setMerror("Your password is too weak 😅");
      return;
    }

    if (!values.agreed) {
      setMerror("You have to agree to the terms");
      return;
    }
    setIsRegistering(true);
    let dataLayer = window.dataLayer || [];
    let event = {
      event: "complete-registration",
    };
    dataLayer.push(event);
    let res = await register(values);

    if (res.success) {
      let user = {
        name: res.data.name,
        email: res.data.email,
        phone: res.data.phone,
      };

      localStorage.setItem("cart", JSON.stringify([]));
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", res.accessToken);
      closeModal();
    } else if (res.anonymous) {
      setMerror(
        "Kindly use the 'Forgot Password' link in the 'Sign in' page to set your password"
      );
    } else {
      setMerror(res.message);
    }
    setIsRegistering(false);
  };
  const toggleTerms = () => {
    if (values.agreed) setValues({ ...values, agreed: false });
    else setValues({ ...values, agreed: true });
  };

  const { theme } = useGlobalContext();

  return (
    <RegisterContent
      closeModal={closeModal}
      toggleLogin={toggleLogin}
      error={error}
      mError={mError}
      isRegistering={isRegistering}
      values={values}
      onChange={onChange}
      handleAction={handleAction}
      toggleTerms={toggleTerms}
      theme={theme}
    />
  );
}

export default Register;
