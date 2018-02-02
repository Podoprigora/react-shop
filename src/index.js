import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import storeFactory from "./store";
import App from "./components/App";

const store = storeFactory();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
