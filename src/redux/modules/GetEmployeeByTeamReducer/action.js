import * as ActionTypes from "./contances";
import { api } from "../../../utils/api";

export const actGetEmployeeByTeamAPI = (team_id) => {
  return (dispatch) => {
    dispatch(actGetEmployeeByTeamRequest());
    api
      .get(`employee/find-by-team/${team_id}?page=1`)
      .then((result) => {
        dispatch(actGetEmployeeByTeamSuccess(result.data));
      })
      .catch((err) => {
        dispatch(actGetEmployeeByTeamFailed(err));
      });
  };
};
const actGetEmployeeByTeamRequest = () => {
  return {
    type: ActionTypes.GET_EMPLOYEE_BY_TEAM_REQUEST,
  };
};
const actGetEmployeeByTeamSuccess = (data) => {
  return {
    type: ActionTypes.GET_EMPLOYEE_BY_TEAM_SUCCESS,
    data: data,
  };
};
const actGetEmployeeByTeamFailed = (err) => {
  return {
    type: ActionTypes.GET_EMPLOYEE_BY_TEAM_FAILED,
    error: err,
  };
};
