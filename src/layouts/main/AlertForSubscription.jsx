import { Container, UncontrolledAlert } from "reactstrap";
import React from "react";
import { Link } from "react-router-dom";
import { useApplication } from "../../stores/applicationStore";
const AlertForSubscription = () => {
  const { currentUserData, redirectToCheckout, getTrialDays } =
    useApplication();
  return (
    <UncontrolledAlert className="position-absolute w-100" color="warning">
      You have {getTrialDays()} day(s) free trial.
      <Link
        className="text-dark"
        onClick={() => redirectToCheckout({ userEmail: currentUserData.email })}
      >
        {" "}
        <b>Become a premium member</b>
      </Link>
    </UncontrolledAlert>
  );
};
export default AlertForSubscription;
