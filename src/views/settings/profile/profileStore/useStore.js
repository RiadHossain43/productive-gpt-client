import { toast } from "react-toastify";
import useError from "../../../../hooks/error";
import useProcessing from "../../../../hooks/useProcessing";
import * as fileHandlerApi from "../../../../services/fileHandlerService";
import * as userApi from "../../../../services/userServices";
import { useApplication } from "../../../../stores/applicationStore";
import USER_ACTIONS from "./actions";
export default function useStore(config) {
  const { processing, dispatch: _dispatch } = useProcessing(
    Object.keys(USER_ACTIONS).map((action) => {
      return { action: USER_ACTIONS[action] };
    })
  );
  const { handleError } = useError();
  const { refreshCache } = useApplication();
  async function updateUserProfile(id, payload) {
    try {
      _dispatch({
        [USER_ACTIONS.UPDATE_PROFILE_INFO]: {
          status: true,
          error: false,
          id: null,
        },
      });
      let { data } = await userApi.updateUserProfile(id, payload);
      refreshCache();
      _dispatch({
        [USER_ACTIONS.UPDATE_PROFILE_INFO]: {
          status: false,
          error: false,
          id: null,
        },
      });
      toast.success("Information updated.");
    } catch (e) {
      handleError(e);
      _dispatch({
        [USER_ACTIONS.UPDATE_PROFILE_INFO]: {
          status: false,
          error: true,
          id: null,
        },
      });
    }
  }
  async function updateUserPassword(id, payload) {
    try {
      _dispatch({
        [USER_ACTIONS.UPDATE_PROFILE_INFO]: {
          status: true,
          error: false,
          id: null,
        },
      });
      await userApi.updateUserPassword(id, payload);
      refreshCache();
      _dispatch({
        [USER_ACTIONS.UPDATE_PROFILE_INFO]: {
          status: false,
          error: false,
          id: null,
        },
      });
      toast.success("Password updated.");
    } catch (e) {
      handleError(e);
      _dispatch({
        [USER_ACTIONS.UPDATE_PROFILE_INFO]: {
          status: false,
          error: true,
          id: null,
        },
      });
    }
  }
  async function changeProfilePicture(id, file) {
    try {
      _dispatch({
        [USER_ACTIONS.CHANGE_PROFILE_PICTURE]: {
          status: true,
          error: false,
          id: null,
        },
      });
      let fileData = await fileHandlerApi.uploadFileToS3(file);
      let { data } = await userApi.updateUserProfileImage(
        id,
        fileData?.data?.details?.metaInfo
      );
      refreshCache();
      _dispatch({
        [USER_ACTIONS.CHANGE_PROFILE_PICTURE]: {
          status: false,
          error: false,
          id: null,
        },
      });
      toast.success("Profile picture updated.");
    } catch (e) {
      handleError(e);
      _dispatch({
        [USER_ACTIONS.CHANGE_PROFILE_PICTURE]: {
          status: false,
          error: true,
          id: null,
        },
      });
    }
  }
  return {
    processing,
    updateUserProfile,
    updateUserPassword,
    changeProfilePicture,
  };
}
