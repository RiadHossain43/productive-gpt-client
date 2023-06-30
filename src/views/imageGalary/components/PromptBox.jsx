import React from "react";
import { Container, Form, FormGroup, Input } from "reactstrap";
import useForm from "../../../hooks/useForm";
import * as yup from "yup";
const dataSet = {
  prompt: "",
};
const dataSetValidation = yup.object({
  prompt: yup.string().label("Prompt"),
});
const PromptBox = ({ onSubmit = () => {} }) => {
  const { isBusy, isFormValid, handleChange, dataModel, handleSubmit } =
    useForm(dataSet, dataSetValidation);
  const handlePromptKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey && isFormValid()) {
      event.preventDefault();
      handleSubmit(event, () => onSubmit(dataModel));
    }
  };
  return (
    <Form>
      <FormGroup>
        <Input
          className=""
          type="textarea"
          value={dataModel.prompt}
          placeholder="Ask me to generate something"
          onChange={(e) =>
            handleChange({
              field: "prompt",
              value: e.currentTarget.value,
            })
          }
          onKeyDown={handlePromptKeyDown}
        />
      </FormGroup>
    </Form>
  );
};

export default PromptBox;
