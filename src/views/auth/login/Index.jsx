import { LoginContextProvider } from "./loginStore";
import Login from "./Login";
import SafeLogoutGuard from "../../components/SafeLogoutGuard";
const LoginPage = () => {
  return (
    <SafeLogoutGuard>
      <LoginContextProvider>
        <Login />
      </LoginContextProvider>
    </SafeLogoutGuard>
  );
};

export default LoginPage;
