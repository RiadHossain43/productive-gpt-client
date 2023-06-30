import { useNavigate, useSearchParams } from "react-router-dom";
import useProcessing from "../../../../hooks/useProcessing";
import * as accountApi from "../../../../services/accountServices";
import * as userApi from "../../../../services/userServices";
import USER_ACTIONS from "./actions";
import useError from "../../../../hooks/error";
import { useApplication } from "../../../../stores/applicationStore";
import { toast } from "react-toastify";
export default function useStore(config) {
  const { processing, dispatch: _dispatch } = useProcessing(
    Object.keys(USER_ACTIONS).map((action) => {
      return { action: USER_ACTIONS[action] };
    })
  );
  const [searchParams] = useSearchParams();
  let registrationToken = searchParams.get("registration_token");
  let navigate = useNavigate();
  const { handleError } = useError();
  const { refreshCache, tokenPair, currentUserData } = useApplication();
  async function verifyRegistration() {
    try {
      _dispatch({
        [USER_ACTIONS.VERIFY_REGISTRATION]: {
          status: true,
          error: false,
          id: null,
        },
      });
      await accountApi.verifyRegistration({
        token: registrationToken,
      });
      toast.success("Account verified.");
      _dispatch({
        [USER_ACTIONS.VERIFY_REGISTRATION]: {
          status: false,
          error: false,
          id: null,
        },
      });
      /**
       * in case user doen't have any token pair setup this if block will execute
       * a good example is user not opening the the verification email with the same browser.
       */
      if (!tokenPair || !currentUserData?._id)
        return navigate("/accounts/login");
      await refreshCache();
      navigate("/chat");
    } catch (err) {
      handleError(err);
      _dispatch({
        [USER_ACTIONS.VERIFY_REGISTRATION]: {
          status: false,
          error: true,
          id: null,
        },
      });
    }
  }
  return {
    processing,
    verifyRegistration,
  };
}
