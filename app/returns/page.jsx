import Returns from "@/components/Returns/returns";
import { fetchBusinessProfile } from "@/utils/backendAPIs/app";
import { fetchReturnsPolicy } from "@/utils/backendAPIs/policies";

export const runtime = "edge";
const dynamic = "force-dynamic";

export default async function page() {
  let returns = await fetchReturnsPolicy();
  let profile = await fetchBusinessProfile();

  return (
    <>
      <Returns profile={profile.data} returns={returns.data} />
    </>
  );
}
