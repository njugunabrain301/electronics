"use client";
import { getVisitorDetails } from "@/utils/functions";
import Timeless from "./templates/Timeless";
import { useEffect } from "react";

const About = ({ about }) => {
  useEffect(() => {
    getVisitorDetails();
  }, []);

  return (
    <>
      <Timeless about={about} />
    </>
  );
};

export default About;
