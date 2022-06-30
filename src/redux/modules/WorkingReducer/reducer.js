import { act } from "react-dom/test-utils";
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
      state.error = null;
      return { ...state };
    case ActionTypes.GET_WORKING_FAILED:
      state.loading = false;
      state.data = null;
      state.error = action.err;
      return { ...state };
    case ActionTypes.DELETE_WORKING_REQUEST:
      return { ...state };
    case ActionTypes.DELETE_WORKING_SUCCESS:
      state.data = action.data;
      state.error = null;
      return { ...state };
    case ActionTypes.DELETE_WORKING_FAILED:
      state.error = action.err;
      return { ...state };
    case ActionTypes.ADD_WORKING_REQUEST:
      return { ...state };
    case ActionTypes.ADD_WORKING_SUCCESS:
      state.data = action.data;
      state.error = "Add success!"
      return { ...state };
    case ActionTypes.ADD_WORKING_FAILED:
      state.error = action.err;
      return { ...state };
    default:
      return { ...state };
  }
};
