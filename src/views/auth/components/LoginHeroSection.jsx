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
      <h2 className="mb-md-2 mb-lg-4">Your trusted email validator.</h2>
      <p>
        Introducing Free Tools Email Validator: Your go-to solution for accurate
        email validation. Say goodbye to bounced emails and improve your email
        deliverability with our powerful tool. Verify email addresses instantly
        and ensure your mailing list is up-to-date and error-free. Boost your
        email marketing success with Free Tools Email Validator.
      </p>
    </React.Fragment>
  );
};

export default LoginHeroSection;
