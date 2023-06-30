import React from "react";
import { Link } from "react-router-dom";
const LoginHeroSection = ({}) => {
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
      <h2 className="mb-md-2 mb-lg-4">Your intelligent Ai assistant.</h2>
      <p>
        Introducing A.L.I.C.E (Artificial, Learned, Intelligence, Complaince,
        Expert): Your Ai Companion. Get instant access to a wealth of knowledge
        on any topic (trained more on compliance and business management).
        Discover the power of AI-driven assistance.
      </p>
    </React.Fragment>
  );
};

export default LoginHeroSection;
