"use client";
import { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext({});

export const GlobalContextProvider = ({ children, profile }) => {
  //Cart Operations
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const setCartMod = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
    setCart(cart);
  };
  useEffect(() => {
    let tP = 0;
    let tC = 0;
    cart.map((item) => {
      tP += item.price * item.amount;
      tC += item.amount;
      return item;
    });
    setTotalCount(tC);
    setTotalPrice(tP);
  }, [cart]);

  //Auth Modal
  const [openAuth, setOpenAuth] = useState(false);
  const handleOpenAuth = () => {
    setOpenAuth(true);
  };
  const handleCloseAuth = () => {
    setOpenAuth(false);
  };

  return (
    <GlobalContext.Provider
      value={{
        cart,
        totalPrice,
        totalCount,
        setCart: setCartMod,
        openAuth,
        setOpenAuth,
        handleOpenAuth,
        handleCloseAuth,
        profile,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
