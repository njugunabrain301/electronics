import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Typography,
  Checkbox,
  Alert,
} from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import { register } from "../../features/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

function Register({ closeModal, toggleLogin }) {
  let error = useSelector((state) => state.user.error);

  const intitalState = {
    email: "",
    password: "",
    name: "",
    agreed: false,
    closeModal: closeModal,
  };

  const [values, setValues] = useState(intitalState);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const dispatch = useDispatch();
  const toggleTerms = () => {
    if (values.agreed) setValues({ ...values, agreed: false });
    else setValues({ ...values, agreed: true });
  };

  return (
    <Card color="white" shadow={false} className="p-[20px] pt-[0]">
      <CardHeader
        variant="gradient"
        color="blue"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          Sign Up
        </Typography>
      </CardHeader>
      <Typography color="gray" className="mt-1 font-normal">
        Enter your details to register.
      </Typography>
      <form className="mt-8 mb-2 w-120 sm:w-80">
        <div className="mb-4 flex flex-col gap-6">
          <Input
            size="lg"
            label="Name"
            name="name"
            value={values.name}
            onChange={onChange}
          />
          <Input
            size="lg"
            label="Email"
            name="email"
            value={values.email}
            onChange={onChange}
          />
          <Input
            type="password"
            size="lg"
            label="Password"
            name="password"
            value={values.password}
            onChange={onChange}
          />
        </div>
        <Checkbox
          label={
            <Typography
              variant="small"
              color="gray"
              className="flex items-center font-normal"
            >
              I agree to the
              <a
                href="#"
                className="font-medium transition-colors hover:text-blue-500"
              >
                &nbsp;Terms and Conditions
              </a>
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
          name="terms"
          onChange={toggleTerms}
        />
        <div className="">
          {error && (
            <Alert className="flex align-items-center justify-center bg-red-300">
              <p className="font-medium flex items-center text-center tracking-normal leading-none">
                {error}
              </p>
            </Alert>
          )}
        </div>
        <Button
          className="mt-6"
          fullWidth
          onClick={() => {
            dispatch(register(values));
          }}
        >
          Register
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
            Already have an account?{" "}
            <a
              href="#"
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
              onClick={toggleLogin}
            >
              Sign In
            </a>
          </Typography>
        </div>
      </form>
    </Card>
  );
}

export default Register;
