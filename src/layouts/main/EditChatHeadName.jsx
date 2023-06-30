import { Button, Input } from "reactstrap";
import React from "react";
import useForm from "../../hooks/useForm";
import {
  defaultChatheadDataSet,
  defaultChatheadDataSetValidation,
} from "./utils/data";
const EditChatHeadName = ({
  data = defaultChatheadDataSet,
  onSubmit = () => {},
}) => {
  const { isBusy, handleChange, handleSubmit, isFormValid, dataModel } =
    useForm(data, defaultChatheadDataSetValidation);
  return (
    <React.Fragment>
      <Input
        label="Name"
        placeholder="Name"
        autoComplete="off"
        value={dataModel.name}
        onChange={(e) =>
          handleChange({
            field: "name",
            value: e.currentTarget.value,
          })
        }
      />
      <Button
        className="mb-2"
        color="primary"
        type="button"
        onClick={(e) => handleSubmit(e, onSubmit, false)}
        disabled={!isFormValid() || isBusy}
        block
      >
        {isBusy ? "Updating chathead..." : "Update"}
      </Button>
    </React.Fragment>
  );
};

export default EditChatHeadName;
