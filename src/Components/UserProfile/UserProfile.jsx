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

  const [values, setValues] = useState(user);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const action = () => {
    if (currState === "Update") {
      setCurrState("Save");
    } else if (currState === "Save") {
      dispatch(updateProfile(values));

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
    dispatch(updatePassword());
    setUpdatePassState(
      "A reset password link has been sent to your email address"
    );
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-[330px] bg-white p-4 rounded-md pt-0">
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
        <form className="mt-8 mb-2 w-full">
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              label="Name"
              name="name"
              disabled={currState === "Update"}
              value={values.name}
              onChange={onChange}
            />
            <Input
              size="lg"
              label="Email"
              name="email"
              disabled={currState === "Update"}
              value={values.email}
              onChange={onChange}
            />
            <Input
              size="lg"
              label="Phone"
              name="phone"
              disabled={currState === "Update"}
              value={values.phone}
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
              <span
                className="font-normal text-blue-500 transition-colors hover:underline hover:text-blue-700"
                onClick={updatePass}
              >
                {updatePassState === "Update Password" ? "Update Password" : ""}
              </span>
            </Typography>
            <Typography color="gray" className="mt-4 text-center font-normal">
              <Link
                to="/orders"
                onClick={closeModal}
                className="text-blue-400 hover:underline hover:text-blue-700"
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
