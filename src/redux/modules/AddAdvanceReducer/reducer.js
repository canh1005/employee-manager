import * as ActionTypes from "./contances";

let initialState = {
  data: null,
  error: null,
};

export const addAdvanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_ADVANCE_REQUEST:
      state.data = null;
      return { ...state };
    case ActionTypes.ADD_ADVANCE_SUCCESS:
      state.data = action.data;
      state.error = null;
      return { ...state };
    case ActionTypes.ADD_ADVANCE_FAILED:
      state.data = null;
      state.error = action.err;
      return { ...state };
    default:
      return { ...state };
  }
};
