import Opulence from "./templates/Opulence";
import Timeless from "./templates/Timeless";

function UserProfile({ closeModal, template }) {
  return (
    <>
      {template === "Opulence" && <Opulence closeModal={closeModal} />}
      {template === "Timeless" && <Timeless closeModal={closeModal} />}
    </>
  );
}

export default UserProfile;
