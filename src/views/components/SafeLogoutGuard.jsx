/**
 * ALERT: This compoent is developed for only special cases. 
 * where it is required to log user out before user can view a route or path.
 * i.e. a good example case is user must be logged out safely before they view the 
 * login page or registration page for new account. otherwise bugs and securiy 
 * flaw may arise.
 */
import React from "react";
import { Navigate } from "react-router-dom";
import { useApplication } from "../../stores/applicationStore";
const SafeLogoutGuard = ({ children }) => {
  const { isLoggedIn } = useApplication();
  if (isLoggedIn()) return <Navigate to={"/accounts/logout-confirmation"} />;
  return children;
};

export default SafeLogoutGuard;
