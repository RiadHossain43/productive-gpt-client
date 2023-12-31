import auth from "./views/auth/routes";
import chat from "./views/chat/routes";
import fallback from "./views/fallback/routes";
import lab from "./views/lab/routes";
import payment from "./views/payment/routes";
import settings from "./views/settings/routes";
import termsPolicies from "./views/termsPolicies/routes";
import magicBox from "./views/magicBox/routes";
import dataAnalysis from "./views/dataAnalysis/routes";

var routes = {
  authLayout: {
    auth,
    payment,
    fallback,
    termsPolicies,
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
    dataAnalysis,
  },
};
export default routes;
