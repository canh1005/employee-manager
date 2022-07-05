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
      state.data.content = [...state.data.content, action.data];
      state.error = { status: 200, message: "Add advances success!" };
      return { ...state };
    case ActionTypes.ADD_ADVANCE_FAILED:
      state.error = action.err;
      return { ...state };
    case ActionTypes.DELETE_ADVANCE_REQUEST:
      return { ...state };
    case ActionTypes.DELETE_ADVANCE_SUCCESS:
      state.loading = false;
      console.log("action data", action.data);
      state.data.content = state.data.content.filter(
        (item) => item.id !== action.data
      );
      state.error = { status: 200, message: "Delete advances success!" };
      return { ...state };
    case ActionTypes.DELETE_ADVANCE_FAILED:
      state.error = action.err;
      return { ...state };
    case ActionTypes.DELETE_ADVANCE_FAILED:
      state.data = null
      state.error = null;
      return { ...state };
    default:
      return { ...state };
  }
};
