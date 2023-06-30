import Layout from "./Layout";
import { AuthLayoutContextProvider } from "./store";

const AuthLayout = ({}) => {
  return (
    <AuthLayoutContextProvider>
      <Layout />
    </AuthLayoutContextProvider>
  );
};

export default AuthLayout;
