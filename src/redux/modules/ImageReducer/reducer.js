import * as ActionTypes from "./contances";

let initialState = {
  loading: false,
  data: null,
  error: null,
};

export const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_IMAGE_REQUEST:
      state.loading = true;
      state.data = null;
      return { ...state };
    case ActionTypes.ADD_IMAGE_SUCCESS:
      state.loading = false;
      state.data = action.data;
      state.error = null;
      return { ...state };
    case ActionTypes.ADD_IMAGE_FAILED:
      state.loading = false;
      state.data = null;
      state.error = action.err;
      return { ...state };
    default:
      return { ...state };
  }
};
