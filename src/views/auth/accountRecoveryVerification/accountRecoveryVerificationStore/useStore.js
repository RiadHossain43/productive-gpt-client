import { useNavigate, useSearchParams } from "react-router-dom";
import useProcessing from "../../../../hooks/useProcessing";
import * as accountApi from "../../../../services/accountServices";
import USER_ACTIONS from "./actions";
import useError from "../../../../hooks/error";
import { toast } from "react-toastify";
export default function useStore(config) {
  const { processing, dispatch: _dispatch } = useProcessing(
    Object.keys(USER_ACTIONS).map((action) => {
      return { action: USER_ACTIONS[action] };
    })
  );
  let navigate = useNavigate();
  const { handleError } = useError();

  const [searchParams] = useSearchParams();
  let recoveryToken = searchParams.get("recovery_token");
  async function verifyRecovery(payload) {
    try {
      _dispatch({
        [USER_ACTIONS.RECOVER_ACCOUNT]: {
          status: true,
          error: false,
          id: null,
        },
      });
      await accountApi.verifyRecovery({
        password: payload.password,
        token: recoveryToken,
      });
      toast.success("Password changed.");
      navigate("/accounts/login");
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
    }
  }
  return {
    processing,
    verifyRecovery,
  };
}
