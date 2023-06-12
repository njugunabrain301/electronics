import React, { Fragment, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Alert,
} from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import { login } from "../../features/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = ({ openModal, setOpen }) => {
  let error = useSelector((state) => state.user.error);

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

  return (
    <div>
      <div className="w-[500px]">
        <Dialog
          className="border-0 outline-0 w-[300px]"
          open={openModal}
          handler={() => setOpen(false)}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
        >
          {/* <DialogHeader>S</DialogHeader> */}
          <DialogBody
            // divider
            className="flex flex-col justify-center items-start"
          >
            <div className="grid grid-cols-1 items-center justify-items-center h-screen">
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
                          Invalid Credentials
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
                  <Typography
                    variant="small"
                    className="mt-6 flex justify-center"
                  ></Typography>
                </CardFooter>
              </Card>
            </div>
          </DialogBody>
          {/* <DialogFooter className="flex justify-start items-center">
            <p className="text-black text-base font-inter tracking-normal leading-none pt-2">
              Total Price of All Products:{" "}
              <span className="ml-2">{totalPrice}$</span>
            </p>
          </DialogFooter> */}
        </Dialog>
      </div>
    </div>
  );
};

export default Login;
