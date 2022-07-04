import * as ActionTypes from "./contances";

let initialState = {
  loading: false,
  data: null,
  error: null,
  userEdited: null,
};

export const employeeDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    //Get employee
    case ActionTypes.EMPLOYEE_DETAIL_REQUEST:
      state.loading = true;
      return { ...state };
    case ActionTypes.EMPLOYEE_DETAIL_SUCCESS:
      state.loading = false;
      state.data = action.data;
      return { ...state };
    case ActionTypes.EMPLOYEE_DETAIL_FAILED:
      state.loading = false;
      state.error = action.err;
      return { ...state };
    //Update employee
    case ActionTypes.UPDATE_EMPLOYEE_REQUEST:
      return { ...state };
    case ActionTypes.UPDATE_EMPLOYEE_SUCCESS:
      state.userEdited = action.data;
      return { ...state };
    case ActionTypes.UPDATE_EMPLOYEE_FAILED:
      state.error = action.err;
      return { ...state };
    case ActionTypes.EMPLOYEE_EDITED:
      state.userEdited = action.payload;
      return { ...state };
    default:
      return { ...state };
  }
};
