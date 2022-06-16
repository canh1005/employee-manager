import * as ActionTypes from "./contances";
import { api } from "../../../utils/api";

export const actGetStatisticAPI = (id) => {
  return (dispatch) => {
    dispatch(actGetStatisticRequest());
    api
      .get(`statistic/${id}`)
      .then((result) => {
        dispatch(actGetStatisticSuccess(result.data));
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
    data: data,
  };
};
const actGetStatisticFailed = (err) => {
  return {
    type: ActionTypes.GET_STATISTICS_FAILED,
    error: err,
  };
};
