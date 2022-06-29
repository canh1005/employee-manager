
import * as ActionTypes from "./constances";
import { api } from "utils/api";
import { actGetTeamPageAPI } from "../action";
//Add
export const actAddTeam = (teamInfo, page) => {
    return (dispatch) => {
      dispatch(actAddTeamRequest());
      api
        .post("team/create", teamInfo)
        .then((result) => {
          dispatch(actAddTeamSuccess(result.status))
          dispatch(actGetTeamPageAPI(page));
        })
        .catch((err) => {
          dispatch(actAddTeamFailed(err.response));
        });
    };
  };
  const actAddTeamRequest = () => {
    return {
      type: ActionTypes.ADD_TEAM_REQUEST,
    };
  };
  const actAddTeamSuccess = (data) => {
    return {
      type: ActionTypes.ADD_TEAM_SUCCESS,
      data
    };
  };
  const actAddTeamFailed = (err) => {
    return {
      type: ActionTypes.ADD_TEAM_FAILED,
      err,
    };
  };