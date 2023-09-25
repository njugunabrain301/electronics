import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Typography,
  Checkbox,
  Alert,
} from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import { register } from "@/utils/frontendAPIs/auth";
import { Themes } from "@/utils/Themes/Themes";
import Link from "next/link";

function Register({ closeModal, toggleLogin, selectedTheme }) {
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

    if (!values.agreed) {
      setMerror("You have to agree to the terms");
      return;
    }
    setIsRegistering(true);
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
    } else {
      console.log(res);
      setMerror(res.message);
    }
    setIsRegistering(false);
  };
  const toggleTerms = () => {
    if (values.agreed) setValues({ ...values, agreed: false });
    else setValues({ ...values, agreed: true });
  };

  const theme = Themes[selectedTheme];

  return (
    <Card
      color="white"
      shadow={false}
      className="p-[20px] pt-[0] bg-skin-primary"
    >
      <CardHeader
        variant="gradient"
        className="mb-4 grid h-28 place-items-center bg-skin-card"
      >
        <Typography variant="h3" className="text-skin-inverted">
          Sign Up
        </Typography>
      </CardHeader>

      <form className="mt-8 mb-2 w-120 sm:w-80">
        <div className="mb-4 flex flex-col gap-6">
          <Input
            size="lg"
            label="Name"
            name="name"
            className="text-skin-base input"
            color={theme["text-highlight"]}
            value={values.name}
            onChange={onChange}
          />
          <Input
            size="lg"
            label="Phone"
            name="phone"
            className="text-skin-base input"
            color={theme["text-highlight"]}
            value={values.phone}
            onChange={onChange}
          />
          <Input
            size="lg"
            label="Email"
            name="email"
            className="text-skin-base input"
            color={theme["text-highlight"]}
            value={values.email}
            onChange={onChange}
          />
          <Input
            type="password"
            size="lg"
            label="Password"
            name="password"
            className="text-skin-base input"
            color={theme["text-highlight"]}
            value={values.password}
            onChange={onChange}
          />
        </div>
        <Checkbox
          label={
            <Typography
              variant="small"
              className="flex items-center font-normal text-skin-base"
            >
              I agree to the
              <Link
                href="/termsofservice.html"
                target="_blank"
                className="font-medium text-skin-highlight transition-colors hover:text-skin-highlight-hover"
              >
                &nbsp;Terms&nbsp;
              </Link>
              and
              <Link
                href="/privacypolicy.html"
                target="_blank"
                className="font-medium text-skin-highlight transition-colors hover:text-skin-highlight-hover"
              >
                &nbsp;Privacy Policy
              </Link>
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
          name="terms"
          onChange={toggleTerms}
        />
        <div className="">
          {!mError && error && (
            <Alert className="flex align-items-center justify-center bg-skin-alert-danger">
              <p className="font-medium flex items-center text-center tracking-normal leading-none">
                {error}
              </p>
            </Alert>
          )}
          {mError && (
            <Alert className="flex align-items-center justify-center bg-skin-alert-danger">
              <p className="font-medium flex items-center text-center tracking-normal leading-none">
                {mError}
              </p>
            </Alert>
          )}
        </div>
        <Button
          className="mt-6 input"
          color={theme["button-base"]}
          fullWidth
          onClick={handleAction}
        >
          {isRegistering ? "Registering..." : "Register"}
        </Button>
        <div className="flex justify-between">
          <Typography className="mt-4 text-center font-normal text-skin-base">
            <span
              className="cursor-pointer hover:underline"
              onClick={closeModal}
            >
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
            Already have an account?{" "}
            <span
              href="#"
              className="cursor-pointer font-medium text-skin-highlight transition-colors hover:text-skin-highlight-hover"
              onClick={toggleLogin}
            >
              Sign In
            </span>
          </Typography>
        </div>
      </form>
    </Card>
  );
}

export default Register;
