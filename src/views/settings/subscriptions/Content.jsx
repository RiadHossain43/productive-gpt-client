import { Container } from "reactstrap";
import React from "react";
import { useApplication } from "../../../stores/applicationStore";
import SubscriptionAlert from "./SubscriptionAlert";
import SubscriptionInfo from "./SubscriptionInfo";
const Content = () => {
  const { currentUserData } = useApplication();
  return (
    <React.Fragment>
      <Container>
        {currentUserData?.subscriptionInformation?.status === "Trial" && (
          <SubscriptionAlert />
        )}
        {currentUserData?.subscriptionInformation?.status !== "Trial" && (
          <React.Fragment>
            <SubscriptionInfo />
          </React.Fragment>
        )}
      </Container>
    </React.Fragment>
  );
};

export default Content;
