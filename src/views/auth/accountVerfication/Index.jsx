import { AccountVerficationContextProvider } from "./accountVerificationStore";
import Content from "./Content";
const AccountVerificationPage = () => {
  return (
    <AccountVerficationContextProvider>
      <Content />
    </AccountVerficationContextProvider>
  );
};

export default AccountVerificationPage;
