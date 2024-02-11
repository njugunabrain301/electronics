import Orders from "@/components/Orders/Orders";
import { fetchBusinessProfile } from "@/utils/backendAPIs/app";

export const runtime = "edge";
const dynamic = "force-dynamic";

export async function generateMetadata() {
  let profile = await fetchBusinessProfile();
  profile = profile.data;
  return {
    title: "Orders | " + profile.name,
    description: profile.about,
  };
}

export default async function Page() {
  let profile;
  let res = await fetchBusinessProfile();
  profile = res.data;

  return (
    <div>
      <Orders profile={profile} template={profile.template} />
    </div>
  );
}
