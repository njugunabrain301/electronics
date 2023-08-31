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
import { Autocomplete, Chip, Paper, TextField } from "@mui/material";
import { useGlobalContext } from "@/Context/context";
import { checkout } from "@/utils/frontendAPIs/cart";
import Link from "next/link";
import { Themes } from "@/utils/Themes/Themes";
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
  selectedTheme,
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

  const theme = Themes[selectedTheme];

  useEffect(() => {
    colorAutocomplete();
  });

  return (
    <Card className="w-85 max-w-[90%] min-w-[330px] bg-skin-primary text-skin-base">
      <CardHeader
        variant="gradient"
        className="bg-skin-card mb-0 grid h-28 place-items-center"
      >
        <Typography variant="h3" className="text-skin-inverted">
          {showPrice ? "Check Out" : "Get Quote"}
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col">
        {success ? (
          <div className="text-center">
            <Typography variant="h3" className="text-skin-base">
              Your Order has been received
            </Typography>
            <Typography className="text-skin-base">
              Thank you for shopping with us. <br />
            </Typography>
            <Typography className="text-skin-base">
              {!showPrice &&
                "We will get back to you as soon as possible with the cost of the goods ordered in order to proceed. "}
              You can track the progress in the{" "}
              <Link
                href="/orders"
                className="text-skin-highlight hover:text-skin-highlight-hover"
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
                className={
                  section === 1
                    ? "p-2 w-[190px] text-center text-skin-highlight border-skin-highlight border-b-2"
                    : "p-2 w-[190px] text-center text-skin-base border-skin-base border-b-2"
                }
                style={{
                  transition: ".5s",
                }}
                onClick={() => openSection(1)}
              >
                Delivery Details
              </li>
              {showPrice && (
                <li
                  className={
                    section === 2
                      ? "p-2 w-[190px] text-center text-skin-highlight border-skin-highlight border-b-2"
                      : "p-2 w-[190px] text-center text-skin-base border-skin-base border-b-2"
                  }
                  onClick={() => openSection(2)}
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
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    className="autocomplete"
                    color={theme["text-base"]}
                    options={counties}
                    PaperComponent={({ children }) => (
                      <Paper className="bg-skin-primary text-skin-base">
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
                    renderTags={(tagValue, getTagProps) => {
                      return tagValue.map((option, index) => (
                        <Chip
                          {...getTagProps({ index })}
                          key={option}
                          label={option}
                        />
                      ));
                    }}
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
                    className="autocomplete"
                    color={theme["text-base"]}
                    options={subCounties}
                    PaperComponent={({ children }) => (
                      <Paper className="bg-skin-primary text-skin-base">
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
                    renderTags={(tagValue, getTagProps) => {
                      return tagValue.map((option, index) => (
                        <Chip
                          {...getTagProps({ index })}
                          key={option}
                          label={option}
                        />
                      ));
                    }}
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
                    className="autocomplete"
                    color={theme["text-base"]}
                    PaperComponent={({ children }) => (
                      <Paper className="bg-skin-primary text-skin-base">
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
                    renderTags={(tagValue, getTagProps) => {
                      return tagValue.map((option, index) => (
                        <Chip
                          {...getTagProps({ index })}
                          key={option.id}
                          label={option.label}
                        />
                      ));
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Select Courier" />
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
                  <Typography
                    style={{ fontSize: "11pt" }}
                    className="text-skin-base"
                  >
                    Delivery Cost: Ksh.{" " + deliveryCost}
                  </Typography>
                )}
              </div>
            )}
            {section === 2 && (
              <div>
                <Autocomplete
                  disablePortal={true}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  className="autocomplete"
                  color={theme["text-base"]}
                  PaperComponent={({ children }) => (
                    <Paper className="bg-skin-primary text-skin-base">
                      {children}
                    </Paper>
                  )}
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
                    <Typography className="m-0 text-skin-base">
                      MPESA: Buy Goods & Services
                    </Typography>
                    <Typography className="text-skin-base">
                      Till Number: {paymentInfo.tillNumber}
                    </Typography>
                    <Typography className="text-skin-base">
                      Store Number: {paymentInfo.storeNumber}
                    </Typography>
                    <Typography className="text-skin-base">
                      Business Name: {paymentInfo.name}
                    </Typography>
                  </div>
                )}
                {mode === "MPesa-Paybill" && (
                  <div>
                    <Typography className="m-0 text-skin-base">
                      MPESA: Paybill
                    </Typography>
                    <Typography className="text-skin-base">
                      Paybill Number: {paymentInfo.paybillNumber}
                    </Typography>
                    <Typography className="text-skin-base">
                      Account Number: {paymentInfo.accountNumber}
                    </Typography>
                    <Typography className="text-skin-base">
                      Business Name: {paymentInfo.name}
                    </Typography>
                  </div>
                )}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontWeight: "bold",
                  }}
                  className="text-skin-base"
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
                  <Typography
                    style={{ fontWeight: "bold" }}
                    className="text-skin-base"
                  >
                    Total&nbsp;
                  </Typography>
                  <Typography
                    style={{ fontWeight: "bold" }}
                    className="text-skin-base"
                  >
                    Ksh.&nbsp;{Number(cartTotal) + Number(deliveryCost)}
                  </Typography>
                </div>
                <div style={{ margin: "10px 0" }}>
                  <Input
                    label="MPESA Code"
                    size="lg"
                    type="text"
                    name="code"
                    className="text-skin-base"
                    color={theme["text-highlight"]}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="">
              {error && (
                <Alert className="flex align-items-center justify-center bg-skin-alert-danger">
                  <p className="font-medium flex items-center text-center tracking-normal leading-none">
                    {error}
                  </p>
                </Alert>
              )}
              {c_error && (
                <Alert className="flex align-items-center justify-center bg-skin-alert-danger">
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
            variant="gradient"
            fullWidth
            onClick={() => openSection(2)}
            color={theme["button-base"]}
          >
            Proceed
          </Button>
        ) : (
          !success && (
            <Button
              variant="gradient"
              fullWidth
              onClick={() => handleCheckout()}
              color={theme["button-base"]}
            >
              {isLoading ? "Submitting.." : "Done"}
            </Button>
          )
        )}
        {/* <Typography
          variant="small"
          className="mt-6 flex justify-center"
        ></Typography> */}
        <div className="divider flex justify-between">
          <Typography className="mt-4 text-center font-normal text-skin-base">
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
