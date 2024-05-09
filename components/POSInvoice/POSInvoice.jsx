import Opulence from "./templates/Opulence";
import Timeless from "./templates/Timeless";

function POSInvoice({ invoice, payOptions, profile }) {
  let template = profile.template;
  return (
    <>
      {template === "Opulence" && (
        <Opulence invoice={invoice} payOptions={payOptions} profile={profile} />
      )}
      {template === "Timeless" && (
        <Timeless invoice={invoice} payOptions={payOptions} profile={profile} />
      )}
    </>
  );
}

export default POSInvoice;
