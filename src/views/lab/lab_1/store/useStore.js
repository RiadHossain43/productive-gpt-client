import { useEffect, useState } from "react";
import useProcessing from "../../../../hooks/useProcessing";
import * as labApi from "../../../../services/lab";
import USER_ACTIONS from "./actions";
import { useNavigate } from "react-router-dom";
import useForm from "../../../../hooks/useForm";

import * as yup from "yup";
const promptskey = "promts";
export default function useStore(config) {
  const { processing, dispatch: _dispatch } = useProcessing(
    Object.keys(USER_ACTIONS).map((action) => {
      return { action: USER_ACTIONS[action] };
    })
  );
  let formutils = useForm(
    {
      prompt: "",
    },
    yup.object({
      prompt: yup.string().label("prompt"),
    })
  );
  const navigate = useNavigate();
  const [prompts, setPrompts] = useState({
    data: [],
  });
  const [prompt, setPrompt] = useState("");
  const [res, setRes] = useState("");
  async function generate(payload) {
    try {
      setPrompt(payload.prompt);
      const { data } = await labApi.normalResponse(payload);
      setRes(data.details.responseMessage);
    } catch (err) {
      console.log(err);
    }
  }
  function resetRes() {
    setRes("");
    setPrompt("");
  }
  function getPrompts() {
    return JSON.parse(localStorage.getItem(promptskey));
  }
  function savePrompt() {
    let ps = getPrompts();
    if (!ps) return localStorage.setItem(promptskey, JSON.stringify(prompts));
    ps = { data: [...ps.data, prompt] };
    setPrompts(ps);
    localStorage.setItem(promptskey, JSON.stringify(ps));
  }
  useEffect(() => {
    let ps = getPrompts();
    if (!ps) return;
    setPrompts(ps);
  }, []);
  return {
    res,
    processing,
    prompt,
    prompts,
    generate,
    resetRes,
    savePrompt,
    ...formutils,
  };
}
