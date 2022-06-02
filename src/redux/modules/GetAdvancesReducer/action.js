import * as ActionTypes from "./contances";
import { api } from "../../../utils/api";

export const actGetAdvancesAPI = (id) => {
  return (dispatch) => {
    dispatch(actGetAdvancesRequest());
    api
      .get(`advance/get-all/${id}`)
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
    data: data,
  };
};
const actGetAdvancesFailed = (err) => {
  return {
    type: ActionTypes.GET_ADVANCES_FAILED,
    error: err,
  };
};
