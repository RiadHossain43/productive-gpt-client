import SafeLogoutGuard from "../../components/SafeLogoutGuard";
import { AccountRecoveryContextProvider } from "./accountRecoveryStore";
import Content from "./Content";
const AccountRecoveryPage = () => {
  return (
    <SafeLogoutGuard>
      <AccountRecoveryContextProvider>
        <Content />
      </AccountRecoveryContextProvider>
    </SafeLogoutGuard>
  );
};

export default AccountRecoveryPage;
