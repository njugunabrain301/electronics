import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Alert,
} from "@material-tailwind/react";
import { resetPasswordLink } from "@/utils/frontendAPIs/auth";
import { useGlobalContext } from "@/Context/context";
import { Button, TextField, Typography } from "@mui/material";

function ForgotPassword({ closeModal, toggleForgotPass, selectedTheme }) {
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

  const { theme, titleFont } = useGlobalContext();
  return (
    <Card
      className="w-80"
      style={{
        backgroundColor: theme.palette.background.primary,
        color: theme.palette.text.base,
        borderRadius: "0",
      }}
    >
      <CardHeader
        variant="gradient"
        style={{ backgroundColor: theme.palette.card.main, borderRadius: "0" }}
        className="grid h-28 place-items-center w-full m-0"
      >
        <Typography
          variant="h4"
          style={{ color: theme.palette.text.inverted, fontWeight: "450" }}
          className={titleFont.className}
        >
          Forgot Password
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4 mt-4">
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
              borderRadius: "0",
            },
            input: { color: theme.palette.text.base },
          }}
          color={"input"}
          InputLabelProps={{ sx: { color: theme.palette.text.alt } }}
          value={email}
          onChange={(e) => {
            setError("");
            setEmail(e.target.value);
          }}
        />

        <div className="">
          {error && (
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
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        {resetRequested ? (
          <Typography varaint="h6" className="mt-6 flex justify-center">
            We have sent a password reset link to your email
          </Typography>
        ) : (
          <Button
            variant="contained"
            fullWidth
            onClick={handleAction}
            color={"primary"}
            style={{ borderRadius: "0" }}
          >
            {isLoading ? "Sending Request..." : "Reset Password"}
          </Button>
        )}

        <div className="divider flex justify-between mt-4">
          <Typography className="mt-4 text-center font-normal">
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

          <span className="text-center font-normal flex text-sm items-center">
            Go back to&nbsp;
            <Typography
              href="#"
              className="cursor-pointer font-medium transition-colors text-sm"
              onClick={toggleForgotPass}
              sx={{
                color: theme.palette.highlight.main,
                "&:hover": {
                  color: theme.palette.highlight.light,
                },
              }}
            >
              Login
            </Typography>
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}

export default ForgotPassword;
