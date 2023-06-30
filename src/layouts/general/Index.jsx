import Layout from "./Layout";
import { GeneralLayoutContextProvider } from "./store";

const GeneralLayout = ({}) => {
  return (
    <GeneralLayoutContextProvider>
      <Layout />
    </GeneralLayoutContextProvider>
  );
};

export default GeneralLayout;
