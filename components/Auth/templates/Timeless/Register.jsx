import React, { useState } from "react";
import { Card, CardHeader, Checkbox, Alert } from "@material-tailwind/react";
import { register } from "@/utils/frontendAPIs/auth";
import Link from "next/link";
import { useGlobalContext } from "@/Context/context";
import { Button, TextField, Typography } from "@mui/material";

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
    <Card
      color="white"
      shadow={false}
      className="p-[20px] pt-[0]"
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
          style={{ color: theme.palette.text.inverted, fontWeight: "450" }}
        >
          Sign Up
        </Typography>
      </CardHeader>

      <form className="mt-8 mb-2 w-120 sm:w-80">
        <div className="mb-4 flex flex-col gap-6">
          <TextField
            label="Name"
            name="name"
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
            value={values.name}
            onChange={onChange}
          />

          <TextField
            label="Phone"
            name="phone"
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
            value={values.phone}
            onChange={onChange}
          />

          <TextField
            label="Email"
            name="email"
            type="email"
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
            type="password"
            label="Password"
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
        </div>
        <Checkbox
          label={
            <Typography
              variant="small"
              className="flex items-center font-normal flex-wrap"
              style={{ color: theme.palette.text.base }}
            >
              I agree to the&nbsp;
              <Link
                href="/termsofservice.html"
                target="_blank"
                className="font-medium transition-colors hover:underline"
                style={{ color: theme.palette.highlight.main }}
              >
                {" Terms "}
              </Link>
              &nbsp;and&nbsp;
              <Link
                href="/privacypolicy.html"
                target="_blank"
                className="font-medium text-skin-highlight transition-colors hover:underline"
                style={{ color: theme.palette.highlight.main }}
              >
                {" Privacy Policy "}
              </Link>
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
          name="terms"
          color={theme["input-color"]}
          onChange={toggleTerms}
        />
        <div className="mb-2">
          {!mError && error && (
            <Alert
              className="flex align-items-center justify-center"
              style={{
                backgroundColor: theme.palette.error.main,
                color: theme.palette.error.contrastText,
              }}
            >
              <p className="font-medium flex items-center text-center tracking-normal leading-none">
                {error}
              </p>
            </Alert>
          )}
          {mError && (
            <Alert
              className="flex align-items-center justify-center"
              style={{
                backgroundColor: theme.palette.error.main,
                color: theme.palette.error.contrastText,
              }}
            >
              <p className="font-medium flex items-center text-center tracking-normal leading-none">
                {mError}
              </p>
            </Alert>
          )}
        </div>
        <Button
          className="mt-6 input"
          color={"primary"}
          fullWidth
          variant="contained"
          onClick={handleAction}
        >
          {isRegistering ? "Registering..." : "Register"}
        </Button>
        <div
          className="flex justify-between mt-2"
          style={{ color: theme.palette.text.base }}
        >
          <Typography className="mt-4 text-center font-normal">
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
          <span className="text-center font-normal flex">
            Already have an account?&nbsp;
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
              Sign In
            </Typography>
          </span>
        </div>
      </form>
    </Card>
  );
}

export default Register;
