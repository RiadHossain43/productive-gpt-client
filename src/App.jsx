import { Spinner } from "reactstrap";
import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthLayout from "./layouts/auth/Index";
import GlobalErrorBoundary from "./layouts/error/Index";
import GeneralLayout from "./layouts/general/Index";
// import MainLayout from "./layouts/main/Index";
import SettingsLayout from "./layouts/settings/Index";
import routes from "./routes";
import { useApplication } from "./stores/applicationStore";
function LoadingApplication() {
  return (
    <p className="mt-5 text-center">
      <Spinner size="sm" type="grow" /> Preparing application
    </p>
  );
}
export default function App() {
  const { isApplicationReady } = useApplication();
  let element = useRoutes([
    {
      element: <AuthLayout />,
      children: [
        ...routes.authLayout.auth,
        ...routes.authLayout.payment,
        ...routes.authLayout.fallback,
        ...routes.authLayout.alicePolicies,
      ],
    },
    // {
    //   element: <MainLayout navigation={[...routes.mainLayout.chat]} />,
    //   children: [...routes.mainLayout.chat],
    // },
    {
      element: (
        <GeneralLayout
          navigation={[
            ...routes.generalLayout.lab,
            ...routes.generalLayout.magicBox,
            ...routes.generalLayout.imageGalary,
          ]}
        />
      ),
      children: [
        ...routes.generalLayout.lab,
        ...routes.generalLayout.magicBox,
        ...routes.generalLayout.imageGalary,
      ],
    },
    {
      element: (
        <SettingsLayout navigation={[...routes.settingsLayout.settings]} />
      ),
      children: [...routes.settingsLayout.settings],
    },
    {
      path: "*",
      element: <Navigate to="/magic-box" />,
    },
  ]);
  return (
    <React.Fragment>
      {!isApplicationReady ? (
        <LoadingApplication />
      ) : (
        <GlobalErrorBoundary>
          <ToastContainer />
          {element}
        </GlobalErrorBoundary>
      )}
    </React.Fragment>
  );
}
