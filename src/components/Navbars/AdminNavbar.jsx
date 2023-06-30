import React from "react";
import { useNavigate } from "react-router-dom";
// reactstrap components

import { Collapse, Nav, Navbar, NavLink, Container } from "reactstrap";
import { getAccessTokenData } from "services/accountServices";
import FcmNotification from "./FcmNotification";
import useDualStateController from "hooks/useDualStateController";

const AdminNavbar = (props) => {
  const navigate = useNavigate();
  const { isOpen: isCollapsOpen, toggle: toogleCollapse } =
    useDualStateController();
  return (
    <Navbar>
      <Container>
        <Nav className="ms-auto">
          <NavLink onClick={() => navigate("/accounts/login")}>Login</NavLink>
        </Nav>
        {!getAccessTokenData() ? (
          <React.Fragment>
            <FcmNotification />
            <Collapse navbar isOpen={isCollapsOpen}>
              <Nav navbar className="ms-auto">
                <NavLink onClick={() => navigate("/accounts/login")}>Login</NavLink>
              </Nav>
            </Collapse>
          </React.Fragment>
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;
