import { Navigate } from "react-router-dom";
import { useApplication } from "../../stores/applicationStore";

export default function PremiumView({ children }) {
  const { currentUserData, getTrialDays } = useApplication();
  if (
    currentUserData?.subscriptionInformation?.status === "Unsubscribed" ||
    (currentUserData?.subscriptionInformation?.status === "Trial" &&
      !getTrialDays())
  ) {
    return <Navigate to="/payments/subscription-history" />;
  }
  return children;
}
