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
import { checkout } from "../../features/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";

function Checkout({ closeModal, setOpenCheckout }) {
  let error = useSelector((state) => state.user.error);

  const intitalState = {
    code: "",
    county: "",
    subcounty: "",
    courier: "",
    closeModal: closeModal,
  };

  const [values, setValues] = useState(intitalState);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const dispatch = useDispatch();

  return (
    <Card className="w-80">
      <CardHeader
        variant="gradient"
        color="blue"
        className="mb-0 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          Check Out
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-3">
        <Input
          label="County"
          size="lg"
          type="text"
          name="county"
          value={values.county}
          onChange={onChange}
        />
        <Input
          label="Sub-County"
          size="lg"
          type="text"
          name="subcounty"
          value={values.subcounty}
          onChange={onChange}
        />
        <div class="relative h-10 min-w-[200px]">
          <select
            name="courier"
            value={values.courier}
            onChange={onChange}
            class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          >
            <option value="g4s">G4S</option>
            <option value="wells-fargo">Wells Fargo</option>
            <option value="psv">PSV</option>
          </select>
          <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Select a Courier
          </label>
        </div>
        <div>
          <Typography className="m-0">MPESA: Buy Goods & Services</Typography>
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
          onClick={() => dispatch(checkout(values))}
        >
          Done
        </Button>
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
