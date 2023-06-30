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

function App() {
  const [openAuth, setOpenAuth] = useState(false);
  const handleAuth = () => {
    if (!openAuth) setOpenAuth(true);
    if (!openAuth) document.getElementById("authModalBtn").click();
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchHomePage());
  });

  useEffect(() => {
    dispatch(fetchProducts());
  });

  return (
    <div className="App min-w-[330px]">
      <BrowserRouter>
        {<Navbar handleAuth={handleAuth} setOpenAuth={setOpenAuth} />}
        <Routes>
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
    </div>
  );
}

export default App;
