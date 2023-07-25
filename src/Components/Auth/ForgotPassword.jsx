import React, { useState } from "react";
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
import { resetPasswordLink } from "../../features/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

function ForgotPassword({ closeModal, toggleForgotPass }) {
  let [error, setError] = useState("");
  let [resetRequested, setResetRequested] = useState(false);
  let [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

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
    let res = await dispatch(resetPasswordLink({ email }));

    if (res.payload.success) {
      setResetRequested(true);
    } else if (res.payload.message) {
      setError(res.payload.message);
    } else {
      setError("An error occured. Please try again later");
    }
    setIsLoading(false);
  };

  const theme = useSelector((state) => state.app.theme);
  return (
    <Card className="w-80 bg-skin-primary">
      <CardHeader
        variant="gradient"
        color={theme.backgroundAlt}
        className="mb-4 grid h-28 place-items-center bg-skin-card"
      >
        <Typography variant="h3" className="text-skin-inverted">
          Forgot Password
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
          value={email}
          onChange={(e) => {
            setError("");
            setEmail(e.target.value);
          }}
        />

        <div className="">
          {error && (
            <Alert className="flex align-items-center justify-center bg-alert-danger">
              <p className="font-medium flex items-center text-center tracking-normal leading-none">
                {error}
              </p>
            </Alert>
          )}
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        {resetRequested ? (
          <Typography
            varaint="h6"
            className="mt-6 flex justify-center text-skin-base"
          >
            We have sent a password reset link to your email
          </Typography>
        ) : (
          <Button
            variant="gradient"
            fullWidth
            onClick={handleAction}
            color={theme["button-base"]}
            style={{
              color: theme.buttonTextPrimary,
            }}
          >
            {isLoading ? "Sending Request..." : "Reset Password"}
          </Button>
        )}
        {/* <Typography
          variant="small"
          className="mt-6 flex justify-center"
        ></Typography> */}
        <div className="divider flex justify-between">
          <Typography className="mt-4 text-center font-normal text-skin-base">
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
            Go back to{" "}
            <span
              href="#"
              className="font-medium text-skin-highlight transition-colors hover:text-skin-highlight-hover"
              onClick={toggleForgotPass}
            >
              Login
            </span>
          </Typography>
        </div>
      </CardFooter>
    </Card>
  );
}

export default ForgotPassword;
