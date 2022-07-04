import * as ActionTypes from "./constances";

let initialState = {
  loading: false,
  data: null,
  error: null,
};

export const advancesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_ADVANCES_REQUEST:
      state.loading = true;
      return { ...state };
    case ActionTypes.GET_ADVANCES_SUCCESS:
      state.loading = false;
      state.data = action.data;
      return { ...state };
    case ActionTypes.GET_ADVANCES_FAILED:
      state.loading = false;
      state.error = action.err;
      return { ...state };
    case ActionTypes.ADD_ADVANCE_REQUEST:
      return { ...state };
    case ActionTypes.ADD_ADVANCE_SUCCESS:
      state.data = action.data;
      return { ...state };
    case ActionTypes.ADD_ADVANCE_FAILED:
      state.error = action.err;
      return { ...state };
    case ActionTypes.DELETE_ADVANCE_REQUEST:
      return { ...state };
    case ActionTypes.DELETE_ADVANCE_FAILED:
      state.error = action.err;
      return { ...state };
    default:
      return { ...state };
  }
};
