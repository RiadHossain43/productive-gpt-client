import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useProcessing from "../../../../hooks/useProcessing";
import { useApplication } from "../../../../stores/applicationStore";
import USER_ACTIONS from "./actions";
export default function useStore(config) {
  const { processing, dispatch: _dispatch } = useProcessing(
    Object.keys(USER_ACTIONS).map((action) => {
      return { action: USER_ACTIONS[action] };
    })
  );
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");
  const { refreshCache } = useApplication();
  let navigate = useNavigate();
  async function cacheData() {
    await refreshCache();
    setTimeout(() => {
      navigate(redirect);
    }, 1000);
  }
  useEffect(() => {
    cacheData();
  }, []);
  return {
    processing,
  };
}
