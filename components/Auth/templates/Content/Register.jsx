import { Card, CardHeader, Checkbox } from "@material-tailwind/react";
import Link from "next/link";
import { Button, TextField, Typography } from "@mui/material";

function RegisterContent({
  closeModal,
  toggleLogin,
  error,
  mError,
  isRegistering,
  values,
  onChange,
  handleAction,
  toggleTerms,
  theme,
}) {
  return (
    <main-content>
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
            {mError && (
              <div
                className="flex align-items-center justify-center rounded-lg p-5"
                style={{
                  backgroundColor: "indianred",
                  color: "white",
                }}
              >
                <p className="font-medium flex items-center text-center tracking-normal leading-none">
                  {mError}
                </p>
              </div>
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
    </main-content>
  );
}

export default RegisterContent;
