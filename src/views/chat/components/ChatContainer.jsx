import ChatInterface from "./ChatInterface";
import React from "react";
import { ChatInterfaceContextProvider } from "./store";
import { ChatUIManagerContextProvider } from "./uiStore";
import { DrawerContextProvider } from "../../../components/Drawer";
const ChatContainer = ({ chatheadId = null }) => {
  return (
    <ChatInterfaceContextProvider chatheadId={chatheadId}>
      <ChatUIManagerContextProvider>
        <DrawerContextProvider>
          <ChatInterface />
        </DrawerContextProvider>
      </ChatUIManagerContextProvider>
    </ChatInterfaceContextProvider>
  );
};

export default ChatContainer;
