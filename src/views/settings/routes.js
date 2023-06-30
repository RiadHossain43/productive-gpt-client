import React from "react";
import { BiUser } from "react-icons/bi";
import { IoMdLogOut } from "react-icons/io";
import { MdPayment } from "react-icons/md";
import ProfilePage from "./profile/Index";
import SubscriptionsPage from "./subscriptions/Index";
import PaymentSuccessPage from "./paymentSuccess/Index";
import CheckInformation from "./checkInformation/Index";

const routes = [
  {
    path: "/accounts/settings",
    element: <ProfilePage />,
    name: "Profile settings",
    icon: <BiUser />,
  },
  {
    path: "/payments/subscription-history",
    element: <SubscriptionsPage />,
    name: "Subscriptions",
    icon: <MdPayment />,
  },
  {
    path: "/payments/success",
    element: <PaymentSuccessPage />,
    name: "Success",
    icon: <MdPayment />,
    hideInsidebar: true,
  },
  {
    path: "/payments/check-information",
    element: <CheckInformation />,
    name: "Check payment info",
    icon: <MdPayment />,
    hideInsidebar: true,
  },
  {
    path: "/accounts/logout",
    element: <React.Fragment />,
    name: "Logout",
    icon: <IoMdLogOut />,
  },
];
export default routes;
