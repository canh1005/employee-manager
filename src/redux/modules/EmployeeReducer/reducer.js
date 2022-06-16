import * as ActionTypes from "./constances";

let initialState = {
  loading: false,
  data: null,
  error: null,
};

export const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_EMPLOYEE_REQUEST:
      state.data = null;
      return { ...state };
    case ActionTypes.ADD_EMPLOYEE_SUCCESS:
      state.data = action.data;
      state.error = null;
      return { ...state };
    case ActionTypes.ADD_EMPLOYEE_FAILED:
      state.data = null;
      state.error = action.err;
      return { ...state };
    case ActionTypes.DELETE_EMPLOYEE_REQUEST:
      return { ...state };
    case ActionTypes.DELETE_EMPLOYEE_FAILED:
      state.error = action.err;
      return { ...state };
    default:
      return { ...state };
  }
};
