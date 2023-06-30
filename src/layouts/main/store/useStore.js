import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useProcessing from "../../../hooks/useProcessing";
import USER_ACTIONS from "./actions";
import * as chatheadApi from "../../../services/chatheadService";
import * as userApi from "../../../services/userServices";
import { DEFAULT_PROMPTS } from "../../../constants";
import useError from "../../../hooks/error";
import usePaginationState from "../../../hooks/usePaginationState";
import useQuery from "../../../hooks/useQuery";
import { toast } from "react-toastify";
import { useApplication } from "../../../stores/applicationStore/index";
export default function useStore(config) {
  const { processing, dispatch: _dispatch } = useProcessing(
    Object.keys(USER_ACTIONS).map((action) => {
      return { action: USER_ACTIONS[action] };
    })
  );
  const mainContentReference = useRef(null);
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const [runUserJourney, setRunUserJourney] = useState(false);
  const [activeBot, setActiveBot] = useState(DEFAULT_PROMPTS.DEFAULT);
  const { handleError } = useError();
  const [activeChathead, setActiveChathead] = useState(null);
  const [chatheads, setChatheads] = useState([]);
  let { pagination, updatePaginaion } = usePaginationState();
  const chatHeadQuery = useQuery();
  const { refreshCache, currentUserData } = useApplication();
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainContentReference) {
      mainContentReference.current.scrollTop = 0;
    }
  }, [location]);
  async function createChathead(payload) {
    try {
      _dispatch({
        [USER_ACTIONS.CREATE_CHEADHEADS]: {
          status: true,
          error: false,
          id: null,
        },
      });
      let { data } = await chatheadApi.createChatead(payload);
      setChatheads((prevChats) => [data.details.chathead, ...prevChats]);
      _dispatch({
        [USER_ACTIONS.CREATE_CHEADHEADS]: {
          status: false,
          error: false,
          id: null,
        },
      });
      return data.details.chathead;
    } catch (err) {
      handleError(err);
      _dispatch({
        [USER_ACTIONS.CREATE_CHEADHEADS]: {
          status: false,
          error: true,
          id: null,
        },
      });
    }
  }
  async function updateChathead(id, payload) {
    try {
      _dispatch({
        [USER_ACTIONS.UPDATE_CHEADHEADS]: {
          status: true,
          error: false,
          id: null,
        },
      });
      let { data } = await chatheadApi.updateChathead(id, payload);
      setChatheads((prevChats) =>
        prevChats.map((ch) => {
          if (ch?._id === data.details.chathead?._id) {
            return data.details.chathead;
          }
          return ch;
        })
      );
      _dispatch({
        [USER_ACTIONS.UPDATE_CHEADHEADS]: {
          status: false,
          error: false,
          id: null,
        },
      });
      // toast.success("Chathead updated");
      return data.details.chathead;
    } catch (err) {
      handleError(err);
      _dispatch({
        [USER_ACTIONS.UPDATE_CHEADHEADS]: {
          status: false,
          error: true,
          id: null,
        },
      });
    }
  }
  /** this function is only for using in background so user does not need to know. */
  async function updateUserActivityStatus(id, payload) {
    try {
      await userApi.updateUserActivityStatus(id, { status: "Active" });
      await refreshCache();
    } catch (err) {}
  }
  async function deleteChathead(id) {
    try {
      _dispatch({
        [USER_ACTIONS.DELETE_CHATHEAD]: {
          status: true,
          error: false,
          id: null,
        },
      });
      let { data } = await chatheadApi.hardDeleteChatead(id);
      setChatheads((prevChats) => prevChats.filter((ch) => ch?._id !== id));
      toast.success("Conversation deleted.");
      /**
       * we are checking if this chathead is open in chat current chat interface.
       * if so we should redirect them to new-chat because this chat is just deleted.
       */
      if (activeChathead?._id === id || !params?.chatheadId)
        navigate("/new-chat");
      _dispatch({
        [USER_ACTIONS.DELETE_CHATHEAD]: {
          status: false,
          error: false,
          id: null,
        },
      });
      return data.details.chathead;
    } catch (err) {
      handleError(err);
      _dispatch({
        [USER_ACTIONS.DELETE_CHATHEAD]: {
          status: false,
          error: true,
          id: null,
        },
      });
    }
  }
  async function _loadChatheads(query = "") {
    try {
      _dispatch({
        [USER_ACTIONS.LOAD_CHATHEADS]: {
          status: true,
          error: false,
          id: null,
        },
      });
      let { data } = await chatheadApi.listChateads(query);
      setChatheads((prevChs) => [...prevChs, ...data.details.chatheads]);
      updatePaginaion(data.details.pagination);
      _dispatch({
        [USER_ACTIONS.LOAD_CHATHEADS]: {
          status: false,
          error: false,
          id: null,
        },
      });
    } catch (err) {
      handleError(err);
      _dispatch({
        [USER_ACTIONS.LOAD_CHATHEADS]: {
          status: false,
          error: true,
          id: null,
        },
      });
    }
  }
  function activateChathead(id = null) {
    setActiveChathead(chatheads.find((ch) => ch._id === id));
  }
  function chageBot(bot) {
    setActiveBot(bot);
  }
  function loadMoreChatHeads() {
    if (pagination.hasNextPage) {
      chatHeadQuery.handlePagination(pagination.nextPage);
    }
  }
  useEffect(() => {
    _loadChatheads(chatHeadQuery.getQuery());
  }, [chatHeadQuery.query]);
  useEffect(() => {
    loadMoreChatHeads();
  }, [chatheads]);
  useEffect(() => {
    if (currentUserData?._id && currentUserData?.activity.status === "Never") {
      setRunUserJourney(true);
      updateUserActivityStatus(currentUserData?._id);
    }
  });
  return {
    processing,
    chatheads,
    activeBot,
    activeChathead,
    chageBot,
    loadMoreChatHeads,
    createChathead,
    updateChathead,
    deleteChathead,
    activateChathead,
    updateUserActivityStatus,
    runUserJourney,
    mainContentReference,
  };
}
