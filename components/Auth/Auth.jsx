import Timeless from "./templates/Timeless/Timeless";

const Auth = ({ closeModal, selectedTheme }) => {
  return (
    <>
      <Timeless closeModal={closeModal} selectedTheme={selectedTheme} />
    </>
  );
};

export default Auth;
