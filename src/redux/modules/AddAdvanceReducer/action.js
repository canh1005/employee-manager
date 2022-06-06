import * as ActionTypes from "./contances";
import { api } from "../../../utils/api";

export const actAddAdvanceAPI = (advance_item) => {
  return (dispatch) => {
    dispatch(actAddAdvanceRequest());
    api
      .post(`advance/create`,advance_item)
      .then((result) => {
        dispatch(actAddAdvanceSuccess(result.data));
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
