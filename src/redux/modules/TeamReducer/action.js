import * as ActionTypes from "./constances";
import { api } from "utils/api";

//Get
export const actGetTeamAPI = () => {
  return (dispatch) => {
    dispatch(actGetTeamRequest());
    api
      .get('team/getAll')
      .then((result) => {
        dispatch(actGetTeamSuccess(result.data.data));
      })
      .catch((err) => {
        dispatch(actGetTeamFailed(err));
      });
  };
};
const actGetTeamRequest = () => {
  return {
    type: ActionTypes.GET_TEAM_REQUEST,
  };
};
const actGetTeamSuccess = (data) => {
  return {
    type: ActionTypes.GET_TEAM_SUCCESS,
    data: data,
  };
};
const actGetTeamFailed = (err) => {
  return {
    type: ActionTypes.GET_TEAM_FAILED,
    error: err,
  };
};
