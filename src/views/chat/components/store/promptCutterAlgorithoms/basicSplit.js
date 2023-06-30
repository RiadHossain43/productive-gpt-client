const defaultOptions = { maxConversation: 3, charecterLimit: 5250 };
export function mapConversationToApiFormat(
  conversations,
  options = defaultOptions
) {
  const CHAR_LIMIT = options.charecterLimit || defaultOptions.charecterLimit;
  const MAX_CONVERSATION =
    options.maxConversation || defaultOptions.charecterLimit;
  let prevChat = [];
  let charecterLimit = "";
  /**
   * the simple algorithm makes sure the promps never exceed 6500 charecters.
   * this algorihom can be improved in future.
   */
  conversations
    .slice(conversations.length - MAX_CONVERSATION)
    /**
     * we need to reverse the array to make sure we are processing
     * the chat pair from the latest message, so even if we have to cut any response
     * it's not cut from the most recent, rather cut from the third  one from the latest message
     */
    .reverse()
    .forEach((c) => {
      let currentLimit = charecterLimit;
      console.log("Message set:", c.userPrompt);
      console.log("current chareters:", currentLimit.length);
      charecterLimit = charecterLimit + c.aliceResponse;
      console.log("if concatinated chareters:", currentLimit.length);
      /**
       * we add the response first so the order/sequence is maintained line [ user , assistant ]
       */
      /**
       * if charecter limit exceeds in the current iteration then add only the remaining one
       * and leave the other.
       */
      if (charecterLimit.length < CHAR_LIMIT) {
        console.log("no need to skip:");
        prevChat.unshift({
          role: "assistant",
          content: c.aliceResponse,
        });
      } else {
        /**
         * for the last chunk we only take the remaining charecters from the response prompts
         * begining portion.
         */
        let remain = CHAR_LIMIT - currentLimit.length;
        remain = remain > 0 ? remain : 0;
        console.log("need cutting chareters:", remain);
        if (remain) {
          prevChat.unshift({
            role: "assistant",
            content: c.aliceResponse.slice(0, remain),
          });
        }
      }
      /**
       * we also push user prompt regardless of the length
       * this comes up with the risk of larger prompt by user breaking the
       * response.
       */
      prevChat.unshift({
        role: "user",
        content: c.userPrompt,
      });
    });
  return prevChat;
}
