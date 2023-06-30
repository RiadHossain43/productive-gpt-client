import LoginPage from "./login/Index";
import RegistrationPage from "./registration/Index";
import AccountVerificationPage from "./accountVerfication/Index";
import RegistrationStartedPage from "./registrationStarted/Index";
import AccountRecoveryPage from "./accountRecovery/Index";
import AccountRecoveryVerificationPage from "./accountRecoveryVerification/Index";
import AuthSuccessPage from "./authSuccess/Index";
import LogoutPage from "./logout/Index";
import LogoutConfirmationPage from "./logoutConfirmation/Index";
var routes = [
  {
    path: "/accounts/login",
    element: <LoginPage />,
    name: "Login",
    icon: "ni ni-key-25",
  },
  {
    path: "/accounts/register",
    element: <RegistrationPage />,
    name: "Register",
    icon: "ni ni-key-25",
  },
  {
    path: "/accounts/registration-verification",
    element: <AccountVerificationPage />,
    name: "Register",
    icon: "ni ni-key-25",
  },
  {
    path: "/accounts/auth-success",
    element: <AuthSuccessPage />,
    name: "Register",
    icon: "ni ni-key-25",
  },
  {
    path: "/accounts/pending-verification",
    element: <RegistrationStartedPage />,
    name: "Register",
    icon: "ni ni-key-25",
  },
  {
    path: "/accounts/recovery",
    element: <AccountRecoveryPage />,
    name: "Register",
    icon: "ni ni-key-25",
  },
  {
    path: "/accounts/recovery-verification",
    element: <AccountRecoveryVerificationPage />,
    name: "Register",
    icon: "ni ni-key-25",
  },
  {
    path: "/accounts/logout",
    element: <LogoutPage />,
    name: "Logout",
    icon: "ni ni-key-25",
  },
  {
    path: "/accounts/logout-confirmation",
    element: <LogoutConfirmationPage />,
    name: "Logout",
  },
];
export default routes;
