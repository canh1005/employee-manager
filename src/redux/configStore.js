import { compose, configureStore, createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { listEmpReducer } from "../redux/modules/ListEmployeeReducer/reducer";
const rootReducers = combineReducers({
    listEmpReducer,
  });
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunk))
);
