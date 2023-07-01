import ReactGA from "react-ga4";

export function initialiseGoogleAnalytics() {
  if (process.env.REACT_APP_ENV === "production") {
    // ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENT_ID);
    // ReactGA.send({
    //   hitType: "pageview",
    //   page: window.location.pathname + window.location.search,
    // });
  }
}
