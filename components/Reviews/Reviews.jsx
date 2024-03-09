import Opulence from "./templates/Opulence";
import Timeless from "./templates/Timeless";

function Reviews({ closeModal, template, item, sent, setSent }) {
  return (
    <>
      {template === "Opulence" && (
        <Opulence
          closeModal={closeModal}
          item={item}
          sent={sent}
          setSent={setSent}
        />
      )}
      {template === "Timeless" && (
        <Timeless
          closeModal={closeModal}
          item={item}
          sent={sent}
          setSent={setSent}
        />
      )}
    </>
  );
}

export default Reviews;
