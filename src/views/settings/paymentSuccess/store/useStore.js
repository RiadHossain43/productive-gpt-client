import { useEffect } from "react";
import useProcessing from "../../../../hooks/useProcessing";
import { useApplication } from "../../../../stores/applicationStore";
import USER_ACTIONS from "./actions";
import { useNavigate } from "react-router-dom";

export default function useStore(config) {
  const { processing, dispatch: _dispatch } = useProcessing(
    Object.keys(USER_ACTIONS).map((action) => {
      return { action: USER_ACTIONS[action] };
    })
  );
  const navigate = useNavigate();
  const { refreshCache } = useApplication();
  useEffect(() => {
    /** here set timeout has been put for UX only so users can read the UI */
    setTimeout(async () => {
      await refreshCache();
      navigate("/chat");
    }, 2000);
  }, []);
  return {
    processing,
  };
}
