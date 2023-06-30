import ExistingChat from "./ExistingChat";
import NewChat from "./NewChat";
import NewChatRedirect from "./NewChatRedirect";
var routes = [
  {
    path: "/chat",
    element: <NewChat />,
    name: "Chat",
  },
  {
    path: "/new-chat-redirect",
    element: <NewChatRedirect />,
    name: "Chat",
  },
  {
    path: "/chat/:chatheadId",
    element: <ExistingChat />,
    name: "Chat",
  },
];
export default routes;
