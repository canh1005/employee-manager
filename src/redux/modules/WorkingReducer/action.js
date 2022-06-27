import * as ActionTypes from "./constances";
import { api } from "../../../utils/api";

//GET working
export const actGetWorkingAPI = (id) => {
  return (dispatch) => {
    dispatch(actGetWorkingRequest());
    api
      .get(`working/getAll?employee_id=${id}`)
      .then((result) => {
        dispatch(actGetWorkingSuccess(result.data.data));
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
    data,
  };
};
const actGetWorkingFailed = (err) => {
  return {
    type: ActionTypes.GET_WORKING_FAILED,
    err,
  };
};
//DELETE working
export const actDeleteWorkingAPI = (employee_id, working_id) => {
  return (dispatch) => {
    dispatch(actDeleteWorkingRequest());
    api
      .delete(`working/delete?working_id=${working_id}`)
      .then((result) => {
        dispatch(actDeleteWorkingSuccess(result.data));
        dispatch(actGetWorkingAPI(employee_id));
      })
      .catch((err) => {
        dispatch(actDeleteWorkingFailed(err));
      });
  };
};
const actDeleteWorkingRequest = () => {
  return {
    type: ActionTypes.DELETE_WORKING_REQUEST,
  };
};
const actDeleteWorkingSuccess = (data) => {
  return {
    type: ActionTypes.DELETE_WORKING_SUCCESS,
    data,
  };
};
const actDeleteWorkingFailed = (err) => {
  return {
    type: ActionTypes.DELETE_WORKING_FAILED,
    err,
  };
};
//ADD working
export const actAddWorkingAPI = (employee_id, working) => {
  return (dispatch) => {
    dispatch(actAddWorkingRequest());
    api
      .post(`working/create`, working)
      .then((result) => {
        dispatch(actAddWorkingSuccess(result.data));
        dispatch(actGetWorkingAPI(employee_id));
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
