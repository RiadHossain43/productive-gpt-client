import { useState } from "react";
import useProcessing from "../../../../hooks/useProcessing";
import USER_ACTIONS from "./actions";
import * as accountApi from "../../../../services/accountServices";
import { useNavigate } from "react-router-dom";
import useError from "../../../../hooks/error";
export default function useStore(config) {
  const { processing, dispatch: _dispatch } = useProcessing(
    Object.keys(USER_ACTIONS).map((action) => {
      return { action: USER_ACTIONS[action] };
    })
  );
  const [recoverySuccessEmail, setRecoverSuccessEmail] = useState("");
  let navigate = useNavigate();
  const { handleError } = useError();

  async function recoverAccount(payload) {
    try {
      _dispatch({
        [USER_ACTIONS.RECOVER_ACCOUNT]: {
          status: true,
          error: false,
          id: null,
        },
      });
      let { data } = await accountApi.recoverAccount(payload);
      setRecoverSuccessEmail(data?.details?.email);
      _dispatch({
        [USER_ACTIONS.RECOVER_ACCOUNT]: {
          status: false,
          error: false,
          id: null,
        },
      });
    } catch (err) {
      handleError(err);
      _dispatch({
        [USER_ACTIONS.RECOVER_ACCOUNT]: {
          status: false,
          error: true,
          id: null,
        },
      });
      setRecoverSuccessEmail("");
    }
  }
  return {
    processing,
    recoverAccount,
    recoverySuccessEmail,
  };
}
