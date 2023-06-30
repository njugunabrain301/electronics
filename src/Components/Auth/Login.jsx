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
import { login } from "../../features/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

function Login({ closeModal, toggleLogin }) {
  let error = useSelector((state) => state.user.loginError);

  const intitalState = {
    email: "",
    password: "",
    image: "",
  };

  const [values, setValues] = useState(intitalState);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const dispatch = useDispatch();

  const handleAction = async () => {
    let res = await dispatch(login(values));

    if (res.payload.success) {
      closeModal();
    }
  };

  return (
    <Card className="w-80">
      <CardHeader
        variant="gradient"
        color="blue"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          Sign In
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <Input
          label="Email"
          size="lg"
          type="email"
          name="email"
          value={values.email}
          onChange={onChange}
        />
        <Input
          label="Password"
          size="lg"
          type="password"
          name="password"
          value={values.password}
          onChange={onChange}
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
      </CardBody>
      <CardFooter className="pt-0">
        <Button variant="gradient" fullWidth onClick={handleAction}>
          Sign In
        </Button>
        {/* <Typography
          variant="small"
          className="mt-6 flex justify-center"
        ></Typography> */}
        <div className="divider flex justify-between">
          <Typography color="gray" className="mt-4 text-center font-normal">
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

          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?{" "}
            <span
              href="#"
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
              onClick={toggleLogin}
            >
              Register
            </span>
          </Typography>
        </div>
      </CardFooter>
    </Card>
  );
}

export default Login;
