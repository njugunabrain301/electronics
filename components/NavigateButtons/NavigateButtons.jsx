import Opulence from "./Templates/Opulence";
import Timeless from "./Templates/Timeless";

const NavigateButtons = ({ categories, profile, minified }) => {
  let template = profile.template;
  return (
    <>
      {template === "Opulence" && (
        <Opulence categories={categories} profile={profile} />
      )}
      {template === "Timeless" && (
        <Timeless
          categories={categories}
          profile={profile}
          minified={minified}
        />
      )}
    </>
  );
};

export default NavigateButtons;
