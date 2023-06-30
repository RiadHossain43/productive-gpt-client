import useProcessing from "../../../../hooks/useProcessing";
import USER_ACTIONS from "./actions";
import * as accountApi from "../../../../services/accountServices";
import { useNavigate } from "react-router-dom";
import useError from "../../../../hooks/error";
import { useApplication } from "../../../../stores/applicationStore";
export default function useStore(config) {
  const { processing, dispatch: _dispatch } = useProcessing(
    Object.keys(USER_ACTIONS).map((action) => {
      return { action: USER_ACTIONS[action] };
    })
  );
  let navigate = useNavigate();
  const { handleError } = useError();
  const { updateTokenPair } = useApplication();
  async function registerAccount(payload) {
    try {
      _dispatch({
        [USER_ACTIONS.REGISTRATION]: {
          status: true,
          error: false,
          id: null,
        },
      });
      let { data } = await accountApi.registerAccount(payload);
      updateTokenPair({
        accessToken: data.details?.accessToken,
        refreshToken: data.details?.refreshToken,
      });
      navigate(
        `/accounts/auth-success?user_id=${data.details?.user?._id}&redirect=/accounts/pending-verification/?user_id=${data.details?.user?._id}`
      );
      _dispatch({
        [USER_ACTIONS.REGISTRATION]: {
          status: false,
          error: false,
          id: null,
        },
      });
    } catch (err) {
      handleError(err);
      _dispatch({
        [USER_ACTIONS.REGISTRATION]: {
          status: false,
          error: true,
          id: null,
        },
      });
    }
  }
  return {
    processing,
    registerAccount,
  };
}
