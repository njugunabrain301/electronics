import Opulence from "./templates/Opulence";
import Timeless from "./templates/Timeless";

const Returns = ({ returns, profile }) => {
  let template = profile.template;

  return (
    <>
      {template === "Opulence" && (
        <Opulence returns={returns} profile={profile} />
      )}
      {template === "Timeless" && (
        <Timeless returns={returns} profile={profile} />
      )}
    </>
  );
};

export default Returns;
