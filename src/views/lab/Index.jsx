import Lab_1 from "./lab_1/Index";
import Lab_2 from "./lab_2/Index";
import Lab_3 from "./lab_3/Index";

import { Link, useNavigate, useParams } from "react-router-dom";
import { Container, Nav, NavLink, Navbar } from "reactstrap";
import React from "react";
const labs = { "lab-1": <Lab_1 />, "lab-2": <Lab_2 />, "lab-3": <Lab_3 /> };
const Lab = () => {
  const params = useParams();
  const navigate = useNavigate();
  /** users should not be able to view laboratory in other modes. */
  if (process.env.NODE_ENV !== "development") navigate(-1);
  return (
    <React.Fragment>
      <Navbar className="bg-transparent">
        <Container>
          <Nav className="">
            <div className="ml-auto d-flex">
              {Object.keys(labs).map((lab) => {
                return (
                  <NavLink key={lab}>
                    <Link to={"/laboratory/" + lab}>{lab}</Link>
                  </NavLink>
                );
              })}
            </div>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        {labs[params.id] ? labs[params.id] : <span>no lab found</span>}
      </Container>
    </React.Fragment>
  );
};

export default Lab;
