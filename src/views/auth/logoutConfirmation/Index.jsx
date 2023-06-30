import { LogoutConfirmationContextProvider } from "./logoutConfirmationStore";
import Content from "./Content";
const LogoutConfirmationPage = () => {
  return (
    <LogoutConfirmationContextProvider>
      <Content />
    </LogoutConfirmationContextProvider>
  );
};

export default LogoutConfirmationPage;
