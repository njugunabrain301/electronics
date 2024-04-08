"use client";
import { getVisitorDetails } from "@/utils/functions";
import Opulence from "./templates/Opulence";
import Timeless from "./templates/Timeless";

const About = ({ about }) => {
  let template = about.template;
  getVisitorDetails();
  return (
    <>
      {template === "Opulence" && <Opulence about={about} />}
      {template === "Timeless" && <Timeless about={about} />}
    </>
  );
};

export default About;
