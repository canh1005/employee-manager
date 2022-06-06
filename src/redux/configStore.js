import { compose, createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { listEmpReducer } from "../redux/modules/ListEmployeeReducer/reducer";
import { listAllTeamReducer } from "../redux/modules/ListAllTeamReducer/reducer";
import { employeeDetailReducer } from "../redux/modules/EmployeeDetailReducer/reducer";
import { getImageReducer } from "../redux/modules/GetImageReducer/reducer";
import { getWorkingReducer } from "../redux/modules/GetWorkingReducer/reducer";
import { deleteEmployeeReducer } from "../redux/modules/DeleteEmployeeReducer/reducer";
import { addEmployeeReducer } from "../redux/modules/AddEmployeeReducer/reducer";
import { updateEmployeeReducer } from "../redux/modules/UpdateEmployeeReducer/reducer";
import { getAdvancesReducer } from "../redux/modules/GetAdvancesReducer/reducer";
import { getStatisticReducer } from "../redux/modules/GetStatisticsReducer/reducer";
import { addWorkingReducer } from "../redux/modules/AddWorkingReducer/reducer";
import { deleteWorkingReducer } from "../redux/modules/DeleteWorkingReducer/reducer";
import { addAdvanceReducer } from "../redux/modules/AddAdvanceReducer/reducer";
import { getTeamReducer } from "../redux/modules/GetTeamReducer/reducer";
import { getEmployeeByTeamReducer } from "../redux/modules/GetEmployeeByTeamReducer/reducer";

const rootReducers = combineReducers({
  listEmpReducer,
  listAllTeamReducer,
  employeeDetailReducer,
  getImageReducer,
  getWorkingReducer,
  deleteEmployeeReducer,
  addEmployeeReducer,
  updateEmployeeReducer,
  getAdvancesReducer,
  getStatisticReducer,
  addWorkingReducer,
  deleteWorkingReducer,
  addAdvanceReducer,
  getTeamReducer,
  getEmployeeByTeamReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunk))
);
