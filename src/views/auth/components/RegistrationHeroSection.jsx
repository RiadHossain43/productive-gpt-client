import React from "react";
import { Link } from "react-router-dom";
const RegistrationHeroSection = ({}) => {
  return (
    <React.Fragment>
      <small className="text-light">
        Powered by{" "}
        <Link
          className="text-light"
          to="https://imssystems.tech"
          target="_blank"
          rel="noopener noreferrer"
        >
          iMS Technologies
        </Link>
      </small>
      <h2 className="mb-md-2 mb-lg-4">Start your journey with Alice</h2>
      <p>
        Introducing A.L.I.C.E (Artificially, Learned, Intelligent, Compliance,
        Expert): Your AI Companion. Get instant access to a wealth of knowledge
        on any topic (trained more on compliance and business management).
        Discover the power of AI-driven assistance.
      </p>
    </React.Fragment>
  );
};

export default RegistrationHeroSection;
