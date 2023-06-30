import React, { useEffect, useState } from "react";
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
import { checkout, getCheckoutInfo } from "../../features/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Autocomplete, TextField } from "@mui/material";

function Checkout({ closeModal, setOpenCheckout }) {
  let error = useSelector((state) => state.user.error);
  const [section, setSection] = useState(1);
  let counties = useSelector((state) => state.cart.counties);
  let [subCounties, setSubCounties] = useState([]);
  let [couriers, setCouriers] = useState([]);
  let [deliveryCost, setDeliveryCost] = useState(0);
  let user = useSelector((state) => state.user.user);
  let deliveryLocations = useSelector((state) => state.cart.deliveryLocations);
  let paymentOptions = useSelector((state) => state.cart.paymentOptions);
  const [payOptions, setPayOptions] = useState([]);
  const cartTotal = useSelector((state) => state.cart.totalPrice);

  const [code, setCode] = useState("");
  const [county, setCounty] = useState(user.county || "");
  const [subcounty, setSubCounty] = useState(user.subcounty || "");
  const [courier, setCourier] = useState(user.courier || "");
  const [mode, setMode] = useState("");
  const [paymentInfo, setPaymentInfo] = useState({});

  const setUpMode = (mode) => {
    setMode(mode);
    paymentOptions.map((opt) => {
      if (opt.type === mode) {
        setPaymentInfo(opt);
      }
      return opt;
    });
  };

  useEffect(() => {
    if (paymentOptions && paymentOptions.length > 0) {
      if (mode === "") {
        setMode(paymentOptions[0].type);
        setUpMode(paymentOptions[0].type);
      }

      let opt = [];
      paymentOptions.map((op) => {
        opt.push(op.type);
        return op;
      });
      setPayOptions(opt);
    }
  }, [paymentOptions, mode]);

  const setUpSubCounties = (county) => {
    if (county && county !== "") {
      let subs = [];
      deliveryLocations.map((loc) => {
        if (loc.county === county && !subs.includes(loc.subcounty)) {
          subs.push(loc.subcounty);
        }
        return loc;
      });
      setSubCounties(subs);
      setSubCounty("");
      setCourier("");
      setDeliveryCost(0);
    } else {
      setSubCounty("");
      setSubCounties([]);
      setCouriers([]);
      setCourier("");
      setDeliveryCost(0);
    }
  };

  const setUpCouriers = (subcounty) => {
    if (county !== "" && subcounty !== "") {
      let couriers = [];
      deliveryLocations.map((loc) => {
        if (loc.county === county && loc.subcounty === subcounty) {
          couriers.push({
            label: loc.courier + " - " + loc.description,
            id: loc._id,
          });
        }
        return loc;
      });
      setCourier("");
      setDeliveryCost(0);
      setCouriers(couriers);
    } else {
      setCouriers([]);
      setCourier("");
      setDeliveryCost(0);
    }
  };

  const getDeliveryFee = (v) => {
    if (county !== "" && subcounty !== "" && v) {
      let fee = 0;
      deliveryLocations.map((loc) => {
        if (loc._id === v.id) {
          fee = loc.price;
        }
        return loc;
      });
      setDeliveryCost(fee);
    } else {
      setDeliveryCost(0);
    }
  };

  const [c_error, setCError] = useState("");
  const [success, setSuccess] = useState(false);
  const handleCheckout = async () => {
    if (
      code === "" ||
      county === "" ||
      subcounty === "" ||
      courier === "" ||
      mode === ""
    ) {
      setCError("Fill in all Fields");
      return;
    }

    let res = await dispatch(
      checkout({
        code,
        courier: courier.id,
        mode,
        total: Number(cartTotal) + Number(deliveryCost),
      })
    );
    if (res.payload.success) {
      setSuccess(true);
    }
  };

  const openSection = (sec) => {
    setCError("");

    if (sec === 2) {
      if (county === "" || subcounty === "" || courier === "") {
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

  useEffect(() => {
    dispatch(getCheckoutInfo());
  }, [dispatch]);

  return (
    <Card className="w-85 max-w-[90%] min-w-[330px]">
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
                  <Autocomplete
                    disablePortal={true}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    options={counties}
                    renderInput={(params) => (
                      <TextField {...params} label="Select County" />
                    )}
                    value={county}
                    size="small"
                    name="type"
                    onChange={(e, v) => {
                      setUpSubCounties(v);
                      setCounty(v);
                    }}
                  />
                </div>
                <div className="relative min-w-[200px] my-2">
                  <Autocomplete
                    disablePortal={true}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    options={subCounties}
                    renderInput={(params) => (
                      <TextField {...params} label="Select Sub-County" />
                    )}
                    value={subcounty}
                    size="small"
                    name="type"
                    onChange={(e, v) => {
                      setUpCouriers(v);
                      setSubCounty(v);
                    }}
                  />
                </div>
                <div className="relative min-w-[200px] my-2">
                  <Autocomplete
                    disablePortal={true}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id || option === value
                    }
                    options={couriers}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Courier"
                        multiline={true}
                      />
                    )}
                    disableClearable
                    value={courier}
                    size="small"
                    name="type"
                    onChange={(e, v) => {
                      getDeliveryFee(v);
                      setCourier(v);
                      setCError("");
                    }}
                  />
                </div>
                <Typography style={{ fontSize: "11pt" }}>
                  Delivery Cost: Ksh.{" " + deliveryCost}
                </Typography>
              </div>
            )}
            {section === 2 && (
              <div>
                <Autocomplete
                  disablePortal={true}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  options={payOptions}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Payment Mode" />
                  )}
                  value={mode}
                  size="small"
                  name="type"
                  onChange={(e, v) => {
                    setUpMode(v);
                  }}
                  style={{ margin: "10px 0" }}
                />
                {mode === "MPesa-Till" && (
                  <div>
                    <Typography className="m-0">
                      MPESA: Buy Goods & Services
                    </Typography>
                    <Typography>
                      Till Number: {paymentInfo.tillNumber}
                    </Typography>
                    <Typography>
                      Store Number: {paymentInfo.storeNumber}
                    </Typography>
                    <Typography>Business Name: {paymentInfo.name}</Typography>
                  </div>
                )}
                {mode === "MPesa-Paybill" && (
                  <div>
                    <Typography className="m-0">MPESA: Paybill</Typography>
                    <Typography>
                      Paybill Number: {paymentInfo.paybillNumber}
                    </Typography>
                    <Typography>
                      Account Number: {paymentInfo.accountNumber}
                    </Typography>
                    <Typography>Business Name: {paymentInfo.name}</Typography>
                  </div>
                )}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontWeight: "bold",
                  }}
                >
                  <p style={{ fontWeight: "bold" }}>
                    Ksh.&nbsp;{cartTotal}&nbsp;
                  </p>
                  <p style={{ fontSize: "8pt" }}>{" (Cart Total) "}</p>
                  <p style={{ fontWeight: "bold" }}>
                    &nbsp;+&nbsp;Ksh.&nbsp;{deliveryCost}&nbsp;
                  </p>
                  <p style={{ fontSize: "8pt" }}>(Delivery Cost)</p>
                </div>
                <div style={{ display: "flex" }}>
                  <Typography style={{ fontWeight: "bold" }}>
                    Total&nbsp;
                  </Typography>
                  <Typography style={{ fontWeight: "bold" }}>
                    Ksh.&nbsp;{Number(cartTotal) + Number(deliveryCost)}
                  </Typography>
                </div>
                <div style={{ margin: "10px 0" }}>
                  <Input
                    label="MPESA Code"
                    size="lg"
                    type="text"
                    name="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
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
          !success && (
            <Button
              variant="gradient"
              fullWidth
              onClick={() => handleCheckout()}
            >
              Done
            </Button>
          )
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
