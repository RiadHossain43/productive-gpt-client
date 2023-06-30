import { Button, Col, FormGroup, Input, Label } from "reactstrap";
import React from "react";
import useForm from "../../../hooks/useForm";
import {
  defaultProfileDataSet,
  defaultProfileDataSetValidation,
} from "../utils/data";
const PersonalDetailsForm = ({
  data = defaultProfileDataSet,
  onSubmit = () => {},
}) => {
  const { isBusy, handleChange, handleSubmit, isFormValid, dataModel } =
    useForm(data, defaultProfileDataSetValidation);
  return (
    <React.Fragment>
      <FormGroup>
        <Label>Name</Label>
        <Input
          id=""
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
      </FormGroup>
      <FormGroup>
        <Label>Organisation name</Label>
        <Input
          id=""
          placeholder="Organisation name"
          autoComplete="off"
          value={dataModel.organisationName}
          onChange={(e) =>
            handleChange({
              field: "organisationName",
              value: e.currentTarget.value,
            })
          }
        />
      </FormGroup>
      <FormGroup>
        <Label>Job title</Label>
        <Input
          id=""
          placeholder="Job title"
          autoComplete="off"
          value={dataModel.jobTitle}
          onChange={(e) =>
            handleChange({
              field: "jobTitle",
              value: e.currentTarget.value,
            })
          }
        />
      </FormGroup>

      <Button
        className="mt-5 mb-2"
        color="primary"
        type="button"
        onClick={(e) => handleSubmit(e, onSubmit, false)}
        disabled={!isFormValid() || isBusy}
        block
      >
        {isBusy ? "Updating profile..." : "Update"}
      </Button>
    </React.Fragment>
  );
};

export default PersonalDetailsForm;
