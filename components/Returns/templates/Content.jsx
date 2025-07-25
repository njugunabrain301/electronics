import { Button, TextField } from "@mui/material";

const ReturnsContent = ({
  returns,
  profile,
  titleFont,
  orderId,
  phone,
  setOrderID,
  setPhone,
  reason,
  setReason,
  error,
  submitting,
  submitReturnRequest,
}) => {
  return (
    <main-content>
      <div className="w-[90%] max-w-[1000px] mx-auto pb-[50px]">
        <h1
          className={
            titleFont.className +
            " text-3xl md:text-5xl text-center pt-[50px] pb-[20px]"
          }
        >
          Returns Policy
        </h1>
        {returns.accept
          ? "We gladly accept returns and offer several options to ensure your satisfaction"
          : "We kindly inform our valued customers that we do not offer returns at this time"}
        {returns.accept && (
          <>
            <ul className="list-disc ml-[40px] mt-[10px] mb-[7px]">
              {returns.replace && <li>We replace returned items promptly.</li>}
              {returns.cashRefund ? (
                returns.repair ? (
                  <li>
                    If replacement or repair is not feasible, we offer refunds
                    to your Mobile Money/M-Pesa account
                  </li>
                ) : (
                  <li>
                    If replacement is not feasible, we offer refunds to your
                    Mobile Money/M-Pesa account
                  </li>
                )
              ) : (
                <></>
              )}

              <li>
                Returns must be initiated within{" "}
                {returns.raiseTimeline.amount +
                  " " +
                  returns.raiseTimeline.unit}{" "}
                of receiving the item
              </li>

              {returns.refundPurchaseShipping ? (
                <li>
                  Shipping costs incurred during the initial purchase process
                  are refundable.
                </li>
              ) : (
                <li>
                  Shipping costs incurred during the initial purchase process
                  are non-refundable.
                </li>
              )}
              {returns.refundReturnhipping ? (
                <li>
                  Shipping costs incurred during the return process are
                  refundable.
                </li>
              ) : (
                <li>
                  Shipping costs incurred during the return process are
                  non-refundable.
                </li>
              )}
            </ul>
            <p>We accept returns only under the following circumstances</p>
            <ol className="mt-[10px] mb-[7px] list-decimal ml-[40px]">
              {returns.eligibility.map((el, idx) => (
                <li key={idx}>
                  {el === "mistake"
                    ? "A mistake is made on the sellers part"
                    : el === "mismatch"
                    ? "The product doesn't look as described in product description"
                    : el === "defective"
                    ? "The product is defective. (Doesn't work as described in product description)"
                    : el === "damaged"
                    ? "The product product arrives at destination damaged"
                    : el}
                </li>
              ))}
            </ol>
            <h3 className="py-3 font-bold">Warranty</h3>
            <p className="pb-4">
              The warranty for any purchased product is as described on the
              product page at the time of purchase. Conditions are specified in
              the warranty document accompanying the item post-purchase.
            </p>
            <p>
              You can contact us on the following number to initiate the process{" "}
              {profile.phone}
            </p>
            <p>
              Or you can fill in and submit the following form and we will
              respond to the issue
            </p>
            <div className="w-fit mx-auto flex flex-col my-[20px] items-center">
              <h2 className="text-3xl text-center">Returns Form</h2>
              <TextField
                label={"Order ID"}
                size="small"
                value={orderId}
                className="w-[340px]"
                style={{ margin: "10px 0" }}
                onChange={(e) => setOrderID(e.target.value)}
              />
              <TextField
                label={"Phone"}
                size="small"
                value={phone}
                className="w-[340px]"
                style={{ margin: "10px 0" }}
                onChange={(e) => setPhone(e.target.value)}
              />
              <TextField
                label={"Reason For Return"}
                multiline
                size="small"
                value={reason}
                className="w-[340px]"
                style={{ margin: "10px 0" }}
                onChange={(e) => setReason(e.target.value)}
              />
              {success ? (
                "Request received. We will reach out to you as soon as possible for further directions"
              ) : (
                <Button variant="contained" onClick={submitReturnRequest}>
                  {submitting ? "Submitting..." : "Submit"}
                </Button>
              )}
              {error && (
                <p
                  style={{ backgroundColor: "indianred", color: "white" }}
                  className="text-center p-2 my-2 rounded-md"
                >
                  {error}
                </p>
              )}
            </div>
            <p>
              Once a complaint is raised, the case will be resolved within{" "}
              {returns.refundTimeline.amount +
                " " +
                returns.refundTimeline.unit}{" "}
              after us receiving the returned item
            </p>
          </>
        )}
      </div>
    </main-content>
  );
};

export default ReturnsContent;
