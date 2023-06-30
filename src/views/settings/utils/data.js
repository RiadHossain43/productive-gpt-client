import * as yup from "yup";
export let defaultProfileDataSet = {
  name: "",
  organisationName: "",
  jobTitle: "",
};
export let defaultProfileDataSetValidation = yup.object({
  name: yup.string().required().label("Name"),
  organisationName: yup.string().optional().label("Organisation name"),
  jobTitle: yup.string().optional().label("Job title"),
});
export let defaultPasswordFormDataSet = {
  oldPassword: "",
  password: "",
};
export let defaultPasswordFormDataSetValidation = yup.object({
  oldPassword: yup.string().required().min(8).label("Old password"),
  password: yup.string().required().min(8).label("New password"),
});
