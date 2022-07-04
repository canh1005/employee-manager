import { compose, createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { employeeDetailReducer } from "../redux/modules/EmployeeDetailReducer/reducer";
import { imageReducer } from "redux/modules/ImageReducer/reducer";
import { statisticReducer } from "redux/modules/StatisticsReducer/reducer";
import { teamReducer } from "redux/modules/TeamReducer/reducer";
import { getEmployeeByTeamReducer } from "redux/modules/GetEmployeeByTeamReducer/reducer";
import { searchReducer } from "redux/modules/SearchEmployeeReducer/reducer";
import { workingReducer } from "redux/modules/WorkingReducer/reducer";
import { advancesReducer } from "redux/modules/AdvancesReducer/reducer";
import { employeeReducer } from "redux/modules/EmployeeReducer/reducer";
import { dashBoardReducer } from "redux/modules/DashBoardReducer/reducer";
import { persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";


const persistConfig = {
  key: "root",
  storage,
  whitelist: ["dashBoardReducer"]
}

const rootReducers = combineReducers({
  employeeDetailReducer,
  statisticReducer,
  getEmployeeByTeamReducer,
  searchReducer,
  workingReducer,
  advancesReducer,
  teamReducer,
  employeeReducer,
  imageReducer,
  dashBoardReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducers)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);
export const persistor = persistStore(store)