import Main from "@/components/HomePage/Main";
import { fetchBusinessProfile } from "@/utils/backendAPIs/app";
import Empty from "@/components/Empty/Empty";
import Expired from "@/components/Expired/Expired";
import WhatsappWidget from "@/components/WhatsappWidget/WhatsappWidget";
import PrivacyPolicy from "@/components/privacyPolicy/PrivacyPolicy";

export const runtime = "edge";
const dynamic = "force-dynamic";

export async function generateMetadata() {
  let profile = {};
  let res = await fetchBusinessProfile();
  profile = res.data;

  return {
    title: "Privacy Policy | " + profile.name,
  };
}

export default async function Home() {
  let res = await fetchBusinessProfile();
  let profile = res.data;

  return <PrivacyPolicy profile={profile} />;
}
