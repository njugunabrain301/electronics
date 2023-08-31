import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Alert,
} from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import { colorComponent } from "@/utils/Utils";
import { login } from "@/utils/frontendAPIs/auth";
import { Themes } from "@/utils/Themes/Themes";

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
      let cart = res.data.cart;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem("token", res.accessToken);
      closeModal();
    } else {
      setError("Invalid Credentials");
    }
    setIsLoggingIn(false);
  };

  const theme = Themes[selectedTheme];
  useEffect(() => {
    colorComponent("input");
  });

  return (
    <Card className="w-80 bg-skin-primary">
      <CardHeader
        variant="gradient"
        className="mb-4 grid h-28 place-items-center bg-skin-card"
      >
        <Typography variant="h3" className="text-skin-inverted">
          Sign In
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <Input
          label="Email"
          size="lg"
          type="email"
          name="email"
          className="text-skin-base input"
          color={theme["text-highlight"]}
          value={values.email}
          onChange={onChange}
        />
        <Input
          label="Password"
          size="lg"
          type="password"
          name="password"
          className="text-skin-base input"
          color={theme["text-highlight"]}
          value={values.password}
          onChange={onChange}
        />
        <div className="">
          {error && (
            <Alert className="flex align-items-center justify-center bg-skin-alert-danger">
              <p className="font-medium flex items-center text-center tracking-normal leading-none">
                {error}
              </p>
            </Alert>
          )}
        </div>
        <div>
          <Typography
            variant="small"
            className="flex justify-start text-skin-base cursor-pointer"
            onClick={toggleForgotPass}
          >
            Forgot Password?
          </Typography>
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          color={theme["button-base"]}
          variant="gradient"
          fullWidth
          onClick={handleAction}
        >
          {isLoggingIn ? "Signing in..." : "Sign In"}
        </Button>
        <div className="divider flex justify-between">
          <Typography
            style={{ color: theme.textPrimary }}
            className="text-skin-base mt-4 text-center font-normal"
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

          <Typography className="mt-4 text-center font-normal text-skin-base">
            Don't have an account?{" "}
            <span
              href="#"
              className="font-medium text-skin-highlight transition-colors hover:text-skin-highlight-hover cursor-pointer"
              onClick={toggleLogin}
            >
              Register
            </span>
          </Typography>
        </div>
      </CardFooter>
    </Card>
  );
}

export default Login;
