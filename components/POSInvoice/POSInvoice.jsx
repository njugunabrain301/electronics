import Timeless from "./templates/Timeless";

function POSInvoice({ invoice, payOptions, profile }) {
  return (
    <>
      <Timeless invoice={invoice} payOptions={payOptions} profile={profile} />
    </>
  );
}

export default POSInvoice;
