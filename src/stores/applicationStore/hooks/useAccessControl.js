import { useEffect } from "react";
import * as accountService from "../../../services/accountServices";
import httpService from "../../../services/httpServices";
import * as userService from "../../../services/userServices";
import useProcessing from "../../../hooks/useProcessing";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import jwtDecode from "jwt-decode";
const SYSTEM_ACTIONS = {
  REFRESH_TOKEN: "refrsh-token",
};
/**
 * this hook not recomended to use outside of this store in anny component directly.
 * the store exposes utility function based on this hook to maintain ui logics.
 */
export default function useAccessControl() {
  const [currentUserData, setCurrentUserData] = useState(null);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [tokenPair, setTokenPair] = useState(null);
  const navigate = useNavigate();
  const { processing, dispatch: _dispatch } = useProcessing(
    Object.keys(SYSTEM_ACTIONS).map((action) => {
      return { action: SYSTEM_ACTIONS[action] };
    })
  );
  function isLoggedIn() {
    let tokenpair = accountService.getTokenPair();
    if (tokenPair?.accessToken && tokenPair?.refreshToken) return true;
    return false;
  }
  /** following function initates user from cache at first load. */
  function _setCurrentUserData() {
    if (userService.getUserProfileFromCache()) {
      return setCurrentUserData(userService.getUserProfileFromCache());
    }
  }
  function isUserVerified() {
    let _user = currentUserData || userService.getUserProfileFromCache();
    if (_user?.emailVerification?.status === "Pending") return false;
    return true;
  }
  function getTrialDays(trailAllowed = 8) {
    let _user = currentUserData || userService.getUserProfileFromCache();
    const today = new Date();
    const end = new Date(_user?.createdAt);
    end.setDate(end.getDate() + trailAllowed);
    const diffInMs = end - today;
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  }
  function updateTokenPair(tokenPair) {
    setTokenPair(tokenPair);
  }
  function getAccessTokenData() {
    if (!tokenPair?.accessToken) return null;
    try {
      let data = jwtDecode(tokenPair?.accessToken);
      return data;
    } catch (ex) {
      return null;
    }
  }
  /**
   * this follwoing function sets the access tokens at the point when the full application
   * mounts. How this works:
   * Following function gets invoked. If the browser contains a valid refreshtoken cookie
   * it tries to refresh the token with an api request. in case of failiure we gracefully
   * logout the user or do all cleanups.
   *
   */
  async function refreshToken() {
    /**
     * we are only trying to initiate the application with a token
     * refresh if the browser contains user info in localstorage
     */
    if (!userService.getUserProfileFromCache()) {
      if (!initialLoadComplete) setInitialLoadComplete(true);
      return;
    }
    try {
      _dispatch({
        [SYSTEM_ACTIONS.REFRESH_TOKEN]: {
          status: true,
          error: false,
          id: null,
        },
      });
      let { data } = await accountService.refreshToken();
      setTokenPair(data.details);
      httpService.setJwt(
        data?.details?.accessToken,
        data?.details?.refreshToken
      );
      _dispatch({
        [SYSTEM_ACTIONS.REFRESH_TOKEN]: {
          status: false,
          error: false,
          id: null,
        },
      });
      if (!initialLoadComplete) setInitialLoadComplete(true);
      return data.details;
    } catch (err) {
      if (!initialLoadComplete) setInitialLoadComplete(true);
      navigate("/accounts/logout");
      _dispatch({
        [SYSTEM_ACTIONS.REFRESH_TOKEN]: {
          status: false,
          error: true,
          id: null,
        },
      });
    }
  }
  async function _cacheUserData() {
    if (getAccessTokenData()?.user?._id)
      try {
        let { data } = await userService.getUserInfo(
          getAccessTokenData()?.user?._id
        );
        userService.cacheUserProfile(data.details.user);
        setCurrentUserData(data.details.user);
      } catch (err) {}
  }
  function refreshCache() {
    return _cacheUserData();
  }
  useEffect(() => {
    (async function () {
      await refreshToken();
      _setCurrentUserData();
    })();
  }, []);
  return {
    initialLoadComplete,
    tokenPair,
    refreshInProgress: processing[SYSTEM_ACTIONS.REFRESH_TOKEN].status,
    isLoggedIn,
    getAccessTokenData,
    updateTokenPair,
    currentUserData,
    isUserVerified,
    getTrialDays,
    refreshToken,
    refreshCache,
  };
}
