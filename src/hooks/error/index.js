import useAPIError from "./useAPIError";

export default function useError() {
  const { isAPIError, hanldeAPIError } = useAPIError();
  function handleError(error) {
    if (isAPIError(error)) {
      return hanldeAPIError(error);
    }
  }
  return {
    handleError,
  };
}
