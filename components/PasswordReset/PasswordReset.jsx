import Timeless from "./templates/Timeless";

function PasswordReset({ token, profile }) {
  return (
    <>
      <Timeless token={token} profile={profile} />
    </>
  );
}

export default PasswordReset;
