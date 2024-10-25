import React from "react";
import Home from "./Home_page";

function MainLayout({ children }) {
  return (
    <div>
      <Home /> {/* Navbar will be visible on every page */}
      <main>{children}</main> {/* This is where each page will be rendered */}
    </div>
  );
}

export default MainLayout;
