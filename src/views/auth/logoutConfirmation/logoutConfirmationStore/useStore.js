import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useProcessing from "../../../../hooks/useProcessing";
import USER_ACTIONS from "./actions";
export default function useStore(config) {
  const { processing, dispatch: _dispatch } = useProcessing(
    Object.keys(USER_ACTIONS).map((action) => {
      return { action: USER_ACTIONS[action] };
    })
  );
  const navigate = useNavigate();
  useEffect(() => {}, []);
  return {
    processing,
  };
}
