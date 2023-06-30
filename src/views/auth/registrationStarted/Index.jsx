import Content from "./Content";
import { RegistrationStartedContextProvider } from "./registratinStartedStore";
const RegistrationPage = () => {
  return (
    <RegistrationStartedContextProvider>
      <Content />
    </RegistrationStartedContextProvider>
  );
};

export default RegistrationPage;
