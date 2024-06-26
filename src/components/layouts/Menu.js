import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../images/logo.png";
import { CiSearch } from "react-icons/ci";
import { MdAccountCircle } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
const Menu = () => {
  const features = {
    burgerColorHover: "#DE0C19",
    navColor1: "#2E2526",
    logo,
    logoWidth: "15vmax",
    logoHoverSize: "10px",
    logoHoverColor: "#eb4034",
    link1Text: "Home",
    link2Text: "Products",
    link3Text: "Contact",
    link4Text: "About",
    link1Url: "/",
    link2Url: "/products",
    link3Url: "/contact",
    link4Url: "/about",
    link1Size: "1.3vmax",
    link1Color: "#DFE5E3",
    nav1justifyContent: "flex-end",
    nav2justifyContent: "flex-end",
    nav3justifyContent: "flex-start",
    nav4justifyContent: "flex-start",
    link1ColorHover: "#eb4034",
    link1Margin: "1vmax",
    profileIcon: true,
    ProfileIconElement: MdAccountCircle,
    profileIconUrl: "/account",

    profileIconColor: "white",
    searchIcon: true,
    SearchIconElement: CiSearch,
    searchIconUrl: "/products",
    searchIconColor: "white",
    cartIcon: true,
    CartIconElement: FaShoppingCart,
    cartIconColor: "white",
    profileIconColorHover: "#eb4034",
    searchIconColorHover: "#eb4034",
    cartIconColorHover: "#eb4034",
    cartIconMargin: "1vmax",
  };
  return <ReactNavbar {...features} />;
};

export default Menu;
