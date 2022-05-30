import * as ActionTypes from "./contances";

let initialState = {
  data: null,
  error: null,
};

export const listAllTeamReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LIST_TEAM_REQUEST:
      state.data = null;
      return { ...state };
    case ActionTypes.LIST_TEAM_SUCCESS:
      state.data = action.data;
      state.error = null;
      return { ...state };
    case ActionTypes.LIST_TEAM_FAILED:
      state.data = null;
      state.error = action.err;
      return { ...state };
    default:
      return { ...state };
  }
};
