import Timeless from "./templates/Timeless";

const Auth = ({ closeModal, selectedTheme }) => {
  return (
    <>
      <Timeless closeModal={closeModal} selectedTheme={selectedTheme} />
    </>
  );
};

export default Auth;
