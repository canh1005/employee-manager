import * as ActionTypes from "./contances";

let initialState = {
  data: null,
  error: null,
};

export const employeeDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.EMPLOYEE_DETAIL_REQUEST:
      state.data = null;
      return { ...state };
    case ActionTypes.EMPLOYEE_DETAIL_SUCCESS:
      state.data = action.data;
      state.error = null;
      return { ...state };
    case ActionTypes.EMPLOYEE_DETAIL_FAILED:
      state.data = null;
      state.error = action.err;
      return { ...state };
    default:
      return { ...state };
  }
};
