import * as yup from "yup";
import cardValidator from "card-validator";
export let defaultPaymentDetailsDataSet = {
  nameOnCard: "",
  cardNumber: "",
  cardCvc: "",
  cardExpDate: "",
  // cardExpMonth: null,
  // cardExpYear: null,
};
export let defaultPaymentDetailsDataSetValidation = yup.object({
  nameOnCard: yup.string().required().label("Name on card"),
  cardNumber: yup
    .number()
    .required()
    .test("test-card-number", "Invalid card number", (value) => {
      return cardValidator.number(parseInt(value))?.isValid;
    })
    .label("Card number"),
  cardCvc: yup
    .number()
    .test("test-card-cvc", "Invalid card cvc code", (value) => {
      return cardValidator.cvv(value.toString())?.isValid;
    })
    .required()
    .label("Card CVC"),
  cardExpDate: yup
    .string()
    .test("test-card-exp-month", "Invalid card exp date", (value) => {
      return cardValidator.expirationDate(value.toString().trim())?.isValid;
    })
    .required()
    .label("Expiry month"),
  // cardExpMonth: yup
  //   .number()
  //   .test("test-card-exp-month", "Invalid card exp month", (value) => {
  //     return cardValidator.expirationMonth(value.toString())?.isValid;
  //   })
  //   .required()
  //   .label("Expiry month"),
  // cardExpYear: yup
  //   .number()
  //   .test("test-card-exp-month", "Invalid card exp year", (value) => {
  //     return cardValidator.expirationYear(value.toString())?.isValid;
  //   })
  //   .required()
  //   .label("Expiery year"),
});
