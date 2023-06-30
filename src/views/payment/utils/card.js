import visaCard from "../../../assets/img/theme/visa-card.png";
import masterCard from "../../../assets/img/theme/master-card.png";
import americanExpressCard from "../../../assets/img/theme/american-express-card.png";
import discoverCard from "../../../assets/img/theme/discover-card.png";
import creditCard from "../../../assets/img/theme/credit-card.png";
import jcbCard from "../../../assets/img/theme/jcb-card.png";
import unionPayCard from "../../../assets/img/theme/union-pay-card.png";

export function getCardImage(cardType) {
  //   console.log(cardType);
  switch (cardType) {
    case "visa": {
      return visaCard;
    }
    case "mastercard": {
      return masterCard;
    }
    case "american-express": {
      return americanExpressCard;
    }
    case "discover": {
      return discoverCard;
    }
    case "jcb": {
      return jcbCard;
    }
    case "unionpay": {
      return unionPayCard;
    }
    default: {
      return creditCard;
    }
  }
}
export const cardUIHelpers = {
  convertToCardNumberFormat: function (number) {
    if (!number) return number;
    return number
      .replace(/\s/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim()
      .slice(0, 19);
  },
  convertToCardCvcFormat: function (number) {
    if (!number) return number;
    return number.slice(0, 4);
  },
  convertToCardExpDateFormat: function (number) {
    if (!number) return number;
    return number
      .replace(/\s/g, "")
      .replace(/\//g, "")
      .replace(/(.{2})/g, "$1/")
      .trim()
      .slice(0, 5);
  },
  convertToCardMonthFormat: function (number) {
    if (!number) return number;
    return number.slice(0, 2);
  },
  convertToCardYearFormat: function (number) {
    if (!number) return number;
    return number.slice(0, 2);
  },
};
