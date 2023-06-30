import React from "react";
import { Outlet } from "react-router-dom";
// reactstrap components

// core components

const Layout = (props) => {
  return (
    <div className="auth-layout">
      <Outlet />
    </div>
  );
};

export default Layout;
