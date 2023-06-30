import React from "react";
import { BsChat } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Container, Nav, NavItem, NavLink } from "reactstrap";

const MagicBox = ({}) => {
  return (
    <Container className="py-5">
      <Nav
        className="nav-pills-primary nav-pills-icons justify-content-center align-items-center"
        pills
        role="tablist"
      >
        <NavItem>
          <Link to={"/chat"}>
            <NavLink href="#pablo">
              <i className="tim-icons icon-laptop" />
              Conversation
            </NavLink>
          </Link>
        </NavItem>
        <NavItem>
          <Link to={"/accounts/settings"}>
            <NavLink href="#pablo">
              <i className="tim-icons icon-settings-gear-63" />
              Settings
            </NavLink>
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/image-galary">
            <NavLink href="#pablo">
              <i className="tim-icons icon-image-02" />
              Image generation
            </NavLink>
          </Link>
        </NavItem>
      </Nav>
    </Container>
  );
};

export default MagicBox;
