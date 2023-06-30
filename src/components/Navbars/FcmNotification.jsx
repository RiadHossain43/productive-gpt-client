import { useState } from "react";
import { getClientToken, onMessageListener } from "firebase.js";
const FcmNotification = (props) => {
  let [tokenFound, setTokenFound] = useState(false);
  let handleTokenFound = (token) => setTokenFound(token ? true : false);
  getClientToken(handleTokenFound);
  onMessageListener().then((payload) => {
    console.log(payload);
  });
  console.log(tokenFound);
  return (
    <>
      <span></span>
    </>
  );
};

export default FcmNotification;
