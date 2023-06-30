import { useEffect, useRef, useState } from "react";
import useProcessing from "../../../../hooks/useProcessing";
import { useImageGalary } from "../store";
import USER_ACTIONS from "./actions";
import { useParams } from "react-router-dom";
export default function useStore(config) {
  const { currentlyStreaming, conversations, loadMoreChats } =
    useImageGalary();
  const [firstLoadAutoScrolled, setFirstLoadAutoScrolled] = useState(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const { processing, dispatch: _dispatch } = useProcessing(
    Object.keys(USER_ACTIONS).map((action) => {
      return { action: USER_ACTIONS[action] };
    })
  );
  const conversationContainerElement = useRef(null);
  function scrollToBottom() {
    setShowScrollButton(false);
    if (conversationContainerElement?.current) {
      const { scrollHeight, clientHeight } =
        conversationContainerElement.current;
      // console.log(scrollHeight, clientHeight);
      conversationContainerElement.current.scrollTop =
        scrollHeight - clientHeight;
    }
  }
  useEffect(() => {
    if (conversationContainerElement?.current) {
      const { scrollHeight, clientHeight, scrollTop } =
        conversationContainerElement.current;
      if (Math.abs(scrollHeight - clientHeight - scrollTop) < 250) {
        scrollToBottom();
      } else setShowScrollButton(true);
    }
  }, [currentlyStreaming]);
  let params = useParams();
  useEffect(() => {
    let latestChatheadId = params.chatheadId;
    if (
      conversationContainerElement?.current &&
      latestChatheadId !== firstLoadAutoScrolled &&
      conversations.length
    ) {
      const { scrollHeight, clientHeight, scrollTop } =
        conversationContainerElement.current;
      if (Math.abs(scrollHeight - clientHeight - scrollTop) > 10) {
        scrollToBottom();
        setFirstLoadAutoScrolled(params.chatheadId);
      }
    }
  }, [conversations]);
  function handelScroll() {
    const { scrollTop } = conversationContainerElement.current;
    if (scrollTop < 1) loadMoreChats();
  }
  return {
    processing,
    scrollToBottom,
    showScrollButton,
    handelScroll,
    conversationContainerElement,
  };
}
