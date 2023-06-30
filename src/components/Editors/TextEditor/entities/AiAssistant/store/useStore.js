import { useState } from "react";
import useProcessing from "../../../../../../hooks/useProcessing";
import USER_ACTIONS from "./actions";
import * as aiService from "../../../../../../services/ai/converstion";
export default function useStore(config) {
  const { processing, dispatch: _dispatch } = useProcessing(
    Object.keys(USER_ACTIONS).map((action) => {
      return { action: USER_ACTIONS[action] };
    })
  );
  let [refinedText, setRefinedText] = useState("");
  async function generate(payload) {
    try {
      _dispatch({
        [USER_ACTIONS.GENERATE]: {
          status: true,
          error: false,
          id: null,
        },
      });
      let { data } = await aiService.normalResponse(payload);
      setRefinedText(data.details.responseMessage);
      _dispatch({
        [USER_ACTIONS.GENERATE]: {
          status: false,
          error: false,
          id: null,
        },
      });
    } catch (err) {
      console.log(err);
      _dispatch({
        [USER_ACTIONS.GENERATE]: {
          status: false,
          error: true,
          id: null,
        },
      });
    }
  }
  return {
    processing,
    refinedText,
    generate,
  };
}
