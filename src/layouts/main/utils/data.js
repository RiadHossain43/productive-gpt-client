import * as yup from "yup";
export let defaultChatheadDataSet = {
  name: "",
};
export let defaultChatheadDataSetValidation = yup.object({
  name: yup.string().required().label("Name"),
});
