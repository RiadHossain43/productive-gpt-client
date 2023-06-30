import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const NewChatRedirect = ({}) => {
  let navigate = useNavigate();
  useEffect(() => {
    navigate("/chat");
  }, []);
  return <></>;
};

export default NewChatRedirect;
