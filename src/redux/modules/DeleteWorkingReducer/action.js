import * as ActionTypes from "./contances";
import { api } from "../../../utils/api";
import { actGetWorkingAPI } from "../GetWorkingReducer/action";

export const actDeleteWorkingAPI = (id,working_id) => {
  return (dispatch) => {
    dispatch(actDeleteWorkingRequest());
    api
      .delete(`working/delete/${working_id}`)
      .then((result) => {
        dispatch(actDeleteWorkingSuccess(result.data));
        dispatch(actGetWorkingAPI(id))
        alert('Delete success!')
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
    data: data,
  };
};
const actDeleteWorkingFailed = (err) => {
  return {
    type: ActionTypes.DELETE_WORKING_FAILED,
    error: err,
  };
};
