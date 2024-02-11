import Opulence from "./templates/Opulence/Opulence";
import Timeless from "./templates/Timeless/Timeless";

const Auth = ({ closeModal, selectedTheme, template }) => {
  return (
    <>
      {template === "Opulence" && (
        <Opulence closeModal={closeModal} selectedTheme={selectedTheme} />
      )}
      {template === "Timeless" && (
        <Timeless closeModal={closeModal} selectedTheme={selectedTheme} />
      )}
    </>
  );
};

export default Auth;
