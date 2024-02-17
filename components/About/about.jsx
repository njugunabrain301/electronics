import Opulence from "./templates/Opulence";
import Timeless from "./templates/Timeless";

const About = ({ about }) => {
  let template = about.template;

  return (
    <>
      {template === "Opulence" && <Opulence about={about} />}
      {template === "Timeless" && <Timeless about={about} />}
    </>
  );
};

export default About;
