import * as ActionTypes from "./contances";
import { api } from "../../../utils/api";

export const actGetEmployeeByTeamAPI = (team_id, page) => {
  return (dispatch) => {
    dispatch(actGetEmployeeByTeamRequest());
    api
      .get(`employee/getEmployeeByTeam?team_id=${team_id}&page=${page}`)
      .then((result) => {
        dispatch(actGetEmployeeByTeamSuccess(result.data.data));
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
    data
  };
};
const actGetEmployeeByTeamFailed = (err) => {
  return {
    type: ActionTypes.GET_EMPLOYEE_BY_TEAM_FAILED,
    err
  };
};
