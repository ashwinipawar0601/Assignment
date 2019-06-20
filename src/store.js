import { createStore, compose } from "redux";

import rootReducer from "./ducks";

const devCompose =
  (process.env.NODE_ENV === "development" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export default createStore(rootReducer, devCompose());
