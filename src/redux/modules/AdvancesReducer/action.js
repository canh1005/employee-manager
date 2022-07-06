import * as ActionTypes from "./constances";
import { api } from "../../../utils/api";

//GET
export const actGetAdvancesAPI = (employee_id, page) => {
  return (dispatch) => {
    dispatch(actGetAdvancesRequest());
    api
      .get(`advance/getPage?employee_id=${employee_id}&page=${page}`)
      .then((result) => {
        dispatch(actGetAdvancesSuccess(result.data.data));
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
export const actAddAdvanceAPI = (advance_item) => {
  return (dispatch) => {
    dispatch(actAddAdvanceRequest());
    api
      .post(`advance/create`, advance_item)
      .then((result) => {
        dispatch(actAddAdvanceSuccess(result.data));
      })
      .catch((err) => {
        dispatch(actAddAdvanceFailed(err.response));
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
    data,
  };
};
const actAddAdvanceFailed = (err) => {
  return {
    type: ActionTypes.ADD_ADVANCE_FAILED,
    err,
  };
};
//DELETE
export const actDeleteAdvanceAPI = (date, employee_id) => {
  return (dispatch) => {
    dispatch(actDeleteAdvanceRequest());
    api
      .delete(`advance/delete?date=${date}&employee_id=${employee_id}`)
      .then((result) => {
        dispatch(actDeleteAdvanceSuccess(date));
      })
      .catch((err) => {
        dispatch(actDeleteAdvanceFailed(err.response));
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
export const actClearAdvances = () => {
  return{
    type: ActionTypes.CLEAR_ADVANCE_DATA,
  }
};
