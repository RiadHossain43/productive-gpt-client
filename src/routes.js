import auth from "./views/auth/routes";
import chat from "./views/chat/routes";
import fallback from "./views/fallback/routes";
import lab from "./views/lab/routes";
import payment from "./views/payment/routes";
import settings from "./views/settings/routes";
import alicePolicies from "./views/alicePolicies/routes";
import magicBox from "./views/magicBox/routes";
import imageGalary from "./views/imageGalary/routes"

var routes = {
  authLayout: {
    auth,
    payment,
    fallback,
    alicePolicies,
  },
  mainLayout: {
    chat,
  },
  settingsLayout: {
    settings,
  },
  generalLayout: {
    lab,
    magicBox,
    imageGalary
  },
};
export default routes;
