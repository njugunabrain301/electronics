import PasswordReset from "@/components/PasswordReset";
import { fetchBusinessProfile } from "@/utils/backendAPIs/app";

async function page({ params }) {
  let token = params.token;
  let res = await fetchBusinessProfile();
  let profile = res.data;
  return (
    <div>
      <PasswordReset token={token} profile={profile} />
    </div>
  );
}

export default page;
