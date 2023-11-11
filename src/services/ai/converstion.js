import { DEFAULT_PROMPTS } from "../../constants";
import http from "../httpServices";
const apiEndPoint = `/conversation`;
/**
 * ALERT: We should not user fetch with any other cases unless it's a
 * special case like this where axios does'nt have support for stream response
 * in browsers. limited  by XMLHTTPRequest  standards.
 */
export async function streamResponse(
  data,
  options = {
    onStream: function () {},
    onStreamEnd: function () {},
    onError: function () {},
    onTokenRefreshNeed: async function () {},
    onStreamStart: async function () {},
    headers: {},
  }
) {
  console.log(
    "sending charecters:",
    data.conversation.reduce((accumulator, currentValue) => {
      return currentValue.content + accumulator;
    }, "").length
  );
  console.log(
    "sending charecters trim:",
    data.conversation.reduce((accumulator, currentValue) => {
      return currentValue.content + accumulator.trim();
    }, "").length
  );

  async function _successResponseHandler(response) {
    const reader = response.body.getReader();
    options?.onStreamStart(reader);
    let fullText = "";
    while (true) {
      try {
        const { value, done } = await reader.read();
        if (done) break;
        const decodedtext = new TextDecoder("utf-8").decode(value);
        fullText += decodedtext;
        options?.onStream(decodedtext);
      } catch (err) {
        console.log(err);
      }
    }
    options?.onStreamEnd(fullText);
  }
  try {
    const URL =
      process.env.REACT_APP_API_URL +
      process.env.REACT_APP_API_VERSION +
      `${apiEndPoint}/gpt-stream`;
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
      credentials: "include",
      body: JSON.stringify({
        systemInstructions: data.systemInstructions || [
          DEFAULT_PROMPTS.DEFAULT.prompt,
        ],
        conversation: data.conversation,
        prompt: data.prompt,
      }),
    };
    const response = await fetch(URL, config);
    if (response.ok) {
      _successResponseHandler(response);
    } else {
      if (response.status === 401) {
        const data = await options?.onTokenRefreshNeed();
        const tokenPair = data?.tokenPair;
        try {
          let newResponse = await fetch(URL, {
            ...config,
            headers: {
              ...config.headers,
              "x-auth-accesstoken": tokenPair?.accessToken,
            },
          });
          if (newResponse.ok) {
            _successResponseHandler(newResponse);
          }
        } catch (err) {
          options?.onError(err);
        }
      } else {
        options?.onError(response);
      }
    }
  } catch (err) {
    options?.onError(err);
  }
}

export async function normalResponse(data) {
  return http.post(`${apiEndPoint}/gpt-normal`, {
    systemInstructions: data.systemInstructions || [
      DEFAULT_PROMPTS.DEFAULT.prompt,
    ],
    conversation: data.conversation,
    prompt: data.prompt,
  });
}
export async function imageResponse(data) {
  return http.post(`${apiEndPoint}/gpt-image`, {
    prompt: data.prompt || "Generate some random surprising images.",
    size: data.size || "512x512",
    n: data.n || 1,
  });
}
