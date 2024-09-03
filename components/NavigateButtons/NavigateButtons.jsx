import Timeless from "./Templates/Timeless";

const NavigateButtons = ({ categories, profile, minified }) => {
  return (
    <>
      <Timeless categories={categories} profile={profile} minified={minified} />
    </>
  );
};

export default NavigateButtons;
