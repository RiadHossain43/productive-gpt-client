import { Button } from "reactstrap";
import React, { useMemo } from "react";
import { GiFallDown } from "react-icons/gi";
import ChatInput from "../../../components/Chat/ChatInput";
import ChatStripePrompt from "../../../components/Chat/ChatStripePrompt";
import ChatStripeResponse from "../../../components/Chat/ChatStripeResponse";
import { useApplication } from "../../../stores/applicationStore";
import Loadingchats from "./Loadingchats";
import Streamer from "./Streamer";
import Suggestions from "./Suggestions";
import { USER_ACTIONS, useChatInterface } from "./store";
import { useChatUIManager } from "./uiStore";

const ChatInterface = () => {
  const {
    processing,
    conversations,
    reactOnChat,
    currentlyStreaming,
    generateResponse,
  } = useChatInterface();
  const {
    conversationContainerElement,
    scrollToBottom,
    showScrollButton,
    handelScroll,
  } = useChatUIManager();
  const { currentUserData } = useApplication();
  /**
   * we are rendering memoised chat for better performance.
   */
  const memoisedConversations = useMemo(
    () =>
      conversations.map((conversation) => {
        return (
          <React.Fragment key={conversation._id}>
            <ChatStripePrompt
              avatarSrc={currentUserData?.profileImage?.src}
              promptMessage={conversation.userPrompt}
              time={conversation.time}
            />
            <ChatStripeResponse
              responseMessage={conversation.aliceResponse}
              time={conversation.time}
              reaction={conversation.reaction}
              onReact={(reaction) =>
                reactOnChat(conversation._id, { reaction })
              }
            />
          </React.Fragment>
        );
      }),
    [conversations]
  );
  return (
    <div
      ref={conversationContainerElement}
      className="chat-interface d-flex flex-column"
      onScroll={handelScroll}
    >
      <div className="flex-grow-1">
        {processing[USER_ACTIONS.LOAD_CHATS].status && <Loadingchats />}
        {!memoisedConversations.length && <Suggestions />}
        {memoisedConversations}
        {currentlyStreaming && !currentlyStreaming?.isStreamComplete && (
          <Streamer />
        )}
        <div className="chat-stripe-end-space"></div>
      </div>
      {showScrollButton && (
        <Button
          outline
          className="border-0 chat-scroll-to-bottom-button"
          color="primary"
          onClick={scrollToBottom}
        >
          <GiFallDown />
        </Button>
      )}
      <ChatInput
        avatar={currentUserData?.profileImage?.src}
        onSubmit={(data) => {
          generateResponse(data);
        }}
      />
    </div>
  );
};

export default ChatInterface;
