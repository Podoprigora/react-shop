/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { AppContainer } from "react-hot-loader";

import App from "./pages";

const render = Component => {
  ReactDOM.render(
    <HashRouter>
      <Component />
    </HashRouter>,
    document.getElementById("root")
  );
};

setTimeout(() => render(App), process.env.NODE_ENV === "development" ? 500 : 0);

if (module.hot) {
  module.hot.accept("./pages", () => {
    render(App);
  });
}
