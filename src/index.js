/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { AppContainer } from "react-hot-loader";

import storeFactory from "./store";
import App from "./routes";

const store = storeFactory();

const render = Component => {
  ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <Component />
      </Provider>
    </BrowserRouter>,
    document.getElementById("root")
  );
};

setTimeout(() => render(App), process.env.NODE_ENV === "development" ? 500 : 0);

if (module.hot) {
  module.hot.accept("./routes", () => {
    render(App);
  });
}
