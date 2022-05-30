import { compose, createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { listEmpReducer } from "../redux/modules/ListEmployeeReducer/reducer";
import { listAllTeamReducer } from "../redux/modules/ListAllTeamReducer/reducer";
import { employeeDetailReducer } from "../redux/modules/EmployeeDetailReducer/reducer";
import { getImageReducer } from "../redux/modules/GetImageReducer/reducer";
const rootReducers = combineReducers({
  listEmpReducer,
  listAllTeamReducer,
  employeeDetailReducer,
  getImageReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunk))
);
