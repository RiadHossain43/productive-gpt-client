import { useEffect } from "react";
import useProcessing from "../../../../hooks/useProcessing";
import * as accountApi from "../../../../services/accountServices";
import USER_ACTIONS from "./actions";
import { useNavigate } from "react-router-dom";
import useError from "../../../../hooks/error";
import { useApplication } from "../../../../stores/applicationStore";
export default function useStore(config) {
  const { processing, dispatch: _dispatch } = useProcessing(
    Object.keys(USER_ACTIONS).map((action) => {
      return { action: USER_ACTIONS[action] };
    })
  );
  const navigate = useNavigate();
  const { handleError } = useError();
  const { updateTokenPair } = useApplication();
  async function logout() {
    try {
      _dispatch({
        [USER_ACTIONS.LOGOUT]: {
          status: true,
          error: false,
          id: null,
        },
      });
      await accountApi.logout();
      updateTokenPair(null);
      navigate("/accounts/login");
      _dispatch({
        [USER_ACTIONS.LOGOUT]: {
          status: false,
          error: false,
          id: null,
        },
      });
    } catch (err) {
      handleError(err);
      _dispatch({
        [USER_ACTIONS.LOGOUT]: {
          status: false,
          error: true,
          id: null,
        },
      });
    }
  }
  useEffect(() => {
    setTimeout(() => {
      logout();
    }, 2000);
  }, []);
  return {
    processing,
  };
}
