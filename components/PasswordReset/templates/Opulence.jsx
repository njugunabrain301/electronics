"use client";
import { useState } from "react";
import { Button, Input, TextField, Typography } from "@mui/material";
// import { Button, Input } from "@material-tailwind/react";
import { resetPassword } from "@/utils/frontendAPIs/auth";
import { useGlobalContext } from "@/Context/context";

function Opulence({ token, profile }) {
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let handleReset = async () => {
    if (isLoading) return;
    setError("");
    if (password.length < 6) {
      setError("Password needs to be a minimum of 6 characters");
      return;
    }
    if (password !== cpassword) {
      setError("Passwords do not match!");
      return;
    }
    setIsLoading(true);

    let res = await resetPassword({ password, token });
    if (res.success) {
      setDone(true);
    } else if (res.message) {
      setError(res.message);
    } else {
      setError("An error occured. Please try again after some time");
    }
    setIsLoading(false);
  };

  const { theme } = useGlobalContext();
  return (
    <div
      className="pt-[100px] pb-[100px] flex justify-center items-center w-[100%]"
      style={{
        backgroundColor: theme.palette.background.primary,
        color: theme.palette.text.base,
      }}
    >
      {done ? (
        <div
          className="p-[10px]"
          style={{
            boxShadow: "0 0 2px grey",
            borderRadius: "5px",
            textAlign: "center",
          }}
        >
          <Typography variant="h5" className="">
            Your password has been reset successfully
          </Typography>
          <Typography className="">
            You can proceed to login using the new password
          </Typography>
        </div>
      ) : (
        <div
          className="p-[10px]"
          style={{
            boxShadow: "0 0 2px grey",
            borderRadius: "5px",
            textAlign: "center",
          }}
        >
          <Typography variant="h5">Reset Password</Typography>
          <div className="py-2"></div>
          <TextField
            label="Enter New Password"
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
                borderRadius: "0",
              },
              input: { color: theme.palette.text.base },
            }}
            color={"input"}
            InputLabelProps={{ sx: { color: theme.palette.text.alt } }}
            value={password}
            className="w-full mt-5"
            onChange={(e) => {
              setError("");
              setPassword(e.target.value);
            }}
          />
          <div className="py-2"></div>
          <TextField
            label="Repeat Password"
            type="password"
            name="cpassword"
            size="small"
            className="w-full my-5"
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
            value={cpassword}
            onChange={(e) => {
              setError("");
              setCPassword(e.target.value);
            }}
          />
          <div style={{ textAlign: "center" }}>
            {error && (
              <Typography
                variant="button"
                fontWeight="light"
                style={{
                  padding: "7px 10px",
                  width: "100%",
                  color: "white",
                  borderRadius: "4px",
                }}
                className="bg-skin-alert-danger"
              >
                {error}
              </Typography>
            )}
          </div>
          <div className="py-3"></div>
          <div className="w-[300px] mx-auto">
            <Button
              color={"primary"}
              variant="contained"
              fullWidth
              onClick={handleReset}
              style={{ borderRadius: "0" }}
              className="mt-5"
            >
              {isLoading ? "Resetting..." : "Reset"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Opulence;
