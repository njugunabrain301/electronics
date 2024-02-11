import Opulence from "./templates/Opulence/Opulence";
import Timeless from "./templates/Timeless/Timeless";

const Cart = ({
  closeModal,
  showPrice,
  totalPrice,
  cart,
  setCart,
  checkoutInfo,
  selectedTheme,
  template,
}) => {
  return (
    <>
      {template === "Opulence" && (
        <Opulence
          closeModal={closeModal}
          showPrice={showPrice}
          totalPrice={totalPrice}
          cart={cart}
          setCart={setCart}
          checkoutInfo={checkoutInfo}
          selectedTheme={selectedTheme}
        />
      )}
      {template === "Timeless" && (
        <Timeless
          closeModal={closeModal}
          showPrice={showPrice}
          totalPrice={totalPrice}
          cart={cart}
          setCart={setCart}
          checkoutInfo={checkoutInfo}
          selectedTheme={selectedTheme}
        />
      )}
    </>
  );
};

export default Cart;
