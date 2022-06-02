import * as ActionTypes from "./contances";
import { api } from "../../../utils/api";

export const actGetWorkingAPI = (id) => {
  return (dispatch) => {
    dispatch(actGetWorkingRequest());
    api
      .get(`working/get-all/${id}`)
      .then((result) => {
        dispatch(actGetWorkingSuccess(result.data));
      })
      .catch((err) => {
        dispatch(actGetWorkingFailed(err));
      });
  };
};
const actGetWorkingRequest = () => {
  return {
    type: ActionTypes.GET_WORKING_REQUEST,
  };
};
const actGetWorkingSuccess = (data) => {
  return {
    type: ActionTypes.GET_WORKING_SUCCESS,
    data: data,
  };
};
const actGetWorkingFailed = (err) => {
  return {
    type: ActionTypes.GET_WORKING_FAILED,
    error: err,
  };
};
