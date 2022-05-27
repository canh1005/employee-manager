import * as ActionTypes from "./contances";

let initialState = {
  data: null,
  error: null,
};

export const listEmpReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LIST_EMPLOYEE_REQUEST:
      state.data = null;
      return { ...state };
    case ActionTypes.LIST_EMPLOYEE_SUCCESS:
      state.data = action.data;
      state.error = null;
      return { ...state };
    case ActionTypes.LIST_EMPLOYEE_FAILED:
      state.data = null;
      state.error = action.err;
      return { ...state };
    default:
      return { ...state };
  }
};
