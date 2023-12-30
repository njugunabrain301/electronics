"use client";
import { MUIThemes, Themes } from "@/utils/Themes/Themes";
import { createContext, useContext, useState, useEffect } from "react";
import { red } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material";

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
  const theme = MUIThemes[profile.theme.toLowerCase()];

  const addToLocalCart = (item) => {
    let found = false;
    let nCart = cart.map((it) => {
      if (
        it._id === item._id &&
        it.color === item.color &&
        it.size === item.size
      ) {
        found = true;
        it.amount++;
      }
      return it;
    });
    if (!found) {
      nCart.push(item);
    }
    setCart(nCart);
  };

  return (
    <div
      style={{
        backgroundColor: theme.palette.background.primary,
        color: theme.palette.text.base,
      }}
    >
      <ThemeProvider theme={theme}>
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
            addToLocalCart,
            theme: theme,
          }}
        >
          {children}
        </GlobalContext.Provider>
      </ThemeProvider>
    </div>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
