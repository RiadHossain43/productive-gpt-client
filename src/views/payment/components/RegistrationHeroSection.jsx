import React from "react";
import { Link } from "react-router-dom";
const RegistrationHeroSection = ({}) => {
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
      <h2 className="mb-md-2 mb-lg-4">Start your journey with AI_PRODUCT_NAME</h2>
      <p>
        Introducing A.L.I.C.E (Artificial, Intelligence, Leared, Complaince,
        Expert): Your AI Companion. Get instant access to a wealth of knowledge
        on any topic (trained more on compliance and business management).
        Discover the power of AI-driven assistance.
      </p>
    </React.Fragment>
  );
};

export default RegistrationHeroSection;
