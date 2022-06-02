import * as ActionTypes from "./contances";

let initialState = {
  data: null,
  error: null,
};

export const getAdvancesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_ADVANCES_REQUEST:
      state.data = null;
      return { ...state };
    case ActionTypes.GET_ADVANCES_SUCCESS:
      state.data = action.data;
      state.error = null;
      return { ...state };
    case ActionTypes.GET_ADVANCES_FAILED:
      state.data = null;
      state.error = action.err;
      return { ...state };
    default:
      return { ...state };
  }
};
