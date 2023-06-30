import React, { useEffect, useState } from "react";
import usePaginationState from "../../../../hooks/usePaginationState";
import useProcessing from "../../../../hooks/useProcessing";
import useQuery from "../../../../hooks/useQuery";
import { useMainLayout } from "../../../../layouts/main/store";
import * as aiService from "../../../../services/ai";
import * as chatApi from "../../../../services/chatService";
import * as chatheadApi from "../../../../services/chatheadService";
import { useApplication } from "../../../../stores/applicationStore";
import { timePassedSince } from "../../../../utils/timePassedSince";
import USER_ACTIONS from "./actions";
import { mapConversationToApiFormat } from "./promptCutterAlgorithoms/basicSplit";
import { CHAT_REACTIONS } from "../../../../constants";
import useError from "../../../../hooks/error";
/**
 * A single conversation object
 * @typedef {Object} Conversation
 * @property {String} _id  - Id of the pair.
 * @property {String} userPrompt - The prompt user used to generate an answer.
 * @property {String} aliceResponse - Text response from alice the bot.
 * @property {String} time - time or how long ago.
 * @property {Boolean} isViewd - This indicates wheather a message is viewed of not. Usefull for typing response.
 * @property {Object} reaction - This is the reaction
 */
/**
 * @callback ConversationsStateSetterCallback
 * @param {Array.<Conversation>} conversations
 * @returns {Array.<Conversation>}
 */
/**
 * Currently streaming conversation object
 * @typedef {Object} CurrentStream
 * @property {String} responseStream - updated response stream as typing in progress.
 * @property {String} prompt - prompt users asked for.
 * @property {Object|null} user - user object
 * @property {Boolean} isStreamComplete - indicates wheather a stream is still in progresss.
 */
/**
 * @callback CurrentSreamingSetterCallback
 * @param {CurrentStream} conversations
 * @returns {CurrentStream}
 */
