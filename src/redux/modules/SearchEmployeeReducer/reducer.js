import * as ActionTypes from "./constance";

let initialState = {
  loading: false,
  data: null,
  error: null,
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SEARCH_REQUEST:
      state.loading = true;
      state.data = null;
      return { ...state };
    case ActionTypes.SEARCH_SUCCESS:
      state.loading = false;
      state.data = action.data;
      state.error = null;
      return { ...state };
    case ActionTypes.SEARCH_FAILED:
      state.loading = false;
      state.data = null;
      state.error = action.err;
      return { ...state };
    default:
      return { ...state };
  }
};
