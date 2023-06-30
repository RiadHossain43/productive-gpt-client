import * as accountService from "./accountServices";
import http from "./httpServices";
const apiEndPoint = `/lab`;

export async function streamResponse(
  data,
  options = {
    onStream: function () {},
    onStreamEnd: function () {},
    onError: function () {},
  }
) {
  console.log(
    "sending charecters:",
    data.conversation.reduce((accumulator, currentValue) => {
      return currentValue.content + accumulator;
    }, "").length
  );
  try {
    const response = await fetch(
      process.env.REACT_APP_API_URL +
        process.env.REACT_APP_API_VERSION +
        `${apiEndPoint}/gpt-stream`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-accesstoken": accountService.getTokenPair().accessToken,
          "x-auth-refreshtoken": accountService.getTokenPair().refreshToken,
        },
        body: JSON.stringify({
          conversation: data.conversation,
          prompt: data.prompt,
        }),
      }
    );
    const reader = response.body.getReader();
    let fullText = "";
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      const decodedtext = new TextDecoder("utf-8").decode(value);
      const jsonChunks = decodedtext.split("data: ");
      try {
        for (let chunk of jsonChunks) {
          if (chunk) {
            if (chunk.trim() === "[DONE]") break;
            // console.log(chunk)
            let dataobject = JSON.parse(chunk);
            if (dataobject.choices[0].delta.content) {
              // console.log(fullText);
              fullText += dataobject.choices[0].delta.content;
              options?.onStream(dataobject.choices[0].delta.content);
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
    options?.onStreamEnd(fullText);
  } catch (err) {
    options?.onError(err);
  }
}
export async function normalResponse(data) {
  return http.post(`${apiEndPoint}/gpt-normal`, {
    conversation: data.conversation,
    prompt: data.prompt,
  });
}
