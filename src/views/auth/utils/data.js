import * as yup from "yup";
export let defaultAuthDataSet = {
  email: "",
  password: "",
};
export let defaultAuthDataSetValidation = yup.object({
  email: yup.string().required().email().label("Email"),
  password: yup.string().required().min(8).label("Password"),
});
export let defaultRegisterDataSet = {
  name: "",
  email: "",
  password: "",
};
export let defaultRegisterDataSetValidation = yup.object({
  name: yup.string().required().label("Name"),
  email: yup.string().required().email().label("Email"),
  password: yup.string().required().min(8).label("Password"),
});

export let defaultRecoveryDataSet = {
  email: "",
};
export let defaultRecoveryDataSetValidation = yup.object({
  email: yup.string().required().email().label("Email"),
});
export let defaultRecoveryVerificationDataSet = {
  password: "",
};
export let defaultRecoveryVerificationDataSetValidation = yup.object({
  password: yup.string().required().min(8).label("Password"),
});
