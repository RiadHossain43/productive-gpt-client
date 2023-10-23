import { useState } from "react";
import useProcessing from "../../../../hooks/useProcessing";
import { useApplication } from "../../../../stores/applicationStore";
import USER_ACTIONS from "./actions";
import * as aiApi from "../../../../services/ai/index";
import useError from "../../../../hooks/error";
export default function useStore(config) {
  const { currentUserData, tokenPair, refreshToken } = useApplication();
  const { processing, dispatch: _dispatch } = useProcessing(
    Object.keys(USER_ACTIONS).map((action) => {
      return { action: USER_ACTIONS[action] };
    })
  );
  const { handleError } = useError();
  const [generations, setgenerations] = useState([]);
  async function generateImage(payload) {
    try {
      _dispatch({
        [USER_ACTIONS.PREPARING_FOR_RESPONSE]: {
          status: true,
          error: false,
          id: null,
        },
      });
      let { data } = await aiApi.imageResponse(payload);
      setgenerations((current) => [data.details, ...current]);
      _dispatch({
        [USER_ACTIONS.PREPARING_FOR_RESPONSE]: {
          status: false,
          error: false,
          id: null,
        },
      });
    } catch (err) {
      handleError(err);
      _dispatch({
        [USER_ACTIONS.PREPARING_FOR_RESPONSE]: {
          status: false,
          error: true,
          id: null,
        },
      });
    }
  }

  return {
    processing,
    generateImage,
    generations,
  };
}
