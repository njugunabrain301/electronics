import Timeless from "./templates/Timeless";

function Reviews({ closeModal, item, sent, setSent, pos, invoice }) {
  return (
    <>
      <Timeless
        closeModal={closeModal}
        item={item}
        sent={sent}
        setSent={setSent}
        pos={pos}
        invoice={invoice}
      />
    </>
  );
}

export default Reviews;
