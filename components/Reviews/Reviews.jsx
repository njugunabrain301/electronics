import Opulence from "./templates/Opulence";
import Timeless from "./templates/Timeless";

function Reviews({ closeModal, template, item, sent, setSent, pos, invoice }) {
  return (
    <>
      {template === "Opulence" && (
        <Opulence
          closeModal={closeModal}
          item={item}
          sent={sent}
          setSent={setSent}
          pos={pos}
          invoice={invoice}
        />
      )}
      {template === "Timeless" && (
        <Timeless
          closeModal={closeModal}
          item={item}
          sent={sent}
          setSent={setSent}
          pos={pos}
          invoice={invoice}
        />
      )}
    </>
  );
}

export default Reviews;
