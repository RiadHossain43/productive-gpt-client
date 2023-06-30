import { useState } from "react";
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
  const { currentUserData } = useApplication();
  const [subscription, setSubscription] = useState(null);
  const [payments, setPayments] = useState([]);
  async function manageSubscription() {
    try {
      _dispatch({
        [USER_ACTIONS.GET_FULL_DETAILS]: {
          status: true,
          error: false,
          id: null,
        },
      });
      let { data } = await subscriptionApi.manageSubscription();
      window.location = data?.details?.url
      setPayments(data?.details?.payments);
      _dispatch({
        [USER_ACTIONS.GET_FULL_DETAILS]: {
          status: false,
          error: false,
          id: null,
        },
      });
    } catch (e) {
      console.log(e);
      _dispatch({
        [USER_ACTIONS.GET_FULL_DETAILS]: {
          status: false,
          error: true,
          id: null,
        },
      });
    }
  }
  return {
    processing,
    subscription,
    payments,
    manageSubscription,
  };
}
