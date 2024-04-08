"use client";
import { getVisitorDetails } from "@/utils/functions";
import Opulence from "./templates/Opulence";
import Timeless from "./templates/Timeless";

const Contact = ({ contact }) => {
  let template = contact.template;
  getVisitorDetails();
  return (
    <>
      {template === "Opulence" && <Opulence contact={contact} />}
      {template === "Timeless" && <Timeless contact={contact} />}
    </>
  );
};

export default Contact;
