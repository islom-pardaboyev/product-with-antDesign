import React from "react";
import { Route, Routes } from "react-router-dom";
import { AddProducts, Home, SingleProduct } from "../pages";
import Navbar from "../components/Navbar";

function    CustomRoutes() {
  return (
    <div className="flex">
      <div className="w-[20%]">
        <Navbar />
      </div>
      <div className="w-[80%]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-products" element={<AddProducts />} />
          <Route path="/product/:id" element={<SingleProduct />} />
        </Routes>
      </div>
    </div>
  );
}

export default CustomRoutes;
