import {
  TextField,
  Typography,
  Button,
  Autocomplete,
  Paper,
  Grid,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import Reviews from "@/components/Reviews/Reviews";
import { Download } from "@mui/icons-material";

function POSInvoiceContent({
  invoice,
  payOptions,
  profile,
  paymentMode,
  setPaymentMode,
  paymentCode,
  setPaymentCode,
  error,
  paid,
  reviewed,
  setReviewed,
  isPaying,
  paymentInfo,
  setPaymentInfo,
  handlePay,
  theme,
  downloadReceipt,
}) {
  return (
    <main-content>
      <div
        className="pt-[100px] pb-[100px] flex justify-center items-center w-[100%]"
        style={{
          backgroundColor: theme.palette.background.primary,
          color: theme.palette.text.base,
        }}
      >
        {paid ? (
          reviewed ? (
            <div className="text-center">
              <p className="text-lg md:text-2xl lg:text-3xl">
                Thank you for shopping with us.{" "}
              </p>
              <div className="flex justify-between w-[100%]">
                <Link
                  className="text-sm md:text-lg"
                  href="/"
                  style={{ color: theme.palette.highlight.main }}
                >
                  Browse More Products
                </Link>

                <div
                  className="text-sm md:text-lg cursor-pointer"
                  style={{ color: theme.palette.highlight.main }}
                  onClick={downloadReceipt}
                >
                  <Download /> Receipt
                </div>
              </div>
            </div>
          ) : (
            <Reviews
              sent={reviewed}
              setSent={setReviewed}
              pos={true}
              invoice={invoice}
              template={profile.template}
            />
          )
        ) : (
          <div
            className="p-[10px] w-[95%] max-w-[1500px]"
            style={{
              boxShadow: "0 0 2px grey",
              borderRadius: "5px",
              textAlign: "center",
            }}
          >
            <Typography variant="h5">Pay Invoice</Typography>
            <div className="py-2"></div>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <div className="max-h-[400px]" style={{ overflowY: "auto" }}>
                  {invoice.items.map((product, idx) => (
                    <Grid
                      key={idx + "-" + product._id}
                      container
                      spacing={2}
                      style={{
                        backgroundColor: theme.palette.panel.main,
                        margin: "7px 0",
                        width: "100%",
                        borderRadius: "7px",
                        padding: "10px",
                      }}
                    >
                      <Grid item xs={4}>
                        <Image
                          src={product.img}
                          style={{ width: "100%" }}
                          alt={"Invoice item image"}
                          width={200}
                          height={200}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={8}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <div style={{ fontSize: "12pt" }} className="text-left">
                          <p className="font-bold text-sm sm:text-md lg:text-lg">
                            {product.name}
                          </p>
                          <div className="flex flex-wrap items-center">
                            {product.size && product.size !== "-" && (
                              <div
                                style={{
                                  borderRadius: "3px",
                                  margin: "3px",
                                  padding: "3px",
                                  cursor: "pointer",
                                }}
                              >
                                {product.size}
                              </div>
                            )}

                            {/* Colors */}

                            {product.color && product.color !== "-" && (
                              <div
                                style={{
                                  borderRadius: "50%",
                                  backgroundColor: product.color,
                                  width: "20px",
                                  height: "20px",
                                  margin: "0 4px",
                                  cursor: "pointer",
                                }}
                              ></div>
                            )}

                            {/* Price Option */}
                            {product.selectedOption &&
                              product.selectedOption !== "-" && (
                                <div
                                  style={{
                                    borderRadius: "3px",
                                    margin: "3px",
                                    padding: "3px",
                                    cursor: "pointer",
                                  }}
                                >
                                  {product.selectedOption}
                                </div>
                              )}
                          </div>
                        </div>

                        <div className="flex justify-between">
                          <Typography>
                            {"Ksh. " + product.price + " x " + product.amount}
                          </Typography>
                          <Typography>
                            {"Ksh. " + product.price * product.amount}
                          </Typography>
                        </div>
                      </Grid>
                    </Grid>
                  ))}
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
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
                    options={payOptions.map((opt) => opt.type)}
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
                    value={paymentMode}
                    size="small"
                    name="type"
                    onChange={(e, v) => {
                      payOptions.map((opt) => {
                        if (v === opt.type) {
                          setPaymentInfo(opt);
                          setPaymentMode(v);
                        }
                      });
                    }}
                    style={{ margin: "10px 0" }}
                  />

                  {paymentMode === "MPesa-Till" && (
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

                  {paymentMode === "MPesa-Paybill" && (
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

                  <div style={{ display: "flex" }}>
                    <Typography style={{ fontWeight: "bold" }}>
                      Total&nbsp;
                    </Typography>
                    <Typography style={{ fontWeight: "bold" }}>
                      Ksh.&nbsp;{invoice.total}
                    </Typography>
                  </div>

                  {paymentMode.toLowerCase() !== "lipa na mpesa" && (
                    <div style={{ margin: "10px 0" }}>
                      <TextField
                        label="Payment Code"
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
                        value={paymentCode}
                        onChange={(e) => setPaymentCode(e.target.value)}
                      />
                    </div>
                  )}
                </div>

                <div className="py-2"></div>
                <div className="m-[10px] w-[300px] mx-auto">
                  <Button
                    color={"primary"}
                    variant="contained"
                    fullWidth
                    onClick={handlePay}
                    className="mt-5 w-fit mx-auto"
                  >
                    {isPaying ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </Grid>
            </Grid>

            <div className="py-2"></div>

            <div style={{ textAlign: "center" }}>
              {error && (
                <Typography
                  fontWeight="light"
                  style={{
                    padding: "7px 10px",
                    margin: "10px 0",
                    width: "100%",
                    color: "white",
                    backgroundColor: "indianred",
                    borderRadius: "4px",
                  }}
                  className="bg-skin-alert-danger"
                >
                  {error}
                </Typography>
              )}
            </div>
          </div>
        )}
      </div>
    </main-content>
  );
}

export default POSInvoiceContent;
