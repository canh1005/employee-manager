import * as ActionTypes from "./constances";

let initialState = {
  data: null,
  error: null,
};

export const addTeamReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_TEAM_REQUEST:
      return { ...state };
    case ActionTypes.ADD_TEAM_SUCCESS:
      state.error = action.data;
      return { ...state };
    case ActionTypes.ADD_TEAM_FAILED:
      state.error = action.err;
      return { ...state };
    default:
      return { ...state };
  }
};
