import useProcessing from "../../../../hooks/useProcessing";
import USER_ACTIONS from "./actions";
import * as subscriptionApi from "../../../../services/subscriptionService";
import { useApplication } from "../../../../stores/applicationStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function useStore(config) {
  const { processing, dispatch: _dispatch } = useProcessing(
    Object.keys(USER_ACTIONS).map((action) => {
      return { action: USER_ACTIONS[action] };
    })
  );
  let navigate = useNavigate();
  const { refreshCache, currentUserData } = useApplication();
  async function subscribe(payload) {
    try {
      _dispatch({
        [USER_ACTIONS.SUBSCRIBE]: {
          status: true,
          error: false,
          id: null,
        },
      });
      await subscriptionApi.subscribe(payload);
      await refreshCache();
      navigate(`/chat`);
      _dispatch({
        [USER_ACTIONS.SUBSCRIBE]: {
          status: false,
          error: false,
          id: null,
        },
      });
    } catch (e) {
      console.log(e);
      _dispatch({
        [USER_ACTIONS.SUBSCRIBE]: {
          status: false,
          error: true,
          id: null,
        },
      });
    }
  }
  useEffect(() => {
    if (currentUserData?.subscriptionInformation?.status === "Subscribed")
      navigate("/payments/cancel-subscription");
  }, []);
  return {
    processing,
    subscribe,
  };
}
