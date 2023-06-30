import CheckoutPage from "./checkout/Index.jsx";
import UnsubscribePage from "./unsubscribe/Index.jsx";
var routes = [
  {
    path: "/payments/subscription",
    element: <CheckoutPage />,
    name: "Checkout",
    icon: "ni ni-key-25",
  },
  {
    path: "/payments/cancel-subscription",
    element: <UnsubscribePage />,
    name: "Checkout",
    icon: "ni ni-key-25",
  },
];
export default routes;
