import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Alert,
  Select,
  Option,
} from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import { checkout } from "../../features/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Checkout({ closeModal, setOpenCheckout }) {
  let error = useSelector((state) => state.user.error);
  const [section, setSection] = useState(1);

  const intitalState = {
    code: "",
    county: "",
    subcounty: "",
    courier: "",
  };

  const [values, setValues] = useState(intitalState);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const [c_error, setCError] = useState("");
  const [success, setSuccess] = useState(false);
  const handleCheckout = async () => {
    if (
      values.code === "" ||
      values.county === "" ||
      values.subcounty === "" ||
      values.courier === ""
    ) {
      setCError("Fill in all Fields");
      return;
    }

    let res = await dispatch(checkout(values));
    console.log(res);
    if (res.payload.success) {
      setSuccess(true);
    }
  };

  const openSection = (sec) => {
    setCError("");
    console.log(values);
    if (sec === 2) {
      if (
        values.county === "" ||
        values.subcounty === "" ||
        values.courier === ""
      ) {
        setCError("Fill in all Fields");
        return;
      } else {
        setSection(sec);
      }
    } else {
      setSection(sec);
    }
  };

  const dispatch = useDispatch();

  return (
    <Card className="w-85 max-w-[90%]">
      <CardHeader
        variant="gradient"
        color="blue"
        className="mb-0 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          Check Out
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col">
        {success ? (
          <div className="text-center">
            <Typography variant="h3">Your Order has been received</Typography>
            <Typography>
              Thank you for shopping with us. <br />
            </Typography>
            <Typography>
              You can track the progress in the{" "}
              <Link
                to="/orders"
                className="text-blue-400"
                onClick={() => closeModal()}
              >
                orders
              </Link>{" "}
              section
            </Typography>
          </div>
        ) : (
          <div>
            <ul className="flex justify-evenly mb-2">
              <li
                className="p-2 w-[190px] text-center"
                style={{
                  borderBottom:
                    section === 1 ? "solid 2px dodgerblue" : "solid 2px grey",
                  color: section === 1 ? "dodgerblue" : "grey",
                  transition: ".5s",
                }}
                onClick={() => openSection(1)}
              >
                Delivery Details
              </li>
              <li
                className="p-2 w-[190px] text-center ml-[3px]"
                style={{
                  borderBottom:
                    section === 2 ? "solid 2px dodgerblue" : "solid 2px grey",
                  color: section === 2 ? "dodgerblue" : "grey",
                  transition: ".5s",
                }}
                onClick={() => openSection(2)}
              >
                Payment Section
              </li>
            </ul>
            {section === 1 && (
              <div>
                <div className="relative min-w-[200px] my-2">
                  <Select
                    label="Select County"
                    // value={values.county}
                    onChange={(e) => setValues({ ...values, county: e })}
                  >
                    <Option value="Nakuru">Nakuru</Option>
                    <Option value="Eldoret">Eldoret</Option>
                  </Select>
                </div>

                <div className="relative min-w-[200px] my-2">
                  <Select
                    label="Select Sub-County"
                    // value={values.subcounty}
                    onChange={(e) => setValues({ ...values, subcounty: e })}
                  >
                    <Option value="Njoro">Njoro</Option>
                    <Option value="Gilgil">Gilgil</Option>
                  </Select>
                </div>
                <div className="relative min-w-[200px] my-2">
                  <Select
                    label="Select Courier"
                    // value={values.courier}
                    onChange={(e) => setValues({ ...values, courier: e })}
                  >
                    <Option value="G4S">G4S</Option>
                    <Option value="PSV">PSV</Option>
                  </Select>
                </div>
              </div>
            )}
            {section === 2 && (
              <div>
                <div>
                  <Typography className="m-0">
                    MPESA: Buy Goods & Services
                  </Typography>
                  <Typography>Till Number: 000000</Typography>
                  <Typography>Store Number: 000000</Typography>
                  <Typography>Business Name: My Business Name</Typography>
                </div>
                <Input
                  label="MPESA Code"
                  size="lg"
                  type="text"
                  name="code"
                  value={values.code}
                  onChange={onChange}
                />
              </div>
            )}

            <div className="">
              {error && (
                <Alert className="flex align-items-center justify-center bg-red-300">
                  <p className="font-medium flex items-center text-center tracking-normal leading-none">
                    {error}
                  </p>
                </Alert>
              )}
              {c_error && (
                <Alert className="flex align-items-center justify-center bg-red-300">
                  <p className="font-medium flex items-center text-center tracking-normal leading-none">
                    {c_error}
                  </p>
                </Alert>
              )}
            </div>
          </div>
        )}
      </CardBody>
      <CardFooter className="pt-0">
        {section === 1 ? (
          <Button variant="gradient" fullWidth onClick={() => openSection(2)}>
            Proceed
          </Button>
        ) : (
          <Button variant="gradient" fullWidth onClick={() => handleCheckout()}>
            Done
          </Button>
        )}
        {/* <Typography
          variant="small"
          className="mt-6 flex justify-center"
        ></Typography> */}
        <div className="divider flex justify-between">
          <Typography color="gray" className="mt-4 text-center font-normal">
            <span
              className="cursor-pointer"
              onClick={() => {
                closeModal();
                setTimeout(() => {
                  setOpenCheckout(false);
                }, 500);
              }}
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
        </div>
      </CardFooter>
    </Card>
  );
}

export default Checkout;
