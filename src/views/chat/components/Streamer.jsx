import React, { useEffect } from "react";
import ChatStripePrompt from "../../../components/Chat/ChatStripePrompt";
import ChatStripeResponse from "../../../components/Chat/ChatStripeResponse";
import Loadingresponse from "./Loadingresponse";
import { USER_ACTIONS, useChatInterface } from "./store";
import { useChatUIManager } from "./uiStore";
import { useApplication } from "../../../stores/applicationStore";

const Streamer = () => {
  const { processing, currentlyStreaming } = useChatInterface();
  const { scrollToBottom } = useChatUIManager();
  const { currentUserData } = useApplication();
  return (
    <React.Fragment>
      <ChatStripePrompt
        avatarSrc={currentUserData?.profileImage?.src}
        promptMessage={currentlyStreaming?.prompt}
      />
      <ChatStripeResponse
        isTyping
        responseMessage={currentlyStreaming?.responseStream}
      />
      {processing[USER_ACTIONS.PREPARING_FOR_RESPONSE].status && (
        <Loadingresponse />
      )}
    </React.Fragment>
  );
};

export default Streamer;
