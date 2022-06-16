import * as ActionTypes from "./constances";
import { api } from "../../../utils/api";

//GET
export const actGetAdvancesAPI = (employee_id) => {
  return (dispatch) => {
    dispatch(actGetAdvancesRequest());
    api
      .get(`advance/get-all/${employee_id}`)
      .then((result) => {
        dispatch(actGetAdvancesSuccess(result.data));
      })
      .catch((err) => {
        dispatch(actGetAdvancesFailed(err));
      });
  };
};
const actGetAdvancesRequest = () => {
  return {
    type: ActionTypes.GET_ADVANCES_REQUEST,
  };
};
const actGetAdvancesSuccess = (data) => {
  return {
    type: ActionTypes.GET_ADVANCES_SUCCESS,
    data,
  };
};
const actGetAdvancesFailed = (err) => {
  return {
    type: ActionTypes.GET_ADVANCES_FAILED,
    err,
  };
};
//ADD
export const actAddAdvanceAPI = (employee_id, advance_item) => {
  return (dispatch) => {
    dispatch(actAddAdvanceRequest());
    api
      .post(`advance/create`, advance_item)
      .then((result) => {
        dispatch(actAddAdvanceSuccess(result.data));
        dispatch(actGetAdvancesAPI(employee_id));
      })
      .catch((err) => {
        dispatch(actAddAdvanceFailed(err));
      });
  };
};
const actAddAdvanceRequest = () => {
  return {
    type: ActionTypes.ADD_ADVANCE_REQUEST,
  };
};
const actAddAdvanceSuccess = (data) => {
  return {
    type: ActionTypes.ADD_ADVANCE_SUCCESS,
    data: data,
  };
};
const actAddAdvanceFailed = (err) => {
  return {
    type: ActionTypes.ADD_ADVANCE_FAILED,
    error: err,
  };
};
//DELETE
export const actDeleteAdvanceAPI = (employee_id, advance_id) => {
  return (dispatch) => {
    dispatch(actDeleteAdvanceRequest());
    api
      .delete(`advance/delete/${advance_id}`)
      .then((result) => {
        dispatch(actDeleteAdvanceSuccess(result.data));
        dispatch(actGetAdvancesAPI(employee_id));
      })
      .catch((err) => {
        dispatch(actDeleteAdvanceFailed(err));
      });
  };
};
const actDeleteAdvanceRequest = () => {
  return {
    type: ActionTypes.DELETE_ADVANCE_REQUEST,
  };
};
const actDeleteAdvanceSuccess = (data) => {
  return {
    type: ActionTypes.DELETE_ADVANCE_SUCCESS,
    data,
  };
};
const actDeleteAdvanceFailed = (err) => {
  return {
    type: ActionTypes.DELETE_ADVANCE_FAILED,
    err,
  };
};
