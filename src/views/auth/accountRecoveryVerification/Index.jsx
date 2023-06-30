import SafeLogoutGuard from "../../components/SafeLogoutGuard";
import { AccountRecoveryVerificationContextProvider } from "./accountRecoveryVerificationStore";
import Content from "./Content";
const AccountRecoveryVerificationPage = () => {
  return (
    <SafeLogoutGuard>
      <AccountRecoveryVerificationContextProvider>
        <Content />
      </AccountRecoveryVerificationContextProvider>
    </SafeLogoutGuard>
  );
};

export default AccountRecoveryVerificationPage;
