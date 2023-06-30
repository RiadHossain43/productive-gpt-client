import { DrawerContextProvider } from "../../components/Drawer";
import Layout from "./Layout";
import { SettingsLayoutContextProvider } from "./store";
import { ProSidebarProvider } from "react-pro-sidebar";

const SettingsLayout = ({}) => {
  return (
    <ProSidebarProvider>
      <DrawerContextProvider>
        <SettingsLayoutContextProvider>
          <Layout />
        </SettingsLayoutContextProvider>
      </DrawerContextProvider>
    </ProSidebarProvider>
  );
};

export default SettingsLayout;
