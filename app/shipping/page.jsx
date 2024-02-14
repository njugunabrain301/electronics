import Shipping from "@/components/Shipping/shipping";
import { fetchBusinessProfile } from "@/utils/backendAPIs/app";
import { fetchShippingPolicy } from "@/utils/backendAPIs/policies";

export const runtime = "edge";
const dynamic = "force-dynamic";

export default async function page() {
  let shipping = await fetchShippingPolicy();
  let profile = await fetchBusinessProfile();

  return (
    <>
      <Shipping
        profile={profile.data}
        shipping={shipping.data.shippingPolicy}
        deliveryLocations={shipping.data.deliveryLocations}
      />
    </>
  );
}
