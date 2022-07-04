import * as ActionTypes from "./constances";

let initialState = {
  loading: false,
  data: null,
  error: null,
};

export const workingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_WORKING_REQUEST:
      state.loading = true;
      return { ...state };
    case ActionTypes.GET_WORKING_SUCCESS:
      state.loading = false;
      state.data = action.data;
      return { ...state };
    case ActionTypes.GET_WORKING_FAILED:
      state.loading = false;
      state.error = action.err;
      return { ...state };
    case ActionTypes.GET_WORKING_PAGE_REQUEST:
      state.loading = true;
      return { ...state };
    case ActionTypes.GET_WORKING_PAGE_SUCCESS:
      state.loading = false;
      state.data = action.data;
      return { ...state };
    case ActionTypes.GET_WORKING_PAGE_FAILED:
      state.loading = false;
      state.error = action.err;
      return { ...state };
    case ActionTypes.DELETE_WORKING_REQUEST:
      return { ...state };
    case ActionTypes.DELETE_WORKING_SUCCESS:
      state.error = null;
      return { ...state };
    case ActionTypes.DELETE_WORKING_FAILED:
      state.error = action.err;
      return { ...state };
    case ActionTypes.ADD_WORKING_REQUEST:
      return { ...state };
    case ActionTypes.ADD_WORKING_SUCCESS:
      state.error = { status: 200 };
      return { ...state };
    case ActionTypes.ADD_WORKING_FAILED:
      state.error = action.err;
      return { ...state };
    case ActionTypes.CLEAR_DATA:
      state.data = null;
      state.error = null;
    default:
      return { ...state };
  }
};
