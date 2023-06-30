import { useNavigate } from "react-router-dom";
// reactstrap components

import { Container, Nav, NavLink, Navbar } from "reactstrap";
import { HiMenuAlt2 } from "react-icons/hi";
const Navigationbar = ({}) => {
  const navigate = useNavigate();
  return (
    <Navbar>
      <Container>
        <Nav className="">
          <NavLink onClick={() => {}}>
            <HiMenuAlt2 />
          </NavLink>
          <NavLink className="ms-auto" onClick={() => navigate("/accounts/login")}>
            Login
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigationbar;
