import TAndC from "./T&C";
import PrivacyPolicy from "./PrivacyPolicy";

var routes = [
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
    name: "Fallback",
    icon: "ni ni-key-25",
  },
  {
    path: "/terms-and-conditions",
    element: <TAndC />,
    name: "Fallback",
    icon: "ni ni-key-25",
  },
];
export default routes;
