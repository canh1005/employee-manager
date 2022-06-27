import { compose, createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { listEmpReducer } from "../redux/modules/ListEmployeeReducer/reducer";
import { employeeDetailReducer } from "../redux/modules/EmployeeDetailReducer/reducer";
import { imageReducer } from "redux/modules/ImageReducer/reducer";
import { statisticReducer } from "redux/modules/StatisticsReducer/reducer";
import { teamReducer } from "redux/modules/TeamReducer/reducer";
import { getEmployeeByTeamReducer } from "redux/modules/GetEmployeeByTeamReducer/reducer";
import { searchReducer } from "redux/modules/SearchEmployeeReducer/reducer";
import { workingReducer } from "redux/modules/WorkingReducer/reducer";
import { advancesReducer } from "redux/modules/AdvancesReducer/reducer";
import { employeeReducer } from "redux/modules/EmployeeReducer/reducer";



const rootReducers = combineReducers({
  listEmpReducer,
  employeeDetailReducer,
  statisticReducer,
  getEmployeeByTeamReducer,
  searchReducer,
  workingReducer,
  advancesReducer,
  teamReducer,
  employeeReducer,
  imageReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunk))
);
