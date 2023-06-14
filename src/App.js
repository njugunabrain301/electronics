import React from "react";
import "./App.css";
import Main from "./Components/Main/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FilteredProducts from "./Components/FiltredProducts/FilteredProducts";
import SingleProduct from "./Components/FiltredProducts/SingleProduct";
import { useSelector } from "react-redux";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Orders from "./Components/Orders/Orders";

function App() {
  const user = useSelector((state) => state.user.user);
  const { authUser } = user;

  return (
    <div className="App min-w-[350px]">
      <BrowserRouter>
        {<Navbar />}
        <Routes>
          <Route path="/" element={<Main></Main>}></Route>
          <Route
            path="/orders"
            element={authUser ? <Orders></Orders> : <Main></Main>}
          ></Route>
          <Route
            path="/filteredProducts/:type"
            element={<FilteredProducts></FilteredProducts>}
          ></Route>
          <Route
            path="/filteredProducts/:type/:id"
            element={<SingleProduct></SingleProduct>}
          ></Route>
        </Routes>
        {<Footer></Footer>}
      </BrowserRouter>
    </div>
  );
}

export default App;
