import POSInvoice from "@/components/POSInvoice/POSInvoice";
import { fetchBusinessProfile, fetchPOSInvoice } from "@/utils/backendAPIs/app";

export const runtime = "edge";
const dynamic = "force-dynamic";

async function page({ params }) {
  let iid = params.iid;
  let res = await fetchPOSInvoice(iid);
  let invoice = res.data.invoice;
  let payOptions = res.data.payOptions;

  res = await fetchBusinessProfile();
  let profile = res.data;
  return (
    <div>
      <POSInvoice invoice={invoice} payOptions={payOptions} profile={profile} />
    </div>
  );
}

export default page;
