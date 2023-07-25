import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardHeader,
  Alert,
  Button,
  Input,
  Typography,
} from "@material-tailwind/react";
import {
  updateProfile,
  logout,
  resetPasswordLink,
} from "../../features/slices/authSlice";

function UserProfile({ closeModal }) {
  let use = useSelector((state) => state.user.user);
  let user = { ...use, closeModal: closeModal };
  let error = useSelector((state) => state.user.error);
  const [isLoading, setIsLoading] = useState(false);
  const [currState, setCurrState] = useState("Update");
  const [mError, setMerror] = useState("");

  const [values, setValues] = useState(user);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const action = async () => {
    setMerror("");
    if (isLoading) return;
    if (currState === "Update") {
      setCurrState("Save");
    } else if (currState === "Save") {
      if (values.name === "" || values.email === "" || values.phone === "") {
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
      setIsLoading(true);
      setCurrState("Updating...");
      await dispatch(updateProfile(values));
      setIsLoading(false);
      setCurrState("Update");
    }
  };

  const dispatch = useDispatch();
  const handleLogOut = () => {
    closeModal();
    dispatch(logout());
  };

  const [updatePassState, setUpdatePassState] = useState("Update Password");
  const updatePass = () => {
    dispatch(resetPasswordLink({ email: user.email }));
    setUpdatePassState(
      "A reset password link has been sent to your email address"
    );
  };
  const theme = useSelector((state) => state.app.theme);
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-[330px] bg-skin-primary p-4 rounded-md pt-0">
        <CardHeader
          variant="gradient"
          className="mb-4 grid h-28 place-items-center bg-skin-card"
        >
          <Typography variant="h3" className="text-skin-inverted">
            My Profile
          </Typography>
        </CardHeader>
        <hr className="h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
        <form className="mt-8 mb-2 w-full">
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              label="Name"
              name="name"
              className="text-skin-base"
              style={{
                pointerEvents: currState === "Update" ? "none" : "initial",
              }}
              color={theme["text-highlight"]}
              value={values.name}
              onChange={onChange}
            />
            <Input
              size="lg"
              label="Email"
              name="email"
              className="text-skin-base"
              color={theme["text-highlight"]}
              style={{
                pointerEvents: currState === "Update" ? "none" : "initial",
              }}
              value={values.email}
              onChange={onChange}
            />
            <Input
              size="lg"
              label="Phone"
              name="phone"
              className="text-skin-base input"
              color={theme["text-highlight"]}
              style={{
                pointerEvents: currState === "Update" ? "none" : "initial",
              }}
              value={values.phone}
              onChange={onChange}
            />
          </div>

          <div className="">
            {error && (
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
          <div className="flex justify-between">
            <Typography className="mt-4 text-center font-normal">
              <span
                className="font-normal text-skin-highlight transition-colors hover:underline hover:text-skin-highlight-hover"
                onClick={updatePass}
              >
                {updatePassState === "Update Password" ? "Update Password" : ""}
              </span>
            </Typography>
          </div>
          <Typography
            color="gray"
            className="w-full mt-4 text-center font-normal"
          >
            <span>
              {updatePassState !== "Update Password" ? updatePassState : ""}
            </span>
          </Typography>
          <Button
            color={theme["button-base"]}
            className="mt-6"
            fullWidth
            onClick={() => action()}
          >
            {currState}
          </Button>
          <div className="flex justify-between">
            <Typography className="text-skin-base mt-4 text-center font-normal">
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
              <span
                className="cursor-pointer hover:underline"
                onClick={() => handleLogOut()}
              >
                Log Out
              </span>
            </Typography>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default UserProfile;
