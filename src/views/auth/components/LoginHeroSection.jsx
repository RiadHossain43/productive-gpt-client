import React from "react";
import { Link } from "react-router-dom";
const LoginHeroSection = ({}) => {
  return (
    <React.Fragment>
      <small className="text-light">
        Powered by{" "}
        <Link
          className="text-light"
          to="https://freetoolsapp.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Freetools
        </Link>
      </small>
      <h2 className="mb-md-2 mb-lg-4">Your trusted productivity tool.</h2>
      <p>
        Introducing Free Tools: Your all-in-one solution for supercharging
        productivity and streamlining tasks. Say farewell to manual work and
        enhance your workflow efficiency with our intelligent AI toolkit.
        Perform data analysis, create stunning diagrams, make seamless document
        edits, and more with ease. Unlock your full potential and maximize
        productivity with Free Tools AI
      </p>
    </React.Fragment>
  );
};

export default LoginHeroSection;
