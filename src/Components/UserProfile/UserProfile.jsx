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
  updatePassword,
} from "../../features/slices/authSlice";
import { Link } from "react-router-dom";

function UserProfile({ closeModal }) {
  let use = useSelector((state) => state.user.user);
  let user = { ...use, closeModal: closeModal };
  let error = useSelector((state) => state.user.error);
  const [currState, setCurrState] = useState("Update");
  const action = () => {
    if (currState === "Update") {
      setCurrState("Save");
    } else if (currState === "Save") {
      dispatch(updateProfile(user));

      setCurrState("Update");
    }
  };

  const [values, setValues] = useState(user);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const dispatch = useDispatch();
  const handleLogOut = () => {
    closeModal();
    dispatch(logout());
  };

  const [updatePassState, setUpdatePassState] = useState("Update Password");
  const updatePass = () => {
    dispatch(updatePassword());
    setUpdatePassState(
      "A reset password link has been sent to your email address"
    );
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-[350px] bg-white p-2 rounded-md">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            My Profile
          </Typography>
        </CardHeader>
        <hr className="h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
        <form className="mt-8 mb-2 sm:w-80">
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              label="Name"
              name="name"
              disabled={currState === "Update"}
              value={user.name}
              onChange={onChange}
            />
            <Input
              size="lg"
              label="Email"
              name="email"
              disabled={currState === "Update"}
              value={user.email}
              onChange={onChange}
            />
          </div>

          <div className="">
            {error && (
              <Alert
                variant="ghost"
                className="flex align-items-center justify-center bg-red-300"
              >
                <p className="font-medium flex items-center text-center tracking-normal leading-none">
                  {error}
                </p>
              </Alert>
            )}
          </div>
          <div className="flex justify-between">
            <Typography color="gray" className="mt-4 text-center font-normal">
              <a
                href="#"
                className="font-medium text-blue-500 transition-colors hover:text-blue-700"
                onClick={updatePass}
              >
                {updatePassState === "Update Password" ? "Update Password" : ""}
              </a>
            </Typography>
            <Typography color="gray" className="mt-4 text-center font-normal">
              <Link
                to="/orders"
                onClick={closeModal}
                className="text-blue-400 hover:underline"
              >
                My Orders
              </Link>
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
          <Button className="mt-6" fullWidth onClick={() => action()}>
            {currState}
          </Button>
          <div className="flex justify-between">
            <Typography color="gray" className="mt-4 text-center font-normal">
              <span
                className="cursor-pointer hover:underline"
                onClick={closeModal}
              >
                Close
              </span>
            </Typography>
            <Typography color="gray" className="mt-4 text-center font-normal">
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
