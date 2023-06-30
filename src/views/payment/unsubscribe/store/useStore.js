import { useNavigate } from "react-router-dom";
import useProcessing from "../../../../hooks/useProcessing";
import * as subscriptionApi from "../../../../services/subscriptionService";
import { useApplication } from "../../../../stores/applicationStore";
import USER_ACTIONS from "./actions";
export default function useStore(config) {
  const { processing, dispatch: _dispatch } = useProcessing(
    Object.keys(USER_ACTIONS).map((action) => {
      return { action: USER_ACTIONS[action] };
    })
  );
  let navigate = useNavigate();
  const { refreshCache } = useApplication();
  async function unsubscribe() {
    try {
      _dispatch({
        [USER_ACTIONS.UNSUBSCRIBE]: {
          status: true,
          error: false,
          id: null,
        },
      });
      await subscriptionApi.unsubscribe();
      await refreshCache();
      navigate(`/chat`);
      _dispatch({
        [USER_ACTIONS.UNSUBSCRIBE]: {
          status: false,
          error: false,
          id: null,
        },
      });
    } catch (e) {
      console.log(e);
      _dispatch({
        [USER_ACTIONS.UNSUBSCRIBE]: {
          status: false,
          error: true,
          id: null,
        },
      });
    }
  }
  return {
    processing,
    unsubscribe,
  };
}
