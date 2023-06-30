import { Button, Input, InputGroup, Spinner } from "reactstrap";
import React, { useContext } from "react";
import { BsSend } from "react-icons/bs";
import MDFormatedResponse from "../../../../Chat/MDFormatedResponse";
import { USER_ACTIONS, useAiAssistant } from "./store";
import useForm from "../../../../../hooks/useForm";
import * as yup from "yup";
import { TextEditorContext } from "../../Context";

const Content = () => {
  const { generate, refinedText, processing } = useAiAssistant();
  const dataSet = {
    prompt: "",
  };
  const schema = yup.object({
    prompt: yup.string().required().label("prompt"),
  });
  const { dataModel, handleSubmit, handleChange, isFormValid, isBusy } =
    useForm(dataSet, schema);
  const { switchEditMode } = useContext(TextEditorContext);
  return (
    <div className="my-2">
      <InputGroup>
        <Input
          onFocus={() => switchEditMode("ai-assistant")}
          onBlur={() => switchEditMode("draft-editor")}
          placeholder="Ask me something..."
          onChange={(e) =>
            handleChange({
              field: "prompt",
              value: e.currentTarget.value,
            })
          }
          value={dataModel.prompt}
        />
        <Button
          color="primary"
          onClick={(e) => {
            handleSubmit(e, () =>
              generate({
                prompt: dataModel.prompt,
                conversation: [],
              })
            );
          }}
          disabled={!isFormValid()}
        >
          <BsSend />
        </Button>
      </InputGroup>
      {processing[USER_ACTIONS.GENERATE].status && (
        <p className="text-center">Refining your text...</p>
      )}
      <MDFormatedResponse>{refinedText}</MDFormatedResponse>
    </div>
  );
};

export default Content;
