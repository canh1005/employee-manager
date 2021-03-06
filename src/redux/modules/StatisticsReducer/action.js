import * as ActionTypes from "./contances";
import { api } from "utils/api";

export const actGetStatisticAPI = (id, year_month) => {
  return (dispatch) => {
    dispatch(actGetStatisticRequest());
    api
      .get(`statistic?employee_id=${id}&year_month=${year_month}`)
      .then((result) => {
        dispatch(actGetStatisticSuccess(result.data.data));
      })
      .catch((err) => {
        dispatch(actGetStatisticFailed(err));
      });
  };
};
const actGetStatisticRequest = () => {
  return {
    type: ActionTypes.GET_STATISTICS_REQUEST,
  };
};
const actGetStatisticSuccess = (data) => {
  return {
    type: ActionTypes.GET_STATISTICS_SUCCESS,
    data
  };
};
const actGetStatisticFailed = (err) => {
  return {
    type: ActionTypes.GET_STATISTICS_FAILED,
    err
  };
};
