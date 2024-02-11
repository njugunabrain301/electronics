import Opulence from "./templates/Opulence";
import Timeless from "./templates/Timeless";

function PasswordReset({ token, profile }) {
  let template = profile.template;
  return (
    <>
      {template === "Opulence" && <Opulence token={token} profile={profile} />}
      {template === "Timeless" && <Timeless token={token} profile={profile} />}
    </>
  );
}

export default PasswordReset;
