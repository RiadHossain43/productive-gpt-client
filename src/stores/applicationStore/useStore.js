import { useEffect } from "react";
import { toast } from "react-toastify";
import useProcessing from "../../hooks/useProcessing";
import http from "../../services/httpServices";
import USER_ACTIONS from "./actions";
import useAccessControl from "./hooks/useAccessControl";
import usePayment from "./hooks/usePayment";
const RT_REUSE_DETECTION = {};
export default function useStore(config) {
  const { processing, dispatch: _dispatch } = useProcessing(
    Object.keys(USER_ACTIONS).map((action) => {
      return { action: USER_ACTIONS[action] };
    })
  );
  const {
    initialLoadComplete,
    tokenPair,
    refreshToken,
    isLoggedIn,
    refreshCache,
    updateTokenPair: _updateTokenPair,
    currentUserData,
    isUserVerified,
    getTrialDays,
  } = useAccessControl();
  const paymentUtils = usePayment();
  function updateTokenPair(tokenPair) {
    http.instance.defaults.headers.common["x-auth-accesstoken"] =
      tokenPair?.accessToken;
    _updateTokenPair(tokenPair);
  }
  useEffect(() => {
    refreshCache();
  }, []);
  useEffect(() => {
    let requestInterceptor = http.instance.interceptors.request.use(
      async (config) => config,
      (error) => {
        const expectedError =
          error.response &&
          error.response.status >= 400 &&
          error.response.status < 500;
        if (!expectedError) {
          toast("Request error does not lie within expacted range.");
        }
        return Promise.reject(error);
      }
    );
    let responseInterceptor = http.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        const expectedError =
          error.response &&
          error.response.status >= 400 &&
          error.response.status < 500;
        const needRefresh =
          expectedError &&
          error.response.status === 401 &&
          error.response.data?.details?.description === "Invalid access token.";
        console.log("refresh needs:", needRefresh);
        if (needRefresh) {
          if (RT_REUSE_DETECTION["active-token"]) {
            delete RT_REUSE_DETECTION["active-token"];
            let newTokenPair = await refreshToken();
            originalRequest.headers["x-auth-accesstoken"] =
              newTokenPair.accessToken;
          }
          return http.instance(originalRequest);
        }
        if (
          expectedError &&
          error.response.data &&
          error.response.status === 440
        ) {
          window.location = "/accounts/logout";
        }
        return Promise.reject(error);
      }
    );
    return () => {
      http.instance.interceptors.request.eject(requestInterceptor);
      http.instance.interceptors.response.eject(responseInterceptor);
    };
  }, []);
  useEffect(() => {
    RT_REUSE_DETECTION["active-token"] = tokenPair?.refreshToken;
  }, [tokenPair]);
  return {
    processing,
    tokenPair,
    isApplicationReady: initialLoadComplete,
    refreshToken,
    isLoggedIn,
    currentUserData,
    isUserVerified,
    getTrialDays,
    refreshCache,
    updateTokenPair,
    ...paymentUtils,
  };
}
