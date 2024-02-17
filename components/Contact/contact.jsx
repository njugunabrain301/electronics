import Opulence from "./templates/Opulence";
import Timeless from "./templates/Timeless";

const Contact = ({ contact }) => {
  let template = contact.template;

  return (
    <>
      {template === "Opulence" && <Opulence contact={contact} />}
      {template === "Timeless" && <Timeless contact={contact} />}
    </>
  );
};

export default Contact;
