import Opulence from "./templates/Opulence";
import Timeless from "./templates/Timeless";

function Orders({ template }) {
  return (
    <>
      {template === "Opulence" && <Opulence />}
      {template === "Timeless" && <Timeless />}
    </>
  );
}

export default Orders;
