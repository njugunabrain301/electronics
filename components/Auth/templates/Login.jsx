import React, { useEffect, useState } from "react";
import { colorComponent } from "@/utils/Utils";
import { login } from "@/utils/frontendAPIs/auth";
import { useGlobalContext } from "@/Context/context";
import { addToCart } from "@/utils/frontendAPIs/cart";
import LoginContent from "./Content/Login";

function Login({ closeModal, toggleLogin, toggleForgotPass }) {
  let [error, setError] = useState("");
  let [isLoggingIn, setIsLoggingIn] = useState(false);

  const intitalState = {
    email: "",
    password: "",
  };

  const [values, setValues] = useState(intitalState);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const { theme, setCart } = useGlobalContext();
  const mergeCarts = async (oldCart) => {
    let res = null;
    oldCart.map(async (it) => {
      for (let i = 0; i < it.amount; i++) res = await addToCart(it);
      if (res.success) setCart(res.data);
    });
  };
  const handleAction = async () => {
    setError("");
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    let res = await login(values);

    if (res.success) {
      let user = {
        name: res.data.name,
        email: res.data.email,
        phone: res.data.phone,
      };
      let deliveryDetails = {
        county: res.data.county,
        subcounty: res.data.subcounty,
        courier: res.data.courier,
        description: res.data.pickupDescription,
      };
      let oldCart = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [];
      let cart = res.data.cart;
      //merge carts on login
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("deliveryDetails", JSON.stringify(deliveryDetails));
      localStorage.setItem("token", res.accessToken);
      localStorage.setItem("cart", JSON.stringify(cart));

      mergeCarts(oldCart);

      closeModal();
    } else if (res.anonymous) {
      setError("Kindly use the 'Forgot Password' link to set your password");
    } else {
      setError("Invalid Credentials");
    }
    setIsLoggingIn(false);
  };

  useEffect(() => {
    colorComponent("input");
  });

  return (
    <LoginContent
      closeModal={closeModal}
      toggleLogin={toggleLogin}
      toggleForgotPass={toggleForgotPass}
      error={error}
      isLoggingIn={isLoggingIn}
      values={values}
      onChange={onChange}
      theme={theme}
      handleAction={handleAction}
    />
  );
}

export default Login;
