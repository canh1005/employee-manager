import * as ActionTypes from "./contances";
import { api } from "../../../utils/api";

export const actEmployeeDetailAPI = (id) => {
  return (dispatch) => {
    dispatch(actEmployeeDetailRequest());
    api
      .get(`employee/find-by-id/${id}`)
      .then((result) => {
        dispatch(actEmployeeDetailSuccess(result.data));
      })
      .catch((err) => {
        dispatch(actEmployeeDetailFailed(err));
      });
  };
};
const actEmployeeDetailRequest = () => {
  return {
    type: ActionTypes.EMPLOYEE_DETAIL_REQUEST,
  };
};
const actEmployeeDetailSuccess = (data) => {
  return {
    type: ActionTypes.EMPLOYEE_DETAIL_SUCCESS,
    data: data,
  };
};
const actEmployeeDetailFailed = (err) => {
  return {
    type: ActionTypes.EMPLOYEE_DETAIL_FAILED,
    error: err,
  };
};
