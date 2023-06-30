import { Navigate } from "react-router-dom";
import { useApplication } from "../../stores/applicationStore";

export default function ProtectedView({ children }) {
  const { isLoggedIn, currentUserData, isUserVerified } = useApplication();
  if (!isLoggedIn()) {
    return <Navigate to="/accounts/login" />;
  }
  /**
   * following block means users login tokens are there but something wrong in terms of
   * profile caching.
   */
  if (!currentUserData) return <Navigate to={`/not-found`} />;
  /** ererything success but user not verified yet */
  if (!isUserVerified()) {
    return (
      <Navigate
        to={`/accounts/pending-verification/?user_id=${
          currentUserData?._id
        }`}
      />
    );
  }
  return children;
}
