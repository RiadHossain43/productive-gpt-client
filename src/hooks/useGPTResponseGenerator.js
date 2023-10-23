import { useState } from "react";
import * as aiApi from "../services/ai/index";
import { useApplication } from "../stores/applicationStore";

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
  function reset() {
    setCurrentlyStreaming(defaultCurrentlyStreamingData);
  }
  async function streamResponse(payload) {
    try {
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
          onStream: function (streamString) {
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
            console.log(err);
          },
          onTokenRefreshNeed: async function () {
            return { tokenPair: await refreshToken() };
          },
          onStreamEnd: function (fullStreamString) {
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
      console.log(err);
    }
  }
  return {
    currentlyStreaming,
    streamResponse,
    reset,
  };
};

export default useGPTResponseGenerator;
