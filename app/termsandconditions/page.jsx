import { fetchBusinessProfile } from "@/utils/backendAPIs/app";
import PrivacyPolicy from "@/components/privacyPolicy/PrivacyPolicy";
import TermsAndConditions from "@/components/TermsAndConditions/TermsAndConditions";

export const runtime = "edge";
const dynamic = "force-dynamic";

export async function generateMetadata() {
  let profile = {};
  let res = await fetchBusinessProfile();
  profile = res.data;

  return {
    title: "Terms And Conditions | " + profile.name,
  };
}

export default async function Home() {
  let res = await fetchBusinessProfile();
  let profile = res.data;

  return <TermsAndConditions profile={profile} />;
}
