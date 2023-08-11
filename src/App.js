import React, { useEffect, useState } from "react";
import "./App.css";
import Main from "./Components/Main/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FilteredProducts from "./Components/FiltredProducts/FilteredProducts";
import SingleProduct from "./Components/FiltredProducts/SingleProduct";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Orders from "./Components/Orders/Orders";
import { fetchHomePage, fetchProducts } from "./features/slices/productsSlice";
import { setTheme, visit } from "./features/slices/appSlice";
import PasswordReset from "./Components/PasswordReset/PasswordReset";
import Loading from "./Components/Loading/Loading";
import { Themes } from "./assets/Themes/Themes";
import "./Components/styles.css";
import UnderConstruction from "./Components/Loading/UnderConstruction";
import Cookies from "universal-cookie";

function App() {
  let cookies = new Cookies();
  const [isReady, setIsReady] = useState(false);
  const [openAuth, setOpenAuth] = useState(false);
  const handleAuth = () => {
    if (!openAuth) setOpenAuth(true);
    if (!openAuth) document.getElementById("authModalBtn").click();
  };

  const selectedTheme = useSelector((state) => state.app.selectedTheme);

  const [constructed, setConstructed] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    let theme = {};
    if (selectedTheme !== "") {
      theme = Themes[selectedTheme.toLowerCase()];
    } else {
      theme = Themes["classic"];
    }
    dispatch(setTheme(theme));
  }, [selectedTheme, dispatch]);

  const loadPage = async () => {
    let res = await dispatch(fetchHomePage());

    if (res.payload.success) {
      if (!res.payload.data.ready || !res.payload.data.active) {
        setConstructed(false);
        return;
      }
      setIsReady(true);
      if (!cookies.get("visit")) {
        var d = new Date();

        d.setTime(d.getTime() + 12 * 60 * 60 * 1000);
        cookies.set("visit", "x", { expires: d });
        dispatch(visit());
      }
    }
  };
  useEffect(() => {
    loadPage();
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className={"App min-w-[330px] bg-skin-primary " + selectedTheme}>
      {isReady ? (
        <BrowserRouter>
          {<Navbar handleAuth={handleAuth} setOpenAuth={setOpenAuth} />}
          <Routes>
            <Route
              path="/reset-pass/:token"
              element={<PasswordReset />}
            ></Route>
            <Route path="/" element={<Main></Main>}></Route>
            <Route path="/orders" element={<Orders></Orders>}></Route>
            <Route
              path="/filteredProducts/:type"
              element={<FilteredProducts></FilteredProducts>}
            ></Route>
            <Route
              path="/filteredProducts/:type/:id"
              element={<SingleProduct handleAuth={handleAuth}></SingleProduct>}
            ></Route>
          </Routes>
          {<Footer></Footer>}
        </BrowserRouter>
      ) : constructed ? (
        <Loading />
      ) : (
        <UnderConstruction />
      )}
    </div>
  );
}

export default App;