export default function useStore(config) {
  const { currentUserData, tokenPair, refreshToken } = useApplication();
  /** @type {[Array.<Conversation>,React.Dispatch< ConversationsStateSetterCallback >]} */
  const [conversations, setConversations] = useState([]);
  /** @type {[CurrentStream,React.Dispatch< CurrentSreamingSetterCallback >]} */
  const [currentlyStreaming, setCurrentlyStreaming] = useState(null);
  /**
   * here we are only setting the chat head ones and not relying on use effect because
   * chathead state is not allowed to be changed from outside in this hooks lifecycle.
   */
  const [chathead, setCheatHead] = useState(null);
  const { processing, dispatch: _dispatch } = useProcessing(
    Object.keys(USER_ACTIONS).map((action) => {
      return { action: USER_ACTIONS[action] };
    })
  );
  let { pagination, updatePaginaion } = usePaginationState();
  const { handleError } = useError();
  const chatQuery = useQuery();
  const { createChathead, updateChathead, activateChathead, activeBot } =
    useMainLayout();
  async function generateResponse(payload) {
    try {
      setCurrentlyStreaming(null);
      _dispatch({
        [USER_ACTIONS.PREPARING_FOR_RESPONSE]: {
          status: true,
          error: false,
          id: null,
        },
      });
      /** @type {Array.<Conversation>} prevChat */
      await aiService.streamResponse(
        {
          prompt: payload.prompt,
          systemInstructions: [activeBot.prompt],
          conversation: mapConversationToApiFormat(conversations),
        },
        {
          headers: {
            "x-auth-accesstoken": tokenPair?.accessToken,
          },
          onStream: function (streamString) {
            /** updating stream state */
            setCurrentlyStreaming((prev) => {
              let currentResponseStream = prev?.responseStream
                ? prev.responseStream + streamString
                : streamString;
              return {
                ...prev,
                user: currentUserData,
                prompt: payload.prompt,
                responseStream: currentResponseStream,
                isStreamComplete: false,
              };
            });
          },
          onError: function (err) {
            console.log(err);
          },
          onTokenRefreshNeed: async function () {
            return { tokenPair: await refreshToken() };
          },
          onStreamEnd: function (fullStreamString) {
            setCurrentlyStreaming((prev) => {
              return {
                ...prev,
                user: currentUserData,
                responseStream: fullStreamString,
                isStreamComplete: true,
              };
            });
            setConversations((prevConversations) => {
              let newconversation = {};
              if (fullStreamString)
                newconversation = {
                  _id: undefined,
                  reaction: CHAT_REACTIONS.EMPTY,
                  aliceResponse: fullStreamString,
                  userPrompt: payload.prompt,
                  time: timePassedSince(new Date()),
                  isViewd: true,
                };
              return [...prevConversations, newconversation];
            });
            /**
             * first prompt is special prompt where chat head is auto created.
             * so we don't create the first chat from here. any oher chat we add it from
             * here after a response is generated.
             */
            if (chathead && conversations.length >= 1) {
              createChat({
                chathead: chathead._id,
                prompt: payload.prompt,
                response: fullStreamString,
              });
            }
          },
        }
      );
      _dispatch({
        [USER_ACTIONS.PREPARING_FOR_RESPONSE]: {
          status: false,
          error: false,
          id: null,
        },
      });
    } catch (err) {
      console.log(err);
      _dispatch({
        [USER_ACTIONS.PREPARING_FOR_RESPONSE]: {
          status: false,
          error: true,
          id: null,
        },
      });
    }
  }
  async function _loadChathead(id) {
    try {
      _dispatch({
        [USER_ACTIONS.LOAD_CHATHEAD]: {
          status: true,
          error: false,
          id: null,
        },
      });
      let { data } = await chatheadApi.getChatead(id);
      setCheatHead(data.details.chathead);
      _dispatch({
        [USER_ACTIONS.LOAD_CHATHEAD]: {
          status: false,
          error: false,
          id: null,
        },
      });
    } catch (err) {
      handleError(err);
      _dispatch({
        [USER_ACTIONS.LOAD_CHATHEAD]: {
          status: false,
          error: true,
          id: null,
        },
      });
    }
  }
  async function _loadChats(queryString) {
    try {
      _dispatch({
        [USER_ACTIONS.LOAD_CHATS]: {
          status: true,
          error: false,
          id: null,
        },
      });
      let { data } = await chatApi.listChats(queryString);
      updatePaginaion(data.details.pagination);
      setConversations((conversations) => {
        let newChats = data.details.chats
          .map((chat) => ({
            _id: chat?._id,
            aliceResponse: chat.response,
            userPrompt: chat.prompt,
            time: timePassedSince(chat.createdAt),
            isViewd: true,
            reaction: chat.reaction,
          }))
          .reverse();
        return [...newChats, ...conversations];
      });
      _dispatch({
        [USER_ACTIONS.LOAD_CHATS]: {
          status: false,
          error: false,
          id: null,
        },
      });
    } catch (err) {
      handleError(err);
      _dispatch({
        [USER_ACTIONS.LOAD_CHATS]: {
          status: false,
          error: true,
          id: null,
        },
      });
    }
  }
  async function loadMoreChats() {
    if (pagination.hasNextPage) {
      chatQuery.handlePagination(pagination.nextPage);
    }
  }
  async function createChat(payload) {
    try {
      _dispatch({
        [USER_ACTIONS.CREATE_CHAT]: {
          status: true,
          error: false,
          id: null,
        },
      });
      let { data } = await chatApi.createChat({
        chathead: payload?.chathead,
        prompt: payload.prompt,
        response: payload.response,
      });
      setConversations((prevConversations) => {
        return prevConversations.map((c) => {
          if (!c._id)
            return {
              ...c,
              _id: data.details.chat?._id,
            };
          return c;
        });
      });
      _dispatch({
        [USER_ACTIONS.CREATE_CHAT]: {
          status: false,
          error: false,
          id: null,
        },
      });
    } catch (err) {
      console.log(err);
      _dispatch({
        [USER_ACTIONS.CREATE_CHAT]: {
          status: false,
          error: true,
          id: null,
        },
      });
    }
  }
  async function autoCreateChathead() {
    /**
     * We are creating a new chathead if conversation is only one and no chathead set.
     * This case will arise only in case of a new chat with a first message.
     */
    if (!chathead?._id && conversations.length === 1) {
      const chathead = await createChathead({
        name: "New chat",
        description: conversations[0].userPrompt,
      });
      setCheatHead(chathead);
      createChat({
        chathead: chathead?._id,
        prompt: conversations[0].userPrompt,
        response: conversations[0].aliceResponse,
      });
    }
  }
  async function autoEntitleChathead() {
    try {
      /**
       * We are updating a chathead name if conversation has reached to count 3.
       */
      if (chathead?._id && conversations.length === 2) {
        /** update the title for this chathead through ai. */
        let { data } = await aiService.normalResponse({
          prompt: `
Please generate a suitable title-phrase on the last three conversation, 
make sure you just give the phrase only, finish it within 100 charecters.
      `,
          conversation: mapConversationToApiFormat(conversations, {
            maxConversation: 2,
            charecterLimit: 4500,
          }),
        });
        updateChathead(chathead?._id, {
          name: data.details.responseMessage,
          description:
            conversations[conversations.length - 1]?.userPrompt || "",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
  function updateCheatheadDescription() {
    if (chathead?._id) {
      updateChathead(chathead?._id, {
        name: chathead.metaData?.name,
        /**
         * we are setting latest prompt so users knows letter about the chat.
         * description is updated only if an prompt is there.
         */
        description: conversations[conversations.length - 1]?.userPrompt || "",
      });
    }
  }
  async function reactOnChat(id, payload) {
    const oldReaction = conversations.find((c) => c._id === id)?.reaction;
    try {
      _dispatch({
        [USER_ACTIONS.REACT_ON_CHAT]: {
          status: true,
          error: false,
          id: null,
        },
      });
      setConversations((prevConversations) => {
        return prevConversations.map((c) =>
          c._id === id
            ? {
                ...c,
                reaction: payload.reaction,
              }
            : c
        );
      });
      await chatApi.reactOnChat(id, payload);
      _dispatch({
        [USER_ACTIONS.REACT_ON_CHAT]: {
          status: false,
          error: false,
          id: null,
        },
      });
    } catch (err) {
      console.log(err);
      _dispatch({
        [USER_ACTIONS.REACT_ON_CHAT]: {
          status: false,
          error: true,
          id: null,
        },
      });
      setConversations((prevConversations) => {
        return prevConversations.map((c) =>
          c._id === id
            ? {
                ...c,
                reaction: oldReaction,
              }
            : c
        );
      });
    }
  }
  function fullReset() {
    setConversations([]);
    setCheatHead(null);
    setCurrentlyStreaming(null);
    updatePaginaion();
    chatQuery.fullReset();
  }
  useEffect(() => {
    autoCreateChathead();
    autoEntitleChathead();
  }, [conversations]);
  useEffect(() => {
    fullReset();
    if (config.chatheadId) {
      /** load chathead if provided otherwise leave it as it is */
      _loadChathead(config.chatheadId);
      /** load all chats related to this chat head if chat head is provided */
      chatQuery.handleRequired({
        value: {
          chathead: config.chatheadId,
          sort: "-createdAt",
        },
      });
    }
    /** we are activating the current chathead for ui logics */
    activateChathead(config.chatheadId || null);
    /** henale logics before user leaves current chat. */
    return () => {
      updateCheatheadDescription();
    };
  }, [config.chatheadId]); // do not put chatheadId dependency here. it's meant for one time initialisation
  useEffect(() => {
    /** load chathead if provided otherwise leave it as it is */
    if (chatQuery.toolState.required.value?.chathead)
      _loadChats(chatQuery.getQuery());
  }, [chatQuery.query]);
  return {
    processing,
    currentlyStreaming,
    conversations,
    generateResponse,
    loadMoreChats,
    reactOnChat,
  };
}
