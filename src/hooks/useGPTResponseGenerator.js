import { useState } from "react";
import * as aiApi from "../services/ai/index";
import { useApplication } from "../stores/applicationStore";
import { toast } from "react-toastify";

/**
 * A single conversation object
 * @typedef {Object} CurrentlyStreaming
 * @property {String} isStreamComplete  - Id of the pair.
 * @property {String} responseStream - The current produced full response stream.
 * @property {String} responseStreamChunk - The current response chunk.
 * @property {String} prompt - The prompt message.
 */
/**
 * @callback CurrentlySreamingSetterCallback
 * @param {CurrentlyStreaming} currentlyStreaming
 * @returns {CurrentlyStreaming}
 */
/** @type {CurrentlyStreaming} */
const defaultCurrentlyStreamingData = {
  responseStream: "",
  prompt: "",
  responseStreamChunk: "",
  isStreamComplete: true,
};
const useGPTResponseGenerator = () => {
  /** @type {[CurrentlyStreaming,React.Dispatch< CurrentlySreamingSetterCallback >]} */
  const [currentlyStreaming, setCurrentlyStreaming] = useState(
    defaultCurrentlyStreamingData
  );
  const { tokenPair, refreshToken } = useApplication();
  const [waitingForStream, setIsWaitingForStream] = useState(false);
  const [reader, setReader] = useState(null);
  function reset() {
    setReader(null);
    setCurrentlyStreaming(defaultCurrentlyStreamingData);
  }
  function cancelStream() {
    if (reader) {
      reader.cancel();
    }
  }
  async function streamResponse(payload) {
    try {
      setIsWaitingForStream(true);
      reset();
      await aiApi.streamResponse(
        {
          prompt: payload.prompt,
          systemInstructions: payload.systemInstructions || [],
          conversation: payload.conversation || [],
        },
        {
          headers: {
            "x-auth-accesstoken": tokenPair.accessToken,
          },
          onStreamStart: function (reader) {
            setReader(reader);
          },
          onStream: function (streamString) {
            setIsWaitingForStream(false);
            /** updating stream state */
            setCurrentlyStreaming((prev) => {
              let currentResponseStream = prev?.responseStream
                ? prev.responseStream + streamString
                : streamString;
              return {
                ...prev,
                prompt: payload.prompt,
                responseStream: currentResponseStream,
                responseStreamChunk: streamString,
                isStreamComplete: false,
              };
            });
          },
          onError: function (err) {
            setIsWaitingForStream(false);
            toast.error(err.message || "Unknowen server error");
          },
          onTokenRefreshNeed: async function () {
            return { tokenPair: await refreshToken() };
          },
          onStreamEnd: function (fullStreamString) {
            setIsWaitingForStream(false);
            setCurrentlyStreaming((prev) => {
              return {
                ...prev,
                responseStream: fullStreamString,
                responseStreamChunk: "",
                isStreamComplete: true,
              };
            });
          },
        }
      );
    } catch (err) {
      setIsWaitingForStream(false);
      toast.error(err.message || "Unknowen server error");
    }
  }
  return {
    currentlyStreaming,
    waitingForStream,
    streamResponse,
    reset,
    cancelStream,
  };
};

export default useGPTResponseGenerator;
