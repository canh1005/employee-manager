import * as ActionTypes from "./contances";

let initialState = {
  loading: false,
  data: null,
  error: null,
  userEdited: null,
};

export const employeeDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.EMPLOYEE_DETAIL_REQUEST:
      state.loading = true;
      state.data = null;
      return { ...state };
    case ActionTypes.EMPLOYEE_DETAIL_SUCCESS:
      state.loading = false;
      state.data = action.data;
      state.error = null;
      return { ...state };
    case ActionTypes.EMPLOYEE_DETAIL_FAILED:
      state.data = null;
      state.error = action.err;
      return { ...state };
    case ActionTypes.UPDATE_EMPLOYEE_REQUEST:
      state.data = null;
      return { ...state };
    case ActionTypes.UPDATE_EMPLOYEE_SUCCESS:
      state.userEdited = action.data;
      state.error = null;
      return { ...state };
    case ActionTypes.UPDATE_EMPLOYEE_FAILED:
      state.data = null;
      state.error = action.err;
      return { ...state };
    case ActionTypes.EMPLOYEE_EDITED:
      state.userEdited = action.data;
      state.error = null;
      return { ...state };
    default:
      return { ...state };
  }
};
