import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "../reducers";

const storeFactory = (initState = {}) => {
  const middleware = [thunk];

  // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  return createStore(reducers, initState, applyMiddleware(...middleware));
};

export default storeFactory;
