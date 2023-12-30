import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Alert,
} from "@material-tailwind/react";
import { Autocomplete, Button, Paper, TextField } from "@mui/material";
import { useGlobalContext } from "@/Context/context";
import { checkout } from "@/utils/frontendAPIs/cart";
import Link from "next/link";

const colorAutocomplete = () => {
  let elems = document.getElementsByClassName("autocomplete");
  for (var i = 0; i < elems.length; i++) {
    const attributeNodeArray = [...elems[0].attributes];
    const attrs = attributeNodeArray.reduce((attrs, attribute) => {
      attrs[attribute.name] = attribute.value;
      return attrs;
    }, {});
    let elem = elems[i];
    let children = [elem];
    let queue = [elem];
    while (queue.length > 0) {
      let curr = queue.pop();
      if (curr.childNodes.length > 0) {
        children = [...children, ...curr.childNodes];
        queue = [...queue, ...curr.childNodes];
      }
    }
    for (var j = 0; j < children.length; j++) {
      if (attrs.color) {
        if (children[j].style) {
          children[j].style.color = attrs.color;
          children[j].style.borderColor = attrs.color;
        }
      }
    }
  }
};

function Checkout({
  closeModal,
  setOpenCheckout,
  totalPrice,
  checkoutInfo,
  showPrice,
}) {
  let [error, setError] = useState("");
  const [section, setSection] = useState(1);
  let counties = checkoutInfo.counties;
  let [subCounties, setSubCounties] = useState([]);
  let [couriers, setCouriers] = useState([]);
  let [deliveryCost, setDeliveryCost] = useState(0);
  let user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {};
  let deliveryLocations = checkoutInfo.deliveryLocations;
  let paymentOptions = checkoutInfo.paymentOptions;
  const [payOptions, setPayOptions] = useState([]);
  const cartTotal = totalPrice;

  const [code, setCode] = useState("");
  const [county, setCounty] = useState(user.county || "");
  const [subcounty, setSubCounty] = useState(user.subcounty || "");
  const [courier, setCourier] = useState(user.courier || "");
  const [mode, setMode] = useState("");
  const [paymentInfo, setPaymentInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
  let { setCart } = useGlobalContext();
  const [c_error, setCError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleCheckout = async () => {
    if (isLoading) return;
    if (county === "" || subcounty === "" || courier === "") {
      setCError("Fill in all delivery details");
      return;
    }
    if (showPrice && (code === "" || mode === "")) {
      setCError("Please provide the payment code");
      return;
    }
    setIsLoading(true);
    let dataLayer = window.dataLayer || [];
    let event = {
      event: "purchase",
      totalPrice: Number(cartTotal),
    };
    dataLayer.push(event);
    let res = await checkout({
      code,
      courier: courier.id,
      mode,
      total: Number(cartTotal) + Number(deliveryCost),
    });
    if (res.success) {
      setSuccess(true);
      setCart(res.data);
    }
    setIsLoading(false);
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

  const { theme } = useGlobalContext();

  useEffect(() => {
    colorAutocomplete();
  });

  return (
    <Card
      className="w-85 max-w-[90%] min-w-[330px]"
      style={{
        backgroundColor: theme.palette.background.primary,
        color: theme.palette.text.base,
      }}
    >
      <CardHeader
        variant="gradient"
        className="mb-0 grid h-28 place-items-center"
        style={{
          backgroundColor: theme.palette.card.main,
          color: theme.palette.text.inverted,
        }}
      >
        <Typography variant="h3">
          {showPrice ? "Check Out" : "Get Quote"}
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col">
        {success ? (
          <div
            className="text-center"
            style={{
              color: theme.palette.text.base,
            }}
          >
            <Typography variant="h3">Your Order has been received</Typography>
            <Typography>
              Thank you for shopping with us. <br />
            </Typography>
            <Typography>
              {!showPrice &&
                "We will get back to you as soon as possible with the cost of the goods ordered in order to proceed. "}
              You can track the progress in the{" "}
              <Link
                href="/orders"
                className="hover:underline"
                style={{ color: theme.palette.highlight.main }}
                onClick={() => closeModal()}
              >
                orders
              </Link>{" "}
              section
            </Typography>
          </div>
        ) : (
          <div>
            <ul className="flex justify-evenly pb-2">
              <li
                className="p-2 w-[190px] text-center border-b-2 cursor-pointer"
                style={{
                  transition: ".5s",
                  color:
                    section === 1
                      ? theme.palette.highlight.main
                      : theme.palette.text.base,
                  borderColor:
                    section === 1
                      ? theme.palette.highlight.main
                      : theme.palette.text.base,
                }}
                onClick={() => openSection(1)}
              >
                Delivery Details
              </li>
              {showPrice && (
                <li
                  className="p-2 w-[190px] text-center border-b-2 cursor-pointer"
                  onClick={() => openSection(2)}
                  style={{
                    transition: ".5s",
                    color:
                      section === 2
                        ? theme.palette.highlight.main
                        : theme.palette.text.base,
                    borderColor:
                      section === 2
                        ? theme.palette.highlight.main
                        : theme.palette.text.base,
                  }}
                >
                  Payment Section
                </li>
              )}
            </ul>
            {section === 1 && (
              <div>
                <div className="relative min-w-[200px] my-2">
                  <Autocomplete
                    disablePortal={true}
                    isOptionEqualToValue={(option, value) => option === value}
                    className="autocomplete"
                    color={"input"}
                    options={counties}
                    PaperComponent={({ children }) => (
                      <Paper
                        sx={{
                          color: theme.palette.text.base,
                          backgroundColor: theme.palette.pane.main,
                        }}
                      >
                        {children}
                      </Paper>
                    )}
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={option}>
                          {option}
                        </li>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select County"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: theme.palette.input.border,
                            },
                            "&:hover fieldset": {
                              borderColor: theme.palette.input.light,
                            },
                          },
                          input: { color: theme.palette.text.base },
                        }}
                        InputLabelProps={{
                          sx: { color: theme.palette.text.alt },
                        }}
                      />
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
                    isOptionEqualToValue={(option, value) => option === value}
                    className="autocomplete"
                    color={"input"}
                    options={subCounties}
                    PaperComponent={({ children }) => (
                      <Paper
                        sx={{
                          color: theme.palette.text.base,
                          backgroundColor: theme.palette.pane.main,
                        }}
                      >
                        {children}
                      </Paper>
                    )}
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={option}>
                          {option}
                        </li>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Sub-County"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: theme.palette.input.border,
                            },
                            "&:hover fieldset": {
                              borderColor: theme.palette.input.light,
                            },
                          },
                          input: { color: theme.palette.text.base },
                        }}
                        InputLabelProps={{
                          sx: { color: theme.palette.text.alt },
                        }}
                      />
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
                    className="autocomplete"
                    color={"input"}
                    PaperComponent={({ children }) => (
                      <Paper
                        sx={{
                          color: theme.palette.text.base,
                          backgroundColor: theme.palette.pane.main,
                        }}
                      >
                        {children}
                      </Paper>
                    )}
                    options={couriers}
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={option.id}>
                          {option.label}
                        </li>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Courier"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: theme.palette.input.border,
                            },
                            "&:hover fieldset": {
                              borderColor: theme.palette.input.light,
                            },
                          },
                          input: { color: theme.palette.text.base },
                        }}
                        InputLabelProps={{
                          sx: { color: theme.palette.text.alt },
                        }}
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
                {showPrice && (
                  <Typography style={{ fontSize: "11pt" }}>
                    Delivery Cost: Ksh.{" " + deliveryCost}
                  </Typography>
                )}
              </div>
            )}
            {section === 2 && (
              <div>
                <Autocomplete
                  disablePortal={true}
                  isOptionEqualToValue={(option, value) => option === value}
                  className="autocomplete"
                  color={"input"}
                  PaperComponent={({ children }) => (
                    <Paper
                      sx={{
                        color: theme.palette.text.base,
                        backgroundColor: theme.palette.pane.main,
                      }}
                    >
                      {children}
                    </Paper>
                  )}
                  options={payOptions}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Payment Mode"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: theme.palette.input.border,
                          },
                          "&:hover fieldset": {
                            borderColor: theme.palette.input.light,
                          },
                        },
                        input: { color: theme.palette.text.base },
                      }}
                      InputLabelProps={{
                        sx: { color: theme.palette.text.alt },
                      }}
                    />
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
                  <TextField
                    label="MPESA Code"
                    type="text"
                    name="code"
                    size="small"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: theme.palette.input.border,
                        },
                        "&:hover fieldset": {
                          borderColor: theme.palette.input.light,
                        },
                      },
                      input: { color: theme.palette.text.base },
                    }}
                    InputLabelProps={{ sx: { color: theme.palette.text.alt } }}
                    color={"input"}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="">
              {error && (
                <Alert
                  className="flex align-items-center justify-center"
                  style={{
                    backgroundColor: theme.palette.error.main,
                    color: theme.palette.error.contrastText,
                  }}
                >
                  <p className="font-medium flex items-center text-center tracking-normal leading-none">
                    {error}
                  </p>
                </Alert>
              )}
              {c_error && (
                <Alert
                  className="flex align-items-center justify-center"
                  style={{
                    backgroundColor: theme.palette.error.main,
                    color: theme.palette.error.contrastText,
                  }}
                >
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
        {section === 1 && showPrice ? (
          <Button
            variant="contained"
            fullWidth
            onClick={() => openSection(2)}
            color={"primary"}
          >
            Proceed
          </Button>
        ) : (
          !success && (
            <Button
              color={"primary"}
              variant="contained"
              fullWidth
              onClick={() => handleCheckout()}
            >
              {isLoading
                ? "Submitting.."
                : showPrice
                ? "Complete Order"
                : "Request Quote"}
            </Button>
          )
        )}

        <div className="divider flex justify-between">
          <Typography className="mt-4 text-center font-normal">
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
