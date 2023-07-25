import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Typography } from "@mui/material";
import { Button, Input } from "@material-tailwind/react";
import { resetPassword } from "../../features/slices/authSlice";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

function PasswordReset() {
  let { token } = useParams();

  let dispatch = useDispatch();
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
    let res = await dispatch(resetPassword({ password, token }));
    if (res.payload.success) {
      setDone(true);
    } else if (res.payload.message) {
      setError(res.payload.message);
    } else {
      setError("An error occured. Please try again after some time");
    }
    setIsLoading(false);
  };

  let profile = useSelector((state) => state.app.profile);
  const theme = useSelector((state) => state.app.theme);
  return (
    <div className="pt-[100px] pb-[100px] flex justify-center items-center w-[100%] bg-skin-primary text-skin-base">
      <Helmet>
        <title>{"Reset Password | " + profile.name}</title>
      </Helmet>
      {done ? (
        <div
          className="p-[10px] text-skin-base"
          style={{
            boxShadow: "0 0 2px grey",
            borderRadius: "5px",
            textAlign: "center",
          }}
        >
          <Typography variant="h5" className="text-skin-base">
            Your password has been reset successfully
          </Typography>
          <Typography className="text-skin-base">
            You can proceed to login using the new password
          </Typography>
        </div>
      ) : (
        <div
          className="p-[10px] text-skin-base"
          style={{
            boxShadow: "0 0 2px grey",
            borderRadius: "5px",
            textAlign: "center",
          }}
        >
          <Typography variant="h5">Reset Password</Typography>
          <div className="m-[7px] w-[300px]">
            <Input
              type="password"
              value={password}
              className="text-skin-base input"
              color={theme["text-highlight"]}
              onChange={(e) => {
                setError("");
                setPassword(e.target.value);
              }}
              label="Enter new password"
              style={{ width: "100%" }}
            />
          </div>
          <div className="m-[7px] w-[300px]">
            <Input
              type="password"
              value={cpassword}
              className="text-skin-base input"
              color={theme["text-highlight"]}
              onChange={(e) => {
                setError("");
                setCPassword(e.target.value);
              }}
              label="Repeat password"
              style={{ width: "100%" }}
            />
          </div>
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
          <div className="m-[10px] w-[300px]">
            <Button
              color={theme["button-base"]}
              className="text-skin-inverted"
              onClick={handleReset}
            >
              {isLoading ? "Resetting..." : "Reset"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PasswordReset;
