import * as ActionTypes from "./constance";

let initialState = {
  data: null,
  error: null,
  keyword: "",
};

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SEARCH_REQUEST:
      state.data = null;
      return { ...state };
    case ActionTypes.SEARCH_SUCCESS:
      state.data = action.data;
      state.error = null;
      return { ...state };
    case ActionTypes.SEARCH_FAILED:
      state.data = null;
      state.error = action.err;
      return { ...state };
    default:
      return { ...state };
  }
};
