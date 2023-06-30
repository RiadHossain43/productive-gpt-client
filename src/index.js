import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./assets/css/nucleo-icons.css";
import "./assets/scss/app.scss";

import App from "./App";
import { ApplicationContextProvider } from "./stores/applicationStore";
import { initialiseGoogleAnalytics } from "./googleAnalytics";
initialiseGoogleAnalytics();
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ApplicationContextProvider>
      <App />
    </ApplicationContextProvider>
  </BrowserRouter>
);
