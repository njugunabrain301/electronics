import Timeless from "./templates/Timeless";

const Cart = ({
  closeModal,
  showPrice,
  totalPrice,
  cart,
  setCart,
  checkoutInfo,
  selectedTheme,
  single,
}) => {
  return (
    <>
      <Timeless
        closeModal={closeModal}
        showPrice={showPrice}
        totalPrice={totalPrice}
        cart={cart}
        setCart={setCart}
        checkoutInfo={checkoutInfo}
        selectedTheme={selectedTheme}
        single={single}
      />
    </>
  );
};

export default Cart;
