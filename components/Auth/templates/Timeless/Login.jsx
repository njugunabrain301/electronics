import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Alert,
} from "@material-tailwind/react";
import { colorComponent } from "@/utils/Utils";
import { login } from "@/utils/frontendAPIs/auth";
import { useGlobalContext } from "@/Context/context";
import { Button, TextField, Typography } from "@mui/material";
import { addToCart } from "@/utils/frontendAPIs/cart";

function Login({ closeModal, toggleLogin, toggleForgotPass, selectedTheme }) {
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
      let oldCart = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [];
      let cart = res.data.cart;
      //merge carts on login
      localStorage.setItem("user", JSON.stringify(user));
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
    <Card
      className="w-80"
      style={{
        backgroundColor: theme.palette.background.primary,
        color: theme.palette.text.base,
      }}
    >
      <CardHeader
        variant="gradient"
        className="mb-4 grid h-28 place-items-center"
        style={{ backgroundColor: theme.palette.card.main }}
      >
        <Typography
          variant="h4"
          sx={{ color: theme.palette.text.inverted, fontWeight: "450" }}
        >
          Sign In
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <TextField
          label="Email"
          type="email"
          name="email"
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: theme.palette.input.border,
              },
              "&:hover fieldset": {
                borderColor: theme.palette.input.light,
              },
            },
            input: { color: theme.palette.text.base },
          }}
          color={"input"}
          InputLabelProps={{ sx: { color: theme.palette.text.alt } }}
          value={values.email}
          onChange={onChange}
        />

        <TextField
          label="Password"
          type="password"
          name="password"
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: theme.palette.input.border,
              },
              "&:hover fieldset": {
                borderColor: theme.palette.input.light,
              },
            },
            input: { color: theme.palette.text.base },
          }}
          color={"input"}
          InputLabelProps={{ sx: { color: theme.palette.text.alt } }}
          value={values.password}
          onChange={onChange}
        />

        <div className="">
          {error && (
            <div
              className="flex align-items-center justify-center rounded-lg p-5"
              style={{
                backgroundColor: "indianred",
                color: "white",
              }}
            >
              <p className="font-medium flex items-center text-center tracking-normal leading-none">
                {error}
              </p>
            </div>
          )}
        </div>
        <div>
          <Typography
            variant="small"
            className="flex justify-start cursor-pointer w-fit hover:underline"
            onClick={toggleForgotPass}
            style={{ color: theme.palette.highlight.main }}
          >
            Forgot Password?
          </Typography>
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          color={"primary"}
          variant="contained"
          fullWidth
          onClick={handleAction}
        >
          {isLoggingIn ? "Signing in..." : "Sign In"}
        </Button>
        <div
          className="divider flex justify-between mt-2"
          style={{ color: theme.palette.text.base }}
        >
          <Typography
            style={{ color: theme.textPrimary }}
            className="mt-4 text-center font-normal"
          >
            <span className="cursor-pointer" onClick={closeModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
          </Typography>

          <span className="text-center font-normal flex items-center">
            Don't have an account?&nbsp;
            <Typography
              href="#"
              className="cursor-pointer font-medium transition-colors"
              onClick={toggleLogin}
              sx={{
                color: theme.palette.highlight.main,
                "&:hover": {
                  color: theme.palette.highlight.light,
                },
              }}
            >
              Register
            </Typography>
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}

export default Login;
