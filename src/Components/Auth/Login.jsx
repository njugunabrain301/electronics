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
  let error = useSelector((state) => state.user.error);

  const intitalState = {
    email: "",
    password: "",
    image: "",
    closeModal: closeModal,
  };

  const [values, setValues] = useState(intitalState);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const dispatch = useDispatch();

  return (
    <Card className="w-96">
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
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          variant="gradient"
          fullWidth
          onClick={() => dispatch(login(values))}
        >
          Sign In
        </Button>
        {/* <Typography
          variant="small"
          className="mt-6 flex justify-center"
        ></Typography> */}
        <div className="divider flex justify-between">
          <Typography color="gray" className="mt-4 text-center font-normal">
            <span className="cursor-pointer" onClick={closeModal}>
              Close
            </span>
          </Typography>

          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?{" "}
            <a
              href="#"
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
              onClick={toggleLogin}
            >
              Register
            </a>
          </Typography>
        </div>
      </CardFooter>
    </Card>
  );
}

export default Login;
