import { LogoutContextProvider } from "./logoutStore";
import Content from "./Content";
const LogoutPage = () => {
  return (
    <LogoutContextProvider>
      <Content />
    </LogoutContextProvider>
  );
};

export default LogoutPage;
