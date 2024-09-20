import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Alert,
} from "@material-tailwind/react";
import { Button, TextField, Typography } from "@mui/material";

function ForgotPasswordContent({
  closeModal,
  toggleForgotPass,
  handleAction,
  theme,
  email,
  setEmail,
  isLoading,
  resetRequested,
  error,
  setError,
}) {
  return (
    <main-content>
      <Card
        className="w-80"
        style={{
          backgroundColor: theme.palette.background.primary,
          color: theme.palette.text.base,
        }}
      >
        <CardHeader
          variant="gradient"
          style={{ backgroundColor: theme.palette.card.main }}
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography
            variant="h4"
            style={{ color: theme.palette.text.inverted, fontWeight: "450" }}
          >
            Forgot Password
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

            <span className="text-center font-normal flex">
              Go back to&nbsp;
              <Typography
                href="#"
                className="cursor-pointer font-medium transition-colors"
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
    </main-content>
  );
}

export default ForgotPasswordContent;
