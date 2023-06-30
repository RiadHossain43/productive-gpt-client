import http from "../../services/httpServices";
import { toast } from "react-toastify";

const useAPIError = () => {
  function isAPIError(err) {
    return err instanceof http.HTTPError;
  }
  function hanldeAPIError(err) {
    /** we only allowd netword of api realted error here */
    if (err instanceof http.HTTPError) {
      let statusCode = err.response?.status;
      /** here we have set up the priority levels of messages */
      let message =
        err.response?.data.details?.description ||
        err.response?.data.message ||
        err.message;
      /** 4xx errors need to be shown to users. */
      if (statusCode >= 400 && statusCode <= 499) {
        return toast.error(message);
      }
      if (statusCode >= 500 && statusCode <= 599) {
        if (process.env.NODE_ENV === "development") {
          return toast.error(message);
        } else {
          return toast.error(
            "Unexpected server error occured. Please contact support for help at support@imssystems.tech"
          );
        }
      }
    }
    /**
     * if code reaches here it means an UI or frontend related error.
     * we only show toast in development mode for better development experience.
     */
    if (process.env.NODE_ENV === "development") {
      return toast.error(
        "Unknown error detected in API Error handler: ",
        err.message
      );
    }
  }
  return {
    isAPIError,
    hanldeAPIError,
  };
};
export default useAPIError;
