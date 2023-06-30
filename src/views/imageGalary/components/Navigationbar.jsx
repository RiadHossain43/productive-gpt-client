import { Link, useNavigate } from "react-router-dom";
// reactstrap components

import { Nav, Navbar } from "reactstrap";

import React from "react";
import { BsLightningFill } from "react-icons/bs";
import { FaMagic } from "react-icons/fa";
import { useApplication } from "../../../stores/applicationStore";

const Navigationbar = ({}) => {
  const navigate = useNavigate();
  const { currentUserData } = useApplication();
  return (
    <Navbar className="bg-transparent">
      <Nav className="w-100 py-1">
        <div className="d-flex ml-auto">
          <Link to="/magic-box">
            <p className="py-1 text-warning mx-2">
              <span className="text-primary">
                <FaMagic />
              </span>
            </p>
          </Link>
          <Link to="/accounts/settings">
            <div className="d-inline-flex">
              {currentUserData?.subscriptionInformation?.status ===
                "Subscribed" && (
                <p className="py-1 text-warning mx-2">
                  <span className="">
                    <BsLightningFill />
                  </span>
                  <span className="d-none d-md-inline">Premium</span>
                </p>
              )}
              <div id="profile-link" className="flex-shrink-0 mx-md-2">
                <img
                  src={
                    currentUserData?.profileImage?.src ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIQctMpfDaRxFb7YrryqRe1-2hK2r1getr-w&usqp=CAU"
                  }
                  alt="avatar"
                  className="avatar"
                />
              </div>
              <p className="py-1 d-none d-md-block">{currentUserData?.name}</p>
            </div>
          </Link>
        </div>
      </Nav>
    </Navbar>
  );
};

export default Navigationbar;
