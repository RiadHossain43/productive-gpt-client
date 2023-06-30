import { Button, FormGroup, Input, Label } from "reactstrap";
import React from "react";
import useForm from "../../../hooks/useForm";
import {
  defaultPasswordFormDataSet,
  defaultPasswordFormDataSetValidation,
} from "../utils/data";
const UpdatePassword = ({
  data = defaultPasswordFormDataSet,
  onSubmit = () => {},
}) => {
  const { isBusy, handleChange, handleSubmit, isFormValid, dataModel } =
    useForm(data, defaultPasswordFormDataSetValidation);
  return (
    <React.Fragment>
      <FormGroup>
        <Label>Old password</Label>
        <Input
          id=""
          type="password"
          placeholder="Old password"
          autoComplete="off"
          value={dataModel.oldPassword}
          onChange={(e) =>
            handleChange({
              field: "oldPassword",
              value: e.currentTarget.value,
            })
          }
        />
      </FormGroup>
      <FormGroup>
        <Label>Old password</Label>
        <Input
          label="New password"
          type="password"
          placeholder="New password"
          autoComplete="off"
          value={dataModel.password}
          onChange={(e) =>
            handleChange({
              field: "password",
              value: e.currentTarget.value,
            })
          }
        />
      </FormGroup>
      <Button
        className="mt-5 mb-2"
        color="primary"
        type="button"
        onClick={(e) => handleSubmit(e, onSubmit)}
        disabled={!isFormValid() || isBusy}
        block
      >
        {isBusy ? "Updating password..." : "Update"}
      </Button>
    </React.Fragment>
  );
};

export default UpdatePassword;
