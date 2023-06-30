import { RegistrationContextProvider } from "./registratinStore";
import Register from "./Register";
import SafeLogoutGuard from "../../components/SafeLogoutGuard";
const RegistrationPage = () => {
  return (
    <SafeLogoutGuard>
      <RegistrationContextProvider>
        <Register />
      </RegistrationContextProvider>
    </SafeLogoutGuard>
  );
};

export default RegistrationPage;
