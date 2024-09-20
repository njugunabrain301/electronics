import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import {
  Autocomplete,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import Link from "next/link";
import {
  AttachMoney,
  CheckCircleOutline,
  LocalShipping,
  Lock,
  Person,
} from "@mui/icons-material";

function CheckoutContent({
  closeModal,
  setOpenCheckout,
  showPrice,
  error,
  counties,
  subCounties,
  couriers,
  deliveryCost,
  deliveryTime,
  section,
  payOptions,
  cartTotal,
  code,
  setCode,
  county,
  setCounty,
  subcounty,
  setSubCounty,
  courier,
  setCourier,
  specifications,
  setSpecification,
  payOnDelivery,
  mode,
  paymentInfo,
  isLoading,
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  setUpMode,
  setUpSubCounties,
  setUpCouriers,
  getDeliveryFee,
  getDeliveryTime,
  c_error,
  setCError,
  success,
  authUser,
  handleCheckout,
  openSection,
  theme,
  sameday,
  setDeliveryDay,
}) {
  return (
    <main-content>
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
              <ul className="flex justify-evenly pb-2flex-wrap">
                <li
                  className="p-2 w-[170px] text-center border-b-2 cursor-pointer flex items-center justify-center"
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
                  <div>
                    <FormControl>
                      <FormLabel id="demo-controlled-radio-buttons-group"></FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={sameday}
                        onChange={(e) => setDeliveryDay(e.target.value)}
                        row={true}
                      >
                        <FormControlLabel
                          value={"sameday"}
                          control={<Radio />}
                          label="Same Day"
                        />
                        <FormControlLabel
                          value={"nextday"}
                          control={<Radio />}
                          label="Next Day"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
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
                          <li
                            {...props}
                            key={option.label}
                            value={option.value}
                          >
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
                  <TextField
                    label="Street/Building/House"
                    type="text"
                    name="specifications"
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
                    value={specifications}
                    onChange={(e) => setSpecification(e.target.value)}
                  />
                  {showPrice && (
                    <Typography style={{ fontSize: "11pt" }}>
                      Delivery Cost: Ksh.
                      {" " +
                        deliveryCost +
                        " " +
                        (payOnDelivery ? " (Pay on delivery)" : "")}
                    </Typography>
                  )}
                  {sameday === "nextday" ? (
                    <Typography style={{ fontSize: "11pt" }}>
                      Arrives tomorrow
                    </Typography>
                  ) : deliveryTime ? (
                    <Typography style={{ fontSize: "11pt" }}>
                      Arrives before
                      {" " + deliveryTime}
                    </Typography>
                  ) : (
                    ""
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
                    <p style={{ fontSize: "8pt" }}>
                      (Cart <span className="hidden md:inline">Total</span>)
                    </p>
                    <p style={{ fontWeight: "bold" }}>
                      &nbsp;+&nbsp;Ksh.&nbsp;{deliveryCost}&nbsp;
                    </p>
                    <p style={{ fontSize: "8pt" }}>
                      (Delivery <span className="hidden md:inline">Cost</span>)
                    </p>
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
                      The order will arrive on or before
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
                openSection(
                  section === 0 && authUser ? section + 2 : section + 1
                )
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
    </main-content>
  );
}

export default CheckoutContent;
