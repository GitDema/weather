import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { save, load } from "redux-localstorage-simple";

import App from "./App";
import rootReducer from "./redux/reducers";
import "./css/index.css";

const createStoreWithMiddleware = composeWithDevTools(applyMiddleware(save()))(
  createStore
);

const store = createStoreWithMiddleware(rootReducer, load());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
