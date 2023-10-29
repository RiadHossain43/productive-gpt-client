import { Link, useNavigate } from "react-router-dom";
// reactstrap components
import { Nav, Navbar } from "reactstrap";
import React from "react";
import { MdApps } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import { useProSidebar } from "react-pro-sidebar";
import { useApplication } from "../../stores/applicationStore";

const Navigationbar = ({}) => {
  const navigate = useNavigate();
  const { toggleSidebar, collapseSidebar, broken } = useProSidebar();
  const { currentUserData } = useApplication();
  return (
    <Navbar className="bg-transparent">
      <Nav className="w-100">
        <div
          onClick={() => {
            if (broken) {
              toggleSidebar();
            } else {
              collapseSidebar();
            }
          }}
        >
          <HiMenuAlt2 />
        </div>
        <div className="ml-auto">
          <Link to="/magic-box">
            <p className="py-1 text-warning mx-2">
              <span className="text-primary">
                <MdApps /> Apps
              </span>
            </p>
          </Link>
        </div>
      </Nav>
    </Navbar>
  );
};

export default Navigationbar;
