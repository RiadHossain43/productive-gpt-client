import { AuthSuccessContextProvider } from "./authSuccessStore";
import Content from "./Content";
const AuthSuccessPage = () => {
  return (
    <AuthSuccessContextProvider>
      <Content />
    </AuthSuccessContextProvider>
  );
};

export default AuthSuccessPage;
