import React from "react";
import { Outlet } from "react-router-dom";
import ProtectedView from "../components/ProtectedView";
// reactstrap components

// core components

const Layout = (props) => {
  return (
    <div className="general-layout">
      <ProtectedView>
        <Outlet />
      </ProtectedView>
    </div>
  );
};

export default Layout;
