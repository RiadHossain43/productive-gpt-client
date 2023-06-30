import { useSearchParams } from "react-router-dom";
import useProcessing from "../../../../hooks/useProcessing";
import * as accountApi from "../../../../services/accountServices";
import USER_ACTIONS from "./actions";
import useError from "../../../../hooks/error";
export default function useStore(config) {
  const { processing, dispatch: _dispatch } = useProcessing(
    Object.keys(USER_ACTIONS).map((action) => {
      return { action: USER_ACTIONS[action] };
    })
  );
  let [searchParams] = useSearchParams();
  const userId = searchParams.get("user_id");
  const { handleError } = useError();

  async function resendVerification() {
    try {
      _dispatch({
        [USER_ACTIONS.RESEND_VERIFICATION]: {
          status: true,
          error: false,
          id: null,
        },
      });
      await accountApi.resendVerification({ userId });
      _dispatch({
        [USER_ACTIONS.RESEND_VERIFICATION]: {
          status: false,
          error: false,
          id: null,
        },
      });
    } catch (err) {
      handleError(err);
      _dispatch({
        [USER_ACTIONS.RESEND_VERIFICATION]: {
          status: false,
          error: true,
          id: null,
        },
      });
    }
  }
  return {
    processing,
    resendVerification,
  };
}
