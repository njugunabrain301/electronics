import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Alert,
} from "@material-tailwind/react";
import { Autocomplete, Button, Paper, Switch, TextField } from "@mui/material";
import { useGlobalContext } from "@/Context/context";
import { anonymousCheckout, checkout } from "@/utils/frontendAPIs/cart";
import Link from "next/link";
import {
  AttachMoney,
  CheckCircleOutline,
  LocalShipping,
  Lock,
  Person,
} from "@mui/icons-material";

function Checkout({
  closeModal,
  setOpenCheckout,
  totalPrice,
  checkoutInfo,
  showPrice,
}) {
  let [error, setError] = useState("");

  let counties = checkoutInfo.counties;
  let [subCounties, setSubCounties] = useState([]);
  let [couriers, setCouriers] = useState([]);
  let [deliveryCost, setDeliveryCost] = useState(0);
  let [deliveryTime, setDeliveryTime] = useState("");
  let user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {};
  const [section, setSection] = useState(0);
  let deliveryLocations = checkoutInfo.deliveryLocations;
  let paymentOptions = checkoutInfo.paymentOptions;
  const [payOptions, setPayOptions] = useState([]);
  const cartTotal = totalPrice;

  const [code, setCode] = useState("");
  const [county, setCounty] = useState(user.county || "");
  const [subcounty, setSubCounty] = useState(user.subcounty || "");
  const [courier, setCourier] = useState(user.courier || "");
  const [payOnDelivery, setPayOnDelivery] = useState(false);
  const [mode, setMode] = useState("");
  const [paymentInfo, setPaymentInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(user.name ? user.name : "");
  const [email, setEmail] = useState(user.email ? user.email : "");
  const [phone, setPhone] = useState(user.phone ? user.phone : "");

  const setUpMode = (mode) => {
    setMode(mode);
    if (mode === "Payment on delivery") {
      setPaymentInfo({ type: mode });
    } else
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
      if (payOnDelivery) opt.push("Payment on delivery");
      paymentOptions.map((op) => {
        opt.push(op.type);
        return op;
      });

      setPayOptions(opt);
    }
  }, [paymentOptions, mode]);

  const setUpSubCounties = (county) => {
    setPayOnDelivery(false);
    county = county.replaceAll("*", "");
    if (county && county !== "") {
      let subs = [];
      deliveryLocations.map((loc) => {
        if (loc.county.replaceAll("*", "") === county) {
          subs.push(loc.subcounty + "" + (loc.payOnDelivery ? "*" : ""));
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
    setPayOnDelivery(false);
    let mcounty = county.replaceAll("*", "");
    subcounty = subcounty.replaceAll("*", "");
    if (mcounty !== "" && subcounty !== "") {
      let couriers = [];
      deliveryLocations.map((loc) => {
        if (
          loc.county.replaceAll("*", "") === mcounty &&
          loc.subcounty.replaceAll("*", "") === subcounty
        ) {
          couriers.push({
            label:
              loc.courier +
              " - " +
              loc.description +
              " " +
              (loc.payOnDelivery ? "(Pay on delivery)" : ""),
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
      let payOnDelivery = false;
      deliveryLocations.map((loc) => {
        if (loc._id === v.id) {
          fee = loc.price;
          payOnDelivery = loc.payOnDelivery;
        }
        return loc;
      });
      if (payOnDelivery) {
        setPayOnDelivery(true);
        setUpMode("Payment on delivery");
        setPayOptions(["Payment on delivery", ...payOptions]);
      } else {
        setPayOnDelivery(false);
        setPayOptions(payOptions.filter((p) => p !== "Payment on delivery"));
      }
      setDeliveryCost(fee);
    } else {
      setDeliveryCost(0);
    }
  };

  // console.log(checkoutInfo.shipping);
  const getDeliveryTime = (v) => {
    if (county !== "" && subcounty !== "" && v) {
      let time = "";
      deliveryLocations.map((loc) => {
        if (loc._id === v.id) {
          time = loc.time;
        }
        return loc;
      });

      let currTime = new Date();
      let cuttOff = timeToDate(checkoutInfo.shipping.cutoffTime);

      let arrivalTime = new Date();
      if (isBefore(currTime, cuttOff)) {
        //add transit time to handling time
        let handlingTime = 0;
        let unit = "hours";
        let amount = 0;
        //get handling time and
        if (checkoutInfo.shipping.handlingType === "constant") {
          unit = checkoutInfo.shipping.handlingTime.unit;
          amount = checkoutInfo.shipping.handlingTime.amount;
        } else {
          unit = "hours";
          amount = 1;
          cart.map((itm) => {
            if (
              itm.handlingTime &&
              itm.handlingTime.unit.toLowerCase() === "weeks" &&
              (unit === "days" || unit === "hours")
            ) {
              unit = "weeks";
              amount = itm.handlingTime.amount;
            } else if (
              itm.handlingTime &&
              itm.handlingTime.unit.toLowerCase() === "days" &&
              unit === "hours"
            ) {
              unit = "days";
              amount = itm.handlingTime.amount;
            } else if (
              itm.handlingTime &&
              itm.handlingTime.unit.toLowerCase() === unit
            ) {
              amount =
                itm.handlingTime.amount > amount
                  ? itm.handlingTime.amount
                  : amount;
            } else if (itm.handlingTime) {
              unit = itm.handlingTime.unit.toLowerCase();
              amount = itm.handlingTime.amount;
            }
          });
        }

        if (unit.toLowerCase() === "weeks") handlingTime = amount * 7 * 24;
        else if (unit.toLowerCase() === "days") handlingTime = amount * 24;
        else if (unit.toLowerCase() === "hours") handlingTime = amount;
        time += handlingTime;
        time = time * 60;
        arrivalTime.setMinutes(arrivalTime.getMinutes() + time);
      } else {
        time += 24;
        arrivalTime = timeToDate(checkoutInfo.shipping.earliestShipTime);

        time = time * 60;
        arrivalTime.setMinutes(arrivalTime.getMinutes() + time);
      }
      let days = dateDiffDays(arrivalTime, new Date());
      arrivalTime.get;
      setDeliveryTime(
        arrivalTime.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }) +
          " " +
          (days === 0
            ? "today"
            : days === 1
            ? "tomorrow"
            : "on " + arrivalTime.toDateString())
      );
    } else {
      setDeliveryTime("");
    }
  };
  let { setCart, cart } = useGlobalContext();
  const [c_error, setCError] = useState("");
  const [success, setSuccess] = useState(false);
  let authUser = localStorage.getItem("user") ? true : false;

  const handleCheckout = async () => {
    if (isLoading) return;
    if (county === "" || subcounty === "" || courier === "") {
      setCError("Fill in all delivery details");
      return;
    }
    if (showPrice && mode === "") {
      setCError("Please select a payment mode");
      return;
    }
    if (showPrice && mode !== "Payment on delivery" && code === "") {
      setCError("Please provide a payment code");
      return;
    }

    setIsLoading(true);
    let dataLayer = window.dataLayer || [];
    let event = {
      event: "purchase",
      totalPrice: Number(cartTotal),
    };
    dataLayer.push(event);
    let res = {};
    if (authUser) {
      res = await checkout({
        code,
        courier: courier.id,
        mode,
        total: Number(cartTotal) + Number(deliveryCost),
      });
    } else {
      res = await anonymousCheckout({
        name,
        phone,
        email,
        cart,
        code,
        courier: courier.id,
        mode,
        total: Number(cartTotal) + Number(deliveryCost),
      });
    }
    if (res.success) {
      setSuccess(true);
      setCart(res.data);
    }

    setIsLoading(false);
  };

  const openSection = (sec) => {
    // console.log(sec, "to be opened");
    setCError("");
    if (sec === 2) {
      if (name === "" || email === "" || phone === "") {
        setCError("Fill in all profile information");
        return;
      }
      if (!/(^\d{10}$)|(^\+\d{12}$)/.test(phone)) {
        setCError("Invalid Phone Number. Use 0712345678 or +254712345678");
        return;
      }
      if (
        !/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(email)
      ) {
        setCError("Invalid Email");
        return;
      }
      setSection(sec);
    } else if (sec === 1) {
      if (county === "" || subcounty === "" || courier === "") {
        setCError("Please select a delivery solution");
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
    if (authUser) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
    } else {
      setName("");
      setEmail("");
      setPhone("");
    }
  }, [authUser]);

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
              section{" "}
              {!authUser &&
                " after you log in. You can use the same phone number and email to log in and track your order"}
            </Typography>
          </div>
        ) : (
          <div>
            <ul className="flex justify-evenly pb-2">
              <li
                className="p-2 w-[190px] text-center border-b-2 cursor-pointer flex items-center justify-center"
                style={{
                  transition: ".5s",
                  color:
                    section === 0
                      ? theme.palette.highlight.main
                      : theme.palette.text.base,
                  borderColor:
                    section === 0
                      ? theme.palette.highlight.main
                      : theme.palette.text.base,
                }}
                onClick={() => openSection(0)}
              >
                <LocalShipping />
                &nbsp;Delivery
              </li>
              <li
                className="p-2 w-[190px] text-center border-b-2 cursor-pointer flex items-center justify-center"
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
                <Person />
                &nbsp;Profile
              </li>
              {showPrice && (
                <li
                  className="p-2 w-[190px] text-center border-b-2 cursor-pointer flex items-center justify-center"
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
                  <AttachMoney />
                  &nbsp;Payment
                </li>
              )}
            </ul>
            {section === 1 && (
              <div>
                <div className="relative min-w-[200px] my-2">
                  <TextField
                    size="small"
                    className="w-full"
                    label="Full name"
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="relative min-w-[200px] my-2">
                  <TextField
                    size="small"
                    className="w-full"
                    label="Phone"
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
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="relative min-w-[200px] my-2">
                  <TextField
                    size="small"
                    className="w-full"
                    label="Email"
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Typography
                  style={{
                    fontSize: "11pt",
                    fontStyle: "italic",
                    display: "flex",
                  }}
                >
                  <CheckCircleOutline
                    style={{
                      fontSize: "13pt",
                      marginTop: "2px",
                      marginRight: "2px",
                    }}
                  />{" "}
                  You can delete your account easily at any time
                </Typography>
                <Typography
                  style={{
                    fontSize: "11pt",
                    fontStyle: "italic",
                    display: "flex",
                  }}
                >
                  <Lock style={{ fontSize: "14pt", marginRight: "2px" }} />{" "}
                  <span>
                    We handle your provided information responsibly and
                    securely.{" "}
                    <Link
                      href={"/privacypolicy.html"}
                      target="_blank"
                      className="underline"
                    >
                      Privacy Policy
                    </Link>
                  </span>
                  {/* <>Create Account{" "}
                  <Switch
                    checked={createAcct}
                    onChange={(e, v) => setCreate(e.target.checked)}
                  /></> */}
                </Typography>
              </div>
            )}
            {section === 0 && (
              <div>
                <div className="relative min-w-[200px] my-2">
                  <Autocomplete
                    disablePortal={true}
                    isOptionEqualToValue={(option, value) =>
                      option.value === value
                    }
                    className="autocomplete"
                    color={"input"}
                    options={counties.map((c, idx) => {
                      return {
                        label: c.replaceAll("*", " (Pay on delivery)"),
                        value: c,
                      };
                    })}
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
                    getOptionLabel={(option) => option.label}
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={option.label} value={option.value}>
                          {option.label}
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
                    value={{
                      label: county.replaceAll("*", " (Pay on delivery)"),
                      value: county,
                    }}
                    size="small"
                    name="type"
                    onChange={(e, v) => {
                      setUpSubCounties(v.value.replaceAll("*", ""));
                      setCounty(v.value.replaceAll("*", ""));
                    }}
                  />
                </div>
                <div className="relative min-w-[200px] my-2">
                  <Autocomplete
                    disablePortal={true}
                    isOptionEqualToValue={(option, value) =>
                      option.value === value
                    }
                    className="autocomplete"
                    color={"input"}
                    options={subCounties.map((c) => {
                      return {
                        label: c.replaceAll("*", " (Pay on delivery)"),
                        value: c,
                      };
                    })}
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
                        <li {...props} key={option.label}>
                          {option.label}
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
                    value={{
                      label: subcounty.replaceAll("*", " (Pay on delivery)"),
                      value: subcounty,
                    }}
                    size="small"
                    name="type"
                    onChange={(e, v) => {
                      setUpCouriers(v.value.replaceAll("*", ""));
                      setSubCounty(v.value.replaceAll("*", ""));
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
                      getDeliveryTime(v);
                      setCourier(v);
                      setCError("");
                    }}
                  />
                </div>
                {showPrice && (
                  <Typography style={{ fontSize: "11pt" }}>
                    Delivery Cost: Ksh.
                    {" " +
                      deliveryCost +
                      " " +
                      (payOnDelivery ? " (Pay on delivery)" : "")}
                  </Typography>
                )}
                {deliveryTime && (
                  <Typography style={{ fontSize: "11pt" }}>
                    Arrives before
                    {" " + deliveryTime}
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
                {mode === "Payment on delivery" && (
                  <div>
                    <Typography className="m-0">
                      The payment details will be provided on delivery
                    </Typography>
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
                {deliveryTime && (
                  <Typography style={{ fontSize: "11pt", marginTop: "10px" }}>
                    Expect the order to arrive on or before
                    {" " + deliveryTime}
                  </Typography>
                )}
                {mode !== "Payment on delivery" && (
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
                      InputLabelProps={{
                        sx: { color: theme.palette.text.alt },
                      }}
                      color={"input"}
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </div>
                )}
              </div>
            )}

            <div className="">
              {error && (
                <div
                  className="flex align-items-center justify-center rounded-lg p-[10px]"
                  style={{
                    backgroundColor: "indianred", //theme.palette.error.main,
                    color: theme.palette.error.contrastText,
                  }}
                >
                  <p className="font-medium flex items-center text-center tracking-normal leading-none">
                    {error}
                  </p>
                </div>
              )}
              {c_error && (
                <div
                  className="flex align-items-center justify-center rounded-lg p-[10px]"
                  style={{
                    backgroundColor: "indianred", //theme.palette.error.main,
                    color: theme.palette.error.contrastText,
                  }}
                >
                  <p className="font-medium flex items-center text-center tracking-normal leading-none">
                    {c_error}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </CardBody>
      <CardFooter className="pt-0">
        {section <= 1 && showPrice ? (
          <Button
            variant="contained"
            fullWidth
            onClick={() =>
              openSection(section === 0 && authUser ? section + 2 : section + 1)
            }
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

const timeToDate = (time) => {
  // Get the current date
  let date = new Date();

  // Parse the time string
  let [hours, minutes] = time.split(":").map(Number);

  // Set the hours and minutes of the date object
  date.setHours(hours, minutes, 0, 0);

  return date;
};

// Returns true if date1 is before date2
const isBefore = (date1, date2) => {
  if (date1.getHours() > date2.getHours()) {
    // console.log("Current time is later than the target time.");
    return false;
  } else if (date1.getHours() < date2.getHours()) {
    // console.log("Current time is earlier than the target time.");
    return true;
  } else {
    if (date1.getMinutes() > date2.getMinutes()) {
      // console.log("Current time is later than the target time.");
      return false;
    } else if (date1.getMinutes() < date2.getMinutes()) {
      // console.log("Current time is earlier than the target time.");
      return true;
    } else {
      // console.log("Current time is the same as the target time.");
      return true;
    }
  }
};

const dateDiffDays = (date1, date2) => {
  // Calculate the difference in milliseconds
  if (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  )
    return date1.getDate() - date2.getDate();
  return 10;
};
