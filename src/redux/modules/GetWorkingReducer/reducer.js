import * as ActionTypes from "./contances";

let initialState = {
  data: null,
  error: null,
};

export const getWorkingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_WORKING_REQUEST:
      state.data = null;
      return { ...state };
    case ActionTypes.GET_WORKING_SUCCESS:
      state.data = action.data;
      state.error = null;
      return { ...state };
    case ActionTypes.GET_WORKING_FAILED:
      state.data = null;
      state.error = action.err;
      return { ...state };
    default:
      return { ...state };
  }
};