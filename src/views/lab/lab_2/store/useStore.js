import { useEffect } from "react";
import useProcessing from "../../../../hooks/useProcessing";
import * as accountApi from "../../../../services/accountServices";
import USER_ACTIONS from "./actions";
import { useNavigate } from "react-router-dom";
export default function useStore(config) {
  const { processing, dispatch: _dispatch } = useProcessing(
    Object.keys(USER_ACTIONS).map((action) => {
      return { action: USER_ACTIONS[action] };
    })
  );
  const navigate = useNavigate();

  return {
    processing,
  };
}
