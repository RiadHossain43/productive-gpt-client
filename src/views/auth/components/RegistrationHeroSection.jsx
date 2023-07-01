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
      <h2 className="mb-md-2 mb-lg-4">Start your journey with us.</h2>
      <p>
        Embark on a seamless email marketing journey with our cutting-edge
        software. Whether you're a small business owner or a seasoned marketer,
        our email validation software is designed to empower you. Say goodbye to
        wasted resources and hello to a higher ROI. Join thousands of satisfied
        customers who have experienced the power of accurate email lists. Start
        your journey with us today and unlock the full potential of your email
        campaigns.
      </p>
    </React.Fragment>
  );
};

export default RegistrationHeroSection;
