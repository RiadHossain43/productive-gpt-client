import { DrawerContextProvider } from "../../components/Drawer";
import Layout from "./Layout";
import { MainLayoutContextProvider } from "./store";
import { ProSidebarProvider } from "react-pro-sidebar";

const MainLayout = ({}) => {
  return (
    <ProSidebarProvider>
      <DrawerContextProvider>
        <MainLayoutContextProvider>
          <Layout />
        </MainLayoutContextProvider>
      </DrawerContextProvider>
    </ProSidebarProvider>
  );
};

export default MainLayout;
