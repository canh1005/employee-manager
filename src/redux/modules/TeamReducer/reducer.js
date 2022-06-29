import * as ActionTypes from "./constances";

let initialState = {
  loading: false,
  data: null,
  error: null,
};

export const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_TEAM_REQUEST:
      state.loading = true;
      state.data = null;
      return { ...state };
    case ActionTypes.GET_TEAM_SUCCESS:
      state.loading = false;
      state.data = action.data;
      state.error = null;
      return { ...state };
    case ActionTypes.GET_TEAM_FAILED:
      state.loading = false;
      state.data = null;
      state.error = action.err;
      return { ...state };
    case ActionTypes.GET_TEAM_PAGE_REQUEST:
      state.loading = true;
      state.data = null;
      return { ...state };
    case ActionTypes.GET_TEAM_PAGE_SUCCESS:
      state.loading = false;
      state.data = action.data;
      state.error = null;
      return { ...state };
    case ActionTypes.GET_TEAM_PAGE_FAILED:
      state.loading = false;
      state.data = null;
      state.error = action.err;
      return { ...state };
    case ActionTypes.ADD_TEAM_REQUEST:
      return { ...state };
    case ActionTypes.ADD_TEAM_SUCCESS:
      state.error = action.data;
      return { ...state };
    case ActionTypes.ADD_TEAM_FAILED:
      state.error = action.err;
      return { ...state };
    case ActionTypes.CLEAR_TEAM_DATA:
      state.data = null;
      state.error = null;
      return { ...state };
    default:
      return { ...state };
  }
};
