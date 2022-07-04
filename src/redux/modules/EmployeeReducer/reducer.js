import * as ActionTypes from "./constances";

let initialState = {
  loading: false,
  data: null,
  error: null,
};

export const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    //Get list employee
    case ActionTypes.SEARCH_REQUEST:
      state.loading = true;
      return { ...state };
    case ActionTypes.SEARCH_SUCCESS:
      state.data = action.data;
      return { ...state };
    case ActionTypes.SEARCH_FAILED:
      state.error = action.err;
      return { ...state };
    //Add employee
    case ActionTypes.ADD_EMPLOYEE_REQUEST:
      return { ...state };
    case ActionTypes.ADD_EMPLOYEE_SUCCESS:
      state.error = { status: 200 };
      return { ...state };
    case ActionTypes.ADD_EMPLOYEE_FAILED:
      state.error = action.err;
      return { ...state };
    //Delete employee
    case ActionTypes.DELETE_EMPLOYEE_REQUEST:
      return { ...state };
    case ActionTypes.DELETE_EMPLOYEE_SUCCESS:
      console.log("delete Success");
      state.loading = false;
      state.data = state.data.filter(item => item.id !== action.payload)
      state.error = { status: 200 };
      return { ...state };
    case ActionTypes.DELETE_EMPLOYEE_FAILED:
      console.log("delete Error");
      state.error = action.err;
      return { ...state };
    //Clear data
    case ActionTypes.CLEAR_DATA:
      state.data = null;
      state.error = null;
    default:
      return { ...state };
  }
};
