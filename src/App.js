import React, { useEffect, useState } from "react";
import "./App.css";
import Main from "./Components/Main/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FilteredProducts from "./Components/FiltredProducts/FilteredProducts";
import SingleProduct from "./Components/FiltredProducts/SingleProduct";
import { useDispatch } from "react-redux";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Orders from "./Components/Orders/Orders";
import { fetchHomePage, fetchProducts } from "./features/slices/productsSlice";
import { visit } from "./features/slices/appSlice";
import PasswordReset from "./Components/PasswordReset/PasswordReset";
import Loading from "./Components/Loading/Loading";

function App() {
  const [isReady, setIsReady] = useState(false);
  const [openAuth, setOpenAuth] = useState(false);
  const handleAuth = () => {
    if (!openAuth) setOpenAuth(true);
    if (!openAuth) document.getElementById("authModalBtn").click();
  };
  const [constructed, setConstructed] = useState(true);
  const dispatch = useDispatch();
  const loadPage = async () => {
    let res = await dispatch(fetchHomePage());
    if (res.payload.success) {
      if (res.payload.data.slider.length < 8) {
        setConstructed(false);
        return;
      }
      setIsReady(true);
      if (!window.localStorage.getItem("visit")) {
        window.localStorage.setItem("visit", "x");
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
    <div className="App min-w-[330px]">
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
      ) : (
        <Loading constructed={constructed} />
      )}
    </div>
  );
}

export default App;
