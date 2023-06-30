import React from "react";
import ChatContainer from "./components/ChatContainer";
import { useParams } from "react-router-dom";
const ExistingChat = ({}) => {
  const params = useParams();
  return <ChatContainer chatheadId={params.chatheadId} />;
};

export default ExistingChat;
