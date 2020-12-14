import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/user";
import "./style.scss";

import App from "components/app";
ReactDom.render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
