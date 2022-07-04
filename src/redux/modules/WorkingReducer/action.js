import * as ActionTypes from "./constances";
import { api } from "../../../utils/api";

//GET working
export const actGetWorkingAPI = (employee_id) => {
  return (dispatch) => {
    dispatch(actGetWorkingRequest());
    api
      .get(`working/getAll?employee_id=${employee_id}`)
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
export const actGetWorkingPageAPI = (filter) => {
  return (dispatch) => {
    dispatch(actGetWorkingPageRequest());
    api
      .get(`working/getPage?${filter}`)
      .then((result) => {
        dispatch(actGetWorkingPageSuccess(result.data.data));
      })
      .catch((err) => {
        dispatch(actGetWorkingPageFailed(err));
      });
  };
};
const actGetWorkingPageRequest = () => {
  return {
    type: ActionTypes.GET_WORKING_PAGE_REQUEST,
  };
};
const actGetWorkingPageSuccess = (data) => {
  return {
    type: ActionTypes.GET_WORKING_PAGE_SUCCESS,
    data,
  };
};
const actGetWorkingPageFailed = (err) => {
  return {
    type: ActionTypes.GET_WORKING_PAGE_FAILED,
    err,
  };
};
//DELETE working
export const actDeleteWorkingAPI = (filter, working_id) => {
  return (dispatch) => {
    dispatch(actDeleteWorkingRequest());
    api
      .delete(`working/delete?working_id=${working_id}`)
      .then((result) => {
        dispatch(actDeleteWorkingSuccess(result.data));
        dispatch(actGetWorkingPageAPI(filter));
      })
      .catch((err) => {
        dispatch(actDeleteWorkingFailed(err.response));
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
export const actAddWorkingAPI = (filter, working) => {
  return (dispatch) => {
    dispatch(actAddWorkingRequest());
    api
      .post(`working/create`, working)
      .then((result) => {
        dispatch(actAddWorkingSuccess(result.data));
        dispatch(actGetWorkingPageAPI(filter));
      })
      .catch((err) => {
        dispatch(actAddWorkingFailed(err.response));
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
    data,
  };
};
const actAddWorkingFailed = (err) => {
  return {
    type: ActionTypes.ADD_WORKING_FAILED,
    err,
  };
};
export const actClearData = () => {
  return {
    type: ActionTypes.CLEAR_DATA,
  };
};
