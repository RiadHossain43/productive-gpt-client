import React from "react";
import { BiSend } from "react-icons/bi";
import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import * as yup from "yup";
import useForm from "../../../hooks/useForm";
import { imageResponse } from "../../../services/ai/index";
import { useHook } from "./store";
const Content = () => {
  let { dataModel, handleChange, isBusy, handleSubmit, isFormValid } = useForm(
    { prompt: "" },
    yup.object({
      prompt: yup.string().label("Prompt"),
    })
  );
  async function generate() {
    try {
      let response = await imageResponse(dataModel);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <React.Fragment>
      <InputGroup>
        <Input
          placeholder="Ask me something"
          type="prompt"
          autoComplete="off"
          value={dataModel.prompt}
          onChange={(e) =>
            handleChange({
              field: "prompt",
              value: e.currentTarget.value,
            })
          }
        />
        <InputGroupAddon addonType="append">
          <Button  className="m-0 btn-simple" disabled={isBusy} onClick={(e) => handleSubmit(e, generate)}>
            {isBusy ? "generating..." : <BiSend />}
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </React.Fragment>
  );
};

export default Content;
