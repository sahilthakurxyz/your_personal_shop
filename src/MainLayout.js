import React from "react";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import "./App.css";
const MainLayout = ({ children }) => {
  return (
    <div className="ecommerce-main">
      <span id="navmenu_mainContainer"></span>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
