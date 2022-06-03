import * as ActionTypes from "./contances";
import { api } from "../../../utils/api";
import { useNavigate } from "react-router-dom";

export const actAddWorkingAPI = (working) => {
  return (dispatch) => {
    dispatch(actAddWorkingRequest());
    api
      .post(`working/create`, working)
      .then((result) => {
        dispatch(actAddWorkingSuccess(result.data));
      })
      .catch((err) => {
        dispatch(actAddWorkingFailed(err));
      });
  };
};
const actAddWorkingRequest = () => {
  return {
    type: ActionTypes.ADD_WORKING_REQUEST,
  };
};
const actAddWorkingSuccess = (data) => {
  return {
    type: ActionTypes.ADD_WORKING_SUCCESS,
    data: data,
  };
};
const actAddWorkingFailed = (err) => {
  return {
    type: ActionTypes.ADD_WORKING_FAILED,
    error: err,
  };
};
